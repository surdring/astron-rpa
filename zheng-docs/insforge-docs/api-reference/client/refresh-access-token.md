Refresh access token

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/refresh \
  --header 'Content-Type: application/json' \
  --data '
{
  "refreshToken": "<string>"
}
'
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
  },
  "accessToken": "<string>",
  "csrfToken": "<string>",
  "refreshToken": "<string>"
}
```

Client

# Refresh access token

Copy page

Refresh access token using refresh token.

* Web clients: Use httpOnly refresh token cookie with X-CSRF-Token header
* Mobile/Desktop/Server clients: Send refreshToken in request body

Copy page

POST

/

api

/

auth

/

refresh

Try it

Refresh access token

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/refresh \
  --header 'Content-Type: application/json' \
  --data '
{
  "refreshToken": "<string>"
}
'
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
  },
  "accessToken": "<string>",
  "csrfToken": "<string>",
  "refreshToken": "<string>"
}
```

#### Headers

[​](#parameter-x-csrf-token)

X-CSRF-Token

string

CSRF token received from login/register response (required for web clients only)

#### Query Parameters

[​](#parameter-client-type)

client\_type

enum<string>

default:web

Client type determines how refresh tokens are handled:

* web: Refresh token from httpOnly cookie, requires X-CSRF-Token header
* mobile/desktop/server: refreshToken provided in request body, new refreshToken returned in response

Available options:

`web`,

`mobile`,

`desktop`,

`server`

#### Body

application/json

[​](#body-refresh-token)

refreshToken

string

Refresh token (required for mobile/desktop/server clients only)

#### Response

200

application/json

Token refreshed successfully

[​](#response-user)

user

object

Show child attributes

[​](#response-access-token)

accessToken

string

[​](#response-csrf-token-one-of-0)

csrfToken

string | null

New CSRF token for subsequent refresh requests (web clients only)

[​](#response-refresh-token-one-of-0)

refreshToken

string | null

New refresh token for mobile/desktop/server clients (must be persisted for next refresh)

[User login](/api-reference/client/user-login)[Logout user](/api-reference/client/logout-user)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)