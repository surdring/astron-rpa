Get Model Gateway overview

cURL

```
curl --request GET \
  --url https://api.example.com/api/ai/overview \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "key": {
    "label": "<string>",
    "limit": 123,
    "limitRemaining": 123,
    "limitReset": "<string>",
    "usage": 123,
    "usageDaily": 123,
    "usageWeekly": 123,
    "usageMonthly": 123,
    "isFreeTier": true,
    "observabilityAvailable": true,
    "observabilityError": "<string>"
  },
  "charts": {
    "spend": [
      {
        "label": "<string>",
        "value": 123
      }
    ],
    "requests": [
      {
        "label": "<string>",
        "value": 123
      }
    ],
    "tokens": [
      {
        "label": "<string>",
        "value": 123
      }
    ]
  }
}
```

Admin

# Get Model Gateway overview

Copy page

Returns key-level OpenRouter usage and activity time series when the key has activity access.

Copy page

GET

/

api

/

ai

/

overview

Try it

Get Model Gateway overview

cURL

```
curl --request GET \
  --url https://api.example.com/api/ai/overview \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "key": {
    "label": "<string>",
    "limit": 123,
    "limitRemaining": 123,
    "limitReset": "<string>",
    "usage": 123,
    "usageDaily": 123,
    "usageWeekly": 123,
    "usageMonthly": 123,
    "isFreeTier": true,
    "observabilityAvailable": true,
    "observabilityError": "<string>"
  },
  "charts": {
    "spend": [
      {
        "label": "<string>",
        "value": 123
      }
    ],
    "requests": [
      {
        "label": "<string>",
        "value": 123
      }
    ],
    "tokens": [
      {
        "label": "<string>",
        "value": 123
      }
    ]
  }
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

200

application/json

Model Gateway overview

[​](#response-key)

key

object

Show child attributes

[​](#response-charts)

charts

object

Show child attributes

[Get all available AI models](/api-reference/admin/get-all-available-ai-models)[Get active OpenRouter API key](/api-reference/admin/get-active-openrouter-api-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)