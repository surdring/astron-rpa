Verify email with code

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/verify \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "otp": "123456"
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

# Verify email with code

Copy page

Verify email address with a 6-digit code.

Successfully verified users will receive a session token.

Browser email clicks should use `GET /api/auth/email/verify-link`.
`POST /api/auth/email/verify` is the JSON API for 6-digit code submission.

Copy page

POST

/

api

/

auth

/

email

/

verify

Try it

Verify email with code

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/verify \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "otp": "123456"
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

User email address

Example:

`"user@example.com"`

[​](#body-otp)

otp

string

required

6-digit verification code

Pattern: `^\d{6}$`

Example:

`"123456"`

#### Response

200

application/json

Email verified successfully, session created

[​](#response-user)

user

object

Show child attributes

[​](#response-access-token)

accessToken

string

JWT authentication token

[​](#response-csrf-token-one-of-0)

csrfToken

string | null

CSRF token for use with refresh endpoint (web clients only)

[​](#response-refresh-token-one-of-0)

refreshToken

string | null

Refresh token for mobile/desktop/server clients (null for web clients)

[Verify email from browser link click](/api-reference/client/verify-email-from-browser-link-click)[Send password reset (code or link based on config)](/api-reference/client/send-password-reset-code-or-link-based-on-config)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)