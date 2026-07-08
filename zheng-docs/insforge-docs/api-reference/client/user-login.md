User login

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/sessions \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "jsmith@example.com",
  "password": "<string>"
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

# User login

Copy page

Authenticates user and returns access token. For web clients, sets httpOnly refresh token cookie. For mobile/desktop/server clients, returns refreshToken in response body.

Copy page

POST

/

api

/

auth

/

sessions

Try it

User login

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/sessions \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "jsmith@example.com",
  "password": "<string>"
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

#### Query Parameters

[​](#parameter-client-type)

client\_type

enum<string>

default:web

Client type determines how refresh tokens are returned:

* web: Refresh token stored in httpOnly cookie, csrfToken returned in response
* mobile/desktop/server: refreshToken returned directly in response body

Available options:

`web`,

`mobile`,

`desktop`,

`server`

#### Body

application/json

[​](#body-email)

email

string<email>

required

[​](#body-password)

password

string

required

#### Response

200

application/json

Login successful

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

CSRF token for use with refresh endpoint (web clients only)

[​](#response-refresh-token-one-of-0)

refreshToken

string | null

Refresh token for mobile/desktop/server clients (null for web clients)

[Register new user](/api-reference/client/register-new-user)[Refresh access token](/api-reference/client/refresh-access-token)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)