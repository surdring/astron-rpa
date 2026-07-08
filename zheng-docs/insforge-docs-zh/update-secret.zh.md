更新密钥

cURL

```
curl --request PUT \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "value": "<string>",
  "isActive": true,
  "isReserved": true,
  "expiresAt": "2023-11-07T05:31:56Z"
}
'
```

200

404

500

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been updated successfully"
}
```

Admin

# 更新密钥

复制页面

更新现有密钥的值或元数据

复制页面

PUT

/

api

/

secrets

/

{key}

尝试

更新密钥

cURL

```
curl --request PUT \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "value": "<string>",
  "isActive": true,
  "isReserved": true,
  "expiresAt": "2023-11-07T05:31:56Z"
}
'
```

200

404

500

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been updated successfully"
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

#### 请求体

application/json

[​](#body-value)

value

string

新密钥值（将被加密）

[​](#body-is-active)

isActive

boolean

密钥是否活跃

[​](#body-is-reserved)

isReserved

boolean

密钥是否受保护不可删除

[​](#body-expires-at-one-of-0)

expiresAt

string<date-time> | null

过期时间（设为 null 可移除过期限制）

#### 响应

200

application/json

密钥更新成功

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[获取密钥值](/api-reference/admin/get-secret-value)[删除密钥](/api-reference/admin/delete-secret)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)