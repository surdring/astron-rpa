Delete Records

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

records\_deleted

```
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Deleted Post",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-21T11:00:00Z"
  }
]
```

Client

# Delete Records

Copy page

Delete records matching query filters

Copy page

DELETE

/

api

/

database

/

records

/

{tableName}

Try it

Delete Records

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

records\_deleted

```
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Deleted Post",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-21T11:00:00Z"
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

#### Headers

[​](#parameter-prefer)

Prefer

enum<string>

Include to return deleted records in response

Available options:

`return=representation`

#### Path Parameters

[​](#parameter-table-name)

tableName

string

required

Name of the table

#### Query Parameters

[​](#parameter-id)

id

string

Filter records by ID (e.g., "?id=eq.123e4567-e89b-12d3-a456-426614174000")

#### Response

200

application/json

Records deleted (with Prefer header)

[Create Records](/api-reference/client/create-records)[Update Records](/api-reference/client/update-records)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)