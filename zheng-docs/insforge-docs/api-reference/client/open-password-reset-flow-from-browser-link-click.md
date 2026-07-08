Open password reset flow from browser link click

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/email/reset-password-link
```

Client

# Open password reset flow from browser link click

Copy page

Browser-oriented password reset link flow.

This endpoint is intended for users clicking password reset links in email.
It validates the token on the backend and redirects the browser to the
stored, validated `redirectTo` URL with the reset token in the query string.

Redirect query params:

* Ready: `token=...&insforge_status=ready&insforge_type=reset_password`
* Error: `insforge_status=error&insforge_type=reset_password&insforge_error=...`
* `token`: present only when `insforge_status=ready`
* `insforge_status`: `ready` or `error`
* `insforge_type`: always `reset_password`
* `insforge_error`: present only on error, human-readable message

Your app should render the reset-password form only when `insforge_status=ready`
and `token` is present.

Copy page

GET

/

api

/

auth

/

email

/

reset-password-link

Try it

Open password reset flow from browser link click

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/email/reset-password-link
```

#### Query Parameters

[​](#parameter-token)

token

string

required

64-character password reset token from the email link

#### Response

302

Browser redirected to the stored redirect URL

[Exchange reset password code for reset token](/api-reference/client/exchange-reset-password-code-for-reset-token)[Reset password with token](/api-reference/client/reset-password-with-token)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)