## 本页内容

* [功能特性](#features)
  + [邮箱和密码](#email-and-password)
  + [魔法链接和一次性密码](#magic-link-and-otp)
  + [OAuth 提供商](#oauth-providers)
  + [OAuth 服务器模式](#oauth-server-mode)
  + [行级安全](#row-level-security)
  + [数据库中的 auth.users](#auth-users-in-your-database)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

身份认证

# 身份认证

复制页面

使用 InsForge 对用户进行身份认证和授权。

复制页面

使用 InsForge Authentication 处理应用的注册、登录、会话和身份管理。用户可以通过邮箱和密码、魔法链接、一次性验证码、OAuth 提供商（Google、GitHub、Apple 等）或你带入的任何 OIDC 兼容身份提供商进行登录。InsForge 在登录时签发 JSON Web Token，平台上的每个其他产品都使用相同的 token。

![InsForge 仪表盘认证方法，展示邮箱和密码、Google OAuth 和 GitHub OAuth](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/authentication-methods.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=3f9085f058df55cb99514d5367b33de8)

**身份认证**是验证用户身份是否如其所声称。**授权**是检查用户能做什么。InsForge 直接处理前者，并通过读取 auth JWT 的[行级安全](/core-concepts/database/overview)策略为后者提供支持。

## [​](#features) 功能特性

### [​](#email-and-password) 邮箱和密码

默认方式。新用户通过邮箱和密码注册，收到确认邮件，登录后获得会话 JWT。密码重置、邮箱验证和暴力破解限流均已内置。

### [​](#magic-link-and-otp) 魔法链接和一次性密码

向用户邮箱发送一次性链接或六位验证码。无密码登录、账户恢复和增强认证都使用相同的原语。

### [​](#oauth-providers) OAuth 提供商

原生支持 Google、GitHub、Apple、Microsoft、GitLab、Discord 等。通过 URL 添加自定义 OAuth 2.0 / OIDC 提供商（Keycloak、Okta、Auth0、你自己的 IdP），无需编写特定于提供商的代码。

### [​](#oauth-server-mode) OAuth 服务器模式

将 InsForge 本身作为 OAuth 2.0 / OIDC 身份提供商，用于你自己的下游应用。参见 [OAuth 服务器指南](/oauth-server) 了解完整设置。

### [​](#row-level-security) 行级安全

auth JWT 会自动通过每次 InsForge SDK 调用传递。Postgres RLS 策略从 token 中读取声明，并逐行决定用户可以读取和写入的内容。无论请求访问的是数据库、存储还是实时通道，相同的身份和相同的策略都适用。

### [​](#auth-users-in-your-database) 数据库中的 `auth.users`

用户状态存储在项目 Postgres 数据库的 `auth` 模式中。通过外键将 `auth.users` 关联到你的应用表，使用触发器响应身份变更，并以与其他数据相同的方式备份全部内容。

## [​](#build-with-it) 构建应用

## TypeScript SDK

在 Node、浏览器和边缘运行时中进行注册、登录和会话管理。

## Swift SDK

适用于 iOS 和 macOS 的原生 Swift 认证客户端。

## Kotlin SDK

适用于 Android 和 JVM 的协程优先认证客户端。

## REST API

纯 HTTP 认证端点，可从任何语言调用。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 以关联你的项目（推荐方式）。
* 浏览 [TypeScript SDK 参考](/sdks/typescript/auth) 了解登录模式。

[pgvector](/core-concepts/database/pgvector)[概览](/core-concepts/storage/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)