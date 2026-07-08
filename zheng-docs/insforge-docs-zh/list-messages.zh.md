列出消息

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/messages \
  --header 'Authorization: Bearer <token>'
```

200

400

```
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "eventName": "order.created",
    "channelId": "550e8400-e29b-41d4-a716-446655440000",
    "channelName": "order:123",
    "payload": {
      "orderId": "123",
      "status": "pending"
    },
    "senderType": "user",
    "senderId": "770e8400-e29b-41d4-a716-446655440000",
    "wsAudienceCount": 5,
    "whAudienceCount": 1,
    "whDeliveredCount": 1,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

消息

# 列出消息

复制页面

获取消息历史记录，支持可选筛选条件


复制页面

GET

/

api

/

realtime

/

messages

尝试

列出消息

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/messages \
  --header 'Authorization: Bearer <token>'
```

200

400

```
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "eventName": "order.created",
    "channelId": "550e8400-e29b-41d4-a716-446655440000",
    "channelName": "order:123",
    "payload": {
      "orderId": "123",
      "status": "pending"
    },
    "senderType": "user",
    "senderId": "770e8400-e29b-41d4-a716-446655440000",
    "wsAudienceCount": 5,
    "whAudienceCount": 1,
    "whDeliveredCount": 1,
    "createdAt": "2024-01-15T10:30:00Z"
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

#### 查询参数

[​](#parameter-channel-id)

channelId

string<uuid>

按频道 ID 筛选消息


[​](#parameter-event-name)

eventName

string

按事件名称筛选消息


[​](#parameter-limit)

limit

integer

default:100

返回的最大消息数


所需范围: `1 <= x <= 1000`

[​](#parameter-offset)

offset

integer

default:0

跳过的消息数量


所需范围: `x >= 0`

#### 响应

200

application/json

消息列表


[​](#response-items-id)

id

string<uuid>

必需

消息的唯一标识符


Example:

`"660e8400-e29b-41d4-a716-446655440000"`

[​](#response-items-event-name)

eventName

string

必需

事件名称


最小字符串长度: `1`

Example:

`"order.created"`

[​](#response-items-channel-name)

channelName

string

必需

解析后的频道名称（模式的实例）


最小字符串长度: `1`

Example:

`"order:123"`

[​](#response-items-payload)

payload

object

必需

消息负载数据


Example:

```
{ "orderId": "123", "status": "pending" }
```

[​](#response-items-sender-type)

senderType

enum<string>

必需

发布消息的发送者类型


可用选项:

`system`,

`user`

Example:

`"user"`

[​](#response-items-ws-audience-count)

wsAudienceCount

integer

必需

接收到消息的 WebSocket 客户端数量


所需范围: `x >= 0`

Example:

`5`

[​](#response-items-wh-audience-count)

whAudienceCount

integer

必需

应接收消息的 webhook 数量


所需范围: `x >= 0`

Example:

`1`

[​](#response-items-wh-delivered-count)

whDeliveredCount

integer

必需

成功接收消息的 webhook 数量


所需范围: `x >= 0`

Example:

`1`

[​](#response-items-created-at)

createdAt

string<date-time>

必需

消息创建时的时间戳


Example:

`"2024-01-15T10:30:00Z"`

[​](#response-items-channel-id-one-of-0)

channelId

string<uuid> | null

此消息所属频道的 ID


Example:

`"550e8400-e29b-41d4-a716-446655440000"`

[​](#response-items-sender-id-one-of-0)

senderId

string<uuid> | null

发送消息的用户 ID（系统消息为 null）


Example:

`"770e8400-e29b-41d4-a716-446655440000"`

[Delete Channel](/api-reference/channels/delete-channel)[Clear Messages](/api-reference/messages/clear-messages)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)