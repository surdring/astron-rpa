Sync Razorpay Payments State For One Environment

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/sync \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "results": [
    {
      "connection": {
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
      },
      "syncCounts": {
        "plans": 1,
        "items": 1,
        "customers": 1,
        "subscriptions": 1,
        "invoices": 1,
        "payments": 1
      },
      "error": "<string>"
    }
  ]
}
```

Razorpay Payments

# Sync Razorpay Payments State For One Environment

Copy page

Sync items, plans, customers, subscriptions, invoices, and payments for one Razorpay environment. Razorpay remains the source of truth.

Copy page

POST

/

api

/

payments

/

razorpay

/

{environment}

/

sync

Try it

Sync Razorpay Payments State For One Environment

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/sync \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "results": [
    {
      "connection": {
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
      },
      "syncCounts": {
        "plans": 1,
        "items": 1,
        "customers": 1,
        "subscriptions": 1,
        "invoices": 1,
        "payments": 1
      },
      "error": "<string>"
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

Sync result for the requested Razorpay environment

[​](#response-results)

results

object[]

required

Show child attributes

[Remove Razorpay Keys](/api-reference/razorpay-payments/remove-razorpay-keys)[Get Razorpay Webhook Setup Values](/api-reference/razorpay-payments/get-razorpay-webhook-setup-values)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)