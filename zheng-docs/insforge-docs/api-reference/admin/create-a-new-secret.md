Create a new secret

cURL

```
curl --request POST \
  --url https://api.example.com/api/secrets \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "key": "STRIPE_API_KEY",
  "value": "sk_live_...",
  "isReserved": false,
  "expiresAt": "2023-11-07T05:31:56Z"
}
'
```

201

Example

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been created successfully",
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

Admin

# Create a new secret

Copy page

Create a new encrypted secret with a unique key

Copy page

POST

/

api

/

secrets

Try it

Create a new secret

cURL

```
curl --request POST \
  --url https://api.example.com/api/secrets \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "key": "STRIPE_API_KEY",
  "value": "sk_live_...",
  "isReserved": false,
  "expiresAt": "2023-11-07T05:31:56Z"
}
'
```

201

Example

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been created successfully",
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

[​](#body-key)

key

string

required

Unique key identifier (uppercase letters, numbers, underscores only)

Pattern: `^[A-Z0-9_]+$`

Example:

`"STRIPE_API_KEY"`

[​](#body-value)

value

string

required

Secret value to be encrypted

Example:

`"sk_live_..."`

[​](#body-is-reserved)

isReserved

boolean

default:false

Whether the secret is protected from deletion

[​](#body-expires-at-one-of-0)

expiresAt

string<date-time> | null

Optional expiration date for the secret

#### Response

201

application/json

Secret created successfully

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[​](#response-id)

id

string<uuid>

[List all secrets](/api-reference/admin/list-all-secrets)[Get secret value](/api-reference/admin/get-secret-value)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)