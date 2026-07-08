Create Records

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
[
  {
    "title": "My First Post",
    "content": "Hello world! This is my first post.",
    "published": true
  }
]
'
```

201

without\_prefer

```
[]
```

Client

# Create Records

Copy page

Create one or more records. Request body MUST be an array.

Copy page

POST

/

api

/

database

/

records

/

{tableName}

Try it

Create Records

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
[
  {
    "title": "My First Post",
    "content": "Hello world! This is my first post.",
    "published": true
  }
]
'
```

201

without\_prefer

```
[]
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

Include to return created records in response (otherwise returns empty array)

Available options:

`return=representation`

#### Path Parameters

[​](#parameter-table-name)

tableName

string

required

Name of the table

#### Body

application/json

Minimum array length: `1`

#### Response

201

application/json

Records created

[Query Records](/api-reference/client/query-records)[Delete Records](/api-reference/client/delete-records)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)