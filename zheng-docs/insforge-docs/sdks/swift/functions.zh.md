## On this page

* [安装](#installation)
  + [启用日志记录（可选）](#enable-logging-optional)
* [invoke()](#invoke)
  + [参数](#parameters)
  + [重载](#overloads)
* [示例](#examples)
  + [示例：带类型响应的基本调用](#example-basic-invocation-with-typed-response)
  + [示例：带 Encodable 请求体](#example-with-encodable-request-body)
* [错误处理](#error-handling)

Swift

# Functions SDK 参考

Copy page

使用 InsForge Swift SDK 调用 serverless 函数

Copy page

## [​](#installation) 安装

将 InsForge 添加到您的 Swift Package Manager 依赖中：

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

### [​](#enable-logging-optional) 启用日志记录（可选）

为了调试，您可以配置 SDK 日志级别和输出目标：

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

**日志级别：**

| 级别 | 描述 |
| --- | --- |
| `.trace` | 最详细，包含所有内部细节 |
| `.debug` | 用于调试的详细信息 |
| `.info` | 一般操作信息（默认） |
| `.warning` | 不影响操作的警告 |
| `.error` | 影响功能的错误 |
| `.critical` | 严重故障 |

**日志输出目标：**

| 目标 | 描述 |
| --- | --- |
| `.console` | 标准输出（print） |
| `.osLog` | Apple 统一日志系统（推荐用于 iOS/macOS） |
| `.none` | 禁用日志记录 |
| `.custom` | 提供您自己的 LogHandler 工厂 |

在生产环境中使用 `.info` 或 `.error`，以避免在日志中暴露敏感数据。

目前，InsForge 仅支持在 Deno 环境中运行的 JavaScript/TypeScript 函数。

---

## [​](#invoke) invoke()

通过 slug 调用 serverless 函数。

### [​](#parameters) 参数

* `slug` (String) - 函数 slug/名称
* `body` ([String: Any], 可选) - 作为字典的请求体

### [​](#overloads) 重载

`invoke` 方法有三种重载形式：

1. **带字典请求体，返回类型化响应**

   ```
   func invoke<T: Decodable>(_ slug: String, body: [String: Any]?) async throws -> T
   ```
2. **带 Encodable 请求体，返回类型化响应**

   ```
   func invoke<I: Encodable, O: Decodable>(_ slug: String, body: I) async throws -> O
   ```
3. **不期望响应体**

   ```
   func invoke(_ slug: String, body: [String: Any]?) async throws
   ```

SDK 自动包含来自已登录用户的认证令牌。

---

## [​](#examples) 示例

### [​](#example-basic-invocation-with-typed-response) 示例：带类型响应的基本调用

```
// 定义响应模型
struct HelloResponse: Codable {
    let message: String
    let timestamp: String
}

// 使用字典请求体调用函数
let response: HelloResponse = try await insforge.functions.invoke(
    "hello-world",
    body: ["name": "World", "greeting": "Hello"]
)

print(response.message)  // "Hello, World!"
```

### [​](#example-with-encodable-request-body) 示例：带 Encodable 请求体

```
// 定义请求和响应模型
struct GreetingRequest: Codable {
    let name: String
    let greeting: String
}

struct GreetingResponse: Codable {
    let message: String
    let timestamp: String
}

// 使用类型化请求调用
let request = GreetingRequest(name: "World", greeting: "Hello")
let response: GreetingResponse = try await insforge.functions.invoke(
    "hello-world",
    body: request
)

print(response.message)
```

---

## [​](#error-handling) 错误处理

```
do {
    let response: MyResponse = try await insforge.functions.invoke(
        "my-function",
        body: ["key": "value"]
    )
    print("成功：\(response)")
} catch let error as InsForgeError {
    switch error {
    case .httpError(let statusCode, let message):
        print("HTTP 错误 \(statusCode)：\(message)")
    case .decodingError(let error):
        print("解码响应失败：\(error)")
    case .networkError(let error):
        print("网络错误：\(error)")
    default:
        print("错误：\(error)")
    }
} catch {
    print("意外错误：\(error)")
}
```

[存储 SDK 参考](/sdks/swift/storage)[模型网关](/sdks/swift/ai)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)