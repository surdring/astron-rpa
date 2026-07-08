## On this page

* [安装](#installation)
  + [启用日志记录（可选）](#enable-logging-optional)
* [心智模型](#mental-model)
* [快速开始](#quick-start)
* [connect()](#connect)
* [subscribe()](#subscribe)
* [publish()](#publish)
* [unsubscribe()](#unsubscribe)
* [disconnect()](#disconnect)
* [频道 API](#channel-api)
  + [广播消息](#broadcast-messages)
* [在线状态](#presence)

Swift

# Realtime SDK 参考

Copy page

使用 InsForge Swift SDK 订阅频道、发布事件和跟踪在线状态

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

## [​](#mental-model) 心智模型

Swift SDK 通过 Socket.IO 连接到 InsForge Realtime。订阅频道名称，例如 `order:123` 或 `chat:room-1`，然后监听发布到这些频道的事件名称。
事件由数据库触发器（调用 `realtime.publish(...)`）或已加入频道的客户端发布。有关频道和 RLS 模型，请参阅 [Realtime 概述](/core-concepts/realtime/overview)。

## [​](#quick-start) 快速开始

```
try await insforge.realtime.connect()

await insforge.realtime.subscribe(to: "order:\(orderId)") { message in
    if message.eventName == "status_changed" {
        print("负载：\(String(describing: message.payload))")
    }
}
```

## [​](#connect) connect()

建立实时连接。

```
do {
    try await insforge.realtime.connect()
    print("已连接到实时服务")
} catch {
    print("连接失败：\(error)")
}
```

## [​](#subscribe) subscribe()

订阅一个频道并接收发布到该频道的消息。

```
await insforge.realtime.subscribe(to: "chat:room-1") { message in
    print("事件：\(message.eventName ?? "")")
    print("频道：\(message.channelName ?? "")")

    if let payload = message.payload {
        print("负载：\(payload)")
    }
}
```

如果在 `realtime.channels` 上启用了 RLS，则订阅会根据 `SELECT` 策略进行检查。

## [​](#publish) publish()

向频道发布事件。

```
try await insforge.realtime.publish(
    to: "chat:room-1",
    event: "new_message",
    payload: [
        "text": "Hello from Swift",
        "sentAt": ISO8601DateFormatter().string(from: Date())
    ]
)
```

客户端必须先订阅频道，然后才能向同一频道发布消息。

如果在 `realtime.messages` 上启用了 RLS，发布也会根据 `INSERT` 策略进行检查。

## [​](#unsubscribe) unsubscribe()

离开一个频道。

```
await insforge.realtime.unsubscribe(from: "chat:room-1")
```

## [​](#disconnect) disconnect()

关闭实时连接。

```
await insforge.realtime.disconnect()
```

## [​](#channel-api) 频道 API

频道 API 将操作分组到一个频道名称下。

```
let channel = await insforge.realtime.channel("chat:room-1")
try await channel.subscribe()
```

### [​](#broadcast-messages) 广播消息

监听事件：

```
let channel = await insforge.realtime.channel("chat:room-1")
try await channel.subscribe()

for await message in await channel.broadcast(event: "new_message") {
    print("负载：\(message.payload)")
}
```

通过频道发布：

```
struct ChatMessage: Codable {
    let text: String
    let author: String
}

try await channel.broadcast(
    event: "new_message",
    message: ChatMessage(text: "Hello", author: currentUser.name)
)
```

当不再需要频道对象时将其移除：

```
await insforge.realtime.removeChannel("chat:room-1")
```

## [​](#presence) 在线状态

成功的订阅会在 SDK API 支持的地方返回当前的在线状态快照。通过频道或 SDK 暴露的底层事件 API 监听在线状态更新。
在线状态是临时的在线信息。它不存储在 Postgres 中。

[模型网关](/sdks/swift/ai)[Kotlin SDK](/sdks/kotlin/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)