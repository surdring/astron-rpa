刷新访问令牌

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/refresh \
  --header 'Content-Type: application/json' \
  --data '
{
  "refreshToken": "<string>"
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

# 刷新访问令牌

复制页面

使用刷新令牌刷新访问令牌。

* Web 客户端：使用 httpOnly 刷新令牌 cookie 配合 X-CSRF-Token 请求头
* 移动端/桌面端/服务端客户端：在请求体中发送 refreshToken

复制页面

POST

/

api

/

auth

/

refresh

尝试

刷新访问令牌

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/refresh \
  --header 'Content-Type: application/json' \
  --data '
{
  "refreshToken": "<string>"
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

#### 请求头

[​](#parameter-x-csrf-token)

X-CSRF-Token

string

从登录/注册响应中获取的 CSRF 令牌（仅 Web 客户端必需）

#### 查询参数

[​](#parameter-client-type)

client\_type

enum<string>

默认值：web

客户端类型决定刷新令牌的处理方式：

* web：从 httpOnly cookie 获取刷新令牌，需要 X-CSRF-Token 请求头
* mobile/desktop/server：在请求体中提供 refreshToken，新 refreshToken 在响应中返回

可用选项：

`web`,

`mobile`,

`desktop`,

`server`

#### 请求体

application/json

[​](#body-refresh-token)

refreshToken

string

刷新令牌（仅移动端/桌面端/服务端客户端必需）

#### 响应

200

application/json

令牌刷新成功

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

用于后续刷新请求的新 CSRF 令牌（仅限 Web 客户端）

[​](#response-refresh-token-one-of-0)

refreshToken

string | null

用于移动端/桌面端/服务端客户端的新刷新令牌（必须持久化保存以供下次刷新使用）

[用户登录](/api-reference/client/user-login)[用户注销](/api-reference/client/logout-user)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)