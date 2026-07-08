Send password reset (code or link based on config)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/send-reset-password \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "redirectTo": "<string>"
}
'
```

202

```
{
  "success": true,
  "message": "If your email is registered, we have sent you a password reset code/link. Please check your inbox."
}
```

Client

# Send password reset (code or link based on config)

Copy page

Send password reset email using the method configured in auth settings (resetPasswordMethod). When method is ‘code’, sends a 6-digit numeric code for two-step flow. When method is ‘link’, sends a browser reset link that goes through an InsForge backend endpoint first. Prevents user enumeration by returning success even if email doesn’t exist.

Copy page

POST

/

api

/

auth

/

email

/

send-reset-password

Try it

Send password reset (code or link based on config)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/send-reset-password \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "redirectTo": "<string>"
}
'
```

202

```
{
  "success": true,
  "message": "If your email is registered, we have sent you a password reset code/link. Please check your inbox."
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

[​](#body-redirect-to)

redirectTo

string<uri>

Used for link-based password reset. The email link always opens an InsForge backend endpoint first; InsForge then redirects the browser to this URL with the reset token in the query string. This URL must be included in allowedRedirectUrls. Recommended: use your app's dedicated reset-password page.

#### Response

202

application/json

Password reset email sent (if email exists). Message varies based on configured method.

[​](#response-success)

success

boolean

[​](#response-message)

message

string

Example:

`"If your email is registered, we have sent you a password reset code/link. Please check your inbox."`

[Verify email with code](/api-reference/client/verify-email-with-code)[Exchange reset password code for reset token](/api-reference/client/exchange-reset-password-code-for-reset-token)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)