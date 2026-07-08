Admin login

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/sessions \
  --header 'Content-Type: application/json' \
  --data '
{
  "username": "admin",
  "password": "<string>"
}
'
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

# Admin login

Copy page

Authenticates admin user for dashboard access

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

Try it

Admin login

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/sessions \
  --header 'Content-Type: application/json' \
  --data '
{
  "username": "admin",
  "password": "<string>"
}
'
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

#### Body

application/json

[​](#body-username)

username

string

required

Example:

`"admin"`

[​](#body-password)

password

string

required

#### Response

200

application/json

Admin login successful

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

CSRF token for `/api/auth/admin/refresh`

[Get specific user](/api-reference/admin/get-specific-user)[Exchange cloud provider authorization code for admin session](/api-reference/admin/exchange-cloud-provider-authorization-code-for-admin-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)