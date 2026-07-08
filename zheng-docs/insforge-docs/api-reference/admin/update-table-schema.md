Update Table Schema

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/database/tables/{tableName}/schema \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "addColumns": [
    {
      "columnName": "<string>",
      "isNullable": true,
      "isUnique": false,
      "defaultValue": "<string>"
    }
  ],
  "dropColumns": [
    "<string>"
  ],
  "updateColumns": [
    {
      "columnName": "<string>",
      "newColumnName": "<string>",
      "defaultValue": "<string>"
    }
  ],
  "addForeignKeys": [
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
  "dropForeignKeys": [
    "<string>"
  ]
}
'
```

200

Example

```
{
  "message": "Table schema updated successfully",
  "tableName": "posts",
  "operations": [
    "added 2 columns",
    "dropped 1 columns",
    "renamed 1 columns",
    "added 1 foreign keys",
    "dropped 1 foreign keys"
  ]
}
```

Admin

# Update Table Schema

Copy page

Copy page

PATCH

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

Update Table Schema

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/database/tables/{tableName}/schema \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "addColumns": [
    {
      "columnName": "<string>",
      "isNullable": true,
      "isUnique": false,
      "defaultValue": "<string>"
    }
  ],
  "dropColumns": [
    "<string>"
  ],
  "updateColumns": [
    {
      "columnName": "<string>",
      "newColumnName": "<string>",
      "defaultValue": "<string>"
    }
  ],
  "addForeignKeys": [
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
  "dropForeignKeys": [
    "<string>"
  ]
}
'
```

200

Example

```
{
  "message": "Table schema updated successfully",
  "tableName": "posts",
  "operations": [
    "added 2 columns",
    "dropped 1 columns",
    "renamed 1 columns",
    "added 1 foreign keys",
    "dropped 1 foreign keys"
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

#### Body

application/json

[​](#body-add-columns)

addColumns

object[]

Add new columns to the table

Show child attributes

[​](#body-drop-columns)

dropColumns

string[]

Remove columns from the table

Name of the column to drop

[​](#body-update-columns)

updateColumns

object[]

Modify existing columns (rename or change default)

Show child attributes

[​](#body-add-foreign-keys)

addForeignKeys

object[]

Add foreign key constraints (one entry per constraint; composite keys list multiple column mappings)

Show child attributes

[​](#body-drop-foreign-keys)

dropForeignKeys

string[]

Constraint names of foreign keys to drop

Name of the foreign key constraint to drop

[​](#body-rename-table)

renameTable

object

Rename the table

Show child attributes

#### Response

200

application/json

Table schema updated successfully

[​](#response-message)

message

string

Success message

[​](#response-table-name)

tableName

string

Name of the updated table

[​](#response-operations)

operations

string[]

List of operations performed

[Get Table Schema](/api-reference/admin/get-table-schema)[Delete Table](/api-reference/admin/delete-table)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)