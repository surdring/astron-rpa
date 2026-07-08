## On this page

* [Features](#features)
  + [CLI deploys](#cli-deploys)
  + [Framework builds](#framework-builds)
  + [Environment variables](#environment-variables)
  + [Deployment history](#deployment-history)
  + [Domains](#domains)
* [Deploy with it](#deploy-with-it)
* [Next steps](#next-steps)

Sites

# Sites

Copy page

Deploy frontend apps from your project, powered by Vercel.

Copy page

Use InsForge Sites to ship the browser-facing app that belongs to your project. The InsForge CLI uploads your frontend source through InsForge, which creates a Vercel production deployment. The dashboard tracks the URL, status, deployment history, environment variables, and domains.

![InsForge Sites dashboard](https://mintcdn.com/insforge-468ccf39/uZFI4LSGbN5nfj9W/images/dashboard-sites.png?fit=max&auto=format&n=uZFI4LSGbN5nfj9W&q=85&s=672701076995a8f902771bbbc674936e)

**Need to deploy a container or backend service?** Use [Compute](/core-concepts/compute/overview) for workers, queues, WebSocket servers, and long-running services. Sites are for frontend websites and framework builds that produce a hosted web app.

## [​](#features) Features

### [​](#cli-deploys) CLI deploys

Deploy from your app’s source directory. The CLI uploads the source tree, skips local-only files such as `node_modules`, `.git`, build output, and `.env` files, then starts the Vercel build through InsForge.

```
npx @insforge/cli deployments deploy ./frontend
```

### [​](#framework-builds) Framework builds

Deploy React, Vue, Svelte, Next.js, static sites, and other frontend projects. InsForge sends the source files to Vercel, where framework detection and project files such as `package.json` and `vercel.json` decide how the app builds.

### [​](#environment-variables) Environment variables

Manage provider environment variables from the dashboard. Use public prefixes such as `VITE_` or `NEXT_PUBLIC_` only for values that are safe to expose in browser code.

```
npx @insforge/cli deployments env list
npx @insforge/cli deployments env set VITE_INSFORGE_URL https://your-project.region.insforge.app
npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY ik_xxx
```

### [​](#deployment-history) Deployment history

Review previous runs, sync Vercel status, inspect metadata, and cancel in-progress deployments from the Deployment Logs page.

```
npx @insforge/cli deployments list
npx @insforge/cli deployments status deployment_123 --sync
npx @insforge/cli deployments cancel deployment_123
```

### [​](#domains) Domains

Every ready deployment gets a default URL at `https://<appkey>.insforge.site`. You can also set an InsForge-managed slug at `https://<slug>.insforge.site`. For a custom domain, add the domain in the dashboard and configure the DNS record it returns, usually a CNAME for subdomains.

## [​](#deploy-with-it) Deploy with it

## CLI quickstart

Connect your project and run InsForge CLI commands from your app directory.

## [​](#next-steps) Next steps

* Set up the [CLI](/quickstart) and connect your project.
* Add browser-safe environment variables from the dashboard or with `npx @insforge/cli deployments env set`.
* Run `npx @insforge/cli deployments deploy ./frontend`.

[Overview](/core-concepts/ai/overview)[Overview](/core-concepts/messaging/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)