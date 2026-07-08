获取特定提供商的 OAuth 配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "clientId": "<string>",
  "redirectUri": "<string>",
  "scopes": [
    "<string>"
  ],
  "useSharedKey": true,
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z",
  "clientSecret": "<string>"
}
```

Admin

# 获取特定提供商的 OAuth 配置

复制页面

获取 OAuth 配置，包括客户端密钥（仅管理员）

复制页面

GET

/

api

/

auth

/

oauth

/

{provider}

/

config

尝试

获取特定提供商的 OAuth 配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "clientId": "<string>",
  "redirectUri": "<string>",
  "scopes": [
    "<string>"
  ],
  "useSharedKey": true,
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z",
  "clientSecret": "<string>"
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 路径参数

[​](#parameter-provider)

provider

enum<string>

required

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

#### 响应

200

application/json

OAuth 配置

[​](#response-id)

id

string<uuid>

[​](#response-provider)

provider

enum<string>

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

[​](#response-client-id-one-of-0)

clientId

string | null

[​](#response-redirect-uri-one-of-0)

redirectUri

string | null

[​](#response-scopes-one-of-0)

scopes

string[] | null

[​](#response-use-shared-key)

useSharedKey

boolean

[​](#response-created-at)

createdAt

string<date-time>

[​](#response-updated-at)

updatedAt

string<date-time>

[​](#response-client-secret)

clientSecret

string

[创建 OAuth 配置](/api-reference/admin/create-oauth-configuration)[更新 OAuth 配置](/api-reference/admin/update-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)