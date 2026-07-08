Delete Table

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/database/tables/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "message": "Table deleted successfully",
  "tableName": "posts"
}
```

Admin

# Delete Table

Copy page

Copy page

DELETE

/

api

/

database

/

tables

/

{tableName}

Try it

Delete Table

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/database/tables/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "message": "Table deleted successfully",
  "tableName": "posts"
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

#### Path Parameters

[​](#parameter-table-name)

tableName

string

required

#### Response

200

application/json

Table deleted

[​](#response-message)

message

string

[​](#response-table-name)

table\_name

string

[Update Table Schema](/api-reference/admin/update-table-schema)[List Database Migrations](/api-reference/admin/list-database-migrations)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)