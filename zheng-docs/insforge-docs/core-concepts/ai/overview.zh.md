## 本页内容

* [功能特性](#features)
  + [兼容 OpenAI 的 API](#openai-compatible-api)
  + [流式传输](#streaming)
  + [嵌入向量](#embeddings)
  + [按项目配额](#per-project-quotas)
  + [用量追踪](#usage-tracking)
  + [多提供商路由](#multi-provider-routing)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

模型网关

# 模型网关

复制页面

通过一个 InsForge 管理的密钥调用任何 LLM，并支持按项目配额。

复制页面

使用模型网关通过一个兼容 OpenAI 的端点调用聊天、流式传输和嵌入模型。InsForge 持有提供商密钥，按项目追踪用量，并通过 [OpenRouter](https://openrouter.ai) 路由流量，因此你的应用程序代码永远不会直接接触 Anthropic、OpenAI 或 Mistral 的凭据。

![InsForge 仪表盘模型网关概览，展示代码示例、提供商标签和使用量图表](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/model-gateway-overview.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=eba0075846de06562716138e1054c901)

**想运行 AI 代码而不是调用模型？** 使用 [Edge Functions](/core-concepts/functions/overview) 来编排提示词、检索和工具。模型网关是调用；函数是围绕它的程序。

## [​](#features) 功能特性

### [​](#openai-compatible-api) 兼容 OpenAI 的 API

将任何 OpenAI SDK 或兼容 `openai` 的库指向 `https://<project>.insforge.dev/v1` 即可使用。`/v1/chat/completions`、`/v1/embeddings` 和 `/v1/models` 的行为与上游规范一致。

### [​](#streaming) 流式传输

聊天补全的服务器发送事件。使用流式端点的方式与使用 OpenAI 相同；网关会在 token 从提供商到达时将其转发。

### [​](#embeddings) 嵌入向量

从 OpenRouter 支持的任何嵌入模型生成稠密向量。将结果存储在使用 [pgvector](/core-concepts/database/pgvector) 的 Postgres 中，用于语义搜索。

### [​](#per-project-quotas) 按项目配额

每个项目都有独立的速率限制和消费上限。达到上限后，网关会返回清晰的 429 状态码，而不是将提供商的配额状态泄露到你的应用中。

### [​](#usage-tracking) 用量追踪

每个请求都会记录模型、token 数量和成本。通过仪表盘、CLI 或 MCP 查询用量——账单会自动与 OpenRouter 的发票对账。

### [​](#multi-provider-routing) 多提供商路由

通过更改请求中的模型名称，即可在 Anthropic、OpenAI、Mistral、Llama、Gemini 及数十个其他模型之间切换。应用程序代码无需更改。

## [​](#build-with-it) 构建应用

## TypeScript SDK

在 Node、浏览器和边缘运行时中进行聊天、流式传输和嵌入。

## Swift SDK

适用于 iOS 和 macOS 的原生 Swift AI 客户端。

## Kotlin SDK

适用于 Android 和 JVM 的协程优先 AI 客户端。

## REST API

纯 HTTP AI 端点，可从任何语言调用。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 以关联你的项目（推荐方式）。
* 浏览 [TypeScript SDK 参考](/sdks/typescript/ai) 了解聊天和嵌入模式。

[定时任务：cron 触发的函数](/core-concepts/functions/schedules)[概览](/core-concepts/sites/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)