## On this page

* [Installation](#installation)
  + [Enable Logging (Optional)](#enable-logging-optional)
* [invoke()](#invoke)
  + [Parameters](#parameters)
  + [Overloads](#overloads)
* [Examples](#examples)
  + [Example: Basic Invocation with Typed Response](#example-basic-invocation-with-typed-response)
  + [Example: With Encodable Request Body](#example-with-encodable-request-body)
* [Error Handling](#error-handling)

Swift

# Functions SDK Reference

Copy page

Invoke serverless functions with the InsForge Swift SDK

Copy page

## [​](#installation) Installation

Add InsForge to your Swift Package Manager dependencies:

```
dependencies: [
    .package(url: "https://github.com/insforge/insforge-swift.git", from: "0.0.9")
]
```

```
import InsForge

let insforge = InsForgeClient(
    baseURL: URL(string: "https://your-app.insforge.app")!,
    anonKey: "your-anon-key"
)
```

### [​](#enable-logging-optional) Enable Logging (Optional)

For debugging, you can configure the SDK log level and destination:

```
let options = InsForgeClientOptions(
    global: .init(
        logLevel: .debug,
        logDestination: .osLog,
        logSubsystem: "com.example.MyApp"
    )
)

let insforge = InsForgeClient(
    baseURL: URL(string: "https://your-app.insforge.app")!,
    anonKey: "your-anon-key",
    options: options
)
```

**Log Levels:**

| Level | Description |
| --- | --- |
| `.trace` | Most verbose, includes all internal details |
| `.debug` | Detailed information for debugging |
| `.info` | General operational information (default) |
| `.warning` | Warnings that don’t prevent operation |
| `.error` | Errors that affect functionality |
| `.critical` | Critical failures |

**Log Destinations:**

| Destination | Description |
| --- | --- |
| `.console` | Standard output (print) |
| `.osLog` | Apple’s unified logging system (recommended for iOS/macOS) |
| `.none` | Disable logging |
| `.custom` | Provide your own LogHandler factory |

Use `.info` or `.error` in production to avoid exposing sensitive data in logs.

Currently, InsForge only supports JavaScript/TypeScript functions running in a Deno environment.

---

## [​](#invoke) invoke()

Invoke a serverless function by slug.

### [​](#parameters) Parameters

* `slug` (String) - Function slug/name
* `body` ([String: Any], optional) - Request body as dictionary

### [​](#overloads) Overloads

The `invoke` method has three overloads:

1. **With dictionary body, returning typed response**

   ```
   func invoke<T: Decodable>(_ slug: String, body: [String: Any]?) async throws -> T
   ```
2. **With Encodable body, returning typed response**

   ```
   func invoke<I: Encodable, O: Decodable>(_ slug: String, body: I) async throws -> O
   ```
3. **Without expecting response body**

   ```
   func invoke(_ slug: String, body: [String: Any]?) async throws
   ```

SDK automatically includes authentication token from logged-in user.

---

## [​](#examples) Examples

### [​](#example-basic-invocation-with-typed-response) Example: Basic Invocation with Typed Response

```
// Define response model
struct HelloResponse: Codable {
    let message: String
    let timestamp: String
}

// Invoke function with dictionary body
let response: HelloResponse = try await insforge.functions.invoke(
    "hello-world",
    body: ["name": "World", "greeting": "Hello"]
)

print(response.message)  // "Hello, World!"
```

### [​](#example-with-encodable-request-body) Example: With Encodable Request Body

```
// Define request and response models
struct GreetingRequest: Codable {
    let name: String
    let greeting: String
}

struct GreetingResponse: Codable {
    let message: String
    let timestamp: String
}

// Invoke with typed request
let request = GreetingRequest(name: "World", greeting: "Hello")
let response: GreetingResponse = try await insforge.functions.invoke(
    "hello-world",
    body: request
)

print(response.message)
```

---

## [​](#error-handling) Error Handling

```
do {
    let response: MyResponse = try await insforge.functions.invoke(
        "my-function",
        body: ["key": "value"]
    )
    print("Success: \(response)")
} catch let error as InsForgeError {
    switch error {
    case .httpError(let statusCode, let message):
        print("HTTP Error \(statusCode): \(message)")
    case .decodingError(let error):
        print("Failed to decode response: \(error)")
    case .networkError(let error):
        print("Network error: \(error)")
    default:
        print("Error: \(error)")
    }
} catch {
    print("Unexpected error: \(error)")
}
```

[Storage SDK Reference](/sdks/swift/storage)[Model Gateway](/sdks/swift/ai)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)