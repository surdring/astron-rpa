用户登录

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/sessions \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "jsmith@example.com",
  "password": "<string>"
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

# 用户登录

复制页面

验证用户身份并返回访问令牌。对于 Web 客户端，设置 httpOnly 刷新令牌 cookie。对于移动端/桌面端/服务端客户端，在响应体中返回 refreshToken。

复制页面

POST

/

api

/

auth

/

sessions

尝试

用户登录

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/sessions \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "jsmith@example.com",
  "password": "<string>"
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

[​](#body-password)

password

string

必需

#### 响应

200

application/json

登录成功

[​](#response-user)

user

object

显示子属性

[​](#response-access-token)

accessToken

string

[​](#response-csrf-token-one-of-0)

csrfToken

string | null

用于刷新端点的 CSRF 令牌（仅限 Web 客户端）

[​](#response-refresh-token-one-of-0)

refreshToken

string | null

用于移动端/桌面端/服务端客户端的刷新令牌（Web 客户端为 null）

[注册新用户](/api-reference/client/register-new-user)[刷新访问令牌](/api-reference/client/refresh-access-token)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)