Configure Stripe Secret Key

cURL

```
curl --request PUT \
  --url https://api.example.com/api/payments/stripe/{environment}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "secretKey": "sk_test_xxx"
}
'
```

200

400

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

# Configure Stripe Secret Key

Copy page

Validate and store a Stripe secret key. New Stripe accounts attempt managed webhook setup and then run a unified sync.

Copy page

PUT

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

Configure Stripe Secret Key

cURL

```
curl --request PUT \
  --url https://api.example.com/api/payments/stripe/{environment}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "secretKey": "sk_test_xxx"
}
'
```

200

400

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

#### Path Parameters

[​](#parameter-environment)

environment

enum<string>

required

Payment provider environment.

Available options:

`test`,

`live`

#### Body

application/json

[​](#body-secret-key)

secretKey

string

required

write-only

Minimum string length: `1`

Example:

`"sk_test_xxx"`

#### Response

200

application/json

Updated Stripe key configuration

[​](#response-keys)

keys

object[]

required

Show child attributes

[Get Stripe Key Configuration](/api-reference/stripe-payments/get-stripe-key-configuration)[Remove Stripe Secret Key](/api-reference/stripe-payments/remove-stripe-secret-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)