## 本页内容

* [将 InsForge 部署到 Containarium](#将-insforge-部署到-containarium)
* [何时选择 Containarium](#何时选择-containarium)
* [前提条件](#前提条件)
* [部署](#部署)
  + [1. 预配安装了 Docker 的容器](#1-预配安装了-docker-的容器)
  + [2. 在容器内克隆 InsForge](#2-在容器内克隆-insforge)
  + [3. 配置环境](#3-配置环境)
  + [4. 启动 InsForge 并启用自动启动](#4-启动-insforge-并启用自动启动)
  + [5. 在公共主机名上暴露](#5-在公共主机名上暴露)
  + [6. 将你的 AI 代理连接到 InsForge MCP](#6-将你的-ai-代理连接到-insforge-mcp)
* [AI 代理驱动部署（可选）](#ai-代理驱动部署可选)
* [多租户：每主机多个 InsForge 项目](#多租户每主机多个-insforge-项目)
* [管理](#管理)
  + [查看日志](#查看日志)
  + [更新 InsForge](#更新-insforge)
  + [备份数据库](#备份数据库)
  + [停止 / 重启](#停止--重启)
* [故障排除](#故障排除)
  + [containarium compose enable 失败](#containarium-compose-enable-失败)
  + [公共主机名无法解析](#公共主机名无法解析)
  + [主机名可解析但返回 502](#主机名可解析但返回-502)
  + [docker compose up 后内存不足](#docker-compose-up-后内存不足)
* [限制](#限制)
* [安全说明](#安全说明)
* [资源](#资源)

自托管

# 将 InsForge 部署到 Containarium

复制页面

在 Containarium LXC 主机上运行 InsForge，支持每租户容器、ZFS 快照和 MCP 驱动的预配，适用于 AI 代理原生部署。

复制页面

# [​](#将-insforge-部署到-containarium) 将 InsForge 部署到 Containarium

本指南介绍了在 [Containarium](https://github.com/footprintai/containarium) 主机上部署 InsForge。Containarium 是一个开源、可自托管的平台，为每个租户提供持久的 Linux 容器（LXC），具有一流的 SSH、MCP 和 TLS-on-a-hostname 原语——非常适合 AI 代理驱动的 InsForge 部署。

本指南由社区维护，可能落后于最新的 InsForge 版本。始终最新的规范配置位于 [InsForge 仓库](https://github.com/InsForge/InsForge) 的 `deploy/docker-compose/` 目录中。

## [​](#何时选择-containarium) 何时选择 Containarium

Containarium 适用于以下场景的 InsForge 部署：

* **自托管的多租户基础设施**：在一台主机上运行多个隔离的 InsForge 项目，每个项目在自己的 LXC 中，每个项目一个 TLS 主机名——无需共享的 `docker compose -p` 簿记。
* **持久性和弹性**：ZFS 支持的存储，每日快照保留 30 天，主机重启和 spot-VM 终止后自动恢复。
* **AI 代理原生控制平面**：Containarium 将其管理面暴露为 MCP 服务器（`mcp-server`），并在每个容器内提供第二个 MCP（`agent-box`），因此构建你的应用的同一 AI 代理也可以端到端预配其后端。

## [​](#前提条件) 前提条件

* 一个正在运行的 Containarium 主机。如果没有，[Containarium 快速开始](https://github.com/footprintai/containarium#quick-start) 在全新的 Ubuntu 24.04 VM 上大约需要 5 分钟。
* 本地机器上的 `containarium` CLI，配置为连接到守护进程（`--server <host>:8080`），或直接在主机上运行 CLI。
* 一个管理员令牌（`containarium token generate --username admin --roles admin --secret-file /etc/containarium/jwt.secret`）。
* 一个你控制的域名，其 DNS A/CNAME 记录将所选子域名指向你的 Containarium sentinel 的公共 IP。

每个 InsForge 容器的最低规格：**2 vCPU，4 GB RAM，30 GB 磁盘**。

## [​](#部署) 部署

### [​](#1-预配安装了-docker-的容器) 1. 预配安装了 Docker 的容器

```
containarium create insforge \
  --stack docker \
  --memory 4GB \
  --cpu 2 \
  --disk 30GB \
  --ssh-key ~/.ssh/id_ed25519.pub
```

`--stack docker` 标志会在容器内安装 Docker CE 和 compose 插件。配置你的 SSH 配置，使 `ssh insforge` 生效：

```
containarium ssh-config sync
# 然后在 ~/.ssh/config 中添加一行：
#   Include ~/.containarium/ssh_config
ssh insforge
```

### [​](#2-在容器内克隆-insforge) 2. 在容器内克隆 InsForge

```
ssh insforge <<'EOF'
  git clone https://github.com/InsForge/InsForge.git ~/insforge
  cd ~/insforge/deploy/docker-compose
  cp .env.example .env
EOF
```

### [​](#3-配置环境) 3. 配置环境

在容器内编辑 `~/insforge/deploy/docker-compose/.env`。至少设置：

```
JWT_SECRET=<32+ 字符随机字符串 — `openssl rand -base64 32`>
ENCRYPTION_KEY=<24+ 字符随机字符串 — `openssl rand -base64 24`>
POSTGRES_PASSWORD=<强密码>
ROOT_ADMIN_USERNAME=admin
ROOT_ADMIN_PASSWORD=<更改此密码>

API_BASE_URL=https://<your-subdomain>
VITE_API_BASE_URL=https://<your-subdomain>
```

查看 [`deploy/docker-compose/.env.example`](https://github.com/insforge/insforge/blob/main/deploy/docker-compose/.env.example) 获取完整列表（OpenRouter、OAuth 提供商、Stripe、Vercel）。
> **密钥处理：** 生产环境推荐使用 Containarium 的 tmpfs 密钥（`--delivery=file`；参见 [Containarium 的密钥操作文档](https://github.com/footprintai/Containarium/blob/main/docs/SECRETS-OPERATIONS.md)）。它们以 0440 权限文件形式交付在 tmpfs 上，永远不会出现在 `/proc/<pid>/environ` 中。通过 compose 覆盖文件使用 `env_file:` 将它们接入 compose 栈。

### [​](#4-启动-insforge-并启用自动启动) 4. 启动 InsForge 并启用自动启动

你可以手动启动一次：

```
ssh insforge 'cd ~/insforge/deploy/docker-compose && docker compose up -d'
```

…或者——推荐——将其接入 Containarium 的 compose 自动启动，使栈在主机重启后自动恢复：

```
containarium compose enable insforge --dir /home/insforge/insforge/deploy/docker-compose
```

这会在容器内安装一个 systemd-user 单元，使栈在每次容器启动时启动，并在失败时以退避策略重启服务。验证：

```
containarium compose status insforge
```

你应该看到 `4/4 服务正常运行`：`postgres`、`postgrest`、`insforge`、`deno`。（compose 文件为 `postgres`、`postgrest` 和 `deno` 提供了健康检查；`insforge` 在其他服务健康并启动后报告 `Up`。）

### [​](#5-在公共主机名上暴露) 5. 在公共主机名上暴露

InsForge 默认在端口 7130 上提供控制面板和 API。

```
containarium expose-port insforge \
  --container-port 7130 \
  --domain <your-subdomain>
```

这会在 Containarium sentinel 上配置 Caddy，为 `<your-subdomain>` 终止 TLS 并转发到 InsForge 容器。证书在首次请求时通过 ACME 自动预配——无需 certbot，无需 nginx 配置。
验证：

```
curl https://<your-subdomain>/api/health
```

预期：

```
{
  "status": "ok",
  "version": "2.x.x",
  "service": "Insforge OSS Backend",
  "timestamp": "..."
}
```

### [​](#6-将你的-ai-代理连接到-insforge-mcp) 6. 将你的 AI 代理连接到 InsForge MCP

在浏览器中打开 `https://<your-subdomain>` 并按照产品内流程将你的 MCP 兼容 AI 代理（Cursor、Claude Code、Windsurf、OpenCode 等）连接到 InsForge MCP 服务器。
通过向你的 AI 代理发送以下提示来验证连接：

```
我正在使用 InsForge 作为我的后端平台，调用 InsForge MCP 的
fetch-docs 工具来了解 InsForge 的说明。
```

## [​](#ai-代理驱动部署可选) AI 代理驱动部署（可选）

由于 Containarium 将其管理面暴露为 MCP 服务器（`mcp-server`）并在每个容器内提供第二个 MCP（`agent-box`），一个 MCP 兼容的 AI 代理可以端到端完成整个部署：

```
代理：创建一个名为 'insforge' 的容器
  → mcp__containarium__create_container(
      username="insforge", cpu="2", memory="4GB",
      disk="30GB", stack="docker")

代理：克隆 InsForge，填写 .env
  → ssh insforge agent-box
    → shell_exec("git clone https://github.com/InsForge/InsForge.git ~/insforge")
    → write_file("~/insforge/deploy/docker-compose/.env", "<内容>")

代理：启用自动启动
  → mcp__containarium__compose_enable(
      username="insforge",
      dir="/home/insforge/insforge/deploy/docker-compose")

代理：在公共主机名上暴露
  → mcp__containarium__expose_port(
      username="insforge",
      container_port=7130,
      domain="<your-subdomain>")
```

参见 Containarium 的 [`docs/MCP-INTEGRATION.md`](https://github.com/footprintai/Containarium/blob/main/docs/MCP-INTEGRATION.md) 获取平台 MCP 工具目录。

## [​](#多租户每主机多个-insforge-项目) 多租户：每主机多个 InsForge 项目

每个项目都有自己的 LXC 和自己的主机名；sentinel 通过 SNI 路由。没有端口冲突（每个容器有自己的网络命名空间），没有共享的 compose 项目名称。

```
containarium create insforge-acme  --stack docker --memory 4GB --cpu 2 ...
containarium create insforge-globex --stack docker --memory 4GB --cpu 2 ...

containarium expose-port insforge-acme   --container-port 7130 \
  --domain acme.<your-domain>
containarium expose-port insforge-globex --container-port 7130 \
  --domain globex.<your-domain>
```

每个项目获得隔离的 postgres / storage / deno 卷。

## [​](#管理) 管理

### [​](#查看日志) 查看日志

```
ssh insforge 'cd ~/insforge/deploy/docker-compose && docker compose logs -f'
```

或按服务：`docker compose logs -f insforge` / `postgres` / `deno`。

### [​](#更新-insforge) 更新 InsForge

```
ssh insforge <<'EOF'
  cd ~/insforge/deploy/docker-compose
  git -C ~/insforge pull origin main
  docker compose pull
  docker compose up -d
EOF
```

如果启用了 compose 自动启动，则无需重新启用单元——它跟踪的是目录，而不是特定的镜像标签。

### [​](#备份数据库) 备份数据库

```
ssh insforge 'cd ~/insforge/deploy/docker-compose && docker compose exec -T postgres \
  pg_dump -U postgres insforge' > backup_$(date +%Y%m%d_%H%M%S).sql
```

Containarium 还通过 ZFS 每天对整个容器进行快照（默认保留 30 天），作为 postgres 数据卷的时间点恢复后备方案。

### [​](#停止--重启) 停止 / 重启

```
containarium compose disable insforge   # 停止 compose 栈并禁用自动启动
containarium sleep insforge             # 停止整个容器
containarium wake insforge              # 启动容器；compose 通过自动启动恢复
```

## [​](#故障排除) 故障排除

### [​](#containarium-compose-enable-失败) `containarium compose enable` 失败

验证 Docker 在容器内是否正常工作：

```
ssh insforge 'docker ps'
```

如果你在创建时跳过了 `--stack docker`，请手动在容器内安装或使用标志重新创建。

### [​](#公共主机名无法解析) 公共主机名无法解析

`containarium expose-port` 在 sentinel 上配置 Caddy；你的子域名的 DNS A/CNAME 记录必须指向 sentinel 的公共 IP。检查：

```
dig +short <your-subdomain>
```

### [​](#主机名可解析但返回-502) 主机名可解析但返回 502

检查 InsForge 是否可以从容器内访问：

```
ssh insforge 'curl -s http://localhost:7130/api/health'
```

如果容器内检查正常，下一步检查 sentinel 和容器之间的桥接——参见 Containarium 的 [`docs/TUNNEL-REVERSE-PROXY.md`](https://github.com/footprintai/Containarium/blob/main/docs/TUNNEL-REVERSE-PROXY.md)。

### [​](#docker-compose-up-后内存不足) `docker compose up` 后内存不足

InsForge 的四个服务在空闲时需要约 3 GB 内存。如果你将容器大小设为 2 GB，请调整大小：

```
containarium resize insforge --memory 4GB
containarium sleep insforge && containarium wake insforge
```

## [​](#限制) 限制

* **AUTH_PORT (7131) 和 DENO_PORT (7133)** 不会通过上述步骤暴露到外部。如果你的应用从容器外部调用独立的认证端点或直接的 Deno 函数 URL，请使用单独的子域名添加额外的 `expose-port` 调用。
* **`containarium compose enable` 需要 Containarium v0.18 或更高版本**（compose 自动启动功能）。在较早版本上，手动运行 `docker compose up -d` 并手动添加 `@reboot` cron 条目。
* **GPU 直通**：Containarium 支持，但 InsForge 的标准边缘函数不使用 GPU。除非你的自定义 Deno 函数需要，否则保持关闭。

## [​](#安全说明) 安全说明

* 容器的用户在主机上是非特权用户（LXC 非特权模式）；容器 root ≠ 主机 root。
* Sentinel 前端支持管理端点的源 IP 允许列表——参见 Containarium 的[安全运行手册](https://github.com/footprintai/Containarium/blob/main/docs/security/OPERATOR-SECURITY-RUNBOOK.md)。
* 对于生产环境，选择 Containarium 的 KMS 信封加密（Vault Transit 或 GCP KMS）来加密存储在 Containarium 密钥存储中的任何 InsForge 密钥。
* 使用 `containarium token generate --scopes containers:read,containers:write ...` 为 AI 代理创建最小权限令牌，而不是分发管理员令牌。

## [​](#资源) 资源

* **Containarium**：<https://github.com/footprintai/containarium>
* **Containarium 文档**：<https://github.com/footprintai/Containarium/tree/main/docs>
* **InsForge 文档**：<https://docs.insforge.dev>
* **InsForge Discord**：<https://discord.com/invite/MPxwj5xVvW>

---

如需其他部署策略，请查看[部署指南](/deployment/deployment-security-guide)。

[部署到 Azure 虚拟机](/deployment/deploy-to-azure-virtual-machines)[将 InsForge 部署到 Google Cloud Compute Engine](/deployment/deploy-to-google-cloud-compute-engine)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)