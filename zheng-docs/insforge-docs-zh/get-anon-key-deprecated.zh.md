获取匿名密钥（已弃用）

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/tokens/anon \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "accessToken": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
  "message": "Anon key retrieved successfully (deprecated route, use GET /api/metadata/anon-key)"
}
```

Admin

# 获取匿名密钥（已弃用）

已弃用

复制页面

已弃用——请改用 GET /api/metadata/anon-key。为了向后兼容，在旧的 `accessToken` 字段下返回项目的不透明匿名密钥（`anon_...`）。匿名密钥是一个非秘密的客户端标识符，将请求映射到 `anon` 角色；它取代了之前永不过期的匿名 JWT，可通过 POST /api/secrets/anon-key/rotate（仅管理员）轮换。

复制页面

POST

/

api

/

auth

/

tokens

/

anon

尝试

获取匿名密钥（已弃用）

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/tokens/anon \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "accessToken": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
  "message": "Anon key retrieved successfully (deprecated route, use GET /api/metadata/anon-key)"
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

匿名密钥获取成功

[​](#response-access-token)

accessToken

string

不透明匿名密钥（为兼容性保留旧字段名）

示例：

`"anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd"`

[​](#response-message)

message

string

成功消息

示例：

`"Anon key retrieved successfully (deprecated route, use GET /api/metadata/anon-key)"`

[登出管理员仪表盘会话](/api-reference/admin/logout-admin-dashboard-session)[列出所有 OAuth 配置](/api-reference/admin/list-all-oauth-configurations)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)