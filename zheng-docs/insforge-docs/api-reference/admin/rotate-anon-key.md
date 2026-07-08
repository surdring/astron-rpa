Rotate anon key

cURL

```
curl --request POST \
  --url https://api.example.com/api/secrets/anon-key/rotate \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "gracePeriodHours": 168
}
'
```

200

400

403

```
{
  "success": true,
  "message": "Anon key rotated successfully. Old key will remain valid during grace period.",
  "anonKey": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
  "oldKeyExpiresAt": "2026-06-18T00:00:00.000Z"
}
```

Admin

# Rotate anon key

Copy page

Rotate the project’s opaque anon key (`anon_...`). A new key is generated and returned; the old key stays valid for the grace period (default 168 hours / 7 days, max 720) so already-deployed frontends and mobile binaries keep working while the new key ships. Admin only.

Copy page

POST

/

api

/

secrets

/

anon-key

/

rotate

Try it

Rotate anon key

cURL

```
curl --request POST \
  --url https://api.example.com/api/secrets/anon-key/rotate \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "gracePeriodHours": 168
}
'
```

200

400

403

```
{
  "success": true,
  "message": "Anon key rotated successfully. Old key will remain valid during grace period.",
  "anonKey": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
  "oldKeyExpiresAt": "2026-06-18T00:00:00.000Z"
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

[​](#body-grace-period-hours)

gracePeriodHours

integer

default:168

How long the old key remains valid after rotation

Required range: `0 <= x <= 720`

#### Response

200

application/json

Anon key rotated successfully

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[​](#response-anon-key)

anonKey

string

The new anon key

[​](#response-old-key-expires-at)

oldKeyExpiresAt

string<date-time>

When the previous key stops being accepted

[Delete secret](/api-reference/admin/delete-secret)[List activity logs](/api-reference/admin/list-activity-logs)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)