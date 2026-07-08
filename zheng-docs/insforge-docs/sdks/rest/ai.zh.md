## On this page

* [概述](#overview)
* [直接 OpenRouter REST](#direct-openrouter-rest)
  + [请求头](#headers)
  + [聊天补全](#chat-completion)
  + [流式传输](#streaming)
  + [嵌入](#embeddings)
  + [模型](#models)
* [InsForge 管理助手端点](#insforge-admin-helper-endpoints)
  + [获取可用模型](#get-available-models)
  + [获取活跃的 OpenRouter 密钥](#get-active-openrouter-key)
  + [获取使用概览](#get-usage-overview)
* [已弃用的 InsForge 代理路由](#deprecated-insforge-proxy-routes)
  + [遗留聊天代理](#legacy-chat-proxy)
  + [遗留图像代理](#legacy-image-proxy)
  + [遗留嵌入代理](#legacy-embeddings-proxy)

REST API

# AI REST 参考

Copy page

直接 OpenRouter HTTP 集成和 InsForge 模型网关助手端点

Copy page

## [​](#overview) 概述

新的 AI 集成应使用 InsForge 提供的 OpenRouter 密钥直接调用 OpenRouter。用于聊天、图像生成和嵌入的 InsForge AI 代理路由是已弃用的兼容性端点。
使用仪表板将活跃的 OpenRouter 密钥复制到仅服务端的 `OPENROUTER_API_KEY` 环境变量中。

## [​](#direct-openrouter-rest) 直接 OpenRouter REST

### [​](#headers) 请求头

```
Authorization: Bearer $OPENROUTER_API_KEY
Content-Type: application/json
```

### [​](#chat-completion) 聊天补全

```
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      { "role": "user", "content": "法国的首都是什么？" }
    ]
  }'
```

### [​](#streaming) 流式传输

```
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-3.5-haiku",
    "stream": true,
    "messages": [
      { "role": "user", "content": "写一个简短的产品更新。" }
    ]
  }'
```

### [​](#embeddings) 嵌入

```
curl -X POST https://openrouter.ai/api/v1/embeddings \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/text-embedding-3-small",
    "input": "Hello world"
  }'
```

### [​](#models) 模型

```
curl "https://openrouter.ai/api/v1/models?output_modalities=all"
```

OpenRouter 拥有 AI 模型调用的当前请求和响应格式。请查看 OpenRouter 的 API 文档以了解模型特定参数、支持的模式、插件和视频生成端点。

## [​](#insforge-admin-helper-endpoints) InsForge 管理助手端点

这些端点帮助仪表板显示活跃的模型网关密钥、模型目录和使用概览。它们需要管理员认证。
在 `Authorization` 请求头中使用管理员 JWT bearer 令牌或 InsForge API 密钥 bearer 令牌。

### [​](#get-available-models) 获取可用模型

```
GET /api/ai/models
```

```
curl "https://your-app.insforge.app/api/ai/models" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

```
curl "https://your-app.insforge.app/api/ai/models" \
  -H "Authorization: Bearer <INSFORGE_API_KEY>"
```

`GET /api/ai/models` 现在返回一个扁平化的模型对象数组。较旧的 AI 代理文档描述了分类对象，如 `{ "text": [...], "image": [...] }`；请更新读取类别属性的现有调用者，改为按 `inputModality` 或 `outputModality` 过滤。

返回归一化的 OpenRouter 模型目录作为数组：

```
[
  {
    "id": "openai/gpt-4o",
    "modelId": "openai/gpt-4o",
    "provider": "openrouter",
    "inputModality": ["text", "image"],
    "outputModality": ["text"],
    "inputPrice": 2.5,
    "outputPrice": 10,
    "inputPriceLabel": "$2.50 / 1M tokens",
    "outputPriceLabel": "$10.00 / 1M tokens"
  }
]
```

### [​](#get-active-openrouter-key) 获取活跃的 OpenRouter 密钥

```
GET /api/ai/openrouter/api-key
```

```
curl "https://your-app.insforge.app/api/ai/openrouter/api-key" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

```
curl "https://your-app.insforge.app/api/ai/openrouter/api-key" \
  -H "Authorization: Bearer <INSFORGE_API_KEY>"
```

```
{
  "apiKey": "sk-or-...",
  "maskedKey": "sk-or-abcd••••••••1234"
}
```

`apiKey` 是原始密钥。不要记录它、提交它、存储在浏览器存储中或从公共端点返回它。只有 `maskedKey` 在客户端 UI 中显示是安全的。

### [​](#get-usage-overview) 获取使用概览

```
GET /api/ai/overview
```

```
curl "https://your-app.insforge.app/api/ai/overview" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

```
curl "https://your-app.insforge.app/api/ai/overview" \
  -H "Authorization: Bearer <INSFORGE_API_KEY>"
```

当活跃密钥具有活动访问权限时，返回密钥级别的 OpenRouter 使用和活动时间序列。

## [​](#deprecated-insforge-proxy-routes) 已弃用的 InsForge 代理路由

以下路由仍然存在于现有应用程序中，但新代码应直接使用 OpenRouter。

| 方法 | 端点 | 替代方案 |
| --- | --- | --- |
| POST | `/api/ai/chat/completion` | `POST https://openrouter.ai/api/v1/chat/completions` |
| POST | `/api/ai/image/generation` | 具有图像输出的 OpenRouter 聊天补全或 OpenRouter 图像能力模型文档 |
| POST | `/api/ai/embeddings` | `POST https://openrouter.ai/api/v1/embeddings` |

### [​](#legacy-chat-proxy) 遗留聊天代理

```
POST /api/ai/chat/completion
```

此路由验证 InsForge 格式的请求，将其转发到 OpenRouter，并返回 InsForge 格式的响应。它不暴露完整的 OpenRouter API 表面。

### [​](#legacy-image-proxy) 遗留图像代理

```
POST /api/ai/image/generation
```

此路由将 InsForge 格式的图像请求转发到具有图像输出的 OpenRouter 聊天补全。仅为兼容性保留。

### [​](#legacy-embeddings-proxy) 遗留嵌入代理

```
POST /api/ai/embeddings
```

此路由将 InsForge 格式的嵌入请求转发到 OpenRouter。新代码优先使用直接的 OpenRouter 嵌入端点。

[函数 API 参考](/sdks/rest/functions)[Realtime API 参考](/sdks/rest/realtime)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)