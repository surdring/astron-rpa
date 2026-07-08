## On this page

* [Installation](#installation)
  + [Swift Package Manager](#swift-package-manager)
  + [Enable Logging (Optional)](#enable-logging-optional)
  + [CocoaPods(coming soon)](#cocoapods-coming-soon)
* [Quick Start](#quick-start)
* [Features](#features)
* [Platform Support](#platform-support)
* [SDK Reference](#sdk-reference)

Swift

# Swift SDK

Copy page

Official Swift SDK for InsForge - iOS, macOS, tvOS, and watchOS

Copy page

The InsForge Swift SDK provides a native Swift client for interacting with InsForge services from iOS, macOS, tvOS, and watchOS applications.

## [​](#installation) Installation

### [​](#swift-package-manager) Swift Package Manager

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

Or add it via Xcode:

1. File → Add Packages…
2. Enter: `https://github.com/insforge/insforge-swift.git`

### [​](#cocoapods-coming-soon) CocoaPods(coming soon)

```
pod 'InsForge', '~> 1.0'
```

## [​](#quick-start) Quick Start

```
import InsForge

let insforge = InsForgeClient(
    baseUrl: "https://your-app.insforge.app",
    anonKey: "your-anon-key"
)
```

## [​](#features) Features

* **Database** - Type-safe CRUD operations with Codable support
* **Authentication** - Email/password and OAuth authentication
* **Storage** - File upload, download, and management
* **AI** - Chat completions and image generation
* **Realtime** - WebSocket-based pub/sub messaging
* **SwiftUI Integration** - Property wrappers and environment values

## [​](#platform-support) Platform Support

| Platform | Minimum Version |
| --- | --- |
| iOS | 15.0+ |
| macOS | 12.0+ |
| tvOS | 15.0+ |
| watchOS | 8.0+ |

## [​](#sdk-reference) SDK Reference

## Database

CRUD operations with Codable models

## Authentication

Sign up, sign in, OAuth, and user management

## Storage

File upload, download, and management

## AI

Chat completions and image generation

## Realtime

WebSocket pub/sub messaging

[Svelte](/examples/framework-guides/svelte)[Database SDK Reference](/sdks/swift/database)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)