获取公共认证配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/public-config
```

200

```
{
  "oAuthProviders": [],
  "customOAuthProviders": [
    "<string>"
  ],
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "disableSignup": true
}
```

Client

# 获取公共认证配置

复制页面

获取所有公共认证配置，包括 OAuth 提供者和邮箱认证设置（公共端点）

复制页面

GET

/

api

/

auth

/

public-config

尝试

获取公共认证配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/public-config
```

200

```
{
  "oAuthProviders": [],
  "customOAuthProviders": [
    "<string>"
  ],
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "disableSignup": true
}
```

#### 响应

200 - application/json

公共认证配置

[​](#response-o-auth-providers)

oAuthProviders

enum<string>[]

可用选项：

`google`,

`github`,

`discord`,

`linkedin`,

`facebook`,

`instagram`,

`tiktok`,

`apple`,

`x`,

`spotify`,

`microsoft`

[​](#response-custom-o-auth-providers)

customOAuthProviders

string[]

[​](#response-require-email-verification)

requireEmailVerification

boolean

[​](#response-password-min-length)

passwordMinLength

integer

必需范围：`4 <= x <= 128`

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

邮箱验证方式（code = 6 位 OTP，link = 魔法链接）

可用选项：

`code`,

`link`

[​](#response-reset-password-method)

resetPasswordMethod

enum<string>

密码重置方式（code = 6 位 OTP + 交换流程，link = 魔法链接）

可用选项：

`code`,

`link`

[​](#response-disable-signup)

disableSignup

boolean

当为 true 时，禁止新用户注册。现有用户仍可登录。

[创建并执行数据库迁移](/api-reference/admin/create-and-execute-database-migration)[更新当前用户资料](/api-reference/client/update-current-users-profile)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)