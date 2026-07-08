Get database metadata

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/database \
  --header 'Authorization: Bearer <token>'
```

200

401

```
{
  "tables": [
    {
      "name": "posts",
      "recordCount": 5678
    },
    {
      "name": "comments",
      "recordCount": 9012
    }
  ],
  "totalTables": 15,
  "totalRecords": 16924,
  "databaseSize": "125 MB",
  "lastUpdated": "2024-01-21T10:30:00Z"
}
```

Admin

# Get database metadata

Copy page

Get database statistics and table information for dashboard

Copy page

GET

/

api

/

metadata

/

database

Try it

Get database metadata

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/database \
  --header 'Authorization: Bearer <token>'
```

200

401

```
{
  "tables": [
    {
      "name": "posts",
      "recordCount": 5678
    },
    {
      "name": "comments",
      "recordCount": 9012
    }
  ],
  "totalTables": 15,
  "totalRecords": 16924,
  "databaseSize": "125 MB",
  "lastUpdated": "2024-01-21T10:30:00Z"
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

200

application/json

Database metadata

[​](#response-tables)

tables

object[]

Show child attributes

[​](#response-total-tables)

totalTables

integer

[​](#response-total-records)

totalRecords

integer

[​](#response-database-size)

databaseSize

string

[​](#response-last-updated)

lastUpdated

string<date-time>

[Get app metadata](/api-reference/admin/get-app-metadata)[Get API key](/api-reference/admin/get-api-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)