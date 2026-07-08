Exchange cloud provider authorization code for admin session

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/sessions/exchange \
  --header 'Content-Type: application/json' \
  --data '
{
  "code": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
'
```

200

400

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

# Exchange cloud provider authorization code for admin session

Copy page

Verifies an authorization code/JWT from from Insforge Cloud platform and issues an internal admin session token with project\_admin role

Copy page

POST

/

api

/

auth

/

admin

/

sessions

/

exchange

Try it

Exchange cloud provider authorization code for admin session

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/sessions/exchange \
  --header 'Content-Type: application/json' \
  --data '
{
  "code": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
'
```

200

400

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

#### Body

application/json

[​](#body-code)

code

string

required

Authorization code or JWT from the Insforge

Example:

`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`

#### Response

200

application/json

Cloud authorization verified, admin session created

[​](#response-project-admin)

projectAdmin

object

Show child attributes

[​](#response-access-token)

accessToken

string

Internal JWT for admin authentication

[​](#response-csrf-token)

csrfToken

string

CSRF token for `/api/auth/admin/refresh`

[Admin login](/api-reference/admin/admin-login)[Refresh admin dashboard access token](/api-reference/admin/refresh-admin-dashboard-access-token)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)