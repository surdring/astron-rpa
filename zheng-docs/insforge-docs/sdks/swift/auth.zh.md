## On this page

* [安装](#installation)
  + [启用日志记录（可选）](#enable-logging-optional)
* [signUp()](#signup)
  + [参数](#parameters)
  + [返回值](#returns)
  + [SignUpResponse](#signupresponse)
  + [示例（完整流程含验证）](#example-complete-flow-with-verification)
  + [邮箱验证](#email-verification)
  + [相关方法](#related-methods)
* [signIn()](#signin)
  + [参数](#parameters-2)
  + [示例](#example)
  + [邮箱验证](#email-verification-2)
* [signOut()](#signout)
  + [示例](#example-2)
* [getCurrentUser()](#getcurrentuser)
  + [示例](#example-3)
* [setProfile()](#setprofile)
  + [示例](#example-4)
* [密码重置](#password-reset)
  + [sendPasswordReset()](#sendpasswordreset)
  + [参数](#parameters-3)
  + [示例](#example-5)
  + [exchangeResetPasswordToken()](#exchangeresetpasswordtoken)
  + [参数](#parameters-4)
  + [返回值](#returns-2)
  + [ResetPasswordTokenResponse](#resetpasswordtokenresponse)
  + [示例](#example-6)
  + [resetPassword()](#resetpassword)
  + [参数](#parameters-5)
  + [示例](#example-7)
* [signInWithOAuthView()](#signinwithoauthview)
  + [支持的提供商](#supported-providers)
  + [参数](#parameters-6)
  + [返回值](#returns-3)
  + [认证流程](#authentication-flow)
  + [示例](#example-8)
  + [URL Scheme 配置](#url-scheme-configuration)
* [错误处理](#error-handling)

Swift

# 认证 SDK 参考

Copy page

使用 InsForge Swift SDK 进行用户认证和资料管理

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

## [​](#signup) signUp()

使用邮箱和密码创建新用户账户。

### [​](#parameters) 参数

* `email` (String) - 用户的邮箱地址
* `password` (String) - 用户的密码
* `name` (String, 可选) - 用户的显示名称

### [​](#returns) 返回值

```
SignUpResponse
```

### [​](#signupresponse) SignUpResponse

```
public struct SignUpResponse: Codable, Sendable {
    /// 用户对象（需要邮箱验证时为 nil）
    public let user: User?
    /// 访问令牌（需要邮箱验证时为 nil）
    public let accessToken: String?
    /// 刷新令牌（需要邮箱验证时为 nil）
    public let refreshToken: String?
    /// 指示登录前是否需要邮箱验证
    public let requireEmailVerification: Bool?

    /// 检查是否需要邮箱验证
    public var needsEmailVerification: Bool
    /// 检查注册是否已完成并带有会话（无需验证）
    public var hasSession: Bool
}
```

### [​](#example-complete-flow-with-verification) 示例（完整流程含验证）

```
func handleSignUp(email: String, password: String, name: String?) async {
    do {
        let result = try await insforge.auth.signUp(
            email: email,
            password: password,
            name: name
        )

        if result.needsEmailVerification {
            // 显示验证码输入界面
            // 用户将通过邮箱收到 6 位验证码
            showEmailVerificationScreen(email: email)
        } else if result.hasSession {
            // 注册完成，用户已登录
            navigateToDashboard()
        }
    } catch {
        showError(error.localizedDescription)
    }
}

// 当用户输入验证码时调用
func handleVerifyEmail(email: String, code: String) async {
    do {
        try await insforge.auth.verifyEmail(email: email, code: code)
        // 验证成功，用户现在可以登录
        navigateToSignIn()
    } catch {
        showError("无效的验证码")
    }
}

// 当用户请求重新发送验证邮件时调用
func handleResendCode(email: String) async {
    do {
        try await insforge.auth.resendVerificationEmail(email: email)
        showMessage("验证邮件已发送到 \(email)")
    } catch {
        showError("重新发送验证邮件失败")
    }
}
```

### [​](#email-verification) 邮箱验证

对于使用邮箱注册的用户，InsForge 后端提供三种选项：

1. **无需邮箱验证** - 注册后用户可以立即登录。`SignUpResponse` 将具有 `hasSession = true`。
2. **基于链接的验证** - 用户必须打开邮箱并点击验证链接后才能登录。
3. **基于代码的验证** - InsForge 后端向用户邮箱发送 6 位验证码。客户端应用需要显示一个验证界面，让用户输入验证码，然后调用 `verifyEmail(email:code:)` 完成验证。只有在此之后，用户才能使用邮箱+密码登录。

当 `requireEmailVerification` 为 `true` 时，响应将包含：

* `accessToken = nil`
* `user = nil`
* `needsEmailVerification = true`

这表示在用户可以登录之前，需要通过选项 2 或 3 进行验证。

### [​](#related-methods) 相关方法

| 方法 | 描述 |
| --- | --- |
| `verifyEmail(email:code:)` | 使用 6 位验证码验证邮箱 |
| `resendVerificationEmail(email:)` | 重新发送验证邮件 |

---

## [​](#signin) signIn()

使用邮箱和密码登录现有用户。

### [​](#parameters-2) 参数

* `email` (String) - 用户的邮箱地址
* `password` (String) - 用户的密码

### [​](#example) 示例

```
do {
    let result = try await insforge.auth.signIn(
        email: "user@example.com",
        password: "secure_password123"
    )

    if let user = result.user {
        print("欢迎回来，\(user.profile?.name ?? user.email)")
    }
} catch {
    print("登录失败：\(error)")
}
```

### [​](#email-verification-2) 邮箱验证

如果登录响应是：

```
{"error":"FORBIDDEN","message":"需要邮箱验证","statusCode":403,"nextActions":"请先验证您的邮箱地址再登录"}
```

这表示在用户可以登录之前，需要通过选项 2 或 3（链接或代码，参见 [signUp()](#email-verification)）进行验证。

---

## [​](#signout) signOut()

登出当前用户。

### [​](#example-2) 示例

```
do {
    try await insforge.auth.signOut()
    print("用户已登出")
} catch {
    print("登出失败：\(error)")
}
```

---

## [​](#getcurrentuser) getCurrentUser()

获取已认证用户及其资料数据。

### [​](#example-3) 示例

```
do {
    if let user = try await insforge.auth.getCurrentUser() {
        print("邮箱：\(user.email)")
        print("名称：\(user.profile?.name ?? "N/A")")
    } else {
        print("没有已登录的用户")
    }
} catch {
    print("错误：\(error)")
}
```

---

## [​](#setprofile) setProfile()

更新当前用户的资料。

### [​](#example-4) 示例

```
do {
    let result = try await insforge.auth.setProfile([
        "name": "JohnDev",
        "bio": "iOS 开发者",
        "avatar_url": "https://example.com/avatar.jpg"
    ])
    print("资料已更新")
} catch {
    print("更新失败：\(error)")
}
```

---

## [​](#password-reset) 密码重置

InsForge 支持两种密码重置方法，在后端配置：

* **代码方式**：用户通过邮箱收到 6 位验证码，验证后获得重置令牌，然后重置密码
* **链接方式**：用户通过邮箱收到包含重置令牌的魔法链接，然后直接重置密码

### [​](#sendpasswordreset) sendPasswordReset()

向用户发送密码重置邮件。邮件将包含 6 位验证码或魔法链接，具体取决于后端配置。

#### [​](#parameters-3) 参数

* `email` (String) - 用户的邮箱地址

#### [​](#example-5) 示例

```
do {
    try await insforge.auth.sendPasswordReset(email: "user@example.com")
    // 显示检查邮箱的提示
    showMessage("如果您的邮箱已注册，您将收到一封密码重置邮件。")
} catch {
    print("发送重置邮件失败：\(error)")
}
```

---

### [​](#exchangeresetpasswordtoken) exchangeResetPasswordToken()

将 6 位重置码交换为重置令牌。**此方法仅用于基于代码的重置流程。**

#### [​](#parameters-4) 参数

* `email` (String) - 用户的邮箱地址
* `code` (String) - 通过邮箱收到的 6 位数字验证码

#### [​](#returns-2) 返回值

```
ResetPasswordTokenResponse
```

#### [​](#resetpasswordtokenresponse) ResetPasswordTokenResponse

```
public struct ResetPasswordTokenResponse: Codable, Sendable {
    /// 用于 resetPassword() 的重置令牌
    public let token: String
    /// 令牌过期时间戳
    public let expiresAt: Date?
}
```

#### [​](#example-6) 示例

```
do {
    let response = try await insforge.auth.exchangeResetPasswordToken(
        email: "user@example.com",
        code: "123456"
    )
    // 存储令牌并进入密码重置界面
    let resetToken = response.token
    showPasswordResetScreen(token: resetToken)
} catch {
    print("验证码无效或已过期：\(error)")
}
```

---

### [​](#resetpassword) resetPassword()

使用重置令牌重置用户密码。

#### [​](#parameters-5) 参数

* `otp` (String) - 重置令牌（来自代码流程的 `exchangeResetPasswordToken()`，或来自链接流程的魔法链接 URL）
* `newPassword` (String) - 满足配置要求的新密码

#### [​](#example-7) 示例

```
do {
    try await insforge.auth.resetPassword(
        otp: resetToken,
        newPassword: "newSecurePassword123"
    )
    // 密码重置成功
    showMessage("密码重置成功。您现在可以登录。")
    navigateToSignIn()
} catch {
    print("密码重置失败：\(error)")
}
```

---

## [​](#signinwithoauthview) signInWithOAuthView()

直接使用特定的 OAuth 提供商登录。此方法直接打开 OAuth 提供商的认证页面。
在 iOS 12+ 和 macOS 10.15+ 上，SDK 使用 `ASWebAuthenticationSession` 呈现应用内认证浏览器，并自动处理回调。

### [​](#supported-providers) 支持的提供商

```
public enum OAuthProvider: String, Sendable {
    case google
    case github
    case discord
    case linkedin
    case facebook
    case instagram
    case tiktok
    case apple
    case x
    case spotify
    case microsoft
}
```

### [​](#parameters-6) 参数

* `provider` (`OAuthProvider`) - 用于认证的 OAuth 提供商
* `redirectTo` (`String`) - 认证后 InsForge 重定向的回调 URL

### [​](#returns-3) 返回值

```
AuthResponse
```

返回包含已认证用户和会话令牌的 `AuthResponse`。

### [​](#authentication-flow) 认证流程

```
1. 应用调用 signInWithOAuthView(provider:redirectTo:)
2. SDK 从 InsForge 获取 OAuth 授权 URL
3. SDK 打开应用内认证浏览器（ASWebAuthenticationSession）
4. 用户使用提供商（Google、GitHub 等）进行认证
5. SDK 自动处理回调并创建会话
6. 方法返回包含用户数据的 AuthResponse
```

### [​](#example-8) 示例

```
import SwiftUI
import InsForge

struct LoginView: View {
    let client: InsForgeClient
    @State private var currentUser: User?
    @State private var errorMessage: String?

    var body: some View {
        VStack(spacing: 16) {
            Text("登录方式")
                .font(.headline)

            // Google 登录
            Button {
                Task {
                    do {
                        let response = try await client.auth.signInWithOAuthView(
                            provider: .google,
                            redirectTo: "yourapp://auth/callback"
                        )
                        currentUser = response.user
                    } catch {
                        errorMessage = error.localizedDescription
                    }
                }
            } label: {
                HStack {
                    Image(systemName: "g.circle.fill")
                    Text("使用 Google 继续")
                }
                .frame(maxWidth: .infinity)
            }
            .buttonStyle(.bordered)

            if let error = errorMessage {
                Text(error)
                    .foregroundColor(.red)
                    .font(.caption)
            }
        }
        .padding()
    }
}
```

### [​](#url-scheme-configuration) URL Scheme 配置

为您的应用注册一个回调 URL，将该确切值传递给 `redirectTo`，并将相同的值添加到 Auth 设置中的 `allowedRedirectUrls`。例如，您可以使用深度链接，如 `yourapp://auth/callback`，或声明的 HTTPS 回调，如 `https://app.example.com/auth/callback`。如果 `redirectTo` 未在白名单中，请求将失败并返回 HTTP 400。

---

## [​](#error-handling) 错误处理

```
do {
    let result = try await insforge.auth.signIn(
        email: email,
        password: password
    )
} catch let error as InsForgeAuthError {
    switch error {
    case .invalidCredentials:
        print("邮箱或密码无效")
    case .userNotFound:
        print("未找到用户")
    case .emailNotVerified:
        print("请验证您的邮箱")
    case .networkError(let underlying):
        print("网络错误：\(underlying)")
    default:
        print("认证错误：\(error.localizedDescription)")
    }
}
```

[数据库 SDK 参考](/sdks/swift/database)[存储 SDK 参考](/sdks/swift/storage)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)