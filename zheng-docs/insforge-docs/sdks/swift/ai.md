## On this page

* [Overview](#overview)
* [Recommended Architecture](#recommended-architecture)
* [Server-Side OpenRouter Call](#server-side-openrouter-call)
* [Calling Your Backend from Swift](#calling-your-backend-from-swift)
* [Legacy InsForge AI Methods](#legacy-insforge-ai-methods)

Swift

# Model Gateway

Copy page

Build AI features from Swift with the OpenRouter key provisioned by InsForge

Copy page

## [​](#overview) Overview

InsForge provisions an OpenRouter API key for Model Gateway projects. New Swift applications should call OpenRouter directly from trusted server-side code, a backend API, or another secure boundary. Do not embed the OpenRouter key in an iOS, macOS, tvOS, or watchOS app binary.
The previous InsForge Swift AI SDK methods are deprecated compatibility wrappers. Use the InsForge SDK for database, auth, storage, functions, and realtime; use OpenRouter for model calls.

## [​](#recommended-architecture) Recommended Architecture

## [​](#server-side-openrouter-call) Server-Side OpenRouter Call

Use the OpenAI SDK or REST from your backend. For TypeScript backends:

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

## [​](#calling-your-backend-from-swift) Calling Your Backend from Swift

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

Use an app session token or another user-scoped credential for your backend route. Never send the OpenRouter key from a Swift client.

## [​](#legacy-insforge-ai-methods) Legacy InsForge AI Methods

These Swift SDK methods are deprecated for new AI integrations:

* `insforge.ai.chatCompletion(...)`
* `insforge.ai.generateEmbeddings(...)`
* `insforge.ai.generateImage(...)`
* `insforge.ai.listModels()`

They target the deprecated InsForge AI proxy. New integrations should use the OpenRouter key from the dashboard and follow OpenRouter’s current API docs for model parameters and capabilities.

[Functions SDK Reference](/sdks/swift/functions)[Realtime SDK Reference](/sdks/swift/realtime)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)