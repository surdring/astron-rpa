Get current session

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/sessions/current \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "user": {
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
}
```

Client

# Get current session

Copy page

Returns the currently authenticated user’s basic info from the access token.
Project admin tokens return a projectAdmin session object instead of an auth.users row.

This endpoint does not refresh expired access tokens by itself.
For browser apps using the TypeScript SDK, call `auth.getCurrentUser()`
during startup. The SDK will use the httpOnly refresh cookie automatically
when it can refresh the session. Server, mobile, and other non-browser
clients should call `/api/auth/refresh` explicitly.

Copy page

GET

/

api

/

auth

/

sessions

/

current

Try it

Get current session

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/sessions/current \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "user": {
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
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

200

application/json

Current session info

* Option 1
* Option 2

[​](#response-one-of-0-user)

user

object

required

Show child attributes

[Logout user](/api-reference/client/logout-user)[Send email verification (code or link based on config)](/api-reference/client/send-email-verification-code-or-link-based-on-config)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)