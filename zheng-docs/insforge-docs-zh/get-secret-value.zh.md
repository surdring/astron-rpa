获取密钥值

cURL

```
curl --request GET \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "key": "STRIPE_API_KEY",
  "value": "sk_live_..."
}
```

Admin

# 获取密钥值

复制页面

通过密钥标识符检索特定密钥的解密值

复制页面

GET

/

api

/

secrets

/

{key}

尝试

获取密钥值

cURL

```
curl --request GET \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "key": "STRIPE_API_KEY",
  "value": "sk_live_..."
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

密钥值已检索

[​](#response-key)

key

string

[​](#response-value)

value

string

[创建新密钥](/api-reference/admin/create-a-new-secret)[更新密钥](/api-reference/admin/update-secret)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)