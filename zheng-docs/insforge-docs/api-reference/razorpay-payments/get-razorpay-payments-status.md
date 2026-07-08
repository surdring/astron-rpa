Get Razorpay Payments Status

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/status \
  --header 'Authorization: Bearer <token>'
```

200

401

403

```
{
  "razorpayConnections": [
    {
      "accountId": "acc_123",
      "merchantName": "Example Merchant",
      "accountLivemode": true,
      "webhookEndpointId": "manual",
      "webhookEndpointUrl": "https://api.example.com/api/webhooks/razorpay/test",
      "webhookConfiguredAt": "2023-11-07T05:31:56Z",
      "maskedKey": "rzp_test_...abcd",
      "lastSyncedAt": "2023-11-07T05:31:56Z",
      "lastSyncError": "<string>",
      "lastSyncCounts": {}
    }
  ]
}
```

Razorpay Payments

# Get Razorpay Payments Status

Copy page

Return Razorpay connection and sync status for each environment.

Copy page

GET

/

api

/

payments

/

razorpay

/

status

Try it

Get Razorpay Payments Status

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/status \
  --header 'Authorization: Bearer <token>'
```

200

401

403

```
{
  "razorpayConnections": [
    {
      "accountId": "acc_123",
      "merchantName": "Example Merchant",
      "accountLivemode": true,
      "webhookEndpointId": "manual",
      "webhookEndpointUrl": "https://api.example.com/api/webhooks/razorpay/test",
      "webhookConfiguredAt": "2023-11-07T05:31:56Z",
      "maskedKey": "rzp_test_...abcd",
      "lastSyncedAt": "2023-11-07T05:31:56Z",
      "lastSyncError": "<string>",
      "lastSyncCounts": {}
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

Razorpay payments status

[​](#response-razorpay-connections)

razorpayConnections

object[]

required

Show child attributes

[List Stripe Transactions](/api-reference/stripe-payments/list-stripe-transactions)[Get Razorpay Key Configuration](/api-reference/razorpay-payments/get-razorpay-key-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)