创建 OAuth 配置

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/configs \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "clientId": "<string>",
  "clientSecret": "<string>",
  "redirectUri": "<string>",
  "scopes": [
    "<string>"
  ],
  "useSharedKey": true
}
'
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
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

Admin

# 创建 OAuth 配置

复制页面

创建新的 OAuth 提供商配置（仅管理员）

复制页面

POST

/

api

/

auth

/

oauth

/

configs

尝试

创建 OAuth 配置

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/configs \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "clientId": "<string>",
  "clientSecret": "<string>",
  "redirectUri": "<string>",
  "scopes": [
    "<string>"
  ],
  "useSharedKey": true
}
'
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

[​](#body-provider)

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

[​](#body-client-id)

clientId

string

[​](#body-client-secret)

clientSecret

string

[​](#body-redirect-uri)

redirectUri

string

[​](#body-scopes)

scopes

string[]

[​](#body-use-shared-key)

useSharedKey

boolean

#### 响应

200

application/json

OAuth 配置已创建

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

[列出所有 OAuth 配置](/api-reference/admin/list-all-oauth-configurations)[获取特定提供商的 OAuth 配置](/api-reference/admin/get-oauth-configuration-for-specific-provider)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)