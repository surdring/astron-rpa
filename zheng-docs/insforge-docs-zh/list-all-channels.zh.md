列出所有频道

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/channels \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "pattern": "order:%",
    "description": "Order updates channel",
    "webhookUrls": [
      "https://example.com/webhook"
    ],
    "enabled": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "pattern": "chat:%",
    "description": "Chat room messages",
    "webhookUrls": null,
    "enabled": true,
    "createdAt": "2024-01-16T11:00:00Z",
    "updatedAt": "2024-01-16T11:00:00Z"
  }
]
```

频道

# 列出所有频道

复制页面

获取所有已配置的实时频道


复制页面

GET

/

api

/

realtime

/

channels

尝试

列出所有频道

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/channels \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "pattern": "order:%",
    "description": "Order updates channel",
    "webhookUrls": [
      "https://example.com/webhook"
    ],
    "enabled": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "pattern": "chat:%",
    "description": "Chat room messages",
    "webhookUrls": null,
    "enabled": true,
    "createdAt": "2024-01-16T11:00:00Z",
    "updatedAt": "2024-01-16T11:00:00Z"
  }
]
```

#### 授权

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

授权

string

header

必需

Bearer 认证头部，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 响应

200 - application/json

频道列表


[​](#response-items-id)

id

string<uuid>

必需

Unique identifier for the channel

Example:

`"550e8400-e29b-41d4-a716-446655440000"`

[​](#response-items-pattern)

pattern

string

必需

用于订阅匹配的频道模式。使用 SQL LIKE 通配符，例如 "order:%"。


最小字符串长度: `1`

Example:

`"order:%"`

[​](#response-items-enabled)

enabled

boolean

必需

频道当前是否激活


Example:

`true`

[​](#response-items-created-at)

createdAt

string<date-time>

必需

Timestamp when the channel was已创建


Example:

`"2024-01-15T10:30:00Z"`

[​](#response-items-updated-at)

updatedAt

string<date-time>

必需

Timestamp when the channel was last已更新


Example:

`"2024-01-15T10:30:00Z"`

[​](#response-items-description-one-of-0)

description

string | null

频道的可读描述


Example:

`"Order updates channel"`

[​](#response-items-webhook-urls-one-of-0)

webhookUrls

string<uri>[] | null

URLs to receive webhook notifications for messages on this channel

Example:

```
["https://example.com/webhook"]
```

[Execute function (PATCH)](/api-reference/client/execute-function-patch)[Create Channel](/api-reference/channels/create-channel)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)