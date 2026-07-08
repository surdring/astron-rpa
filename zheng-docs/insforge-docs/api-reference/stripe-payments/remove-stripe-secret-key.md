Remove Stripe Secret Key

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/stripe/{environment}/config \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

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

# Remove Stripe Secret Key

Copy page

Remove the configured Stripe secret key for one environment and best-effort remove managed webhook endpoints.

Copy page

DELETE

/

api

/

payments

/

stripe

/

{environment}

/

config

Try it

Remove Stripe Secret Key

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/stripe/{environment}/config \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

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

#### Path Parameters

[​](#parameter-environment)

environment

enum<string>

required

Payment provider environment.

Available options:

`test`,

`live`

#### Response

200

application/json

Updated Stripe key configuration

[​](#response-keys)

keys

object[]

required

Show child attributes

[Configure Stripe Secret Key](/api-reference/stripe-payments/configure-stripe-secret-key)[Sync Stripe Payments State](/api-reference/stripe-payments/sync-stripe-payments-state)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)