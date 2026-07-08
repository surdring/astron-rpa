## 本页内容

* [概述](#概述)
* [使用场景](#使用场景)
* [OAuth 2.0 流程](#oauth-2-0-流程)
* [开始使用](#开始使用)
* [端点](#端点)
  + [授权端点](#授权端点)
  + [令牌端点](#令牌端点)
  + [刷新令牌](#刷新令牌)
  + [用户资料端点](#用户资料端点)
* [实现指南](#实现指南)
  + [生成 PKCE 参数](#生成-pkce-参数)
  + [完整服务端示例](#完整服务端示例)
  + [SPA 弹窗模式](#spa-弹窗模式)
* [安全注意事项](#安全注意事项)
* [令牌声明](#令牌声明)
* [错误处理](#错误处理)
  + [授权错误](#授权错误)
  + [令牌错误](#令牌错误)
* [速率限制](#速率限制)
* [资源](#资源)

合作伙伴

# OAuth 服务器

复制页面

使用 InsForge 作为 OAuth 2.0 身份提供者，在第三方应用中验证用户身份

复制页面

## [​](#概述) 概述

InsForge 可以作为 OAuth 2.0 身份提供者，允许第三方应用通过"使用 InsForge 登录"来验证用户身份。这使得在您的平台上进行开发的开发者能够利用 InsForge 的身份认证系统，而无需管理自己的用户凭据。

## [​](#使用场景) 使用场景

## 开发者平台

让第三方开发者通过"使用 InsForge 登录"构建集成，同时您保持对用户数据访问的控制。

## AI 智能体与 MCP

通过基于 OAuth 授权的模型上下文协议，对 AI 智能体和 LLM 工具进行身份验证。

## 合作伙伴应用

允许合作伙伴应用针对您的 InsForge 项目验证用户身份，而无需共享凭据。

## CLI 和桌面应用

为需要 API 访问的命令行工具和桌面应用颁发 OAuth 令牌。

## [​](#oauth-2-0-流程) OAuth 2.0 流程

InsForge 实现了**带有 PKCE（授权码交换证明密钥）的授权码流程**，这是适用于 Web 和原生应用的最安全的 OAuth 流程。

## [​](#开始使用) 开始使用

1

注册您的应用

联系 InsForge 将您的应用注册为 OAuth 客户端。您将获得：

* **客户端 ID**：您应用的公共标识符
* **客户端密钥**：用于服务端令牌交换的机密密钥
* **允许的重定向 URI**：用户授权后可重定向到的 URL

2

配置作用域

定义您的应用需要的权限：

| 作用域 | 描述 |
| --- | --- |
| `user:read` | 读取用户资料信息 |
| `organizations:read` | 列出用户所在的组织 |
| `projects:read` | 读取项目元数据 |
| `projects:write` | 创建和修改项目 |

3

实现授权流程

使用以下端点将 OAuth 流程集成到您的应用中。

## [​](#端点) 端点

### [​](#授权端点) 授权端点

将用户重定向到此端点以启动 OAuth 流程。

```
GET https://api.insforge.dev/api/oauth/v1/authorize
```

**查询参数：**

| 参数 | 必填 | 描述 |
| --- | --- | --- |
| `client_id` | 是 | 您应用的客户端 ID |
| `redirect_uri` | 是 | 授权后重定向的 URL（必须预先注册） |
| `response_type` | 是 | 必须为 `code` |
| `scope` | 是 | 空格分隔的作用域列表 |
| `state` | 是 | 用于 CSRF 保护的随机字符串 |
| `code_challenge` | 是 | PKCE 代码挑战（base64url 编码的 SHA256 哈希） |
| `code_challenge_method` | 是 | 必须为 `S256` |

**示例：**

```
https://api.insforge.dev/api/oauth/v1/authorize?
  client_id=clf_abc123xyz&
  redirect_uri=https://example.com/callback&
  response_type=code&
  scope=user:read%20organizations:read&
  state=random_state_string&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256
```

### [​](#令牌端点) 令牌端点

将授权码交换为访问令牌和刷新令牌。

```
POST https://api.insforge.dev/api/oauth/v1/token
```

**请求体（JSON）：**

```
{
  "grant_type": "authorization_code",
  "code": "AUTH_CODE_FROM_CALLBACK",
  "redirect_uri": "https://example.com/callback",
  "client_id": "clf_abc123xyz",
  "client_secret": "your_client_secret",
  "code_verifier": "your_original_code_verifier"
}
```

**响应：**

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### [​](#刷新令牌) 刷新令牌

将刷新令牌交换为新的访问令牌。

```
POST https://api.insforge.dev/api/oauth/v1/token
```

**请求体（JSON）：**

```
{
  "grant_type": "refresh_token",
  "refresh_token": "your_refresh_token",
  "client_id": "clf_abc123xyz",
  "client_secret": "your_client_secret"
}
```

### [​](#用户资料端点) 用户资料端点

检索已认证用户的资料信息。

```
GET https://api.insforge.dev/auth/v1/profile
Authorization: Bearer {access_token}
```

**响应：**

```
{
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "profile": {
      "name": "John Doe",
      "avatar_url": "https://..."
    },
    "email_verified": true,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

## [​](#实现指南) 实现指南

### [​](#生成-pkce-参数) 生成 PKCE 参数

PKCE 通过确保启动流程的应用与完成流程的应用是同一个，增加了额外的安全层。

* Node.js
* Python
* 浏览器（Web Crypto）

```
const crypto = require('crypto');

// 生成随机代码验证器（保密存储，保存在服务端）
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('base64url');
}

// 从验证器生成代码挑战
function generateCodeChallenge(verifier) {
  return crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');
}

// 使用
const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);

// 将会话中的 codeVerifier 存储起来，将 codeChallenge 发送到授权端点
```

```
import secrets
import hashlib
import base64

def generate_code_verifier():
    return secrets.token_urlsafe(32)

def generate_code_challenge(verifier):
    digest = hashlib.sha256(verifier.encode()).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b'=').decode()

# 使用
code_verifier = generate_code_verifier()
code_challenge = generate_code_challenge(code_verifier)

# 将会话中的 code_verifier 存储起来，将 code_challenge 发送到授权端点
```

```
async function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
```

### [​](#完整服务端示例) 完整服务端示例

以下是一个完整的 Express.js 实现。首先，创建一个包含您的凭据的 `.env` 文件：

```
# .env - 不要将此文件提交到版本控制
SESSION_SECRET=您的安全随机密钥（至少32个字符）
INSFORGE_CLIENT_ID=clf_your_client_id
INSFORGE_CLIENT_SECRET=your_client_secret
INSFORGE_URL=https://api.insforge.dev
REDIRECT_URI=http://localhost:3000/auth/callback
```

使用以下命令生成安全的会话密钥：`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

然后实现 OAuth 流程：

```
require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const session = require('express-session');

const app = express();

// 验证所需的环境变量
const requiredEnvVars = ['SESSION_SECRET', 'INSFORGE_CLIENT_ID', 'INSFORGE_CLIENT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`缺少所需的环境变量: ${envVar}`);
    process.exit(1);
  }
}

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

const config = {
  clientId: process.env.INSFORGE_CLIENT_ID,
  clientSecret: process.env.INSFORGE_CLIENT_SECRET,
  insforgeUrl: process.env.INSFORGE_URL || 'https://api.insforge.dev',
  redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/auth/callback',
  scopes: 'user:read organizations:read'
};

// 步骤1：启动 OAuth 流程
app.get('/auth/login', (req, res) => {
  // 生成 PKCE 参数
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  // 生成用于 CSRF 保护的 state
  const state = crypto.randomBytes(16).toString('hex');

  // 存储到会话中
  req.session.codeVerifier = codeVerifier;
  req.session.oauthState = state;

  // 构建授权 URL
  const authUrl = new URL(`${config.insforgeUrl}/api/oauth/v1/authorize`);
  authUrl.searchParams.set('client_id', config.clientId);
  authUrl.searchParams.set('redirect_uri', config.redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', config.scopes);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  res.redirect(authUrl.toString());
});

// 步骤2：处理回调
app.get('/auth/callback', async (req, res) => {
  const { code, state, error } = req.query;

  // 检查错误
  if (error) {
    return res.status(400).send(`OAuth 错误: ${error}`);
  }

  // 验证 state 以防止 CSRF
  if (state !== req.session.oauthState) {
    return res.status(403).send('无效的 state 参数');
  }

  try {
    // 将 code 交换为令牌
    const tokenResponse = await fetch(`${config.insforgeUrl}/api/oauth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code_verifier: req.session.codeVerifier
      })
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokens.error || '令牌交换失败');
    }

    // 获取用户资料
    const profileResponse = await fetch(`${config.insforgeUrl}/auth/v1/profile`, {
      headers: { 'Authorization': `Bearer ${tokens.access_token}` }
    });

    const { user } = await profileResponse.json();

    // 将会话中的令牌和用户信息存储
    req.session.accessToken = tokens.access_token;
    req.session.refreshToken = tokens.refresh_token;
    req.session.user = user;

    // 清除 PKCE 数据
    delete req.session.codeVerifier;
    delete req.session.oauthState;

    res.redirect('/dashboard');
  } catch (err) {
    console.error('OAuth 回调错误:', err);
    res.status(500).send('身份验证失败');
  }
});

// 步骤3：使用访问令牌进行 API 调用
app.get('/api/organizations', async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).json({ error: '未认证' });
  }

  const response = await fetch(`${config.insforgeUrl}/organizations/v1`, {
    headers: { 'Authorization': `Bearer ${req.session.accessToken}` }
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('服务器运行在 http://localhost:3000'));
```

### [​](#spa-弹窗模式) SPA 弹窗模式

对于单页应用，您可以在弹窗窗口中打开 OAuth 流程：

```
function loginWithPopup() {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const popup = window.open(
    '/auth/login?mode=popup',
    'insforge-oauth',
    `width=${width},height=${height},left=${left},top=${top}`
  );

  // 监听弹窗完成消息
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return;

    if (event.data.type === 'oauth-complete') {
      popup.close();
      // 处理成功认证
      window.location.reload();
    }
  });
}
```

在您的回调处理程序中，向父窗口发送消息：

```
// 在回调路由中，成功交换令牌后
if (req.query.mode === 'popup') {
  res.send(`
    <script>
      window.opener.postMessage({ type: 'oauth-complete' }, window.location.origin);
      window.close();
    </script>
  `);
}
```

## [​](#安全注意事项) 安全注意事项

## 始终使用 PKCE

所有 OAuth 流程都必须使用 PKCE。它可以防止授权码拦截攻击。

## 验证 State

始终验证回调中的 state 参数，以防止 CSRF 攻击。

## 安全存储令牌

将访问令牌存储在内存或安全的 httpOnly cookie 中。切勿在 URL 或 localStorage 中暴露令牌。

## 使用 HTTPS

所有 OAuth 端点在生产环境中都需要 HTTPS。切勿通过未加密的连接传输令牌。

## 短令牌有效期

访问令牌在 1 小时后过期。使用刷新令牌获取新的访问令牌，无需重新认证。

## 最小化作用域

仅请求您的应用需要的作用域。用户更可能批准有限的权限。

## [​](#令牌声明) 令牌声明

访问令牌是包含以下声明的 JWT：

| 声明 | 描述 |
| --- | --- |
| `sub` | 用户 ID（UUID） |
| `email` | 用户的电子邮件地址 |
| `role` | 用户角色（`authenticated`） |
| `client_id` | 请求令牌的 OAuth 客户端 ID |
| `scope` | 已授予的作用域 |
| `iat` | 签发时间戳 |
| `exp` | 过期时间戳 |
| `iss` | 签发者（`insforge`） |
| `aud` | 受众（`insforge-api`） |

## [​](#错误处理) 错误处理

### [​](#授权错误) 授权错误

如果授权失败，用户将被重定向到您的 `redirect_uri`，并带有错误参数：

```
https://example.com/callback?error=access_denied&error_description=用户%20拒绝%20访问
```

常见错误码：

| 错误 | 描述 |
| --- | --- |
| `invalid_request` | 缺少或无效的参数 |
| `unauthorized_client` | 客户端未获授权使用此授予类型 |
| `access_denied` | 用户拒绝了授权请求 |
| `invalid_scope` | 请求的作用域无效或未知 |

### [​](#令牌错误) 令牌错误

令牌端点错误返回 JSON：

```
{
  "error": "invalid_grant",
  "error_description": "授权码已过期"
}
```

| 错误 | 描述 |
| --- | --- |
| `invalid_grant` | 授权码已过期、已使用或验证器不匹配 |
| `invalid_client` | 客户端认证失败 |
| `invalid_request` | 缺少必需的参数 |

## [​](#速率限制) 速率限制

OAuth 端点实施速率限制以防止滥用：

| 端点 | 限制 |
| --- | --- |
| `/authorize` | 每个 IP 每分钟 100 次请求 |
| `/token` | 每个客户端每分钟 50 次请求 |
| `/profile` | 每个令牌每分钟 100 次请求 |

## [​](#资源) 资源

## OAuth 示例仓库

完整的工作示例，展示如何将"使用 InsForge 登录"集成到您的应用中。

[合作伙伴集成](/partnership)[VPS 部署与安全指南](/deployment/deployment-security-guide)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)