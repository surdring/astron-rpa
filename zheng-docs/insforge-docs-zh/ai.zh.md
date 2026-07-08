## 本页内容

* [概述](#概述)
* [推荐架构](#推荐架构)
* [服务端 OpenRouter 调用](#服务端-openrouter-调用)
* [从 Kotlin 调用您的后端](#从-kotlin-调用您的后端)
* [遗留 InsForge AI 方法](#遗留-insforge-ai-方法)

Kotlin

# 模型网关

复制页面

使用 InsForge 提供的 OpenRouter 密钥从 Kotlin 构建 AI 功能

复制页面

## [​](#概述) 概述

InsForge 为模型网关项目提供 OpenRouter API 密钥。新的 Kotlin 应用应从受信任的服务端代码、后端 API 或其他安全边界调用 OpenRouter。请勿将 OpenRouter 密钥嵌入 Android 或桌面客户端二进制文件中。
之前的 InsForge Kotlin AI SDK 方法已被弃用，作为兼容性封装器。对数据库、认证、存储、函数和实时功能使用 InsForge SDK；对模型调用使用 OpenRouter。

## [​](#推荐架构) 推荐架构

## [​](#服务端-openrouter-调用) 服务端 OpenRouter 调用

从您的后端使用 OpenAI SDK 或 REST。对于 TypeScript 后端：

```
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-4o-mini',
  messages: [{ role: 'user', content: '总结这条笔记。' }],
});
```

## [​](#从-kotlin-调用您的后端) 从 Kotlin 调用您的后端

```
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.header
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.Serializable

@Serializable
data class ChatRequest(val prompt: String)

@Serializable
data class ChatResponse(val text: String)

val http = HttpClient {
    install(ContentNegotiation) {
        json()
    }
}

suspend fun sendPrompt(prompt: String, sessionToken: String): ChatResponse {
    return http.post("https://your-app.example/api/chat") {
        header("Authorization", "Bearer $sessionToken")
        contentType(ContentType.Application.Json)
        setBody(ChatRequest(prompt))
    }.body()
}
```

为您的后端路由使用应用会话令牌或其他用户范围的凭据。切勿从 Kotlin 客户端发送 OpenRouter 密钥。

## [​](#遗留-insforge-ai-方法) 遗留 InsForge AI 方法

以下 Kotlin SDK 方法在新 AI 集成中已弃用：

* `client.ai.listModels()`
* `client.ai.chatCompletion(...)`
* `client.ai.chatCompletionStream(...)`
* `client.ai.generateEmbeddings(...)`
* `client.ai.generateImage(...)`

它们针对已弃用的 InsForge AI 代理。新集成应使用来自仪表板的 OpenRouter 密钥，并遵循 OpenRouter 当前的 API 文档了解模型参数和能力。

[Functions SDK Reference](/sdks/kotlin/functions)[Realtime SDK Reference](/sdks/kotlin/realtime)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)