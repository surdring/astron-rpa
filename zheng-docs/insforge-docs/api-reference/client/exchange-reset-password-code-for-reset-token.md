Exchange reset password code for reset token

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/exchange-reset-password-token \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "code": "123456"
}
'
```

200

```
{
  "token": "<string>",
  "expiresAt": "2023-11-07T05:31:56Z"
}
```

Client

# Exchange reset password code for reset token

Copy page

Step 1 of two-step password reset flow (only used when resetPasswordMethod is ‘code’):

1. Verify the 6-digit code sent to user’s email
2. Return a reset token that can be used to actually reset the password

This endpoint is not used when resetPasswordMethod is ‘link’, because the browser reset-link flow uses the emailed link token directly.

Copy page

POST

/

api

/

auth

/

email

/

exchange-reset-password-token

Try it

Exchange reset password code for reset token

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/exchange-reset-password-token \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "code": "123456"
}
'
```

200

```
{
  "token": "<string>",
  "expiresAt": "2023-11-07T05:31:56Z"
}
```

#### Body

application/json

[​](#body-email)

email

string<email>

required

Example:

`"user@example.com"`

[​](#body-code)

code

string

required

6-digit numeric code from email

Pattern: `^\d{6}$`

Example:

`"123456"`

#### Response

200

application/json

Code verified successfully, reset token returned

[​](#response-token)

token

string

Reset token to be used in reset-password endpoint

[​](#response-expires-at)

expiresAt

string<date-time>

Token expiration timestamp

[Send password reset (code or link based on config)](/api-reference/client/send-password-reset-code-or-link-based-on-config)[Open password reset flow from browser link click](/api-reference/client/open-password-reset-flow-from-browser-link-click)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)