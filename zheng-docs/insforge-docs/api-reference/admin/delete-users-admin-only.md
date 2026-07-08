Delete users (admin only)

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/users \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "userIds": [
    "<string>"
  ]
}
'
```

200

```
{
  "message": "<string>",
  "deletedCount": 123
}
```

Admin

# Delete users (admin only)

Copy page

Delete multiple users by their IDs

Copy page

DELETE

/

api

/

auth

/

users

Try it

Delete users (admin only)

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/users \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "userIds": [
    "<string>"
  ]
}
'
```

200

```
{
  "message": "<string>",
  "deletedCount": 123
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

[​](#body-user-ids)

userIds

string[]

required

#### Response

200

application/json

Users deleted successfully

[​](#response-message)

message

string

[​](#response-deleted-count)

deletedCount

integer

[List all users (admin only)](/api-reference/admin/list-all-users-admin-only)[Get specific user](/api-reference/admin/get-specific-user)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)