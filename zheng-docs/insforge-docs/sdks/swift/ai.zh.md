## On this page

* [概述](#overview)
* [推荐架构](#recommended-architecture)
* [服务端 OpenRouter 调用](#server-side-openrouter-call)
* [从 Swift 调用您的后端](#calling-your-backend-from-swift)
* [遗留的 InsForge AI 方法](#legacy-insforge-ai-methods)

Swift

# 模型网关

Copy page

使用 InsForge 提供的 OpenRouter 密钥从 Swift 构建 AI 功能

Copy page

## [​](#overview) 概述

InsForge 为模型网关项目提供 OpenRouter API 密钥。新的 Swift 应用程序应从可信的服务端代码、后端 API 或其他安全边界直接调用 OpenRouter。不要将 OpenRouter 密钥嵌入 iOS、macOS、tvOS 或 watchOS 应用二进制文件中。
之前的 InsForge Swift AI SDK 方法已被弃用，仅作为兼容性包装器保留。对于数据库、认证、存储、函数和实时功能，请使用 InsForge SDK；对于模型调用，请使用 OpenRouter。

## [​](#recommended-architecture) 推荐架构

## [​](#server-side-openrouter-call) 服务端 OpenRouter 调用

从您的后端使用 OpenAI SDK 或 REST。对于 TypeScript 后端：

```
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-4o-mini',
  messages: [{ role: 'user', content: 'Summarize this note.' }],
});
```

## [​](#calling-your-backend-from-swift) 从 Swift 调用您的后端

```
struct ChatRequest: Encodable {
    let prompt: String
}

struct ChatResponse: Decodable {
    let text: String
}

func sendPrompt(_ prompt: String, sessionToken: String) async throws -> ChatResponse {
    let url = URL(string: "https://your-app.example/api/chat")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("Bearer \(sessionToken)", forHTTPHeaderField: "Authorization")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.httpBody = try JSONEncoder().encode(ChatRequest(prompt: prompt))

    let (data, response) = try await URLSession.shared.data(for: request)
    guard let httpResponse = response as? HTTPURLResponse,
          (200..<300).contains(httpResponse.statusCode) else {
        throw URLError(.badServerResponse)
    }

    return try JSONDecoder().decode(ChatResponse.self, from: data)
}
```

为您的后端路由使用应用会话令牌或其他用户范围的凭据。切勿从 Swift 客户端发送 OpenRouter 密钥。

## [​](#legacy-insforge-ai-methods) 遗留的 InsForge AI 方法

以下 Swift SDK 方法已弃用，不适用于新的 AI 集成：

* `insforge.ai.chatCompletion(...)`
* `insforge.ai.generateEmbeddings(...)`
* `insforge.ai.generateImage(...)`
* `insforge.ai.listModels()`

它们针对已弃用的 InsForge AI 代理。新的集成应使用仪表板中的 OpenRouter 密钥，并遵循 OpenRouter 当前的 API 文档以了解模型参数和功能。

[Functions SDK 参考](/sdks/swift/functions)[Realtime SDK 参考](/sdks/swift/realtime)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)