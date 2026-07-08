列出所有密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/secrets \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "secrets": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "key": "STRIPE_API_KEY",
      "isActive": true,
      "isReserved": false,
      "createdAt": "2024-01-21T10:30:00Z",
      "updatedAt": "2024-01-21T10:30:00Z",
      "expiresAt": null
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "key": "OPENAI_API_KEY",
      "isActive": true,
      "isReserved": true,
      "createdAt": "2024-01-20T09:15:00Z",
      "updatedAt": "2024-01-20T09:15:00Z",
      "expiresAt": "2025-01-20T09:15:00Z"
    }
  ]
}
```

Admin

# 列出所有密钥

复制页面

返回所有密钥的元数据（不包含值）

复制页面

GET

/

api

/

secrets

尝试

列出所有密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/secrets \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "secrets": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "key": "STRIPE_API_KEY",
      "isActive": true,
      "isReserved": false,
      "createdAt": "2024-01-21T10:30:00Z",
      "updatedAt": "2024-01-21T10:30:00Z",
      "expiresAt": null
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "key": "OPENAI_API_KEY",
      "isActive": true,
      "isReserved": true,
      "createdAt": "2024-01-20T09:15:00Z",
      "updatedAt": "2024-01-20T09:15:00Z",
      "expiresAt": "2025-01-20T09:15:00Z"
    }
  ]
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

密钥元数据列表

[​](#response-secrets)

secrets

object[]

显示子属性

[接收 Razorpay Webhook](/api-reference/payment-webhooks/receive-razorpay-webhook)[创建新密钥](/api-reference/admin/create-a-new-secret)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)