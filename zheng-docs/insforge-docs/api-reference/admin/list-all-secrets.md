List all secrets

cURL

```
curl --request GET \
  --url https://api.example.com/api/secrets \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "secrets": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "key": "STRIPE_API_KEY",
      "isActive": true,
      "isReserved": false,
      "createdAt": "2024-01-21T10:30:00Z",
      "updatedAt": "2024-01-21T10:30:00Z",
      "expiresAt": null
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "key": "OPENAI_API_KEY",
      "isActive": true,
      "isReserved": true,
      "createdAt": "2024-01-20T09:15:00Z",
      "updatedAt": "2024-01-20T09:15:00Z",
      "expiresAt": "2025-01-20T09:15:00Z"
    }
  ]
}
```

Admin

# List all secrets

Copy page

Returns metadata for all secrets (without values)

Copy page

GET

/

api

/

secrets

Try it

List all secrets

cURL

```
curl --request GET \
  --url https://api.example.com/api/secrets \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "secrets": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "key": "STRIPE_API_KEY",
      "isActive": true,
      "isReserved": false,
      "createdAt": "2024-01-21T10:30:00Z",
      "updatedAt": "2024-01-21T10:30:00Z",
      "expiresAt": null
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "key": "OPENAI_API_KEY",
      "isActive": true,
      "isReserved": true,
      "createdAt": "2024-01-20T09:15:00Z",
      "updatedAt": "2024-01-20T09:15:00Z",
      "expiresAt": "2025-01-20T09:15:00Z"
    }
  ]
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

List of secret metadata

[​](#response-secrets)

secrets

object[]

Show child attributes

[Receive Razorpay Webhook](/api-reference/payment-webhooks/receive-razorpay-webhook)[Create a new secret](/api-reference/admin/create-a-new-secret)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)