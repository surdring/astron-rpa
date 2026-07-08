通过验证码验证邮箱

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/verify \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "otp": "123456"
}
'
```

200

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
  "refreshToken": "<string>"
}
```

Client

# 通过验证码验证邮箱

复制页面

使用 6 位数字验证码验证邮箱地址。

验证成功的用户将获得会话令牌。

浏览器邮件点击应使用 `GET /api/auth/email/verify-link`。`POST /api/auth/email/verify` 是用于提交 6 位验证码的 JSON API。

复制页面

POST

/

api

/

auth

/

email

/

verify

尝试

通过验证码验证邮箱

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/verify \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "otp": "123456"
}
'
```

200

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
  "refreshToken": "<string>"
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

用户邮箱地址

示例：

`"user@example.com"`

[​](#body-otp)

otp

string

必需

6 位验证码

格式：`^\d{6}$`

示例：

`"123456"`

#### 响应

200

application/json

邮箱验证成功，已创建会话

[​](#response-user)

user

object

显示子属性

[​](#response-access-token)

accessToken

string

JWT 认证令牌

[​](#response-csrf-token-one-of-0)

csrfToken

string | null

用于刷新端点的 CSRF 令牌（仅限 Web 客户端）

[​](#response-refresh-token-one-of-0)

refreshToken

string | null

用于移动端/桌面端/服务端客户端的刷新令牌（Web 客户端为 null）

[通过浏览器链接点击验证邮箱](/api-reference/client/verify-email-from-browser-link-click)[发送密码重置（根据配置使用验证码或链接）](/api-reference/client/send-password-reset-code-or-link-based-on-config)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)