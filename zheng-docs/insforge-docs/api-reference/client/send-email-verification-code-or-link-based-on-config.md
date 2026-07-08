Send email verification (code or link based on config)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/send-verification \
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
  "message": "If your email is registered, we have sent you a verification code/link. Please check your inbox."
}
```

Client

# Send email verification (code or link based on config)

Copy page

Send email verification using the method configured in auth settings (verifyEmailMethod). When method is ‘code’, sends a 6-digit numeric code. When method is ‘link’, sends a browser verification link that goes through an InsForge backend endpoint first. Prevents user enumeration by returning success even if email doesn’t exist.

Copy page

POST

/

api

/

auth

/

email

/

send-verification

Try it

Send email verification (code or link based on config)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/send-verification \
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
  "message": "If your email is registered, we have sent you a verification code/link. Please check your inbox."
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

Used for link-based email verification. The email link always opens an InsForge backend endpoint first; after the token is verified, InsForge redirects the browser to this URL. This URL must be included in allowedRedirectUrls. Recommended: use your app's sign-in page.

#### Response

202

application/json

Verification email sent (if email exists). Message varies based on configured method.

[​](#response-success)

success

boolean

[​](#response-message)

message

string

Example:

`"If your email is registered, we have sent you a verification code/link. Please check your inbox."`

[Get current session](/api-reference/client/get-current-session)[Verify email from browser link click](/api-reference/client/verify-email-from-browser-link-click)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)