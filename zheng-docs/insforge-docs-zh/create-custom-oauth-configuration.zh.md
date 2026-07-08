创建自定义 OAuth 配置

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/custom/configs \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "key": "<string>",
  "name": "<string>",
  "discoveryEndpoint": "<string>",
  "clientId": "<string>",
  "clientSecret": "<string>"
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "key": "<string>",
  "name": "<string>",
  "discoveryEndpoint": "<string>",
  "clientId": "<string>",
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

Admin

# 创建自定义 OAuth 配置

复制页面

创建新的自定义 OAuth 提供商配置（仅管理员）

复制页面

POST

/

api

/

auth

/

oauth

/

custom

/

configs

尝试

创建自定义 OAuth 配置

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/custom/configs \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "key": "<string>",
  "name": "<string>",
  "discoveryEndpoint": "<string>",
  "clientId": "<string>",
  "clientSecret": "<string>"
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "key": "<string>",
  "name": "<string>",
  "discoveryEndpoint": "<string>",
  "clientId": "<string>",
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

[​](#body-key)

key

string

required

[​](#body-name)

name

string

required

[​](#body-discovery-endpoint)

discoveryEndpoint

string<uri>

required

[​](#body-client-id)

clientId

string

required

[​](#body-client-secret)

clientSecret

string

required

#### 响应

200

application/json

自定义 OAuth 配置已创建

[​](#response-id)

id

string<uuid>

[​](#response-key)

key

string

[​](#response-name)

name

string

[​](#response-discovery-endpoint)

discoveryEndpoint

string<uri>

[​](#response-client-id)

clientId

string

[​](#response-created-at)

createdAt

string<date-time>

[​](#response-updated-at)

updatedAt

string<date-time>

[列出所有自定义 OAuth 配置](/api-reference/admin/list-all-custom-oauth-configurations)[获取自定义 OAuth 配置](/api-reference/admin/get-custom-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)