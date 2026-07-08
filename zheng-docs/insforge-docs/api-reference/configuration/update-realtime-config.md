cURL

retainFor90Days

```
curl --request PATCH \
  --url https://api.example.com/api/realtime/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "retentionDays": 90
}
'
```

200

400

```
{
  "message": "Retention config updated successfully"
}
```

Configuration

# Update Realtime Config

Copy page

Update realtime message retention configuration

Copy page

PATCH

/

api

/

realtime

/

config

Try it

cURL

retainFor90Days

```
curl --request PATCH \
  --url https://api.example.com/api/realtime/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "retentionDays": 90
}
'
```

200

400

```
{
  "message": "Retention config updated successfully"
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

[​](#body-retention-days-one-of-0)

retentionDays

integer | null

required

Number of days messages are retained. Null means messages are kept indefinitely.

Required range: `x >= 1`

Example:

`90`

#### Response

200

application/json

Realtime configuration updated

[​](#response-message)

message

string

required

[Get Realtime Config](/api-reference/configuration/get-realtime-config)[Send raw HTML email](/api-reference/client/send-raw-html-email)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)