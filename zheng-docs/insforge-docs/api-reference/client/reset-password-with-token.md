Reset password with token

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/reset-password \
  --header 'Content-Type: application/json' \
  --data '
{
  "newPassword": "newSecurePassword123",
  "otp": "a1b2c3d4..."
}
'
```

200

```
{
  "message": "Password reset successfully"
}
```

Client

# Reset password with token

Copy page

Reset user password with a token. The token can be:

* Magic link token (64-character hex token from send-reset-password when method is ‘link’)
* Reset token (from exchange-reset-password-token after code verification when method is ‘code’)

Both token types use RESET\_PASSWORD purpose and are verified the same way.

Flow summary:

* Code method: send-reset-password → exchange-reset-password-token → reset-password (with resetToken)
* Link method: send-reset-password → GET /api/auth/email/reset-password-link → reset-password

Copy page

POST

/

api

/

auth

/

email

/

reset-password

Try it

Reset password with token

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/reset-password \
  --header 'Content-Type: application/json' \
  --data '
{
  "newPassword": "newSecurePassword123",
  "otp": "a1b2c3d4..."
}
'
```

200

```
{
  "message": "Password reset successfully"
}
```

#### Body

application/json

[​](#body-new-password)

newPassword

string

required

New password meeting configured requirements

Example:

`"newSecurePassword123"`

[​](#body-otp)

otp

string

required

Reset token (either from magic link or from exchange-reset-password-token endpoint)

Example:

`"a1b2c3d4..."`

#### Response

200

application/json

Password reset successfully

[​](#response-message)

message

string

Example:

`"Password reset successfully"`

[Open password reset flow from browser link click](/api-reference/client/open-password-reset-flow-from-browser-link-click)[Initiate OAuth flow (PKCE)](/api-reference/client/initiate-oauth-flow-pkce)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)