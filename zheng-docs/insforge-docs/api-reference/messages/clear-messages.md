Clear Messages

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/realtime/messages \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "deleted": 42
}
```

Messages

# Clear Messages

Copy page

Permanently delete all stored realtime messages

Copy page

DELETE

/

api

/

realtime

/

messages

Try it

Clear Messages

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/realtime/messages \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "deleted": 42
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

Messages cleared

[​](#response-deleted)

deleted

integer

required

Number of realtime messages deleted

Required range: `x >= 0`

Example:

`42`

[List Messages](/api-reference/messages/list-messages)[Get Message Statistics](/api-reference/messages/get-message-statistics)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)