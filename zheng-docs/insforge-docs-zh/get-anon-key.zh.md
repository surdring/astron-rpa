获取匿名密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/anon-key \
  --header 'Authorization: Bearer <token>'
```

200

403

404

```
{
  "anonKey": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd"
}
```

Admin

# 获取匿名密钥

复制页面

仅管理员可访问的端点，用于获取项目的不透明匿名密钥（`anon_...`）。匿名密钥是一个非秘密的客户端标识符，将请求映射到 `anon` 角色——可以安全地嵌入到前端代码中；行级安全性是安全边界。可通过 POST /api/secrets/anon-key/rotate 轮换。

复制页面

GET

/

api

/

metadata

/

anon-key

尝试

获取匿名密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/anon-key \
  --header 'Authorization: Bearer <token>'
```

200

403

404

```
{
  "anonKey": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd"
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

匿名密钥

[​](#response-anon-key)

anonKey

string

[获取 API 密钥](/api-reference/admin/get-api-key)[健康检查](/api-reference/client/health-check)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)