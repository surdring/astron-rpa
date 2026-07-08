Get Razorpay Key Configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/config \
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
      "maskedKey": "rzp_test_...abcd"
    }
  ]
}
```

Razorpay Payments

# Get Razorpay Key Configuration

Copy page

Return masked Razorpay key configuration for test and live environments.

Copy page

GET

/

api

/

payments

/

razorpay

/

config

Try it

Get Razorpay Key Configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/config \
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

#### Response

200

application/json

Razorpay key configuration

[​](#response-keys)

keys

object[]

required

Show child attributes

[Get Razorpay Payments Status](/api-reference/razorpay-payments/get-razorpay-payments-status)[Sync Razorpay Payments State](/api-reference/razorpay-payments/sync-razorpay-payments-state)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)