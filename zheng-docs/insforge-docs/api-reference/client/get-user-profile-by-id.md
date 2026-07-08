Get user profile by ID

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/profiles/{userId}
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "profile": {
    "name": "<string>",
    "avatar_url": "<string>"
  }
}
```

Client

# Get user profile by ID

Copy page

Get public profile information for a user by their ID (public endpoint)

Copy page

GET

/

api

/

auth

/

profiles

/

{userId}

Try it

Get user profile by ID

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/profiles/{userId}
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "profile": {
    "name": "<string>",
    "avatar_url": "<string>"
  }
}
```

#### Path Parameters

[​](#parameter-user-id)

userId

string<uuid>

required

User ID

#### Response

200

application/json

User profile

[​](#response-id)

id

string<uuid>

User ID

[​](#response-profile-one-of-0)

profile

object | null

User profile data (can contain custom fields)

Show child attributes

[Update current user's profile](/api-reference/client/update-current-users-profile)[Register new user](/api-reference/client/register-new-user)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)