List Tables

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/tables \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  "posts",
  "comments",
  "categories"
]
```

Admin

# List Tables

Copy page

Copy page

GET

/

api

/

database

/

tables

Try it

List Tables

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/tables \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  "posts",
  "comments",
  "categories"
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

#### Response

200 - application/json

List of table names

[Create Table](/api-reference/admin/create-table)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)