轮换匿名密钥

cURL

```
curl --request POST \
  --url https://api.example.com/api/secrets/anon-key/rotate \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "gracePeriodHours": 168
}
'
```

200

400

403

```
{
  "success": true,
  "message": "Anon key rotated successfully. Old key will remain valid during grace period.",
  "anonKey": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
  "oldKeyExpiresAt": "2026-06-18T00:00:00.000Z"
}
```

Admin

# 轮换匿名密钥

复制页面

轮换项目的不透明匿名密钥（`anon_...`）。生成并返回一个新密钥；旧密钥在宽限期内（默认 168 小时/7 天，最长 720）保持有效，以便已部署的前端和移动端二进制文件在新密钥发布期间继续正常工作。仅管理员。

复制页面

POST

/

api

/

secrets

/

anon-key

/

rotate

尝试

轮换匿名密钥

cURL

```
curl --request POST \
  --url https://api.example.com/api/secrets/anon-key/rotate \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "gracePeriodHours": 168
}
'
```

200

400

403

```
{
  "success": true,
  "message": "Anon key rotated successfully. Old key will remain valid during grace period.",
  "anonKey": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
  "oldKeyExpiresAt": "2026-06-18T00:00:00.000Z"
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

[​](#body-grace-period-hours)

gracePeriodHours

integer

默认值:168

旧密钥在轮换后保持有效的时间

允许范围：`0 <= x <= 720`

#### 响应

200

application/json

匿名密钥轮换成功

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[​](#response-anon-key)

anonKey

string

新的匿名密钥

[​](#response-old-key-expires-at)

oldKeyExpiresAt

string<date-time>

旧密钥停止被接受的时间

[删除密钥](/api-reference/admin/delete-secret)[列出活动日志](/api-reference/admin/list-activity-logs)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)