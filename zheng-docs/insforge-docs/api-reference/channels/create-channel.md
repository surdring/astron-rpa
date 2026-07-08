Create Channel

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

Channels

# Create Channel

Copy page

Create a new realtime channel with a pattern for subscription matching

Copy page

POST

/

api

/

realtime

/

channels

Try it

Create Channel

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

#### Authorizations

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

[​](#body-pattern)

pattern

string

required

Channel pattern for subscription matching. Uses SQL LIKE wildcards, for example "order:%".

Minimum string length: `1`

Example:

`"order:%"`

[​](#body-description)

description

string

Human-readable description of the channel

Example:

`"Order updates channel"`

[​](#body-webhook-urls)

webhookUrls

string<uri>[]

URLs to receive webhook notifications

Example:

```
["https://example.com/webhook"]
```

[​](#body-enabled)

enabled

boolean

default:true

Whether the channel should be active upon creation

Example:

`true`

#### Response

201

application/json

Channel created successfully

[​](#response-id)

id

string<uuid>

required

Unique identifier for the channel

Example:

`"550e8400-e29b-41d4-a716-446655440000"`

[​](#response-pattern)

pattern

string

required

Channel pattern for subscription matching. Uses SQL LIKE wildcards, for example "order:%".

Minimum string length: `1`

Example:

`"order:%"`

[​](#response-enabled)

enabled

boolean

required

Whether the channel is currently active

Example:

`true`

[​](#response-created-at)

createdAt

string<date-time>

required

Timestamp when the channel was created

Example:

`"2024-01-15T10:30:00Z"`

[​](#response-updated-at)

updatedAt

string<date-time>

required

Timestamp when the channel was last updated

Example:

`"2024-01-15T10:30:00Z"`

[​](#response-description-one-of-0)

description

string | null

Human-readable description of the channel

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