## On this page

* [Deploy InsForge to Containarium](#deploy-insforge-to-containarium)
* [When to choose Containarium](#when-to-choose-containarium)
* [Prerequisites](#prerequisites)
* [Deployment](#deployment)
  + [1. Provision a box with Docker pre-installed](#1-provision-a-box-with-docker-pre-installed)
  + [2. Clone InsForge inside the box](#2-clone-insforge-inside-the-box)
  + [3. Configure environment](#3-configure-environment)
  + [4. Start InsForge and enable autostart](#4-start-insforge-and-enable-autostart)
  + [5. Expose on a public hostname](#5-expose-on-a-public-hostname)
  + [6. Connect your agent to InsForge MCP](#6-connect-your-agent-to-insforge-mcp)
* [Agent-driven deploy (optional)](#agent-driven-deploy-optional)
* [Multi-tenant: many InsForge projects per host](#multi-tenant-many-insforge-projects-per-host)
* [Management](#management)
  + [View logs](#view-logs)
  + [Update InsForge](#update-insforge)
  + [Back up the database](#back-up-the-database)
  + [Stop / restart](#stop-%2F-restart)
* [Troubleshooting](#troubleshooting)
  + [containarium compose enable fails](#containarium-compose-enable-fails)
  + [Public hostname doesn’t resolve](#public-hostname-doesn%E2%80%99t-resolve)
  + [Hostname resolves but returns 502](#hostname-resolves-but-returns-502)
  + [Out of memory after docker compose up](#out-of-memory-after-docker-compose-up)
* [Limitations](#limitations)
* [Security notes](#security-notes)
* [Resources](#resources)

Self-Hosting

# Deploy InsForge to Containarium

Copy page

Run InsForge on a Containarium LXC host with per-tenant containers, ZFS snapshots, and MCP-driven provisioning for agent-native deployments.

Copy page

# [​](#deploy-insforge-to-containarium) Deploy InsForge to Containarium

This guide walks through deploying InsForge on a [Containarium](https://github.com/footprintai/containarium) host. Containarium is an open-source, self-hostable platform that gives each tenant a persistent Linux container (LXC) with first-class SSH, MCP, and TLS-on-a-hostname primitives — a natural fit for agent-driven InsForge deployments.

This guide is community-maintained and can lag the latest InsForge release. The canonical, always-current setup is the `deploy/docker-compose/` directory in the [InsForge repo](https://github.com/InsForge/InsForge).

## [​](#when-to-choose-containarium) When to choose Containarium

Containarium fits InsForge deployments where you want:

* **Self-hosted, multi-tenant infrastructure**: many isolated InsForge projects on one host, each in its own LXC, with one TLS hostname per project — no shared `docker compose -p` bookkeeping.
* **Persistence and resilience**: ZFS-backed storage, daily snapshots with 30-day retention, automatic survival across host reboots and spot-VM termination.
* **An agent-native control plane**: Containarium exposes its admin surface as an MCP server (`mcp-server`) and ships a second MCP that runs inside each container (`agent-box`), so the same agent that builds your app can also provision its backend end-to-end.

## [​](#prerequisites) Prerequisites

* A running Containarium host. If you don’t have one, the [Containarium quickstart](https://github.com/footprintai/containarium#quick-start) takes ~5 minutes on a fresh Ubuntu 24.04 VM.
* `containarium` CLI on your local machine, configured to reach the daemon (`--server <host>:8080`), or run the CLI directly on the host.
* An admin token (`containarium token generate --username admin --roles admin --secret-file /etc/containarium/jwt.secret`).
* A domain you control, with a DNS A/CNAME record pointing the chosen subdomain at your Containarium sentinel’s public IP.

Minimum sizing per InsForge box: **2 vCPU, 4 GB RAM, 30 GB disk**.

## [​](#deployment) Deployment

### [​](#1-provision-a-box-with-docker-pre-installed) 1. Provision a box with Docker pre-installed

```
containarium create insforge \
  --stack docker \
  --memory 4GB \
  --cpu 2 \
  --disk 30GB \
  --ssh-key ~/.ssh/id_ed25519.pub
```

The `--stack docker` flag installs Docker CE and the compose plugin inside the container. Wire your SSH config so `ssh insforge` works:

```
containarium ssh-config sync
# Then add one line to ~/.ssh/config:
#   Include ~/.containarium/ssh_config
ssh insforge
```

### [​](#2-clone-insforge-inside-the-box) 2. Clone InsForge inside the box

```
ssh insforge <<'EOF'
  git clone https://github.com/InsForge/InsForge.git ~/insforge
  cd ~/insforge/deploy/docker-compose
  cp .env.example .env
EOF
```

### [​](#3-configure-environment) 3. Configure environment

Edit `~/insforge/deploy/docker-compose/.env` inside the box. At minimum set:

```
JWT_SECRET=<32+ char random string — `openssl rand -base64 32`>
ENCRYPTION_KEY=<24+ char random string — `openssl rand -base64 24`>
POSTGRES_PASSWORD=<strong password>
ROOT_ADMIN_USERNAME=admin
ROOT_ADMIN_PASSWORD=<change this>

API_BASE_URL=https://<your-subdomain>
VITE_API_BASE_URL=https://<your-subdomain>
```

See [`deploy/docker-compose/.env.example`](https://github.com/insforge/insforge/blob/main/deploy/docker-compose/.env.example) for the full list (OpenRouter, OAuth providers, Stripe, Vercel).
> **Secrets handling:** for production, prefer Containarium’s tmpfs secrets (`--delivery=file`; see [Containarium’s secrets ops doc](https://github.com/footprintai/Containarium/blob/main/docs/SECRETS-OPERATIONS.md)). These are delivered as 0440 files on tmpfs and never appear in `/proc/<pid>/environ`. Wire them into the compose stack via a compose override using `env_file:`.

### [​](#4-start-insforge-and-enable-autostart) 4. Start InsForge and enable autostart

You can start it once by hand:

```
ssh insforge 'cd ~/insforge/deploy/docker-compose && docker compose up -d'
```

…or — recommended — wire it into Containarium’s compose-autostart so the stack survives host reboots:

```
containarium compose enable insforge --dir /home/insforge/insforge/deploy/docker-compose
```

This installs a systemd-user unit inside the box that brings the stack up at every container boot and restarts services on failure with backoff. Verify with:

```
containarium compose status insforge
```

You should see `4/4 services up`: `postgres`, `postgrest`, `insforge`, `deno`. (The compose file ships healthchecks for `postgres`, `postgrest`, and `deno`; `insforge` reports `Up` once the others are healthy and it has started.)

### [​](#5-expose-on-a-public-hostname) 5. Expose on a public hostname

InsForge serves the dashboard and API on port 7130 by default.

```
containarium expose-port insforge \
  --container-port 7130 \
  --domain <your-subdomain>
```

This wires Caddy on the Containarium sentinel to terminate TLS for `<your-subdomain>` and forward to the InsForge container. The certificate is provisioned automatically via ACME on the first request — no certbot, no nginx config.
Verify:

```
curl https://<your-subdomain>/api/health
```

Expected:

```
{
  "status": "ok",
  "version": "2.x.x",
  "service": "Insforge OSS Backend",
  "timestamp": "..."
}
```

### [​](#6-connect-your-agent-to-insforge-mcp) 6. Connect your agent to InsForge MCP

Open `https://<your-subdomain>` in a browser and follow the in-product flow to connect your MCP-compatible agent (Cursor, Claude Code, Windsurf, OpenCode, etc.) to the InsForge MCP server.
Verify the connection by sending this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's
fetch-docs tool to learn about InsForge instructions.
```

## [​](#agent-driven-deploy-optional) Agent-driven deploy (optional)

Because Containarium exposes its admin surface as an MCP server (`mcp-server`) and ships a second MCP inside every container (`agent-box`), an MCP-speaking agent can do the whole deployment end-to-end:

```
agent: create me a container called 'insforge'
  → mcp__containarium__create_container(
      username="insforge", cpu="2", memory="4GB",
      disk="30GB", stack="docker")

agent: clone InsForge, fill in .env
  → ssh insforge agent-box
    → shell_exec("git clone https://github.com/InsForge/InsForge.git ~/insforge")
    → write_file("~/insforge/deploy/docker-compose/.env", "<contents>")

agent: enable autostart
  → mcp__containarium__compose_enable(
      username="insforge",
      dir="/home/insforge/insforge/deploy/docker-compose")

agent: expose on a public hostname
  → mcp__containarium__expose_port(
      username="insforge",
      container_port=7130,
      domain="<your-subdomain>")
```

See Containarium’s [`docs/MCP-INTEGRATION.md`](https://github.com/footprintai/Containarium/blob/main/docs/MCP-INTEGRATION.md) for the platform MCP tool catalog.

## [​](#multi-tenant-many-insforge-projects-per-host) Multi-tenant: many InsForge projects per host

Each project gets its own LXC and its own hostname; the sentinel routes by SNI. No port collisions (each container has its own network namespace), no shared compose project names.

```
containarium create insforge-acme  --stack docker --memory 4GB --cpu 2 ...
containarium create insforge-globex --stack docker --memory 4GB --cpu 2 ...

containarium expose-port insforge-acme   --container-port 7130 \
  --domain acme.<your-domain>
containarium expose-port insforge-globex --container-port 7130 \
  --domain globex.<your-domain>
```

Each project gets isolated postgres / storage / deno volumes.

## [​](#management) Management

### [​](#view-logs) View logs

```
ssh insforge 'cd ~/insforge/deploy/docker-compose && docker compose logs -f'
```

Or per service: `docker compose logs -f insforge` / `postgres` / `deno`.

### [​](#update-insforge) Update InsForge

```
ssh insforge <<'EOF'
  cd ~/insforge/deploy/docker-compose
  git -C ~/insforge pull origin main
  docker compose pull
  docker compose up -d
EOF
```

If compose-autostart is enabled, no need to re-enable the unit — it tracks the directory, not a specific image tag.

### [​](#back-up-the-database) Back up the database

```
ssh insforge 'cd ~/insforge/deploy/docker-compose && docker compose exec -T postgres \
  pg_dump -U postgres insforge' > backup_$(date +%Y%m%d_%H%M%S).sql
```

Containarium also snapshots the entire container daily via ZFS (30-day retention by default), covering the postgres data volume as a point-in-time-restore backstop.

### [​](#stop-/-restart) Stop / restart

```
containarium compose disable insforge   # stop the compose stack and disable autostart
containarium sleep insforge             # stop the entire box
containarium wake insforge              # start the box; compose comes up via autostart
```

## [​](#troubleshooting) Troubleshooting

### [​](#containarium-compose-enable-fails) `containarium compose enable` fails

Verify Docker is working inside the box:

```
ssh insforge 'docker ps'
```

If you skipped `--stack docker` at create time, either install it manually inside the box or recreate with the flag.

### [​](#public-hostname-doesn’t-resolve) Public hostname doesn’t resolve

`containarium expose-port` configures Caddy on the sentinel; the DNS A/CNAME record for your subdomain must point at the sentinel’s public IP. Check:

```
dig +short <your-subdomain>
```

### [​](#hostname-resolves-but-returns-502) Hostname resolves but returns 502

Check that InsForge is reachable from inside the box:

```
ssh insforge 'curl -s http://localhost:7130/api/health'
```

If the in-box check is fine, the bridge between sentinel and box is the next thing to investigate — see Containarium’s [`docs/TUNNEL-REVERSE-PROXY.md`](https://github.com/footprintai/Containarium/blob/main/docs/TUNNEL-REVERSE-PROXY.md).

### [​](#out-of-memory-after-docker-compose-up) Out of memory after `docker compose up`

InsForge’s four services need ~3 GB resident at idle. If you sized the box at 2 GB, resize:

```
containarium resize insforge --memory 4GB
containarium sleep insforge && containarium wake insforge
```

## [​](#limitations) Limitations

* **AUTH\_PORT (7131) and DENO\_PORT (7133)** are not exposed externally by the steps above. If your app calls the standalone auth endpoint or direct Deno function URLs from outside the box, add additional `expose-port` calls with separate subdomains.
* **`containarium compose enable` requires Containarium v0.18 or later** (the compose-autostart feature). On earlier versions, run `docker compose up -d` and add a `@reboot` cron entry by hand.
* **GPU passthrough**: Containarium supports it, but InsForge’s stock edge functions don’t use GPU. Leave it off unless your custom Deno functions need it.

## [​](#security-notes) Security notes

* The container’s user is unprivileged on the host (LXC unprivileged mode); container root ≠ host root.
* The sentinel front-door supports source-IP allowlists for admin endpoints — see Containarium’s [security runbook](https://github.com/footprintai/Containarium/blob/main/docs/security/OPERATOR-SECURITY-RUNBOOK.md).
* For production, opt into Containarium’s KMS envelope encryption (Vault Transit or GCP KMS) for any InsForge secrets stored in Containarium’s secret store.
* Use `containarium token generate --scopes containers:read,containers:write ...` to mint least-privilege tokens for agents rather than handing out admin tokens.

## [​](#resources) Resources

* **Containarium**: <https://github.com/footprintai/containarium>
* **Containarium docs**: <https://github.com/footprintai/Containarium/tree/main/docs>
* **InsForge docs**: <https://docs.insforge.dev>
* **InsForge Discord**: <https://discord.com/invite/MPxwj5xVvW>

---

For other deployment strategies, see the [deployment guides](/deployment/deployment-security-guide).

[Deploy to azure virtual machines](/deployment/deploy-to-azure-virtual-machines)[Deploy InsForge to Google Cloud Compute Engine](/deployment/deploy-to-google-cloud-compute-engine)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)