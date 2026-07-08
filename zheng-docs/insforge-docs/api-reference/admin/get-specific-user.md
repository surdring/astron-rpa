Get specific user

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/users/{userId} \
  --header 'Authorization: Bearer <token>'
```

200

```
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
```

Admin

# Get specific user

Copy page

Get user details by ID (admin only)

Copy page

GET

/

api

/

auth

/

users

/

{userId}

Try it

Get specific user

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/users/{userId} \
  --header 'Authorization: Bearer <token>'
```

200

```
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
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

[​](#parameter-user-id)

userId

string<uuid>

required

User ID

#### Response

200

application/json

User details

[​](#response-id)

id

string<uuid>

[​](#response-email)

email

string<email>

[​](#response-profile-one-of-0)

profile

object | null

User profile data (name, avatar\_url, and custom fields)

Show child attributes

[​](#response-metadata-one-of-0)

metadata

object | null

System metadata (device ID, login IP, etc.)

[​](#response-email-verified)

emailVerified

boolean

[​](#response-providers)

providers

string[]

[​](#response-created-at)

createdAt

string<date-time>

[​](#response-updated-at)

updatedAt

string<date-time>

[Delete users (admin only)](/api-reference/admin/delete-users-admin-only)[Admin login](/api-reference/admin/admin-login)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)