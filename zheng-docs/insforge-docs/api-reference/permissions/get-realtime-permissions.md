Get Realtime Permissions

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/permissions \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "subscribe": {
    "policies": [
      {
        "policyName": "allow_authenticated_subscribe",
        "tableName": "channels",
        "command": "SELECT",
        "roles": [
          "authenticated"
        ],
        "using": "enabled = true",
        "withCheck": null
      }
    ]
  },
  "publish": {
    "policies": [
      {
        "policyName": "allow_authenticated_publish",
        "tableName": "messages",
        "command": "INSERT",
        "roles": [
          "authenticated"
        ],
        "using": null,
        "withCheck": "true"
      }
    ]
  }
}
```

Permissions

# Get Realtime Permissions

Copy page

Retrieve RLS policies for subscribe (channels) and publish (messages) operations

Copy page

GET

/

api

/

realtime

/

permissions

Try it

Get Realtime Permissions

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/permissions \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "subscribe": {
    "policies": [
      {
        "policyName": "allow_authenticated_subscribe",
        "tableName": "channels",
        "command": "SELECT",
        "roles": [
          "authenticated"
        ],
        "using": "enabled = true",
        "withCheck": null
      }
    ]
  },
  "publish": {
    "policies": [
      {
        "policyName": "allow_authenticated_publish",
        "tableName": "messages",
        "command": "INSERT",
        "roles": [
          "authenticated"
        ],
        "using": null,
        "withCheck": "true"
      }
    ]
  }
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

#### Response

200 - application/json

Realtime RLS permissions

[​](#response-subscribe)

subscribe

object

required

Show child attributes

[​](#response-publish)

publish

object

required

Show child attributes

[Get Message Statistics](/api-reference/messages/get-message-statistics)[Get Realtime Config](/api-reference/configuration/get-realtime-config)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)