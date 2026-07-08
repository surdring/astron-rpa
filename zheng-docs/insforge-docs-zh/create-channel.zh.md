创建频道

cURL

```
curl --request POST \
  --url https://api.example.com/api/realtime/channels \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "pattern": "order:%",
  "description": "Order updates channel",
  "webhookUrls": [
    "https://example.com/webhook"
  ],
  "enabled": true
}
'
```

201

400

```
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
}
```

频道

# 创建频道

复制页面

创建一个新的实时频道，包含用于订阅匹配的模式


复制页面

POST

/

api

/

realtime

/

channels

尝试

创建频道

cURL

```
curl --request POST \
  --url https://api.example.com/api/realtime/channels \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "pattern": "order:%",
  "description": "Order updates channel",
  "webhookUrls": [
    "https://example.com/webhook"
  ],
  "enabled": true
}
'
```

201

400

```
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
}
```

#### 授权

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

授权

string

header

必需

Bearer 认证头部，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 请求体

application/json

[​](#body-pattern)

pattern

string

必需

用于订阅匹配的频道模式。使用 SQL LIKE 通配符，例如 "order:%"。


最小字符串长度: `1`

Example:

`"order:%"`

[​](#body-description)

description

string

频道的可读描述


Example:

`"Order updates channel"`

[​](#body-webhook-urls)

webhookUrls

string<uri>[]

接收 webhook 通知的 URL


Example:

```
["https://example.com/webhook"]
```

[​](#body-enabled)

enabled

boolean

default:true

频道创建后是否立即激活


Example:

`true`

#### 响应

201

application/json

频道创建成功


[​](#response-id)

id

string<uuid>

必需

Unique identifier for the channel

Example:

`"550e8400-e29b-41d4-a716-446655440000"`

[​](#response-pattern)

pattern

string

必需

用于订阅匹配的频道模式。使用 SQL LIKE 通配符，例如 "order:%"。


最小字符串长度: `1`

Example:

`"order:%"`

[​](#response-enabled)

enabled

boolean

必需

频道当前是否激活


Example:

`true`

[​](#response-created-at)

createdAt

string<date-time>

必需

Timestamp when the channel was已创建


Example:

`"2024-01-15T10:30:00Z"`

[​](#response-updated-at)

updatedAt

string<date-time>

必需

Timestamp when the channel was last已更新


Example:

`"2024-01-15T10:30:00Z"`

[​](#response-description-one-of-0)

description

string | null

频道的可读描述


Example:

`"Order updates channel"`

[​](#response-webhook-urls-one-of-0)

webhookUrls

string<uri>[] | null

URLs to receive webhook notifications for messages on this channel

Example:

```
["https://example.com/webhook"]
```

[List All Channels](/api-reference/channels/list-all-channels)[Get Channel by ID](/api-reference/channels/get-channel-by-id)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)