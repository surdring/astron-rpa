## 本页内容

* [功能特性](#features)
  + [容器部署](#container-deploys)
  + [项目关联凭据](#project-linked-credentials)
  + [自动扩缩](#scaling)
  + [日志](#logs)
  + [密钥和环境变量](#secrets-and-env-vars)
* [后续步骤](#next-steps)

自定义计算

# 自定义计算

复制页面

在 InsForge 项目旁运行长期运行的容器。

复制页面

使用 InsForge Custom Compute 在项目旁运行长期运行的容器：队列工作者、后台处理器、AI 推理循环、WebSocket 服务器、爬虫——任何需要保持运行的程序。容器使用与函数相同的凭据连接到项目的数据库、存储和认证。

**只需要处理请求？** 使用 [Edge Functions](/core-concepts/functions/overview) 处理请求/响应工作和短期任务。Custom Compute 适用于需要持续运行的处理过程。

## [​](#features) 功能特性

### [​](#container-deploys) 容器部署

将任何 Docker 镜像推送到 InsForge 即可运行。使用仓库中的 `Dockerfile` 或指向注册表上的预构建镜像。无需学习专有的构建管道。

### [​](#project-linked-credentials) 项目关联凭据

容器会以环境变量的形式接收 InsForge 项目 URL、服务角色 JWT 和 S3 存储凭据。无需额外配置即可连接到 Postgres、调用 SDK 和读取对象。

### [​](#autoscaling) 自动扩缩

为单例工作者运行一个实例，或为无状态工作负载进行水平扩展。每个服务可配置内存、CPU 和副本数量。

### [​](#logs) 日志

每个容器都有结构化日志，可按服务和时间范围查询。在仪表盘、CLI 或 MCP 中实时查看，无需使用 `kubectl exec` 进入任何容器。

### [​](#secrets-and-env-vars) 密钥和环境变量

为每个服务单独设置环境变量和密钥，与边缘函数的密钥分开管理。无需重新部署即可轮换。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 以关联你的项目（推荐方式）。
* 如果只需要请求/响应处理，请查看 [Edge Functions](/core-concepts/functions/overview)。

[Razorpay](/core-concepts/payments/razorpay)[概览](/core-concepts/analytics/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)