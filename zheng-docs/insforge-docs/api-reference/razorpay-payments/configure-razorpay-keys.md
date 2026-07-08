Configure Razorpay Keys

cURL

```
curl --request PUT \
  --url https://api.example.com/api/payments/razorpay/{environment}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "keyId": "rzp_test_xxx",
  "keySecret": "razorpay_secret_xxx",
  "webhookSecret": "webhook_secret_xxx"
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
      "maskedKey": "rzp_test_...abcd"
    }
  ]
}
```

Razorpay Payments

# Configure Razorpay Keys

Copy page

Validate and store Razorpay API keys for one environment. A webhook secret is generated automatically when one does not already exist.

Copy page

PUT

/

api

/

payments

/

razorpay

/

{environment}

/

config

Try it

Configure Razorpay Keys

cURL

```
curl --request PUT \
  --url https://api.example.com/api/payments/razorpay/{environment}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "keyId": "rzp_test_xxx",
  "keySecret": "razorpay_secret_xxx",
  "webhookSecret": "webhook_secret_xxx"
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
      "maskedKey": "rzp_test_...abcd"
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

[​](#body-key-id)

keyId

string

required

Minimum string length: `1`

Example:

`"rzp_test_xxx"`

[​](#body-key-secret)

keySecret

string

required

write-only

Minimum string length: `1`

Example:

`"razorpay_secret_xxx"`

[​](#body-webhook-secret)

webhookSecret

string

write-only

Example:

`"webhook_secret_xxx"`

#### Response

200

application/json

Updated Razorpay key configuration

[​](#response-keys)

keys

object[]

required

Show child attributes

[Sync Razorpay Payments State](/api-reference/razorpay-payments/sync-razorpay-payments-state)[Remove Razorpay Keys](/api-reference/razorpay-payments/remove-razorpay-keys)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)