Update current user's profile

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/auth/profiles/current \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "profile": {
    "name": "<string>",
    "avatar_url": "<string>"
  }
}
'
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

# Update current user's profile

Copy page

Update the profile of the currently authenticated user

Copy page

PATCH

/

api

/

auth

/

profiles

/

current

Try it

Update current user's profile

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/auth/profiles/current \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "profile": {
    "name": "<string>",
    "avatar_url": "<string>"
  }
}
'
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

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

[​](#body-profile)

profile

object

required

Profile data (name, avatar\_url, and any custom fields)

Show child attributes

#### Response

200

application/json

Profile updated successfully

[​](#response-id)

id

string<uuid>

User ID

[​](#response-profile-one-of-0)

profile

object | null

User profile data (can contain custom fields)

Show child attributes

[Get public authentication configuration](/api-reference/client/get-public-authentication-configuration)[Get user profile by ID](/api-reference/client/get-user-profile-by-id)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)