## On this page

* [Overview](#overview)
* [Direct OpenRouter REST](#direct-openrouter-rest)
  + [Headers](#headers)
  + [Chat Completion](#chat-completion)
  + [Streaming](#streaming)
  + [Embeddings](#embeddings)
  + [Models](#models)
* [InsForge Admin Helper Endpoints](#insforge-admin-helper-endpoints)
  + [Get Available Models](#get-available-models)
  + [Get Active OpenRouter Key](#get-active-openrouter-key)
  + [Get Usage Overview](#get-usage-overview)
* [Deprecated InsForge Proxy Routes](#deprecated-insforge-proxy-routes)
  + [Legacy Chat Proxy](#legacy-chat-proxy)
  + [Legacy Image Proxy](#legacy-image-proxy)
  + [Legacy Embeddings Proxy](#legacy-embeddings-proxy)

REST API

# AI REST Reference

Copy page

Direct OpenRouter HTTP integration and InsForge Model Gateway helper endpoints

Copy page

## [​](#overview) Overview

New AI integrations should call OpenRouter directly with the OpenRouter key provisioned by InsForge. The InsForge AI proxy routes for chat, image generation, and embeddings are deprecated compatibility endpoints.
Use the dashboard to copy the active OpenRouter key into a server-only `OPENROUTER_API_KEY` environment variable.

## [​](#direct-openrouter-rest) Direct OpenRouter REST

### [​](#headers) Headers

```
Authorization: Bearer $OPENROUTER_API_KEY
Content-Type: application/json
```

### [​](#chat-completion) Chat Completion

```
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o",
    "messages": [
      { "role": "user", "content": "What is the capital of France?" }
    ]
  }'
```

### [​](#streaming) Streaming

```
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-3.5-haiku",
    "stream": true,
    "messages": [
      { "role": "user", "content": "Write a short product update." }
    ]
  }'
```

### [​](#embeddings) Embeddings

```
curl -X POST https://openrouter.ai/api/v1/embeddings \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/text-embedding-3-small",
    "input": "Hello world"
  }'
```

### [​](#models) Models

```
curl "https://openrouter.ai/api/v1/models?output_modalities=all"
```

OpenRouter owns the current request and response shape for AI model calls. Check OpenRouter’s API docs for model-specific parameters, supported modalities, plugins, and video generation endpoints.

## [​](#insforge-admin-helper-endpoints) InsForge Admin Helper Endpoints

These endpoints help the dashboard display the active Model Gateway key, model catalog, and usage overview. They require admin authentication.
Use either an admin JWT bearer token or an InsForge API key bearer token in the `Authorization` header.

### [​](#get-available-models) Get Available Models

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

`GET /api/ai/models` now returns a flat array of model objects. Older AI proxy docs described a categorized object such as `{ "text": [...], "image": [...] }`; update existing callers that read category properties to filter by `inputModality` or `outputModality` instead.

Returns the normalized OpenRouter model catalog as an array:

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

### [​](#get-active-openrouter-key) Get Active OpenRouter Key

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

`apiKey` is a raw secret. Do not log it, commit it, store it in browser storage, or return it from public endpoints. Only `maskedKey` is safe to display in client UI.

### [​](#get-usage-overview) Get Usage Overview

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

Returns key-level OpenRouter usage and activity time series when the active key has activity access.

## [​](#deprecated-insforge-proxy-routes) Deprecated InsForge Proxy Routes

The following routes still exist for existing applications, but new code should use OpenRouter directly.

| Method | Endpoint | Replacement |
| --- | --- | --- |
| POST | `/api/ai/chat/completion` | `POST https://openrouter.ai/api/v1/chat/completions` |
| POST | `/api/ai/image/generation` | OpenRouter chat completions with image output or OpenRouter image-capable model docs |
| POST | `/api/ai/embeddings` | `POST https://openrouter.ai/api/v1/embeddings` |

### [​](#legacy-chat-proxy) Legacy Chat Proxy

```
POST /api/ai/chat/completion
```

This route validates an InsForge-shaped request, forwards it to OpenRouter, and returns an InsForge-shaped response. It does not expose the complete OpenRouter API surface.

### [​](#legacy-image-proxy) Legacy Image Proxy

```
POST /api/ai/image/generation
```

This route forwards an InsForge-shaped image request to OpenRouter chat completions with image output. It is retained for compatibility only.

### [​](#legacy-embeddings-proxy) Legacy Embeddings Proxy

```
POST /api/ai/embeddings
```

This route forwards an InsForge-shaped embeddings request to OpenRouter. Prefer the direct OpenRouter embeddings endpoint for new code.

[Functions API Reference](/sdks/rest/functions)[Realtime API Reference](/sdks/rest/realtime)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)