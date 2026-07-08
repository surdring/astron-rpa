Get Stripe Key Configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/config \
  --header 'Authorization: Bearer <token>'
```

200

401

403

```
{
  "keys": [
    {
      "hasKey": true,
      "maskedKey": "sk_test_...abcd"
    }
  ]
}
```

Stripe Payments

# Get Stripe Key Configuration

Copy page

Return masked Stripe key configuration for test and live environments.

Copy page

GET

/

api

/

payments

/

stripe

/

config

Try it

Get Stripe Key Configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/config \
  --header 'Authorization: Bearer <token>'
```

200

401

403

```
{
  "keys": [
    {
      "hasKey": true,
      "maskedKey": "sk_test_...abcd"
    }
  ]
}
```

#### Authorizations

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

200

application/json

Stripe key configuration

[​](#response-keys)

keys

object[]

required

Show child attributes

[Get Stripe Payments Status](/api-reference/stripe-payments/get-stripe-payments-status)[Configure Stripe Secret Key](/api-reference/stripe-payments/configure-stripe-secret-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)