Get anon key (deprecated)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/tokens/anon \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "accessToken": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
  "message": "Anon key retrieved successfully (deprecated route, use GET /api/metadata/anon-key)"
}
```

Admin

# Get anon key (deprecated)

deprecated

Copy page

Deprecated - use GET /api/metadata/anon-key instead. Returns the project’s opaque anon key (`anon_...`) under the legacy `accessToken` field for backward compatibility. The anon key is a non-secret client identifier that maps requests to the `anon` role; it replaces the former non-expiring anonymous JWT and can be rotated via POST /api/secrets/anon-key/rotate (admin only).

Copy page

POST

/

api

/

auth

/

tokens

/

anon

Try it

Get anon key (deprecated)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/tokens/anon \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "accessToken": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
  "message": "Anon key retrieved successfully (deprecated route, use GET /api/metadata/anon-key)"
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

200

application/json

Anon key retrieved successfully

[​](#response-access-token)

accessToken

string

Opaque anon key (legacy field name kept for compatibility)

Example:

`"anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd"`

[​](#response-message)

message

string

Success message

Example:

`"Anon key retrieved successfully (deprecated route, use GET /api/metadata/anon-key)"`

[Logout admin dashboard session](/api-reference/admin/logout-admin-dashboard-session)[List all OAuth configurations](/api-reference/admin/list-all-oauth-configurations)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)