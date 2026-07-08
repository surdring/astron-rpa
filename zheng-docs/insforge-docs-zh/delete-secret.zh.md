删除密钥

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>'
```

200

403

404

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been deleted successfully"
}
```

Admin

# 删除密钥

复制页面

将密钥标记为非活跃（软删除）。无法删除保留密钥。

复制页面

DELETE

/

api

/

secrets

/

{key}

尝试

删除密钥

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>'
```

200

403

404

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been deleted successfully"
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

密钥标识符

模式：`^[A-Z0-9_]+$`

#### 响应

200

application/json

密钥删除成功

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[更新密钥](/api-reference/admin/update-secret)[轮换匿名密钥](/api-reference/admin/rotate-anon-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)