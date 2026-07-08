Get logs statistics

cURL

```
curl --request GET \
  --url https://api.example.com/api/logs/stats \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "actionStats": [
    {
      "action": "INSERT",
      "count": 245
    },
    {
      "action": "UPDATE",
      "count": 189
    },
    {
      "action": "DELETE",
      "count": 34
    },
    {
      "action": "LOGIN",
      "count": 567
    }
  ],
  "tableStats": [
    {
      "table_name": "posts",
      "count": 156
    },
    {
      "table_name": "comments",
      "count": 223
    }
  ],
  "recentActivity": 47,
  "totalLogs": 1035
}
```

Admin

# Get logs statistics

Copy page

Copy page

GET

/

api

/

logs

/

stats

Try it

Get logs statistics

cURL

```
curl --request GET \
  --url https://api.example.com/api/logs/stats \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "actionStats": [
    {
      "action": "INSERT",
      "count": 245
    },
    {
      "action": "UPDATE",
      "count": 189
    },
    {
      "action": "DELETE",
      "count": 34
    },
    {
      "action": "LOGIN",
      "count": 567
    }
  ],
  "tableStats": [
    {
      "table_name": "posts",
      "count": 156
    },
    {
      "table_name": "comments",
      "count": 223
    }
  ],
  "recentActivity": 47,
  "totalLogs": 1035
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

200 - application/json

Logs statistics

[​](#response-action-stats)

actionStats

object[]

Show child attributes

[​](#response-table-stats)

tableStats

object[]

Show child attributes

[​](#response-recent-activity)

recentActivity

integer

Count of logs in last 24 hours

[​](#response-total-logs)

totalLogs

integer

Total number of logs

[Clear logs](/api-reference/admin/clear-logs)[Get app metadata](/api-reference/admin/get-app-metadata)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)