Refresh admin dashboard access token

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/refresh \
  --header 'X-CSRF-Token: <x-csrf-token>'
```

200

```
{
  "projectAdmin": {
    "subject": "local:admin",
    "username": "admin"
  },
  "accessToken": "<string>",
  "csrfToken": "<string>"
}
```

Admin

# Refresh admin dashboard access token

Copy page

Uses the dashboard-only httpOnly `insforge_admin_refresh_token` cookie with an `X-CSRF-Token` header.

Copy page

POST

/

api

/

auth

/

admin

/

refresh

Try it

Refresh admin dashboard access token

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/refresh \
  --header 'X-CSRF-Token: <x-csrf-token>'
```

200

```
{
  "projectAdmin": {
    "subject": "local:admin",
    "username": "admin"
  },
  "accessToken": "<string>",
  "csrfToken": "<string>"
}
```

#### Headers

[​](#parameter-x-csrf-token)

X-CSRF-Token

string

required

CSRF token returned from admin login or admin refresh

#### Response

200

application/json

Admin token refreshed successfully

[​](#response-project-admin)

projectAdmin

object

Show child attributes

[​](#response-access-token)

accessToken

string

[​](#response-csrf-token)

csrfToken

string

CSRF token for the next admin refresh request

[Exchange cloud provider authorization code for admin session](/api-reference/admin/exchange-cloud-provider-authorization-code-for-admin-session)[Logout admin dashboard session](/api-reference/admin/logout-admin-dashboard-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)