Update Records

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "title": "Updated Post Title",
  "content": "This content has been updated."
}
'
```

200

without\_prefer

```
[]
```

Client

# Update Records

Copy page

Update records matching query filters

Copy page

PATCH

/

api

/

database

/

records

/

{tableName}

Try it

Update Records

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "title": "Updated Post Title",
  "content": "This content has been updated."
}
'
```

200

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

Include to return updated records in response

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

#### Body

application/json

The body is of type `object`.

#### Response

200

application/json

Records updated

[Delete Records](/api-reference/client/delete-records)[List All Buckets](/api-reference/admin/list-all-buckets)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)