Get authentication configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "allowedRedirectUrls": [
    "<string>"
  ],
  "disableSignup": true,
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

Admin

# Get authentication configuration

Copy page

Get current authentication settings including all configuration options (admin only)

Copy page

GET

/

api

/

auth

/

config

Try it

Get authentication configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "allowedRedirectUrls": [
    "<string>"
  ],
  "disableSignup": true,
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

#### Response

200

application/json

Authentication configuration

[​](#response-id)

id

string<uuid>

[​](#response-require-email-verification)

requireEmailVerification

boolean

[​](#response-password-min-length)

passwordMinLength

integer

Required range: `4 <= x <= 128`

[​](#response-require-number)

requireNumber

boolean

[​](#response-require-lowercase)

requireLowercase

boolean

[​](#response-require-uppercase)

requireUppercase

boolean

[​](#response-require-special-char)

requireSpecialChar

boolean

[​](#response-verify-email-method)

verifyEmailMethod

enum<string>

Method for email verification (code = 6-digit OTP, link = magic link)

Available options:

`code`,

`link`

[​](#response-reset-password-method)

resetPasswordMethod

enum<string>

Method for password reset (code = 6-digit OTP + exchange flow, link = magic link)

Available options:

`code`,

`link`

[​](#response-allowed-redirect-urls)

allowedRedirectUrls

string[]

List of allowed URLs for authentication redirects. If empty, all redirects are allowed for smoother development UX. This is not recommended in production.

[​](#response-disable-signup)

disableSignup

boolean

When true, public sign-up endpoints (POST /api/auth/users and first-time OAuth) are rejected with 403 AUTH\_SIGNUP\_DISABLED. Admin-authenticated user creation is unaffected.

[​](#response-created-at)

createdAt

string<date-time>

[​](#response-updated-at)

updatedAt

string<date-time>

[Custom OAuth callback (GET)](/api-reference/client/custom-oauth-callback-get)[Update authentication configuration](/api-reference/admin/update-authentication-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)