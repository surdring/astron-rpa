Get Realtime Config

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "retentionDays": null
}
```

Configuration

# Get Realtime Config

Copy page

Retrieve realtime message retention configuration

Copy page

GET

/

api

/

realtime

/

config

Try it

Get Realtime Config

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
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

#### Response

200 - application/json

Realtime configuration

[​](#response-retention-days-one-of-0)

retentionDays

integer | null

required

Number of days messages are retained. Null means messages are kept indefinitely.

Required range: `x >= 1`

Example:

`null`

[Get Realtime Permissions](/api-reference/permissions/get-realtime-permissions)[Update Realtime Config](/api-reference/configuration/update-realtime-config)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)