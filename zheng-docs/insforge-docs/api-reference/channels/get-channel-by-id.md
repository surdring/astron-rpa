Get Channel by ID

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/channels/{id} \
  --header 'Authorization: Bearer <token>'
```

200

404

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

# Get Channel by ID

Copy page

Retrieve a specific channel by its UUID

Copy page

GET

/

api

/

realtime

/

channels

/

{id}

Try it

Get Channel by ID

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/channels/{id} \
  --header 'Authorization: Bearer <token>'
```

200

404

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

#### Path Parameters

[​](#parameter-id)

id

string<uuid>

required

#### Response

200

application/json

Channel details

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

[Create Channel](/api-reference/channels/create-channel)[Update Channel](/api-reference/channels/update-channel)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)