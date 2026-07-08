List All Channels

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

Channels

# List All Channels

Copy page

Retrieve all configured realtime channels

Copy page

GET

/

api

/

realtime

/

channels

Try it

List All Channels

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

#### Authorizations

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

200 - application/json

List of channels

[​](#response-items-id)

id

string<uuid>

required

Unique identifier for the channel

Example:

`"550e8400-e29b-41d4-a716-446655440000"`

[​](#response-items-pattern)

pattern

string

required

Channel pattern for subscription matching. Uses SQL LIKE wildcards, for example "order:%".

Minimum string length: `1`

Example:

`"order:%"`

[​](#response-items-enabled)

enabled

boolean

required

Whether the channel is currently active

Example:

`true`

[​](#response-items-created-at)

createdAt

string<date-time>

required

Timestamp when the channel was created

Example:

`"2024-01-15T10:30:00Z"`

[​](#response-items-updated-at)

updatedAt

string<date-time>

required

Timestamp when the channel was last updated

Example:

`"2024-01-15T10:30:00Z"`

[​](#response-items-description-one-of-0)

description

string | null

Human-readable description of the channel

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