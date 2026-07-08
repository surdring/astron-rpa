Get public authentication configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/public-config
```

200

```
{
  "oAuthProviders": [],
  "customOAuthProviders": [
    "<string>"
  ],
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "disableSignup": true
}
```

Client

# Get public authentication configuration

Copy page

Get all public authentication configuration including OAuth providers and email auth settings (public endpoint)

Copy page

GET

/

api

/

auth

/

public-config

Try it

Get public authentication configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/public-config
```

200

```
{
  "oAuthProviders": [],
  "customOAuthProviders": [
    "<string>"
  ],
  "requireEmailVerification": true,
  "passwordMinLength": 66,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": true,
  "requireSpecialChar": true,
  "disableSignup": true
}
```

#### Response

200 - application/json

Public authentication configuration

[​](#response-o-auth-providers)

oAuthProviders

enum<string>[]

Available options:

`google`,

`github`,

`discord`,

`linkedin`,

`facebook`,

`instagram`,

`tiktok`,

`apple`,

`x`,

`spotify`,

`microsoft`

[​](#response-custom-o-auth-providers)

customOAuthProviders

string[]

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

[​](#response-disable-signup)

disableSignup

boolean

When true, new user sign-ups are disabled. Existing users can still sign in.

[Create and Execute Database Migration](/api-reference/admin/create-and-execute-database-migration)[Update current user's profile](/api-reference/client/update-current-users-profile)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)