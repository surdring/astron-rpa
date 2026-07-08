List Database Migrations

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/migrations \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "migrations": [
    {
      "version": "20260416170500",
      "name": "create_posts_table",
      "statements": [
        "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
      ],
      "createdAt": "2026-04-16T17:05:00.000Z"
    }
  ]
}
```

Admin

# List Database Migrations

Copy page

Copy page

GET

/

api

/

database

/

migrations

Try it

List Database Migrations

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/migrations \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "migrations": [
    {
      "version": "20260416170500",
      "name": "create_posts_table",
      "statements": [
        "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
      ],
      "createdAt": "2026-04-16T17:05:00.000Z"
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

#### Response

200 - application/json

List successful custom migrations

[​](#response-migrations)

migrations

object[]

required

Show child attributes

[Delete Table](/api-reference/admin/delete-table)[Create and Execute Database Migration](/api-reference/admin/create-and-execute-database-migration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)