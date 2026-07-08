## 本页内容

* [安装](#installation)
* [signUp()](#signup)
  + [参数](#parameters)
  + [返回值](#returns)
  + [示例](#example)
  + [输出](#output)
* [signInWithPassword()](#signinwithpassword)
  + [参数](#parameters-2)
  + [返回值](#returns-2)
  + [示例](#example-2)
  + [输出](#output-2)
* [signInWithOAuth()](#signinwithoauth)
  + [参数](#parameters-3)
  + [返回值](#returns-3)
  + [示例](#example-3)
  + [输出](#output-3)
* [signOut()](#signout)
  + [参数](#parameters-4)
  + [返回值](#returns-4)
  + [示例](#example-4)
  + [输出](#output-4)
* [getCurrentUser()](#getcurrentuser)
  + [参数](#parameters-5)
  + [返回值](#returns-5)
  + [示例](#example-5)
  + [输出](#output-5)
* [getProfile()](#getprofile)
  + [参数](#parameters-6)
  + [返回值](#returns-6)
  + [示例](#example-6)
  + [输出](#output-6)
* [setProfile()](#setprofile)
  + [参数](#parameters-7)
  + [返回值](#returns-7)
  + [示例](#example-7)
  + [输出](#output-7)
* [resendVerificationEmail()](#resendverificationemail)
  + [参数](#parameters-8)
  + [返回值](#returns-8)
  + [示例](#example-8)
  + [输出](#output-8)
* [verifyEmail()](#verifyemail)
  + [参数](#parameters-9)
  + [返回值](#returns-9)
  + [示例](#example-9)
  + [输出](#output-9)
* [sendResetPasswordEmail()](#sendresetpasswordemail)
  + [参数](#parameters-10)
  + [返回值](#returns-10)
  + [示例](#example-10)
  + [输出](#output-10)
* [exchangeResetPasswordToken()](#exchangeresetpasswordtoken)
  + [参数](#parameters-11)
  + [返回值](#returns-11)
  + [示例](#example-11)
  + [输出](#output-11)
* [resetPassword()](#resetpassword)
  + [参数](#parameters-12)
  + [返回值](#returns-12)
  + [示例](#example-12)
  + [输出](#output-12)
* [错误处理](#error-handling)

TypeScript

# 认证 SDK 参考

复制页面

使用 InsForge TypeScript SDK 进行用户认证和配置文件管理

复制页面

## [​](#installation) 安装

npm

yarn

pnpm

```
npm install @insforge/sdk@latest
```

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'  // 可选：用于公共/未认证请求
});
```

## [​](#signup) signUp()

使用邮箱和密码创建新用户账户。

### [​](#parameters) 参数

* `email` (string, 必填) - 用户的邮箱地址
* `password` (string, 必填) - 用户的密码
* `name` (string, 可选) - 用户的显示名称
* `redirectTo` (string, 可选) - 用于基于链接的邮箱验证。邮箱链接始终先打开 InsForge 后端端点；令牌验证后，InsForge 将浏览器重定向到此 URL 并附带验证结果。当 `verifyEmailMethod` 设置为 `link` 时需要。此 URL 必须包含在 `allowedRedirectUrls` 中。建议：使用你的应用的登录页面。

### [​](#returns) 返回值

```
{
  data: {
    user?: { id, email, emailVerified, providers, createdAt, updatedAt, profile, metadata },
    accessToken: string | null,
    requireEmailVerification?: boolean,
    csrfToken?: string | null
  } | null,
  error: Error | null
}
```

当 `requireEmailVerification` 为 true 时，`accessToken` 将为 null，直到用户验证其邮箱。InsForge 会根据你的仪表盘配置（`verifyEmailMethod`）发送包含链接或 6 位验证码的验证邮箱。对于验证码验证，请实现一个页面让用户输入验证码（参见 [verifyEmail()](#verifyemail)）。对于链接验证，提供一个 `redirectTo` URL，该 URL 应在 InsForge 验证令牌后接收浏览器。建议：将你的登录页面用作 `redirectTo`，然后显示成功消息并让用户使用邮箱和密码登录。

### [​](#example) 示例

```
const { data, error } = await insforge.auth.signUp({
  email: 'user@example.com',
  password: 'secure_password123',
  name: 'John Doe',
  redirectTo: 'http://localhost:3000/sign-in',
});

if (data?.requireEmailVerification) {
  // 对于验证码验证：重定向到用户输入 6 位验证码的页面
  // 对于链接验证：等待用户点击邮箱链接
  console.log('请验证您的邮箱');
} else if (data?.accessToken) {
  // 用户已登录（邮箱验证已禁用）
  console.log('欢迎！', data.user.email);
}
```

### [​](#output) 输出

```
{
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "user@example.com",
      "emailVerified": false,
      "providers": ["email"],
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "profile": {
        "name": "John Doe",
        "avatar_url": null
      },
      "metadata": {}
    },
    "requireEmailVerification": true,
    "accessToken": null,
    "csrfToken": null
  },
  "error": null
}
```

---

## [​](#signinwithpassword) signInWithPassword()

使用邮箱和密码登录现有用户。

### [​](#parameters-2) 参数

* `email` (string, 必填) - 用户的邮箱地址
* `password` (string, 必填) - 用户的密码

### [​](#returns-2) 返回值

```
{
  data: {
    user: { id, email, emailVerified, providers, createdAt, updatedAt, profile, metadata },
    accessToken: string,
    csrfToken?: string | null
  } | null,
  error: Error | null
}
```

### [​](#example-2) 示例

```
const { data, error } = await insforge.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure_password123',
});

if (data) {
  console.log('已登录为：', data.user.email);
}
```

### [​](#output-2) 输出

```
{
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "user@example.com",
      "emailVerified": true,
      "providers": ["email"],
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "profile": {
        "name": "John Doe",
        "avatar_url": "https://example.com/avatar.jpg"
      },
      "metadata": {}
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "csrfToken": "5758d38259fb..."
  },
  "error": null
}
```

---

## [​](#signinwithoauth) signInWithOAuth()

使用配置的提供者启动 OAuth 认证流程（内置提供者如 Google/GitHub，以及从仪表盘配置的任何自定义提供者密钥）。

### [​](#parameters-3) 参数

* `provider` (string, 必填) - OAuth 提供者密钥（例如 `google`、`github` 或自定义提供者密钥如 `okta-company`）
* `redirectTo` (string, 必填) - 认证后重定向的 URL
* `additionalParams` (`Record<string, string>`, 可选) - 提供者特定的 OAuth 提示，如 Google 的 `prompt=select_account`
* `skipBrowserRedirect` (boolean, 可选) - 如果为 true，则返回 OAuth URL 而不自动重定向（用于服务器渲染或移动端流程）

### [​](#returns-3) 返回值

```
{
  data: { url?: string, provider?: string, codeVerifier?: string },
  error: Error | null
}
```

OAuth 重定向后，SDK 会自动检测回调中的 `insforge_code`，将其交换为会话，并自动保存会话。

### [​](#example-3) 示例

```
// 默认：自动重定向
await insforge.auth.signInWithOAuth('google', {
  redirectTo: 'http://localhost:3000/dashboard',
  additionalParams: { prompt: 'select_account' },
});
// 浏览器立即重定向到 Google

// skipBrowserRedirect：获取 URL 以便手动处理
const { data } = await insforge.auth.signInWithOAuth('google', {
  redirectTo: 'http://localhost:3000/dashboard',
  skipBrowserRedirect: true,
});

window.location.href = data.url; // 准备就绪时重定向
```

`additionalParams` 仅用于提供者特定的可选提示。不要传递服务器拥有的 OAuth 字段，如 `client_id`、`redirect_uri`、`code_challenge`、`state`、`response_type` 或 `scope`；InsForge 在服务器端设置这些值，并忽略冲突的客户端提供的键。

自定义提供者必须先在 InsForge 仪表盘的"认证方法"下使用客户端凭据和 OIDC 发现 URL 进行配置。

### [​](#output-3) 输出

```
{
  "data": {
    "url": "https://accounts.google.com/o/oauth2/v2/auth?client_id=...",
    "provider": "google"
  },
  "error": null
}
```

---

## [​](#signout) signOut()

退出当前用户并清除会话。

### [​](#parameters-4) 参数

无

### [​](#returns-4) 返回值

```
{
  error: Error | null;
}
```

### [​](#example-4) 示例

```
const { error } = await insforge.auth.signOut();
```

### [​](#output-4) 输出

```
{
  "error": null
}
```

---

## [​](#getcurrentuser) getCurrentUser()

获取当前登录的用户。
对于浏览器应用，在启动时调用 `auth.getCurrentUser()`。如果存在有效的 httpOnly 刷新 cookie，SDK 将在返回用户之前自动刷新会话。
对于服务器模式，当需要刷新过期的访问令牌时，显式调用 `refreshSession({ refreshToken })`。

### [​](#parameters-5) 参数

无

### [​](#returns-5) 返回值

```
{
  data: {
    user: { id, email, emailVerified, providers, createdAt, updatedAt, profile, metadata } | null
  },
  error: Error | null
}
```

### [​](#example-5) 示例

```
const { data, error } = await insforge.auth.getCurrentUser();

if (data.user) {
  console.log('用户：', data.user.email);
}
```

### [​](#output-5) 输出

```
{
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "user@example.com",
      "emailVerified": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "providers": ["email"],
      "profile": {
        "name": "John Doe",
        "avatar_url": "https://example.com/avatar.jpg"
      },
      "metadata": {}
    }
  },
  "error": null
}
```

---

## [​](#getprofile) getProfile()

通过 ID 获取任何用户的公开个人资料。返回一个扁平的个人资料对象，所有字段在顶层。

### [​](#parameters-6) 参数

* `userId` (string, 必填) - 要获取个人资料的用户 ID

### [​](#returns-6) 返回值

```
{
  data: {
    id: string,
    name?: string,
    avatar_url?: string,
    createdAt?: string,
    updatedAt?: string,
    ...customFields
  } | null,
  error: Error | null
}
```

### [​](#example-6) 示例

```
const { data, error } = await insforge.auth.getProfile('usr_xyz789');

if (data) {
  console.log(data.name);
  console.log(data.avatar_url);
}
```

### [​](#output-6) 输出

```
{
  "data": {
    "id": "usr_xyz789",
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg",
    "bio": "全栈开发者",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  },
  "error": null
}
```

---

## [​](#setprofile) setProfile()

更新当前用户在 users 表中的个人资料。支持任何动态字段，并以扁平对象形式返回更新后的个人资料。

### [​](#parameters-7) 参数

* `profile` (object) - 要更新的个人资料字段的键值映射。接受任何字段。

**常见字段：**

* `name` (预定义, string) - 用户的显示名称
* `avatar_url` (预定义, string) - 个人资料图片 URL

### [​](#returns-7) 返回值

```
{
  data: {
    id: string,
    name?: string,
    avatar_url?: string,
    createdAt?: string,
    updatedAt?: string,
    ...customFields
  } | null,
  error: Error | null
}
```

### [​](#example-7) 示例

```
const { data, error } = await insforge.auth.setProfile({
  name: 'JohnDev',
  bio: '全栈开发者',
  avatar_url: 'https://example.com/avatar.jpg',
  custom_field: '任意值', // 支持任何自定义字段
});
```

### [​](#output-7) 输出

```
{
  "data": {
    "id": "usr_abc123",
    "name": "JohnDev",
    "avatar_url": "https://example.com/avatar.jpg",
    "bio": "全栈开发者",
    "custom_field": "任意值",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T12:30:00Z"
  },
  "error": null
}
```

---

## [​](#resendverificationemail) resendVerificationEmail()

当之前的 OTP 已过期或未收到时，重新发送邮箱验证。使用认证设置中配置的方法（`verifyEmailMethod`）。当方法为 `code` 时，发送 6 位数字验证码。当方法为 `link` 时，发送一个浏览器验证链接，该链接首先经过 InsForge 后端端点。

此端点通过即使邮箱不存在也返回成功来防止用户枚举。

### [​](#parameters-8) 参数

* `email` (string, 必填) - 用户的邮箱地址
* `redirectTo` (string, 可选) - 用于基于链接的邮箱验证。邮箱链接始终先打开 InsForge 后端端点；令牌验证后，InsForge 将浏览器重定向到此 URL 并附带验证结果。当 `verifyEmailMethod` 设置为 `link` 时需要。此 URL 必须包含在 `allowedRedirectUrls` 中。建议：使用你的应用的登录页面。

### [​](#returns-8) 返回值

```
{
  data: { success: boolean, message: string } | null,
  error: Error | null
}
```

### [​](#example-8) 示例

```
const { data, error } = await insforge.auth.resendVerificationEmail({
  email: 'user@example.com',
  redirectTo: 'http://localhost:3000/sign-in',
});

if (data?.success) {
  console.log('验证邮箱已发送！');
}
```

### [​](#output-8) 输出

```
{
  "data": {
    "success": true,
    "message": "验证邮箱已发送"
  },
  "error": null
}
```

---

## [​](#verifyemail) verifyEmail()

使用 6 位验证码验证邮箱地址。
对于基于链接的验证，用户应点击邮箱链接，该链接会在浏览器中打开 `GET /api/auth/email/verify-link`。
成功验证的使用此验证码端点的用户将收到一个会话令牌。
对于基于链接的验证，你的前端应像这样处理浏览器重定向：

* 成功：`?insforge_status=success&insforge_type=verify_email`
* 错误：`?insforge_status=error&insforge_type=verify_email&insforge_error=...`
* `insforge_status`：浏览器链接流程的结果。对于验证，值为 `success` 或 `error`。
* `insforge_type`：流程标识符。对于验证链接，始终为 `verify_email`。
* `insforge_error`：仅在 `insforge_status=error` 时存在。用于显示或记录的人类可读错误消息。

建议处理方式：将你的登录页面用作 `redirectTo`。当 `insforge_status=success` 时，显示确认消息并让用户使用其邮箱和密码登录。

### [​](#parameters-9) 参数

* `email` (string, 必填) - 用户的邮箱地址
* `otp` (string, 必填) - 6 位验证码

### [​](#returns-9) 返回值

```
{
  data: {
    accessToken: string,
    user: { id, email, emailVerified, ... }
  } | null,
  error: Error | null
}
```

### [​](#example-9) 示例

```
const { data, error } = await insforge.auth.verifyEmail({
  email: 'user@example.com',
  otp: '123456',
});

if (data) {
  console.log('邮箱已验证！', data.accessToken);
}
```

### [​](#output-9) 输出

```
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_abc123",
      "email": "user@example.com",
      "emailVerified": true
    }
  },
  "error": null
}
```

---

## [​](#sendresetpasswordemail) sendResetPasswordEmail()

使用认证设置中配置的方法（`resetPasswordMethod`）发送密码重置邮箱。当方法为 `code` 时，发送 6 位数字验证码用于两步流程。当方法为 `link` 时，发送一个浏览器重置链接，该链接首先经过 InsForge 后端端点。

此端点通过即使邮箱不存在也返回成功来防止用户枚举。

### [​](#parameters-10) 参数

* `email` (string, 必填) - 用户的邮箱地址
* `redirectTo` (string, 可选) - 用于基于链接的密码重置。邮箱链接始终先打开 InsForge 后端端点；InsForge 然后将浏览器重定向到此 URL，并在查询字符串中附带重置 `token`，以便你的应用可以渲染自己的重置密码页面。当 `resetPasswordMethod` 设置为 `link` 时需要。此 URL 必须包含在 `allowedRedirectUrls` 中。建议：使用你的应用专用的重置密码页面。

### [​](#returns-10) 返回值

```
{
  data: { success: boolean, message: string } | null,
  error: Error | null
}
```

### [​](#example-10) 示例

```
const { data, error } = await insforge.auth.sendResetPasswordEmail({
  email: 'user@example.com',
  redirectTo: 'http://localhost:3000/reset-password',
});

if (data?.success) {
  console.log('密码重置邮箱已发送！');
}
```

### [​](#output-10) 输出

```
{
  "data": {
    "success": true,
    "message": "密码重置邮箱已发送"
  },
  "error": null
}
```

---

## [​](#exchangeresetpasswordtoken) exchangeResetPasswordToken()

将 6 位重置密码验证码交换为重置令牌。这是两步密码重置流程的第 1 步（仅在 `resetPasswordMethod` 为 `code` 时使用）。

当 `resetPasswordMethod` 为 `link` 时，不使用此端点，因为浏览器重置链接流程直接使用通过邮箱发送的链接令牌。

### [​](#parameters-11) 参数

* `email` (string, 必填) - 用户的邮箱地址
* `code` (string, 必填) - 来自邮箱的 6 位验证码

### [​](#returns-11) 返回值

```
{
  data: { token: string, expiresAt: string } | null,
  error: Error | null
}
```

### [​](#example-11) 示例

```
const { data, error } = await insforge.auth.exchangeResetPasswordToken({
  email: 'user@example.com',
  code: '123456',
});

if (data) {
  // 使用令牌重置密码
  await insforge.auth.resetPassword({
    newPassword: 'newSecurePassword123',
    otp: data.token,
  });
}
```

### [​](#output-11) 输出

```
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2024-01-15T11:00:00Z"
  },
  "error": null
}
```

---

## [​](#resetpassword) resetPassword()

使用令牌重置用户密码。令牌可以是：

* **魔法链接令牌**：当方法为 `link` 时，来自 `sendResetPasswordEmail` 的重置页面 URL 中提供
* **重置令牌**：当方法为 `code` 时，来自验证码验证后的 `exchangeResetPasswordToken`

### [​](#parameters-12) 参数

* `newPassword` (string, 必填) - 用户的新密码
* `otp` (string, 必填) - 重置令牌或魔法链接令牌

对于基于链接的密码重置，你的前端应像这样处理浏览器重定向：

* 准备重置：`?token=...&insforge_status=ready&insforge_type=reset_password`
* 错误：`?insforge_status=error&insforge_type=reset_password&insforge_error=...`
* `token`：仅在 `insforge_status=ready` 时存在。将此值传递给 `resetPassword({ otp })`。
* `insforge_status`：浏览器链接流程的结果。对于重置链接，值为 `ready` 或 `error`。
* `insforge_type`：流程标识符。对于重置链接，始终为 `reset_password`。
* `insforge_error`：仅在 `insforge_status=error` 时存在。用于显示或记录的人类可读错误消息。

仅在 `insforge_status=ready` 且 `token` 存在时渲染重置密码表单。

### [​](#returns-12) 返回值

```
{
  data: { message: string } | null,
  error: Error | null
}
```

### [​](#example-12) 示例

```
// 验证码方法流程：exchangeResetPasswordToken 之后
const { data, error } = await insforge.auth.resetPassword({
  newPassword: 'newSecurePassword123',
  otp: resetToken, // 来自 exchangeResetPasswordToken 的令牌
});

// 链接方法流程：来自重置页面 URL 的令牌
const { data, error } = await insforge.auth.resetPassword({
  newPassword: 'newSecurePassword123',
  otp: 'a1b2c3d4e5f6...', // 来自魔法链接 URL 的令牌
});

if (data) {
  console.log('密码重置成功！');
}
```

### [​](#output-12) 输出

```
{
  "data": {
    "message": "密码重置成功。请使用新密码登录。"
  },
  "error": null
}
```

---

## [​](#error-handling) 错误处理

所有认证方法都返回结构化错误：

```
const { data, error } = await insforge.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'wrong_password',
});

if (error) {
  console.error(error.statusCode); // 401
  console.error(error.error); // 'INVALID_CREDENTIALS'
  console.error(error.message); // 'Invalid login credentials'
  console.error(error.nextActions); // 'Check email and password'
}
```

[数据库 SDK 参考](/sdks/typescript/database)[存储 SDK 参考](/sdks/typescript/storage)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)