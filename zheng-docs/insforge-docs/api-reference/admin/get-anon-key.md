Get anon key

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/anon-key \
  --header 'Authorization: Bearer <token>'
```

200

403

404

```
{
  "anonKey": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd"
}
```

Admin

# Get anon key

Copy page

Admin-only endpoint to retrieve the project’s opaque anon key (`anon_...`). The anon key is a non-secret client identifier that maps requests to the `anon` role - safe to embed in frontend bundles; row level security is the security boundary. Rotatable via POST /api/secrets/anon-key/rotate.

Copy page

GET

/

api

/

metadata

/

anon-key

Try it

Get anon key

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/anon-key \
  --header 'Authorization: Bearer <token>'
```

200

403

404

```
{
  "anonKey": "anon_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd"
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

Anon key

[​](#response-anon-key)

anonKey

string

[Get API key](/api-reference/admin/get-api-key)[Health check](/api-reference/client/health-check)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)