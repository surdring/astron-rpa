List all users (admin only)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/users \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "data": [
    {
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "email": "jsmith@example.com",
      "profile": {
        "name": "<string>",
        "avatar_url": "<string>"
      },
      "metadata": {},
      "emailVerified": true,
      "providers": [
        "<string>"
      ],
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "pagination": {
    "offset": 123,
    "limit": 123,
    "total": 123
  }
}
```

Admin

# List all users (admin only)

Copy page

Returns paginated list of users

Copy page

GET

/

api

/

auth

/

users

Try it

List all users (admin only)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/users \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "data": [
    {
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "email": "jsmith@example.com",
      "profile": {
        "name": "<string>",
        "avatar_url": "<string>"
      },
      "metadata": {},
      "emailVerified": true,
      "providers": [
        "<string>"
      ],
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "pagination": {
    "offset": 123,
    "limit": 123,
    "total": 123
  }
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

[​](#parameter-offset)

offset

string

default:0

Number of records to skip

[​](#parameter-limit)

limit

string

default:10

Maximum number of records to return

[​](#parameter-search)

search

string

Search by email or name

#### Response

200

application/json

List of users

[​](#response-data)

data

object[]

Show child attributes

[​](#response-pagination)

pagination

object

Show child attributes

[Update authentication configuration](/api-reference/admin/update-authentication-configuration)[Delete users (admin only)](/api-reference/admin/delete-users-admin-only)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)