删除自定义 OAuth 配置

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

Admin

# 删除自定义 OAuth 配置

复制页面

删除自定义 OAuth 提供商配置（仅管理员）

复制页面

DELETE

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

删除自定义 OAuth 配置

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "success": true,
  "message": "<string>"
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

配置已删除

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[更新自定义 OAuth 配置](/api-reference/admin/update-custom-oauth-configuration)[查询记录](/api-reference/client/query-records)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)