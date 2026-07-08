Rotate Razorpay Webhook Secret

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/webhook/rotate-secret \
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

# Rotate Razorpay Webhook Secret

Copy page

Generate a new Razorpay webhook signing secret. Update the webhook secret in the Razorpay Dashboard after calling this endpoint.

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

webhook

/

rotate-secret

Try it

Rotate Razorpay Webhook Secret

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/webhook/rotate-secret \
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

Razorpay webhook setup values with the rotated secret

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

[Get Razorpay Webhook Setup Values](/api-reference/razorpay-payments/get-razorpay-webhook-setup-values)[Create Razorpay Order](/api-reference/razorpay-payments/create-razorpay-order)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)