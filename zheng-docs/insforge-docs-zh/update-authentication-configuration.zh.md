更新认证配置

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "allowedRedirectUrls": [
    "<string>"
  ],
  "disableSignup": true
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "allowedRedirectUrls": [
    "<string>"
  ],
  "disableSignup": true,
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

Admin

# 更新认证配置

复制页面

更新认证设置（仅管理员）

复制页面

PUT

/

api

/

auth

/

config

尝试

更新认证配置

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "allowedRedirectUrls": [
    "<string>"
  ],
  "disableSignup": true
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "allowedRedirectUrls": [
    "<string>"
  ],
  "disableSignup": true,
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 请求体

application/json

[​](#body-require-email-verification)

requireEmailVerification

boolean

[​](#body-password-min-length)

passwordMinLength

integer

允许范围：`4 <= x <= 128`

[​](#body-require-number)

requireNumber

boolean

[​](#body-require-lowercase)

requireLowercase

boolean

[​](#body-require-uppercase)

requireUppercase

boolean

[​](#body-require-special-char)

requireSpecialChar

boolean

[​](#body-verify-email-method)

verifyEmailMethod

enum<string>

邮箱验证方式（code = 6 位 OTP 验证码，link = 魔法链接）

可用选项：

`code`,

`link`

[​](#body-reset-password-method)

resetPasswordMethod

enum<string>

密码重置方式（code = 6 位 OTP 验证码 + 交换流程，link = 魔法链接）

可用选项：

`code`,

`link`

[​](#body-allowed-redirect-urls)

allowedRedirectUrls

string[]

认证重定向的允许 URL 列表。如果为空，则允许所有重定向以获得更流畅的开发体验。生产环境不建议这样做。

[​](#body-disable-signup)

disableSignup

boolean

当为 true 时，公共注册端点（POST /api/auth/users 和首次 OAuth）将被拒绝，返回 403 AUTH\_SIGNUP\_DISABLED。管理员认证的用户创建不受影响。

#### 响应

200

application/json

配置更新成功

[​](#response-id)

id

string<uuid>

[​](#response-require-email-verification)

requireEmailVerification

boolean

[​](#response-password-min-length)

passwordMinLength

integer

允许范围：`4 <= x <= 128`

[​](#response-require-number)

requireNumber

boolean

[​](#response-require-lowercase)

requireLowercase

boolean

[​](#response-require-uppercase)

requireUppercase

boolean

[​](#response-require-special-char)

requireSpecialChar

boolean

[​](#response-verify-email-method)

verifyEmailMethod

enum<string>

可用选项：

`code`,

`link`

[​](#response-reset-password-method)

resetPasswordMethod

enum<string>

可用选项：

`code`,

`link`

[​](#response-allowed-redirect-urls)

allowedRedirectUrls

string[]

认证重定向的允许 URL 列表。如果为空，则允许所有重定向以获得更流畅的开发体验。生产环境不建议这样做。

[​](#response-disable-signup)

disableSignup

boolean

当为 true 时，公共注册端点（POST /api/auth/users 和首次 OAuth）将被拒绝，返回 403 AUTH\_SIGNUP\_DISABLED。管理员认证的用户创建不受影响。

[​](#response-created-at)

createdAt

string<date-time>

[​](#response-updated-at)

updatedAt

string<date-time>

[获取认证配置](/api-reference/admin/get-authentication-configuration)[列出所有用户（仅管理员）](/api-reference/admin/list-all-users-admin-only)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)