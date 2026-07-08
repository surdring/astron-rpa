Register new user

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/users \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "redirectTo": "<string>"
}
'
```

200

403

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
  "refreshToken": "<string>",
  "requireEmailVerification": true
}
```

Client

# Register new user

Copy page

Creates a new user account

Copy page

POST

/

api

/

auth

/

users

Try it

Register new user

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/users \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "redirectTo": "<string>"
}
'
```

200

403

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
  "refreshToken": "<string>",
  "requireEmailVerification": true
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

Example:

`"user@example.com"`

[​](#body-password)

password

string

required

Password meeting configured requirements (check /api/auth/email/config for current requirements)

Example:

`"securepassword123"`

[​](#body-name)

name

string

Example:

`"John Doe"`

[​](#body-redirect-to)

redirectTo

string<uri>

Used for link-based email verification. The email link always opens an InsForge backend endpoint first; after the token is verified, InsForge redirects the browser to this URL. This URL must be included in allowedRedirectUrls. Recommended: use your app's sign-in page.

#### Response

200

application/json

User created successfully

[​](#response-user)

user

object

Show child attributes

[​](#response-access-token-one-of-0)

accessToken

string | null

JWT authentication token (null if email verification required)

[​](#response-csrf-token-one-of-0)

csrfToken

string | null

CSRF token for use with refresh endpoint (web clients only, null if email verification required)

[​](#response-refresh-token-one-of-0)

refreshToken

string | null

Refresh token for mobile/desktop/server clients (null for web clients or if email verification required)

[​](#response-require-email-verification)

requireEmailVerification

boolean

Whether email verification is required before login

[Get user profile by ID](/api-reference/client/get-user-profile-by-id)[User login](/api-reference/client/user-login)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)