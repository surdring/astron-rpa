列出活动日志

cURL

```
curl --request GET \
  --url https://api.example.com/api/logs \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  {
    "id": "log-123",
    "timestamp": "2024-01-21T10:30:00Z",
    "action": "INSERT",
    "table": "posts",
    "record_id": "post-456",
    "user_id": "user-789",
    "details": {
      "title": "New Post",
      "author": "John Doe"
    }
  },
  {
    "id": "log-124",
    "timestamp": "2024-01-21T10:31:00Z",
    "action": "LOGIN",
    "table": null,
    "record_id": null,
    "user_id": "user-789",
    "details": {
      "ip": "192.168.1.1",
      "user_agent": "Mozilla/5.0..."
    }
  }
]
```

Admin

# 列出活动日志

复制页面

复制页面

GET

/

api

/

logs

尝试

列出活动日志

cURL

```
curl --request GET \
  --url https://api.example.com/api/logs \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  {
    "id": "log-123",
    "timestamp": "2024-01-21T10:30:00Z",
    "action": "INSERT",
    "table": "posts",
    "record_id": "post-456",
    "user_id": "user-789",
    "details": {
      "title": "New Post",
      "author": "John Doe"
    }
  },
  {
    "id": "log-124",
    "timestamp": "2024-01-21T10:31:00Z",
    "action": "LOGIN",
    "table": null,
    "record_id": null,
    "user_id": "user-789",
    "details": {
      "ip": "192.168.1.1",
      "user_agent": "Mozilla/5.0..."
    }
  }
]
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 查询参数

[​](#parameter-limit)

limit

integer

默认值:100

[​](#parameter-offset)

offset

integer

默认值:0

[​](#parameter-action)

action

enum<string>

按操作类型筛选

可用选项：

`INSERT`,

`UPDATE`,

`DELETE`,

`LOGIN`

[​](#parameter-table)

table

string

#### 响应

200 - application/json

带分页的日志列表

[​](#response-items-id)

id

string

[​](#response-items-timestamp)

timestamp

string<date-time>

[​](#response-items-action)

action

enum<string>

可用选项：

`INSERT`,

`UPDATE`,

`DELETE`,

`LOGIN`

[​](#response-items-table-one-of-0)

table

string | null

[​](#response-items-record-id-one-of-0)

record\_id

string | null

[​](#response-items-user-id)

user\_id

string

[​](#response-items-details-one-of-0)

details

object | null

[轮换匿名密钥](/api-reference/admin/rotate-anon-key)[清除日志](/api-reference/admin/clear-logs)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)