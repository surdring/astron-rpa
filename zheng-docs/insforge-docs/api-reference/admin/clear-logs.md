Clear logs

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/logs \
  --header 'Authorization: Bearer <token>'
```

200

400

```
{
  "message": "Logs cleared successfully",
  "deleted_count": 150
}
```

Admin

# Clear logs

Copy page

Copy page

DELETE

/

api

/

logs

Try it

Clear logs

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/logs \
  --header 'Authorization: Bearer <token>'
```

200

400

```
{
  "message": "Logs cleared successfully",
  "deleted_count": 150
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

[​](#parameter-before)

before

string<date-time>

#### Response

200

application/json

Logs cleared

[​](#response-message)

message

string

[​](#response-deleted-count)

deleted\_count

integer

[List activity logs](/api-reference/admin/list-activity-logs)[Get logs statistics](/api-reference/admin/get-logs-statistics)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)