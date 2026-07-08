Update authentication configuration

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "allowedRedirectUrls": [
    "<string>"
  ],
  "disableSignup": true
}
'
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

# Update authentication configuration

Copy page

Update authentication settings (admin only)

Copy page

PUT

/

api

/

auth

/

config

Try it

Update authentication configuration

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "allowedRedirectUrls": [
    "<string>"
  ],
  "disableSignup": true
}
'
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

#### Body

application/json

[​](#body-require-email-verification)

requireEmailVerification

boolean

[​](#body-password-min-length)

passwordMinLength

integer

Required range: `4 <= x <= 128`

[​](#body-require-number)

requireNumber

boolean

[​](#body-require-lowercase)

requireLowercase

boolean

[​](#body-require-uppercase)

requireUppercase

boolean

[​](#body-require-special-char)

requireSpecialChar

boolean

[​](#body-verify-email-method)

verifyEmailMethod

enum<string>

Method for email verification (code = 6-digit OTP, link = magic link)

Available options:

`code`,

`link`

[​](#body-reset-password-method)

resetPasswordMethod

enum<string>

Method for password reset (code = 6-digit OTP + exchange flow, link = magic link)

Available options:

`code`,

`link`

[​](#body-allowed-redirect-urls)

allowedRedirectUrls

string[]

List of allowed URLs for authentication redirects. If empty, all redirects are allowed for smoother development UX. This is not recommended in production.

[​](#body-disable-signup)

disableSignup

boolean

When true, public sign-up endpoints (POST /api/auth/users and first-time OAuth) are rejected with 403 AUTH\_SIGNUP\_DISABLED. Admin-authenticated user creation is unaffected.

#### Response

200

application/json

Configuration updated successfully

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

Available options:

`code`,

`link`

[​](#response-reset-password-method)

resetPasswordMethod

enum<string>

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

[Get authentication configuration](/api-reference/admin/get-authentication-configuration)[List all users (admin only)](/api-reference/admin/list-all-users-admin-only)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)