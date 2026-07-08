Get Message Statistics

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/messages/stats \
  --header 'Authorization: Bearer <token>'
```

200

400

```
{
  "totalMessages": 1250,
  "whDeliveryRate": 0.98,
  "topEvents": [
    {
      "eventName": "order.created",
      "count": 450
    },
    {
      "eventName": "order.updated",
      "count": 380
    },
    {
      "eventName": "order.completed",
      "count": 220
    }
  ],
  "retentionDays": null
}
```

Messages

# Get Message Statistics

Copy page

Retrieve aggregated statistics about messages

Copy page

GET

/

api

/

realtime

/

messages

/

stats

Try it

Get Message Statistics

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/messages/stats \
  --header 'Authorization: Bearer <token>'
```

200

400

```
{
  "totalMessages": 1250,
  "whDeliveryRate": 0.98,
  "topEvents": [
    {
      "eventName": "order.created",
      "count": 450
    },
    {
      "eventName": "order.updated",
      "count": 380
    },
    {
      "eventName": "order.completed",
      "count": 220
    }
  ],
  "retentionDays": null
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

#### Query Parameters

[​](#parameter-channel-id)

channelId

string<uuid>

Filter stats by channel ID

[​](#parameter-since)

since

string<date-time>

Filter stats since this timestamp

#### Response

200

application/json

Message statistics

[​](#response-total-messages)

totalMessages

integer

required

Total number of messages

Required range: `x >= 0`

Example:

`1250`

[​](#response-wh-delivery-rate)

whDeliveryRate

number

required

Webhook delivery success rate (0-1)

Required range: `0 <= x <= 1`

Example:

`0.98`

[​](#response-top-events)

topEvents

object[]

required

Most frequent event types

Show child attributes

[​](#response-retention-days-one-of-0)

retentionDays

integer | null

required

Number of days messages are retained. Null means messages are kept indefinitely.

Required range: `x >= 1`

Example:

`null`

[Clear Messages](/api-reference/messages/clear-messages)[Get Realtime Permissions](/api-reference/permissions/get-realtime-permissions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)