获取 API 密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/api-key \
  --header 'Authorization: Bearer <token>'
```

200

403

```
{
  "apiKey": "ins_1234567890abcdef1234567890abcdef"
}
```

Admin

# 获取 API 密钥

复制页面

仅管理员可访问的端点，用于获取 API 密钥

复制页面

GET

/

api

/

metadata

/

api-key

尝试

获取 API 密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/api-key \
  --header 'Authorization: Bearer <token>'
```

200

403

```
{
  "apiKey": "ins_1234567890abcdef1234567890abcdef"
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

API 密钥

[​](#response-api-key)

apiKey

string

[获取数据库元数据](/api-reference/admin/get-database-metadata)[获取匿名密钥](/api-reference/admin/get-anon-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)