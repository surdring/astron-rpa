更新自定义 OAuth 配置

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
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

# 更新自定义 OAuth 配置

复制页面

更新自定义 OAuth 提供商配置（仅管理员）

复制页面

PUT

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

更新自定义 OAuth 配置

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
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

#### 路径参数

[​](#parameter-key)

key

string

required

#### 请求体

application/json

[​](#body-name)

name

string

[​](#body-discovery-endpoint)

discoveryEndpoint

string<uri>

[​](#body-client-id)

clientId

string

[​](#body-client-secret)

clientSecret

string

#### 响应

200

application/json

自定义 OAuth 配置已更新

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

[获取自定义 OAuth 配置](/api-reference/admin/get-custom-oauth-configuration)[删除自定义 OAuth 配置](/api-reference/admin/delete-custom-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)