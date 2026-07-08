Get Table Schema

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/tables/{tableName}/schema \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "tableName": "posts",
  "columns": [
    {
      "name": "id",
      "type": "uuid",
      "nullable": false,
      "unique": true,
      "default": "gen_random_uuid()",
      "isPrimaryKey": true
    },
    {
      "name": "title",
      "type": "string",
      "nullable": false,
      "unique": false,
      "default": null,
      "isPrimaryKey": false
    },
    {
      "name": "userId",
      "type": "uuid",
      "nullable": false,
      "unique": false,
      "default": null,
      "isPrimaryKey": false
    }
  ],
  "foreignKeys": [
    {
      "constraintName": "fk_userId_auth_users_id",
      "referenceTable": "auth.users",
      "referenceColumns": [
        {
          "sourceColumn": "userId",
          "referenceColumn": "id"
        }
      ],
      "onDelete": "CASCADE",
      "onUpdate": "CASCADE"
    }
  ]
}
```

Admin

# Get Table Schema

Copy page

Copy page

GET

/

api

/

database

/

tables

/

{tableName}

/

schema

Try it

Get Table Schema

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/tables/{tableName}/schema \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "tableName": "posts",
  "columns": [
    {
      "name": "id",
      "type": "uuid",
      "nullable": false,
      "unique": true,
      "default": "gen_random_uuid()",
      "isPrimaryKey": true
    },
    {
      "name": "title",
      "type": "string",
      "nullable": false,
      "unique": false,
      "default": null,
      "isPrimaryKey": false
    },
    {
      "name": "userId",
      "type": "uuid",
      "nullable": false,
      "unique": false,
      "default": null,
      "isPrimaryKey": false
    }
  ],
  "foreignKeys": [
    {
      "constraintName": "fk_userId_auth_users_id",
      "referenceTable": "auth.users",
      "referenceColumns": [
        {
          "sourceColumn": "userId",
          "referenceColumn": "id"
        }
      ],
      "onDelete": "CASCADE",
      "onUpdate": "CASCADE"
    }
  ]
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

Table schema

[​](#response-table-name)

table\_name

string

[​](#response-columns)

columns

object[]

Show child attributes

[​](#response-foreign-keys)

foreignKeys

object[]

Table-level foreign key constraints (one entry per constraint)

Show child attributes

[Create Table](/api-reference/admin/create-table)[Update Table Schema](/api-reference/admin/update-table-schema)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)