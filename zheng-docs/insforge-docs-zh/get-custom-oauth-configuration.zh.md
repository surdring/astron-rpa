获取自定义 OAuth 配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>'
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
  "updatedAt": "2023-11-07T05:31:56Z",
  "clientSecret": "<string>"
}
```

Admin

# 获取自定义 OAuth 配置

复制页面

获取自定义 OAuth 配置，包括客户端密钥（仅管理员）

复制页面

GET

/

api

/

auth

/

oauth

/

custom

/

{key}

/

config

尝试

获取自定义 OAuth 配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>'
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

[​](#parameter-key)

key

string

required

#### 响应

200

application/json

自定义 OAuth 配置

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

[​](#response-client-secret)

clientSecret

string

[创建自定义 OAuth 配置](/api-reference/admin/create-custom-oauth-configuration)[更新自定义 OAuth 配置](/api-reference/admin/update-custom-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)