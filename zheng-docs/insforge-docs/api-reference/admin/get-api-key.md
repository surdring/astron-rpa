Get API key

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/api-key \
  --header 'Authorization: Bearer <token>'
```

200

403

```
{
  "apiKey": "ins_1234567890abcdef1234567890abcdef"
}
```

Admin

# Get API key

Copy page

Admin-only endpoint to retrieve the API key

Copy page

GET

/

api

/

metadata

/

api-key

Try it

Get API key

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/api-key \
  --header 'Authorization: Bearer <token>'
```

200

403

```
{
  "apiKey": "ins_1234567890abcdef1234567890abcdef"
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

API key

[​](#response-api-key)

apiKey

string

[Get database metadata](/api-reference/admin/get-database-metadata)[Get anon key](/api-reference/admin/get-anon-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)