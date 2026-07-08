## 本页内容

* [功能特性](#features)
  + [HTTP 触发器](#http-triggers)
  + [定时任务](#schedules)
  + [数据库触发器](#database-triggers)
  + [密钥和环境变量](#secrets-and-environment-variables)
  + [日志](#logs)
  + [Deno 标准库](#deno-standard-library)
* [概念](#concepts)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

边缘函数

# 边缘函数

复制页面

基于 Deno 的无服务器 TypeScript，内置一流的定时任务支持。

复制页面

使用 InsForge 边缘函数在 [Deno](https://deno.com) 上运行 TypeScript，部署在靠近用户的位置以获得低延迟。函数可以按需从任何客户端调用，通过数据库触发器串联，或按 cron 表达式定时执行。运行时内置了标准的 fetch、流式响应和 ESM 导入。

**需要保持运行的处理进程？** 使用 [Compute](/core-concepts/compute/overview) 处理队列工作者、AI 推理循环和任何有状态的工作。Edge Functions 适用于请求/响应和短期任务。

## [​](#features) 功能特性

### [​](#http-triggers) HTTP 触发器

每个函数都可以通过 `https://<project>.insforge.dev/functions/<name>` 访问。标准 fetch 输入，标准 `Response` 输出。流式传输、JSON、重定向和 WebSocket 均可使用。

### [​](#schedules) 定时任务

为函数附加 cron 表达式，InsForge 会按时调用它，失败时自动重试。参见[定时任务](/core-concepts/functions/schedules)了解 cron 语法和执行模型。

### [​](#database-triggers) 数据库触发器

将函数配置为在表的 `INSERT`、`UPDATE` 或 `DELETE` 操作时触发。函数接收行负载，并使用服务角色 JWT 运行，因此可以执行特权后续写入操作。

### [​](#secrets-and-environment-variables) 密钥和环境变量

为每个函数设置环境变量和密钥。仪表盘、CLI 和 MCP 都读写同一存储；密钥永远不会通过你的仓库往返传输。

### [​](#logs) 日志

每次调用都会捕获结构化日志，可按状态、持续时间和函数名称查询。InsForge MCP 的 `get-function-logs` 工具让你的代理无需离开编辑器即可诊断故障。

### [​](#deno-standard-library) Deno 标准库

使用 [Deno 标准库](https://jsr.io/@std) 以及来自 `jsr.io`、`esm.sh` 或 `npm:` 说明符的任何 ESM 模块。无需运行打包工具，也没有 `node_modules` 目录需要部署。

## [​](#concepts) 概念

## 定时任务

按 cron 表达式运行函数，而不是响应请求。

## [​](#build-with-it) 构建应用

## TypeScript SDK

从 Node、浏览器和边缘运行时调用和流式传输函数。

## Swift SDK

从 iOS 和 macOS 应用调用函数。

## Kotlin SDK

从 Android 和 JVM 应用调用函数。

## REST API

纯 HTTP 函数端点，可从任何语言调用。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 以关联你的项目（推荐方式）。
* 浏览 [TypeScript SDK 参考](/sdks/typescript/functions) 了解调用模式。

[概览](/core-concepts/realtime/overview)[定时任务：cron 触发的函数](/core-concepts/functions/schedules)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)