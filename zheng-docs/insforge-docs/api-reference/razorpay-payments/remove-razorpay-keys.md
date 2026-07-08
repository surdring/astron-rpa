Remove Razorpay Keys

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/razorpay/{environment}/config \
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
      "maskedKey": "rzp_test_...abcd"
    }
  ]
}
```

Razorpay Payments

# Remove Razorpay Keys

Copy page

Remove the configured Razorpay keys for one environment.

Copy page

DELETE

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

Remove Razorpay Keys

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/razorpay/{environment}/config \
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

#### Response

200

application/json

Updated Razorpay key configuration

[​](#response-keys)

keys

object[]

required

Show child attributes

[Configure Razorpay Keys](/api-reference/razorpay-payments/configure-razorpay-keys)[Sync Razorpay Payments State For One Environment](/api-reference/razorpay-payments/sync-razorpay-payments-state-for-one-environment)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)