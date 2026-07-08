Exchange OAuth code for tokens (PKCE)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/exchange \
  --header 'Content-Type: application/json' \
  --data '
{
  "code": "abc123...",
  "code_verifier": "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
}
'
```

200

400

401

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
  "refreshToken": "<string>"
}
```

Client

# Exchange OAuth code for tokens (PKCE)

Copy page

Exchange the insforge\_code (received from OAuth callback) for access and refresh tokens.

This endpoint is used for PKCE flow in mobile/desktop/server clients:

1. After OAuth callback, your redirect\_uri receives `insforge_code` parameter
2. Call this endpoint with the code and your original code\_verifier
3. Receive access token and refresh token in response

The code\_verifier must match the code\_challenge sent during OAuth initiation.

Copy page

POST

/

api

/

auth

/

oauth

/

exchange

Try it

Exchange OAuth code for tokens (PKCE)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/exchange \
  --header 'Content-Type: application/json' \
  --data '
{
  "code": "abc123...",
  "code_verifier": "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
}
'
```

200

400

401

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

[​](#body-code)

code

string

required

The insforge\_code received from OAuth callback redirect

Example:

`"abc123..."`

[​](#body-code-verifier)

code\_verifier

string

required

The original code\_verifier used to generate code\_challenge.
Must be 43-128 characters, using [A-Za-z0-9-.\_~]

Example:

`"dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"`

#### Response

200

application/json

Tokens exchanged successfully

[​](#response-user)

user

object

Show child attributes

[​](#response-access-token)

accessToken

string

JWT access token for API authentication

[​](#response-refresh-token)

refreshToken

string

Refresh token for obtaining new access tokens

[Initiate OAuth flow (PKCE)](/api-reference/client/initiate-oauth-flow-pkce)[Shared OAuth callback handler](/api-reference/client/shared-oauth-callback-handler)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)