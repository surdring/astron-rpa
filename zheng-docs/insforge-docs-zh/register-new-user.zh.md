注册新用户

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/users \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "redirectTo": "<string>"
}
'
```

200

403

```
{
  "user": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "email": "jsmith@example.com",
    "profile": {
      "name": "<string>",
      "avatar_url": "<string>"
    },
    "metadata": {},
    "emailVerified": true,
    "providers": [
      "<string>"
    ],
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  },
  "accessToken": "<string>",
  "csrfToken": "<string>",
  "refreshToken": "<string>",
  "requireEmailVerification": true
}
```

Client

# 注册新用户

复制页面

创建一个新用户账户

复制页面

POST

/

api

/

auth

/

users

尝试

注册新用户

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/users \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "redirectTo": "<string>"
}
'
```

200

403

```
{
  "user": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "email": "jsmith@example.com",
    "profile": {
      "name": "<string>",
      "avatar_url": "<string>"
    },
    "metadata": {},
    "emailVerified": true,
    "providers": [
      "<string>"
    ],
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  },
  "accessToken": "<string>",
  "csrfToken": "<string>",
  "refreshToken": "<string>",
  "requireEmailVerification": true
}
```

#### 查询参数

[​](#parameter-client-type)

client\_type

enum<string>

默认值：web

客户端类型决定刷新令牌的返回方式：

* web：刷新令牌存储在 httpOnly cookie 中，csrfToken 在响应中返回
* mobile/desktop/server：refreshToken 直接在响应体中返回

可用选项：

`web`,

`mobile`,

`desktop`,

`server`

#### 请求体

application/json

[​](#body-email)

email

string<email>

必需

示例：

`"user@example.com"`

[​](#body-password)

password

string

必需

满足配置要求的密码（查看 /api/auth/email/config 了解当前要求）

示例：

`"securepassword123"`

[​](#body-name)

name

string

示例：

`"John Doe"`

[​](#body-redirect-to)

redirectTo

string<uri>

用于基于链接的电子邮件验证。电子邮件链接始终先打开 InsForge 后端端点；令牌验证通过后，InsForge 将浏览器重定向到此 URL。此 URL 必须包含在 allowedRedirectUrls 中。建议使用您的应用的登录页面。

#### 响应

200

application/json

用户创建成功

[​](#response-user)

user

object

显示子属性

[​](#response-access-token-one-of-0)

accessToken

string | null

JWT 认证令牌（如果需要邮箱验证则为 null）

[​](#response-csrf-token-one-of-0)

csrfToken

string | null

用于刷新端点的 CSRF 令牌（仅限 Web 客户端，如果需要邮箱验证则为 null）

[​](#response-refresh-token-one-of-0)

refreshToken

string | null

用于移动端/桌面端/服务端客户端的刷新令牌（Web 客户端或需要邮箱验证时为 null）

[​](#response-require-email-verification)

requireEmailVerification

boolean

登录前是否需要邮箱验证

[根据 ID 获取用户资料](/api-reference/client/get-user-profile-by-id)[用户登录](/api-reference/client/user-login)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)