List Messages

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

Messages

# List Messages

Copy page

Retrieve message history with optional filters

Copy page

GET

/

api

/

realtime

/

messages

Try it

List Messages

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

#### Authorizations

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

[​](#parameter-channel-id)

channelId

string<uuid>

Filter messages by channel ID

[​](#parameter-event-name)

eventName

string

Filter messages by event name

[​](#parameter-limit)

limit

integer

default:100

Maximum number of messages to return

Required range: `1 <= x <= 1000`

[​](#parameter-offset)

offset

integer

default:0

Number of messages to skip

Required range: `x >= 0`

#### Response

200

application/json

List of messages

[​](#response-items-id)

id

string<uuid>

required

Unique identifier for the message

Example:

`"660e8400-e29b-41d4-a716-446655440000"`

[​](#response-items-event-name)

eventName

string

required

Name of the event

Minimum string length: `1`

Example:

`"order.created"`

[​](#response-items-channel-name)

channelName

string

required

Resolved channel name (instance of the pattern)

Minimum string length: `1`

Example:

`"order:123"`

[​](#response-items-payload)

payload

object

required

Message payload data

Example:

```
{ "orderId": "123", "status": "pending" }
```

[​](#response-items-sender-type)

senderType

enum<string>

required

Type of sender that published the message

Available options:

`system`,

`user`

Example:

`"user"`

[​](#response-items-ws-audience-count)

wsAudienceCount

integer

required

Number of WebSocket clients who received the message

Required range: `x >= 0`

Example:

`5`

[​](#response-items-wh-audience-count)

whAudienceCount

integer

required

Number of webhooks that should receive the message

Required range: `x >= 0`

Example:

`1`

[​](#response-items-wh-delivered-count)

whDeliveredCount

integer

required

Number of webhooks that successfully received the message

Required range: `x >= 0`

Example:

`1`

[​](#response-items-created-at)

createdAt

string<date-time>

required

Timestamp when the message was created

Example:

`"2024-01-15T10:30:00Z"`

[​](#response-items-channel-id-one-of-0)

channelId

string<uuid> | null

ID of the channel this message belongs to

Example:

`"550e8400-e29b-41d4-a716-446655440000"`

[​](#response-items-sender-id-one-of-0)

senderId

string<uuid> | null

ID of the user who sent the message (null for system messages)

Example:

`"770e8400-e29b-41d4-a716-446655440000"`

[Delete Channel](/api-reference/channels/delete-channel)[Clear Messages](/api-reference/messages/clear-messages)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)