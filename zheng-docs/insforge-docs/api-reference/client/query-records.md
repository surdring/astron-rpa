Query Records

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

400

404

```
[
  {
    "id": "248373e1-0aea-45ce-8844-5ef259203749",
    "title": "Getting Started with InsForge",
    "content": "This is a guide to help you get started...",
    "createdAt": "2025-07-18T05:37:24.338Z",
    "updatedAt": "2025-07-18T05:37:24.338Z"
  },
  {
    "id": "348373e1-0aea-45ce-8844-5ef259203750",
    "title": "Advanced Database Queries",
    "content": "Learn how to write complex queries...",
    "createdAt": "2025-07-19T08:15:10.123Z",
    "updatedAt": "2025-07-19T08:15:10.123Z"
  }
]
```

Client

# Query Records

Copy page

Query records from a table with filtering, sorting, and pagination

Copy page

GET

/

api

/

database

/

records

/

{tableName}

Try it

Query Records

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

400

404

```
[
  {
    "id": "248373e1-0aea-45ce-8844-5ef259203749",
    "title": "Getting Started with InsForge",
    "content": "This is a guide to help you get started...",
    "createdAt": "2025-07-18T05:37:24.338Z",
    "updatedAt": "2025-07-18T05:37:24.338Z"
  },
  {
    "id": "348373e1-0aea-45ce-8844-5ef259203750",
    "title": "Advanced Database Queries",
    "content": "Learn how to write complex queries...",
    "createdAt": "2025-07-19T08:15:10.123Z",
    "updatedAt": "2025-07-19T08:15:10.123Z"
  }
]
```

#### Authorizations

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

[​](#parameter-table-name)

tableName

string

required

Name of the table to query

#### Query Parameters

[​](#parameter-limit)

limit

integer

default:100

Maximum number of records to return

Required range: `1 <= x <= 1000`

[​](#parameter-offset)

offset

integer

default:0

Number of records to skip for pagination

Required range: `x >= 0`

[​](#parameter-order)

order

string

Sort order (e.g., "createdAt.desc", "name.asc")

[​](#parameter-select)

select

string

Comma-separated list of columns to return

[​](#parameter-field)

field

string

Filter by field value (e.g., "?status=eq.active", "?age=gt.18")

#### Response

200

application/json

List of records

[Delete custom OAuth configuration](/api-reference/admin/delete-custom-oauth-configuration)[Create Records](/api-reference/client/create-records)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)