## 本页内容

* [功能特性](#features)
  + [CLI 部署](#cli-deploys)
  + [框架构建](#framework-builds)
  + [环境变量](#environment-variables)
  + [部署历史](#deployment-history)
  + [域名](#domains)
* [使用部署](#deploy-with-it)
* [后续步骤](#next-steps)

站点

# 站点

复制页面

从你的项目部署前端应用，由 Vercel 驱动。

复制页面

使用 InsForge Sites 部署属于你项目的面向浏览器的应用。InsForge CLI 通过 InsForge 上传你的前端源码，后者会创建一个 Vercel 生产部署。仪表盘追踪 URL、状态、部署历史、环境变量和域名。

![InsForge 站点仪表盘](https://mintcdn.com/insforge-468ccf39/uZFI4LSGbN5nfj9W/images/dashboard-sites.png?fit=max&auto=format&n=uZFI4LSGbN5nfj9W&q=85&s=672701076995a8f902771bbbc674936e)

**需要部署容器或后端服务？** 使用 [Compute](/core-concepts/compute/overview) 处理工作者、队列、WebSocket 服务器和长期运行的服务。Sites 适用于前端网站和产生托管 Web 应用的框架构建。

## [​](#features) 功能特性

### [​](#cli-deploys) CLI 部署

从应用的源码目录进行部署。CLI 上传源码树，跳过仅本地的文件（如 `node_modules`、`.git`、构建输出和 `.env` 文件），然后通过 InsForge 启动 Vercel 构建。

```
npx @insforge/cli deployments deploy ./frontend
```

### [​](#framework-builds) 框架构建

部署 React、Vue、Svelte、Next.js、静态站点和其他前端项目。InsForge 将源文件发送到 Vercel，由框架检测和项目文件（如 `package.json` 和 `vercel.json`）决定应用的构建方式。

### [​](#environment-variables) 环境变量

从仪表盘管理提供商环境变量。仅对安全暴露在浏览器代码中的值使用公共前缀，如 `VITE_` 或 `NEXT_PUBLIC_`。

```
npx @insforge/cli deployments env list
npx @insforge/cli deployments env set VITE_INSFORGE_URL https://your-project.region.insforge.app
npx @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY ik_xxx
```

### [​](#deployment-history) 部署历史

从部署日志页面查看之前的运行、同步 Vercel 状态、检查元数据以及取消正在进行的部署。

```
npx @insforge/cli deployments list
npx @insforge/cli deployments status deployment_123 --sync
npx @insforge/cli deployments cancel deployment_123
```

### [​](#domains) 域名

每个就绪的部署都会在 `https://<appkey>.insforge.site` 获得一个默认 URL。你还可以在 `https://<slug>.insforge.site` 设置一个 InsForge 管理的别名。对于自定义域名，在仪表盘中添加域名并配置它返回的 DNS 记录，通常子域名使用 CNAME。

## [​](#deploy-with-it) 使用部署

## CLI 快速入门

关联你的项目并从应用目录运行 InsForge CLI 命令。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 并关联你的项目。
* 从仪表盘或使用 `npx @insforge/cli deployments env set` 添加浏览器安全的环境变量。
* 运行 `npx @insforge/cli deployments deploy ./frontend`。

[概览](/core-concepts/ai/overview)[概览](/core-concepts/messaging/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)