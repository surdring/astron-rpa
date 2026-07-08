创建新密钥

cURL

```
curl --request POST \
  --url https://api.example.com/api/secrets \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "key": "STRIPE_API_KEY",
  "value": "sk_live_...",
  "isReserved": false,
  "expiresAt": "2023-11-07T05:31:56Z"
}
'
```

201

示例

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been created successfully",
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

Admin

# 创建新密钥

复制页面

使用唯一键创建新的加密密钥

复制页面

POST

/

api

/

secrets

尝试

创建新密钥

cURL

```
curl --request POST \
  --url https://api.example.com/api/secrets \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "key": "STRIPE_API_KEY",
  "value": "sk_live_...",
  "isReserved": false,
  "expiresAt": "2023-11-07T05:31:56Z"
}
'
```

201

示例

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been created successfully",
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 请求体

application/json

[​](#body-key)

key

string

required

唯一键标识符（仅限大写字母、数字和下划线）

模式：`^[A-Z0-9_]+$`

示例：

`"STRIPE_API_KEY"`

[​](#body-value)

value

string

required

要加密的密钥值

示例：

`"sk_live_..."`

[​](#body-is-reserved)

isReserved

boolean

默认值:false

密钥是否受保护不可删除

[​](#body-expires-at-one-of-0)

expiresAt

string<date-time> | null

密钥的可选过期时间

#### 响应

201

application/json

密钥创建成功

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[​](#response-id)

id

string<uuid>

[列出所有密钥](/api-reference/admin/list-all-secrets)[获取密钥值](/api-reference/admin/get-secret-value)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)