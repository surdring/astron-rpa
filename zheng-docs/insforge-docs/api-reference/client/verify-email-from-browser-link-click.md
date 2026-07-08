Verify email from browser link click

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/email/verify-link
```

Client

# Verify email from browser link click

Copy page

Browser-oriented link verification flow.

This endpoint is intended for users clicking verification links in email.
It validates the token on the backend and redirects the browser to the
stored, validated `redirectTo` URL with the verification result.

Redirect query params:

* Success: `insforge_status=success&insforge_type=verify_email`
* Error: `insforge_status=error&insforge_type=verify_email&insforge_error=...`
* `insforge_status`: `success` or `error`
* `insforge_type`: always `verify_email`
* `insforge_error`: present only on error, human-readable message

Recommended handling: use your sign-in page as `redirectTo`. When the
redirect arrives with `insforge_status=success`, show a confirmation message
and ask the user to sign in with their email and password.

Copy page

GET

/

api

/

auth

/

email

/

verify-link

Try it

Verify email from browser link click

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/email/verify-link
```

#### Query Parameters

[​](#parameter-token)

token

string

required

64-character email verification token from the email link

#### Response

302

Browser redirected to the stored redirect URL

[Send email verification (code or link based on config)](/api-reference/client/send-email-verification-code-or-link-based-on-config)[Verify email with code](/api-reference/client/verify-email-with-code)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)