Logout admin dashboard session

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/logout
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

Admin

# Logout admin dashboard session

Copy page

Clears the dashboard-only `insforge_admin_refresh_token` cookie.

Copy page

POST

/

api

/

auth

/

admin

/

logout

Try it

Logout admin dashboard session

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/logout
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

#### Response

200 - application/json

Logged out successfully

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[Refresh admin dashboard access token](/api-reference/admin/refresh-admin-dashboard-access-token)[Get anon key (deprecated)](/api-reference/admin/get-anon-key-deprecated)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)