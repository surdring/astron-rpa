## On this page

* [概述](#overview)
* [请求头](#headers)
* [注册用户](#register-user)
  + [查询参数](#query-parameters)
  + [请求体](#request-body)
  + [示例（Web 客户端）](#example-web-client)
  + [示例（非 Web 客户端）](#example-non-web-client)
  + [响应（Web 客户端）](#response-web-client)
  + [响应（非 Web 客户端）](#response-non-web-client)
* [登录](#sign-in)
  + [查询参数](#query-parameters-2)
  + [请求体](#request-body-2)
  + [示例（Web 客户端）](#example-web-client-2)
  + [示例（非 Web 客户端）](#example-non-web-client-2)
  + [响应（Web 客户端）](#response-web-client-2)
  + [响应（非 Web 客户端）](#response-non-web-client-2)
* [刷新令牌](#refresh-token)
  + [查询参数](#query-parameters-3)
  + [请求头（Web 客户端）](#headers-web-client)
  + [请求体（非 Web 客户端）](#request-body-non-web-client)
  + [示例（Web 客户端）](#example-web-client-3)
  + [示例（非 Web 客户端）](#example-non-web-client-3)
  + [响应（Web 客户端）](#response-web-client-3)
  + [响应（非 Web 客户端）](#response-non-web-client-3)
* [登出](#logout)
  + [示例](#example)
  + [响应](#response)
* [获取当前用户](#get-current-user)
  + [示例](#example-2)
  + [响应](#response-2)
* [更新资料](#update-profile)
  + [请求体](#request-body-3)
  + [示例](#example-3)
  + [响应](#response-3)
* [获取用户资料](#get-user-profile)
  + [示例](#example-4)
  + [响应](#response-4)
* [邮箱验证](#email-verification)
  + [发送验证邮件](#send-verification-email)
  + [请求体](#request-body-4)
  + [示例](#example-5)
  + [响应](#response-5)
  + [验证邮箱](#verify-email)
  + [查询参数](#query-parameters-4)
  + [请求体](#request-body-5)
  + [示例（Web 客户端）](#example-web-client-4)
  + [示例（非 Web 客户端）](#example-non-web-client-4)
  + [响应（Web 客户端）](#response-web-client-4)
  + [响应（非 Web 客户端）](#response-non-web-client-4)
* [密码重置](#password-reset)
  + [发送重置邮件](#send-reset-email)
  + [请求体](#request-body-6)
  + [示例](#example-6)
  + [将验证码交换为令牌（仅代码方式）](#exchange-code-for-token-code-method-only)
  + [请求体](#request-body-7)
  + [示例](#example-7)
  + [响应](#response-6)
  + [重置密码](#reset-password)
  + [请求体](#request-body-8)
  + [示例](#example-8)
  + [响应](#response-7)
* [OAuth 认证](#oauth-authentication)
  + [发起 OAuth 流程](#initiate-oauth-flow)
  + [查询参数](#query-parameters-5)
  + [支持的提供商](#supported-providers)
  + [示例](#example-9)
  + [响应](#response-8)
  + [OAuth 回调](#oauth-callback)
  + [将验证码交换为令牌](#exchange-code-for-tokens)
  + [查询参数](#query-parameters-6)
  + [请求体](#request-body-9)
  + [示例](#example-10)
  + [响应](#response-9)
  + [完整的 OAuth 流程示例（非 Web）](#complete-oauth-flow-example-non-web)
* [公共配置](#public-configuration)
  + [示例](#example-11)
  + [响应](#response-10)
* [管理端点](#admin-endpoints)
  + [列出所有用户](#list-all-users)
  + [通过 ID 获取用户](#get-user-by-id)
  + [删除用户](#delete-users)
  + [生成匿名令牌](#generate-anonymous-token)
  + [获取认证配置](#get-auth-configuration)
  + [示例](#example-12)
  + [响应](#response-11)
  + [更新认证配置](#update-auth-configuration)
  + [请求体](#request-body-10)
  + [示例](#example-13)
  + [交换管理员会话](#exchange-admin-session)
  + [请求体](#request-body-11)
  + [示例](#example-14)
  + [响应](#response-12)
  + [获取当前管理员会话](#get-current-admin-session)
  + [响应](#response-13)
  + [刷新管理员会话](#refresh-admin-session)
  + [登出管理员会话](#logout-admin-session)
* [错误响应](#error-responses)
  + [无效凭据（401）](#invalid-credentials-401)
  + [用户已存在（409）](#user-already-exists-409)
  + [邮箱未验证（403）](#email-not-verified-403)

REST API

# 认证 API 参考

Copy page

通过 REST API 进行用户认证和会话管理

Copy page

## [​](#overview) 概述

认证 API 提供用户注册、登录、邮箱验证、密码重置和 OAuth 集成的端点。

## [​](#headers) 请求头

用于已认证的函数调用：

```
Authorization: Bearer your-jwt-token-or-anon-key
Content-Type: application/json
```

用于管理端点：

```
Authorization: Bearer admin-jwt-token-Or-API-Key
Content-Type: application/json
```

---

## [​](#register-user) 注册用户

创建新用户账户。

```
POST /api/auth/users
```

### [​](#query-parameters) 查询参数

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `client_type` | string | 否 | 客户端类型：`web`（默认）、`mobile`、`desktop` 或 `server` |

### [​](#request-body) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `email` | string | 是 | 用户邮箱地址 |
| `password` | string | 是 | 密码（必须满足配置要求） |
| `name` | string | 否 | 用户显示名称 |
| `redirectTo` | string | 否 | 用于基于链接的邮箱验证。邮件链接始终先打开 InsForge 后端端点；令牌验证后，InsForge 将浏览器重定向到此 URL 并附带验证结果。当 `verifyEmailMethod` 为 `link` 时必填。此 URL 必须包含在 `allowedRedirectUrls` 中。建议使用您应用的登录页面。 |

### [​](#example-web-client) 示例（Web 客户端）

```
curl -X POST "https://your-app.insforge.app/api/auth/users" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe",
    "redirectTo": "http://localhost:3000/sign-in"
  }'
```

### [​](#example-non-web-client) 示例（非 Web 客户端）

```
curl -X POST "https://your-app.insforge.app/api/auth/users?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe",
    "redirectTo": "myapp://sign-in"
  }'
```

### [​](#response-web-client) 响应（Web 客户端）

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": false,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "abc123...",
  "requireEmailVerification": false
}
```

### [​](#response-non-web-client) 响应（非 Web 客户端）

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": false,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "requireEmailVerification": false
}
```

* 对于 **Web 客户端**：返回 `csrfToken`，刷新令牌存储在 httpOnly cookie 中。
* 对于 **非 Web 客户端**（`mobile`、`desktop`、`server`）：`refreshToken` 直接返回在响应中。请在客户端或服务端运行时安全存储。
* 对于 **`server`**：用于可信的服务端调用方，如 SSR 应用、BFF 或 CLI，这些场景无法依赖浏览器 cookie。
* 如果 `requireEmailVerification` 为 `true`，`accessToken` 和令牌将为 `null`，用户必须在登录前验证邮箱。

---

## [​](#sign-in) 登录

认证用户并获取访问令牌。

```
POST /api/auth/sessions
```

### [​](#query-parameters-2) 查询参数

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `client_type` | string | 否 | 客户端类型：`web`（默认）、`mobile`、`desktop` 或 `server` |

### [​](#request-body-2) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `email` | string | 是 | 用户邮箱地址 |
| `password` | string | 是 | 用户密码 |

### [​](#example-web-client-2) 示例（Web 客户端）

```
curl -X POST "https://your-app.insforge.app/api/auth/sessions" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

### [​](#example-non-web-client-2) 示例（非 Web 客户端）

```
curl -X POST "https://your-app.insforge.app/api/auth/sessions?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

### [​](#response-web-client-2) 响应（Web 客户端）

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "abc123..."
}
```

### [​](#response-non-web-client-2) 响应（非 Web 客户端）

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

* 对于 **Web 客户端**：返回 `csrfToken`，刷新令牌存储在 httpOnly cookie 中。调用 `/api/auth/refresh` 时，在 `X-CSRF-Token` 请求头中包含 `csrfToken`。
* 对于 **非 Web 客户端**（`mobile`、`desktop`、`server`）：直接返回 `refreshToken`。安全存储，并在调用 `/api/auth/refresh` 时将其包含在请求体中。

---

## [​](#refresh-token) 刷新令牌

使用刷新令牌刷新访问令牌。

```
POST /api/auth/refresh
```

### [​](#query-parameters-3) 查询参数

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `client_type` | string | 否 | 客户端类型：`web`（默认）、`mobile`、`desktop` 或 `server` |

### [​](#headers-web-client) 请求头（Web 客户端）

| 请求头 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `X-CSRF-Token` | string | 是 | 从登录/注册响应中收到的 CSRF 令牌 |

### [​](#request-body-non-web-client) 请求体（非 Web 客户端）

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `refreshToken` | string | 是 | 从登录/注册响应中收到的刷新令牌 |

### [​](#example-web-client-3) 示例（Web 客户端）

```
curl -X POST "https://your-app.insforge.app/api/auth/refresh" \
  -H "X-CSRF-Token: abc123..." \
  --cookie "refresh_token=..."
```

### [​](#example-non-web-client-3) 示例（非 Web 客户端）

```
curl -X POST "https://your-app.insforge.app/api/auth/refresh?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }'
```

### [​](#response-web-client-3) 响应（Web 客户端）

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "def456..."
}
```

### [​](#response-non-web-client-3) 响应（非 Web 客户端）

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

为安全起见，实现了令牌轮换：

* **Web 客户端**：每次刷新返回一个新的 `csrfToken`，必须用于后续的刷新请求。
* **非 Web 客户端**（`mobile`、`desktop`、`server`）：每次刷新返回一个新的 `refreshToken`。您必须持久化此新令牌并用于下次刷新。在内存中更新 `accessToken`。

---

## [​](#logout) 登出

登出并清除刷新令牌 cookie。

```
POST /api/auth/logout
```

### [​](#example) 示例

```
curl -X POST "https://your-app.insforge.app/api/auth/logout"
```

### [​](#response) 响应

```
{
  "success": true,
  "message": "已成功登出"
}
```

---

## [​](#get-current-user) 获取当前用户

从 JWT 令牌获取当前已认证用户的信息。
此 REST 端点不会自行刷新已过期的访问令牌。

* 对于原始 REST 客户端，在需要时调用 `POST /api/auth/refresh`。
* 对于使用 TypeScript SDK 的浏览器应用，在启动时调用 `auth.getCurrentUser()`。SDK 在能够刷新会话时会自动使用 httpOnly 刷新 cookie。
* 此自动刷新行为仅限浏览器。服务端、移动端和其他非浏览器客户端应显式刷新。

```
GET /api/auth/sessions/current
```

### [​](#example-2) 示例

```
curl "https://your-app.insforge.app/api/auth/sessions/current" \
  -H "Authorization: Bearer your-jwt-token"
```

### [​](#response-2) 响应

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "role": "authenticated"
  }
}
```

---

## [​](#update-profile) 更新资料

更新当前用户的资料。

```
PATCH /api/auth/profiles/current
```

### [​](#request-body-3) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `profile` | object | 是 | 资料数据（name、avatar_url、自定义字段） |

### [​](#example-3) 示例

```
curl -X PATCH "https://your-app.insforge.app/api/auth/profiles/current" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "name": "John Doe",
      "avatar_url": "https://example.com/avatar.jpg"
    }
  }'
```

### [​](#response-3) 响应

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "profile": {
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg"
  }
}
```

---

## [​](#get-user-profile) 获取用户资料

通过用户 ID 获取用户的公共资料信息。

```
GET /api/auth/profiles/{userId}
```

### [​](#example-4) 示例

```
curl "https://your-app.insforge.app/api/auth/profiles/123e4567-e89b-12d3-a456-426614174000"
```

### [​](#response-4) 响应

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "profile": {
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg"
  }
}
```

---

## [​](#email-verification) 邮箱验证

### [​](#send-verification-email) 发送验证邮件

```
POST /api/auth/email/send-verification
```

### [​](#request-body-4) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `email` | string | 是 | 用户邮箱地址 |
| `redirectTo` | string | 否 | 用于基于链接的邮箱验证。邮件链接始终先打开 InsForge 后端端点；令牌验证后，InsForge 将浏览器重定向到此 URL 并附带验证结果。当 `verifyEmailMethod` 为 `link` 时必填。此 URL 必须包含在 `allowedRedirectUrls` 中。建议使用您应用的登录页面。 |

### [​](#example-5) 示例

```
curl -X POST "https://your-app.insforge.app/api/auth/email/send-verification" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "redirectTo": "http://localhost:3000/sign-in"
  }'
```

### [​](#response-5) 响应

```
{
  "success": true,
  "message": "如果您的邮箱已注册，我们已向您发送验证码/链接。"
}
```

### [​](#verify-email) 验证邮箱

```
POST /api/auth/email/verify
```

### [​](#query-parameters-4) 查询参数

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `client_type` | string | 否 | 客户端类型：`web`（默认）、`mobile`、`desktop` 或 `server` |

### [​](#request-body-5) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `email` | string | 是 | 用户邮箱地址 |
| `otp` | string | 是 | 6 位验证码 |

对于基于链接的验证，邮件点击使用：

```
GET /api/auth/email/verify-link?token=...
```

该面向浏览器的 GET 流程在后端验证令牌，然后重定向到存储的 `redirectTo` URL。`POST /api/auth/email/verify` 是用于提交 6 位验证码的 JSON API。
处理浏览器重定向如下：

* 成功：`?insforge_status=success&insforge_type=verify_email`
* 错误：`?insforge_status=error&insforge_type=verify_email&insforge_error=...`
* `insforge_status`：浏览器链接流程的结果。对于验证，值为 `success` 或 `error`。
* `insforge_type`：流程标识符。对于验证链接，始终为 `verify_email`。
* `insforge_error`：仅在 `insforge_status=error` 时存在。用于显示或记录的人类可读错误消息。
* 建议处理方式：使用您的登录页面作为 `redirectTo`。当 `insforge_status=success` 时，显示确认消息并让用户使用邮箱和密码登录。
* 如果 `redirectTo` 未在白名单中，InsForge 返回 `400` 错误，其消息包含被拒绝的 URL，`nextActions` 告诉您将其添加到 `allowedRedirectUrls`。

### [​](#example-web-client-4) 示例（Web 客户端）

```
curl -X POST "https://your-app.insforge.app/api/auth/email/verify" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "otp": "123456"
  }'
```

### [​](#example-non-web-client-4) 示例（非 Web 客户端）

```
curl -X POST "https://your-app.insforge.app/api/auth/email/verify?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "otp": "123456"
  }'
```

### [​](#response-web-client-4) 响应（Web 客户端）

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "abc123..."
}
```

### [​](#response-non-web-client-4) 响应（非 Web 客户端）

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## [​](#password-reset) 密码重置

### [​](#send-reset-email) 发送重置邮件

```
POST /api/auth/email/send-reset-password
```

### [​](#request-body-6) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `email` | string | 是 | 用户邮箱地址 |
| `redirectTo` | string | 否 | 用于基于链接的密码重置。邮件链接始终先打开 InsForge 后端端点；InsForge 然后将浏览器重定向到此 URL，并在查询字符串中附带重置 `token`，以便您的应用可以渲染自己的重置密码页面。当 `resetPasswordMethod` 为 `link` 时必填。此 URL 必须包含在 `allowedRedirectUrls` 中。建议使用您应用专用的重置密码页面。 |

### [​](#example-6) 示例

```
curl -X POST "https://your-app.insforge.app/api/auth/email/send-reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "redirectTo": "http://localhost:3000/reset-password"
  }'
```

### [​](#exchange-code-for-token-code-method-only) 将验证码交换为令牌（仅代码方式）

```
POST /api/auth/email/exchange-reset-password-token
```

### [​](#request-body-7) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `email` | string | 是 | 用户邮箱地址 |
| `code` | string | 是 | 来自邮件的 6 位验证码 |

### [​](#example-7) 示例

```
curl -X POST "https://your-app.insforge.app/api/auth/email/exchange-reset-password-token" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "code": "123456"
  }'
```

### [​](#response-6) 响应

```
{
  "token": "abc123...",
  "expiresAt": "2024-01-15T11:00:00Z"
}
```

### [​](#reset-password) 重置密码

```
POST /api/auth/email/reset-password
```

对于基于链接的密码重置，邮件点击使用：

```
GET /api/auth/email/reset-password-link?token=...
```

该面向浏览器的 GET 流程在后端验证令牌，然后重定向到存储的 `redirectTo` URL，并在查询字符串中附带重置令牌。`POST /api/auth/email/reset-password` 仍然是接受新密码的 JSON API。
处理浏览器重定向如下：

* 准备重置：`?token=...&insforge_status=ready&insforge_type=reset_password`
* 错误：`?insforge_status=error&insforge_type=reset_password&insforge_error=...`
* `token`：仅在 `insforge_status=ready` 时存在。将此值作为 `otp` 传递给 `POST /api/auth/email/reset-password`。
* `insforge_status`：浏览器链接流程的结果。对于重置链接，值为 `ready` 或 `error`。
* `insforge_type`：流程标识符。对于重置链接，始终为 `reset_password`。
* `insforge_error`：仅在 `insforge_status=error` 时存在。用于显示或记录的人类可读错误消息。
* 您的应用仅在 `insforge_status=ready` 且 `token` 存在时渲染重置密码表单。

### [​](#request-body-8) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `newPassword` | string | 是 | 新密码 |
| `otp` | string | 是 | 来自验证码交换端点或魔法链接 URL 的重置令牌 |

### [​](#example-8) 示例

```
curl -X POST "https://your-app.insforge.app/api/auth/email/reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "newPassword": "newSecurePassword123",
    "otp": "abc123..."
  }'
```

### [​](#response-7) 响应

```
{
  "message": "密码重置成功"
}
```

---

## [​](#oauth-authentication) OAuth 认证

OAuth 认证现在使用 PKCE（Proof Key for Code Exchange）流程以增强安全性。不再直接在重定向 URL 中返回令牌，而是返回一个授权码，必须将其交换为令牌。

### [​](#initiate-oauth-flow) 发起 OAuth 流程

```
GET /api/auth/oauth/{provider}
```

对于在仪表板中配置的自定义提供商，使用：

```
GET /api/auth/oauth/custom/{key}
```

### [​](#query-parameters-5) 查询参数

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `redirect_uri` | string | 是 | 认证后重定向的 URL |
| `code_challenge` | string | 是 | PKCE 代码挑战（code_verifier 的 Base64 URL 编码的 SHA256 哈希） |
| 其他字符串查询参数 | string | 否 | 提供商特定的 OAuth 提示，例如 Google 的 `prompt=select_account` |

额外的查询参数仅在不与服务器拥有的 OAuth 字段冲突时作为提供商特定提示转发。不要传递 `client_id`、`redirect_uri`、`code_challenge`、`state`、`response_type` 或 `scope`；InsForge/提供商生成的值优先，冲突的客户端值将被忽略。

### [​](#supported-providers) 支持的提供商

* `google`
* `github`
* `discord`
* `linkedin`
* `facebook`
* `apple`
* `microsoft`
* `x`
* `spotify`
* `GET /api/auth/public-config` 返回的 `customOAuthProviders` 中的任何自定义提供商键

### [​](#example-9) 示例

```
# 生成 code_verifier（随机字符串，43-128 个字符）
CODE_VERIFIER=$(openssl rand -base64 32 | tr -d '=' | tr '/+' '_-')

# 生成 code_challenge（code_verifier 的 SHA256 哈希，Base64 URL 编码）
CODE_CHALLENGE=$(echo -n $CODE_VERIFIER | openssl dgst -sha256 -binary | base64 | tr -d '=' | tr '/+' '_-')

curl "https://your-app.insforge.app/api/auth/oauth/google?redirect_uri=https://myapp.com/callback&code_challenge=$CODE_CHALLENGE&prompt=select_account"
```

```
# 自定义提供商示例
curl "https://your-app.insforge.app/api/auth/oauth/custom/acme?redirect_uri=https://myapp.com/callback&code_challenge=$CODE_CHALLENGE"
```

### [​](#response-8) 响应

```
{
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?client_id=..."
}
```

### [​](#oauth-callback) OAuth 回调

用户通过提供商认证后，将被重定向到您的 `redirect_uri`，并附带授权码：

```
https://myapp.com/callback?insforge_code=abc123...
```

`insforge_code` 是一个临时授权码，必须使用 `/api/auth/oauth/exchange` 端点交换为令牌。

---

### [​](#exchange-code-for-tokens) 将验证码交换为令牌

将授权码交换为访问和刷新令牌。

```
POST /api/auth/oauth/exchange
```

### [​](#query-parameters-6) 查询参数

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `client_type` | string | 否 | 客户端类型：`web`（默认）、`mobile`、`desktop` 或 `server` |

### [​](#request-body-9) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `code` | string | 是 | 回调中收到的 `insforge_code` |
| `code_verifier` | string | 是 | 用于生成 code_challenge 的原始 code_verifier |

### [​](#example-10) 示例

```
curl -X POST "https://your-app.insforge.app/api/auth/oauth/exchange?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "abc123...",
    "code_verifier": "your-original-code-verifier"
  }'
```

### [​](#response-9) 响应

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["google"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

* 对于 **Web 客户端**：`refreshToken` 将为 `null`，改为返回 `csrfToken`。刷新令牌存储在 httpOnly cookie 中。
* 对于 **非 Web 客户端**（`mobile`、`desktop`、`server`）：直接返回 `refreshToken`。请安全存储。

---

### [​](#complete-oauth-flow-example-non-web) 完整的 OAuth 流程示例（非 Web）

```
// 1. 生成 PKCE 代码验证器和挑战
let codeVerifier = generateRandomString(length: 43)
let codeChallenge = sha256(codeVerifier).base64URLEncoded()

// 2. 发起 OAuth 流程
let authURL = "https://your-app.insforge.app/api/auth/oauth/google" +
    "?redirect_uri=myapp://callback" +
    "&code_challenge=\(codeChallenge)"

// 3. 打开浏览器/WebView 并等待回调
// 用户完成认证...

// 4. 处理带有 insforge_code 的回调
// myapp://callback?insforge_code=abc123...

// 5. 将验证码交换为令牌
let response = POST("/api/auth/oauth/exchange?client_type=mobile", body: {
    "code": insforgeCode,
    "code_verifier": codeVerifier
})

// 6. 存储令牌
accessToken = response.accessToken
refreshToken = response.refreshToken  // 安全持久化
```

---

## [​](#public-configuration) 公共配置

获取公共认证设置（无需认证）。

```
GET /api/auth/public-config
```

### [​](#example-11) 示例

```
curl "https://your-app.insforge.app/api/auth/public-config"
```

### [​](#response-10) 响应

```
{
  "oAuthProviders": ["google", "github"],
  "customOAuthProviders": ["acme"],
  "requireEmailVerification": true,
  "passwordMinLength": 8,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": false,
  "requireSpecialChar": false,
  "verifyEmailMethod": "code",
  "resetPasswordMethod": "link"
}
```

---

## [​](#admin-endpoints) 管理端点

这些端点需要 `project_admin` 角色。

### [​](#list-all-users) 列出所有用户

```
GET /api/auth/users?offset=0&limit=10&search=john
```

### [​](#get-user-by-id) 通过 ID 获取用户

```
GET /api/auth/users/{userId}
```

### [​](#delete-users) 删除用户

```
curl -X DELETE "https://your-app.insforge.app/api/auth/users" \
  -H "Authorization: Bearer admin-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"userIds": ["user-id-1", "user-id-2"]}'
```

### [​](#generate-anonymous-token) 生成匿名令牌

```
POST /api/auth/tokens/anon
```

### [​](#get-auth-configuration) 获取认证配置

获取当前认证设置（仅限管理员）。

```
GET /api/auth/config
```

#### [​](#example-12) 示例

```
curl "https://your-app.insforge.app/api/auth/config" \
  -H "Authorization: Bearer admin-jwt-token"
```

#### [​](#response-11) 响应

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "requireEmailVerification": true,
  "passwordMinLength": 8,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": false,
  "requireSpecialChar": false,
  "verifyEmailMethod": "code",
  "resetPasswordMethod": "link",
  "allowedRedirectUrls": ["https://myapp.com/dashboard", "https://*.myapp.com"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

`allowedRedirectUrls` 条目与完整的 `redirectTo` 值进行匹配，包括 scheme、主机、可选端口和路径。

* 精确条目必须完全匹配，例如 `https://myapp.com/dashboard`。
* 通配符仅在主机部分支持，例如 `https://*.myapp.com/callback`。
* 深度链接在显式列出时允许，例如 `com.example.app:/oauth2redirect` 或 `myapp://auth/callback`。
* 如果 `allowedRedirectUrls` 为空，InsForge 为开发方便允许所有重定向。这对生产环境不安全，应避免在本地开发之外使用。

### [​](#update-auth-configuration) 更新认证配置

更新认证设置（仅限管理员）。

```
PUT /api/auth/config
```

#### [​](#request-body-10) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `requireEmailVerification` | boolean | 否 | 是否需要邮箱验证 |
| `passwordMinLength` | integer | 否 | 最小密码长度（4-128） |
| `requireNumber` | boolean | 否 | 密码是否需要数字 |
| `requireLowercase` | boolean | 否 | 密码是否需要小写字母 |
| `requireUppercase` | boolean | 否 | 密码是否需要大写字母 |
| `requireSpecialChar` | boolean | 否 | 密码是否需要特殊字符 |
| `verifyEmailMethod` | string | 否 | 邮箱验证方法（`code` 或 `link`） |
| `resetPasswordMethod` | string | 否 | 密码重置方法（`code` 或 `link`） |
| `allowedRedirectUrls` | array | 否 | 允许的重定向 URL 列表。条目与完整的 `redirectTo` 值进行匹配。精确 URL 必须完全匹配，支持主机通配符如 `https://*.domain.com/callback`，自定义深度链接如 `com.example.app:/oauth2redirect` 在显式列出时允许。如果为空，则允许所有重定向，这对生产环境不安全。 |

#### [​](#example-13) 示例

```
curl -X PUT "https://your-app.insforge.app/api/auth/config" \
  -H "Authorization: Bearer admin-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "requireEmailVerification": true,
    "passwordMinLength": 10,
    "verifyEmailMethod": "link"
  }'
```

### [​](#exchange-admin-session) 交换管理员会话

将云提供商授权码交换为管理员会话。

```
POST /api/auth/admin/sessions/exchange
```

#### [​](#request-body-11) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `code` | string | 是 | 来自 Insforge Cloud 的授权码或 JWT |

#### [​](#example-14) 示例

```
curl -X POST "https://your-app.insforge.app/api/auth/admin/sessions/exchange" \
  -H "Content-Type: application/json" \
  -d '{"code": "eyJhbGciOiJIUzI1NiIs..."}'
```

#### [​](#response-12) 响应

```
{
  "admin": {
    "sub": "cloud:user_123"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "abc123..."
}
```

### [​](#get-current-admin-session) 获取当前管理员会话

从项目管理员访问令牌获取当前仪表板管理员会话。

```
GET /api/auth/admin/sessions/current
```

#### [​](#response-13) 响应

```
{
  "admin": {
    "sub": "local:admin"
  }
}
```

### [​](#refresh-admin-session) 刷新管理员会话

刷新仪表板管理员访问令牌。此端点仅使用仪表板的 `insforge_admin_refresh_token` httpOnly cookie，不与应用/用户刷新 cookie 共享。

```
POST /api/auth/admin/refresh
```

```
curl -X POST "https://your-app.insforge.app/api/auth/admin/refresh" \
  -H "X-CSRF-Token: abc123..." \
  --cookie "insforge_admin_refresh_token=..."
```

### [​](#logout-admin-session) 登出管理员会话

```
POST /api/auth/admin/logout
```

---

## [​](#error-responses) 错误响应

### [​](#invalid-credentials-401) 无效凭据（401）

```
{
  "error": "INVALID_CREDENTIALS",
  "message": "邮箱或密码无效",
  "statusCode": 401,
  "nextActions": "检查您的邮箱和密码"
}
```

### [​](#user-already-exists-409) 用户已存在（409）

```
{
  "error": "USER_EXISTS",
  "message": "此邮箱的用户已存在",
  "statusCode": 409,
  "nextActions": "使用其他邮箱或登录"
}
```

### [​](#email-not-verified-403) 邮箱未验证（403）

```
{
  "error": "EMAIL_NOT_VERIFIED",
  "message": "请在登录前验证您的邮箱",
  "statusCode": 403,
  "nextActions": "检查收件箱中的验证邮件"
}
```

[数据库 API 参考](/sdks/rest/database)[存储 API 参考](/sdks/rest/storage)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)