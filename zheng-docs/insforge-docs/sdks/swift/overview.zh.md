## On this page

* [安装](#installation)
  + [Swift Package Manager](#swift-package-manager)
  + [启用日志记录（可选）](#enable-logging-optional)
  + [CocoaPods（即将推出）](#cocoapods-coming-soon)
* [快速开始](#quick-start)
* [功能特性](#features)
* [平台支持](#platform-support)
* [SDK 参考](#sdk-reference)

Swift

# Swift SDK

Copy page

InsForge 官方 Swift SDK - 支持 iOS、macOS、tvOS 和 watchOS

Copy page

InsForge Swift SDK 为 iOS、macOS、tvOS 和 watchOS 应用程序提供了一个原生 Swift 客户端，用于与 InsForge 服务进行交互。

## [​](#installation) 安装

### [​](#swift-package-manager) Swift Package Manager

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

或者通过 Xcode 添加：

1. 文件 → 添加包…
2. 输入：`https://github.com/insforge/insforge-swift.git`

### [​](#cocoapods-coming-soon) CocoaPods（即将推出）

```
pod 'InsForge', '~> 1.0'
```

## [​](#quick-start) 快速开始

```
import InsForge

let insforge = InsForgeClient(
    baseUrl: "https://your-app.insforge.app",
    anonKey: "your-anon-key"
)
```

## [​](#features) 功能特性

* **数据库** - 支持 Codable 的类型安全 CRUD 操作
* **认证** - 邮箱/密码和 OAuth 认证
* **存储** - 文件上传、下载和管理
* **AI** - 聊天补全和图像生成
* **Realtime** - 基于 WebSocket 的发布/订阅消息
* **SwiftUI 集成** - 属性包装器和环境值

## [​](#platform-support) 平台支持

| 平台 | 最低版本 |
| --- | --- |
| iOS | 15.0+ |
| macOS | 12.0+ |
| tvOS | 15.0+ |
| watchOS | 8.0+ |

## [​](#sdk-reference) SDK 参考

## 数据库

支持 Codable 模型的 CRUD 操作

## 认证

注册、登录、OAuth 和用户管理

## 存储

文件上传、下载和管理

## AI

聊天补全和图像生成

## Realtime

WebSocket 发布/订阅消息

[Svelte](/examples/framework-guides/svelte)[数据库 SDK 参考](/sdks/swift/database)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)