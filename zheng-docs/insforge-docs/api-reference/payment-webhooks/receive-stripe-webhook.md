Receive Stripe Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/webhooks/stripe/{environment} \
  --header 'Content-Type: application/json' \
  --header 'stripe-signature: <api-key>' \
  --data '{}'
```

200

400

401

500

```
{
  "received": true,
  "handled": true,
  "event": {
    "eventId": "evt_123",
    "eventType": "checkout.session.completed",
    "livemode": true,
    "accountId": "acct_123",
    "objectType": "checkout.session",
    "objectId": "cs_test_123",
    "attemptCount": 123,
    "lastError": "<string>",
    "receivedAt": "2023-11-07T05:31:56Z",
    "processedAt": "2023-11-07T05:31:56Z",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

Payment Webhooks

# Receive Stripe Webhook

Copy page

Receive Stripe events for one environment. The request body must be the raw Stripe JSON body and must include the Stripe signature header.

Copy page

POST

/

api

/

webhooks

/

stripe

/

{environment}

Try it

Receive Stripe Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/webhooks/stripe/{environment} \
  --header 'Content-Type: application/json' \
  --header 'stripe-signature: <api-key>' \
  --data '{}'
```

200

400

401

500

```
{
  "received": true,
  "handled": true,
  "event": {
    "eventId": "evt_123",
    "eventType": "checkout.session.completed",
    "livemode": true,
    "accountId": "acct_123",
    "objectType": "checkout.session",
    "objectId": "cs_test_123",
    "attemptCount": 123,
    "lastError": "<string>",
    "receivedAt": "2023-11-07T05:31:56Z",
    "processedAt": "2023-11-07T05:31:56Z",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

#### Authorizations

[​](#authorization-stripe-signature)

stripe-signature

string

header

required

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

The body is of type `object`.

#### Response

200

application/json

Webhook received

[​](#response-received)

received

boolean

required

[​](#response-handled)

handled

boolean

required

[​](#response-event)

event

object

Show child attributes

[List Razorpay Transactions](/api-reference/razorpay-payments/list-razorpay-transactions)[Receive Razorpay Webhook](/api-reference/payment-webhooks/receive-razorpay-webhook)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)