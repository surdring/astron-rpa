Create Table

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/tables \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "tableName": "<string>",
  "columns": [
    {
      "name": "<string>",
      "nullable": true,
      "unique": true,
      "defaultValue": "<string>"
    }
  ],
  "foreignKeys": [
    {
      "referenceTable": "<string>",
      "referenceColumns": [
        {
          "sourceColumn": "<string>",
          "referenceColumn": "<string>"
        }
      ],
      "constraintName": "<string>"
    }
  ],
  "rlsEnabled": false
}
'
```

201

400

422

```
{
  "message": "Table created successfully",
  "tableName": "posts"
}
```

Admin

# Create Table

Copy page

Copy page

POST

/

api

/

database

/

tables

Try it

Create Table

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/tables \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "tableName": "<string>",
  "columns": [
    {
      "name": "<string>",
      "nullable": true,
      "unique": true,
      "defaultValue": "<string>"
    }
  ],
  "foreignKeys": [
    {
      "referenceTable": "<string>",
      "referenceColumns": [
        {
          "sourceColumn": "<string>",
          "referenceColumn": "<string>"
        }
      ],
      "constraintName": "<string>"
    }
  ],
  "rlsEnabled": false
}
'
```

201

400

422

```
{
  "message": "Table created successfully",
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

#### Body

application/json

[​](#body-table-name)

tableName

string

required

[​](#body-columns)

columns

object[]

required

Show child attributes

[​](#body-foreign-keys)

foreignKeys

object[]

Table-level foreign key constraints

Show child attributes

[​](#body-rls-enabled)

rlsEnabled

boolean

default:false

Enable Row Level Security on the table

#### Response

201

application/json

Table created

[​](#response-message)

message

string

[​](#response-table-name)

table\_name

string

[List Tables](/api-reference/admin/list-tables)[Get Table Schema](/api-reference/admin/get-table-schema)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)