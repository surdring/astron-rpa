## On this page

* [Installation](#installation)
  + [Enable Logging (Optional)](#enable-logging-optional)
* [Mental Model](#mental-model)
* [Quick Start](#quick-start)
* [connect()](#connect)
* [subscribe()](#subscribe)
* [publish()](#publish)
* [unsubscribe()](#unsubscribe)
* [disconnect()](#disconnect)
* [Channel API](#channel-api)
  + [Broadcast Messages](#broadcast-messages)
* [Presence](#presence)

Swift

# Realtime SDK Reference

Copy page

Subscribe to channels, publish events, and track presence with the InsForge Swift SDK.

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

## [​](#mental-model) Mental Model

The Swift SDK connects to InsForge Realtime over Socket.IO. Subscribe to channel names such as `order:123` or `chat:room-1`, then listen for event names published to those channels.
Events are published by database triggers that call `realtime.publish(...)` or by clients that publish to a channel they have already joined. See [Realtime overview](/core-concepts/realtime/overview) for the channel and RLS model.

## [​](#quick-start) Quick Start

```
try await insforge.realtime.connect()

await insforge.realtime.subscribe(to: "order:\(orderId)") { message in
    if message.eventName == "status_changed" {
        print("Payload: \(String(describing: message.payload))")
    }
}
```

## [​](#connect) connect()

Establish a realtime connection.

```
do {
    try await insforge.realtime.connect()
    print("Connected to realtime")
} catch {
    print("Connection failed: \(error)")
}
```

## [​](#subscribe) subscribe()

Subscribe to a channel and receive messages published to it.

```
await insforge.realtime.subscribe(to: "chat:room-1") { message in
    print("Event: \(message.eventName ?? "")")
    print("Channel: \(message.channelName ?? "")")

    if let payload = message.payload {
        print("Payload: \(payload)")
    }
}
```

If RLS is enabled on `realtime.channels`, subscription is checked against `SELECT` policies.

## [​](#publish) publish()

Publish an event to a channel.

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

The client must subscribe to a channel before publishing to that same channel.

If RLS is enabled on `realtime.messages`, publish is also checked against `INSERT` policies.

## [​](#unsubscribe) unsubscribe()

Leave a channel.

```
await insforge.realtime.unsubscribe(from: "chat:room-1")
```

## [​](#disconnect) disconnect()

Close the realtime connection.

```
await insforge.realtime.disconnect()
```

## [​](#channel-api) Channel API

The channel API groups operations for one channel name.

```
let channel = await insforge.realtime.channel("chat:room-1")
try await channel.subscribe()
```

### [​](#broadcast-messages) Broadcast Messages

Listen for an event:

```
let channel = await insforge.realtime.channel("chat:room-1")
try await channel.subscribe()

for await message in await channel.broadcast(event: "new_message") {
    print("Payload: \(message.payload)")
}
```

Publish through the channel:

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

Remove a channel object when it is no longer needed:

```
await insforge.realtime.removeChannel("chat:room-1")
```

## [​](#presence) Presence

Successful subscriptions return the current presence snapshot where supported by the SDK API. Listen for presence updates through the channel or lower-level event APIs exposed by the SDK.
Presence is ephemeral online state. It is not stored in Postgres.

[Model Gateway](/sdks/swift/ai)[Kotlin SDK](/sdks/kotlin/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)