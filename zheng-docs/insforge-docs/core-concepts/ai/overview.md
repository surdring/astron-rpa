## On this page

* [Features](#features)
  + [OpenAI-compatible API](#openai-compatible-api)
  + [Streaming](#streaming)
  + [Embeddings](#embeddings)
  + [Per-project quotas](#per-project-quotas)
  + [Usage tracking](#usage-tracking)
  + [Multi-provider routing](#multi-provider-routing)
* [Build with it](#build-with-it)
* [Next steps](#next-steps)

Model Gateway

# Model Gateway

Copy page

Call any LLM through one InsForge-managed key, with per-project quotas.

Copy page

Use the Model Gateway to call chat, streaming, and embedding models through one OpenAI-compatible endpoint. InsForge holds the provider keys, tracks usage per project, and routes traffic through [OpenRouter](https://openrouter.ai), so your application code never sees Anthropic, OpenAI, or Mistral credentials directly.

![InsForge dashboard Model Gateway overview showing code samples, provider chips, and usage charts](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/model-gateway-overview.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=eba0075846de06562716138e1054c901)

**Want to run AI code, not call a model?** Use [Edge Functions](/core-concepts/functions/overview) to orchestrate prompts, retrieval, and tools. The Model Gateway is the call; functions are the program around it.

## [​](#features) Features

### [​](#openai-compatible-api) OpenAI-compatible API

Point any OpenAI SDK or `openai`-compatible library at `https://<project>.insforge.dev/v1` and it works. `/v1/chat/completions`, `/v1/embeddings`, and `/v1/models` all behave like the upstream spec.

### [​](#streaming) Streaming

Server-sent events for chat completions. Use the streaming endpoint the same way you would with OpenAI; the gateway forwards tokens as they arrive from the provider.

### [​](#embeddings) Embeddings

Generate dense vectors from any embedding model OpenRouter supports. Store the result in Postgres with [pgvector](/core-concepts/database/pgvector) for semantic search.

### [​](#per-project-quotas) Per-project quotas

Each project carries its own rate limit and spend cap. Hit it, and the gateway returns a clean 429 instead of leaking provider quota state into your app.

### [​](#usage-tracking) Usage tracking

Every request is logged with model, token count, and cost. Query usage from the dashboard, CLI, or MCP — billing reconciles to OpenRouter’s invoice automatically.

### [​](#multi-provider-routing) Multi-provider routing

Switch between Anthropic, OpenAI, Mistral, Llama, Gemini, and dozens more by changing the model name in the request. Application code does not change.

## [​](#build-with-it) Build with it

## TypeScript SDK

Chat, stream, and embed from Node, browser, and edge runtimes.

## Swift SDK

Native Swift AI client for iOS and macOS.

## Kotlin SDK

Coroutines-first AI client for Android and JVM.

## REST API

Plain HTTP AI endpoints, callable from any language.

## [​](#next-steps) Next steps

* Set up the [CLI](/quickstart) to link your project (the recommended path).
* Browse the [TypeScript SDK reference](/sdks/typescript/ai) for chat and embedding patterns.

[Schedules: cron-triggered functions](/core-concepts/functions/schedules)[Overview](/core-concepts/sites/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)