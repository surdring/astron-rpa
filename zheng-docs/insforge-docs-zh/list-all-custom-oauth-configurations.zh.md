列出所有自定义 OAuth 配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/configs \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "data": [
    {
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "key": "<string>",
      "name": "<string>",
      "discoveryEndpoint": "<string>",
      "clientId": "<string>",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "count": 123
}
```

Admin

# 列出所有自定义 OAuth 配置

复制页面

获取所有已配置的自定义 OAuth 提供商（仅管理员）

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

configs

尝试

列出所有自定义 OAuth 配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/configs \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "data": [
    {
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "key": "<string>",
      "name": "<string>",
      "discoveryEndpoint": "<string>",
      "clientId": "<string>",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "count": 123
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 响应

200

application/json

自定义 OAuth 配置列表

[​](#response-data)

data

object[]

显示子属性

[​](#response-count)

count

integer

[删除 OAuth 配置](/api-reference/admin/delete-oauth-configuration)[创建自定义 OAuth 配置](/api-reference/admin/create-custom-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)