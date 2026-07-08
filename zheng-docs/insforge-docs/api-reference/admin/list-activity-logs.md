List activity logs

cURL

```
curl --request GET \
  --url https://api.example.com/api/logs \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  {
    "id": "log-123",
    "timestamp": "2024-01-21T10:30:00Z",
    "action": "INSERT",
    "table": "posts",
    "record_id": "post-456",
    "user_id": "user-789",
    "details": {
      "title": "New Post",
      "author": "John Doe"
    }
  },
  {
    "id": "log-124",
    "timestamp": "2024-01-21T10:31:00Z",
    "action": "LOGIN",
    "table": null,
    "record_id": null,
    "user_id": "user-789",
    "details": {
      "ip": "192.168.1.1",
      "user_agent": "Mozilla/5.0..."
    }
  }
]
```

Admin

# List activity logs

Copy page

Copy page

GET

/

api

/

logs

Try it

List activity logs

cURL

```
curl --request GET \
  --url https://api.example.com/api/logs \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  {
    "id": "log-123",
    "timestamp": "2024-01-21T10:30:00Z",
    "action": "INSERT",
    "table": "posts",
    "record_id": "post-456",
    "user_id": "user-789",
    "details": {
      "title": "New Post",
      "author": "John Doe"
    }
  },
  {
    "id": "log-124",
    "timestamp": "2024-01-21T10:31:00Z",
    "action": "LOGIN",
    "table": null,
    "record_id": null,
    "user_id": "user-789",
    "details": {
      "ip": "192.168.1.1",
      "user_agent": "Mozilla/5.0..."
    }
  }
]
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

[​](#parameter-limit)

limit

integer

default:100

[​](#parameter-offset)

offset

integer

default:0

[​](#parameter-action)

action

enum<string>

Filter by action type

Available options:

`INSERT`,

`UPDATE`,

`DELETE`,

`LOGIN`

[​](#parameter-table)

table

string

#### Response

200 - application/json

List of logs with pagination

[​](#response-items-id)

id

string

[​](#response-items-timestamp)

timestamp

string<date-time>

[​](#response-items-action)

action

enum<string>

Available options:

`INSERT`,

`UPDATE`,

`DELETE`,

`LOGIN`

[​](#response-items-table-one-of-0)

table

string | null

[​](#response-items-record-id-one-of-0)

record\_id

string | null

[​](#response-items-user-id)

user\_id

string

[​](#response-items-details-one-of-0)

details

object | null

[Rotate anon key](/api-reference/admin/rotate-anon-key)[Clear logs](/api-reference/admin/clear-logs)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)