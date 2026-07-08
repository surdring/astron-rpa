交换 OAuth 代码以获取令牌 (PKCE)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/exchange \
  --header 'Content-Type: application/json' \
  --data '
{
  "code": "abc123...",
  "code_verifier": "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
}
'
```

200

400

401

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
  "refreshToken": "<string>"
}
```

Client

# 交换 OAuth 代码以获取令牌 (PKCE)

复制页面

交换 insforge\_code（从 OAuth 回调中接收）以获取访问令牌和刷新令牌。

此端点用于移动端/桌面端/服务端客户端的 PKCE 流程：

1. OAuth 回调后，您的 redirect\_uri 接收 `insforge_code` 参数
2. 使用该代码和您原始的 code\_verifier 调用此端点
3. 在响应中接收访问令牌和刷新令牌

code\_verifier 必须与 OAuth 发起期间发送的 code\_challenge 匹配。

复制页面

POST

/

api

/

auth

/

oauth

/

exchange

尝试

交换 OAuth 代码以获取令牌 (PKCE)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/exchange \
  --header 'Content-Type: application/json' \
  --data '
{
  "code": "abc123...",
  "code_verifier": "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
}
'
```

200

400

401

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

[​](#body-code)

code

string

必需

从 OAuth 回调重定向中接收的 insforge\_code

示例：

`"abc123..."`

[​](#body-code-verifier)

code\_verifier

string

必需

用于生成 code\_challenge 的原始 code\_verifier。必须为 43-128 个字符，使用 [A-Za-z0-9-.\_~]

示例：

`"dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"`

#### 响应

200

application/json

令牌交换成功

[​](#response-user)

user

object

显示子属性

[​](#response-access-token)

accessToken

string

用于 API 认证的 JWT 访问令牌

[​](#response-refresh-token)

refreshToken

string

用于获取新访问令牌的刷新令牌

[发起 OAuth 流程 (PKCE)](/api-reference/client/initiate-oauth-flow-pkce)[共享 OAuth 回调处理器](/api-reference/client/shared-oauth-callback-handler)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)