Get Razorpay Webhook Setup Values

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/webhook \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
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
  "webhookUrl": "https://api.example.com/api/webhooks/razorpay/test",
  "webhookSecret": "webhook_secret_xxx"
}
```

Razorpay Payments

# Get Razorpay Webhook Setup Values

Copy page

Return the Razorpay webhook URL and signing secret that must be copied into the Razorpay Dashboard for manual webhook setup.

Copy page

GET

/

api

/

payments

/

razorpay

/

{environment}

/

webhook

Try it

Get Razorpay Webhook Setup Values

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/webhook \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
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
  "webhookUrl": "https://api.example.com/api/webhooks/razorpay/test",
  "webhookSecret": "webhook_secret_xxx"
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

Razorpay webhook setup values

[​](#response-connection)

connection

object

required

Show child attributes

[​](#response-webhook-url)

webhookUrl

string

required

Webhook endpoint URL to copy into the Razorpay Dashboard.

Example:

`"https://api.example.com/api/webhooks/razorpay/test"`

[​](#response-webhook-secret)

webhookSecret

string

required

Raw signing secret to copy into the Razorpay Dashboard.

Example:

`"webhook_secret_xxx"`

[Sync Razorpay Payments State For One Environment](/api-reference/razorpay-payments/sync-razorpay-payments-state-for-one-environment)[Rotate Razorpay Webhook Secret](/api-reference/razorpay-payments/rotate-razorpay-webhook-secret)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)