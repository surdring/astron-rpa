Get secret value

cURL

```
curl --request GET \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "key": "STRIPE_API_KEY",
  "value": "sk_live_..."
}
```

Admin

# Get secret value

Copy page

Retrieve the decrypted value of a specific secret by its key

Copy page

GET

/

api

/

secrets

/

{key}

Try it

Get secret value

cURL

```
curl --request GET \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "key": "STRIPE_API_KEY",
  "value": "sk_live_..."
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

[​](#parameter-key)

key

string

required

Secret key identifier

Pattern: `^[A-Z0-9_]+$`

#### Response

200

application/json

Secret value retrieved

[​](#response-key)

key

string

[​](#response-value)

value

string

[Create a new secret](/api-reference/admin/create-a-new-secret)[Update secret](/api-reference/admin/update-secret)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)