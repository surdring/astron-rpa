Verify Razorpay Subscription Authorization

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions/verify \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "subscriptionId": "sub_123",
  "paymentId": "pay_123",
  "signature": "razorpay_signature"
}
'
```

200

400

401

403

404

```
{
  "verified": true,
  "subscription": {
    "subscriptionId": "sub_123",
    "planId": "plan_123",
    "customerId": "cust_123",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "currentStart": "2023-11-07T05:31:56Z",
    "currentEnd": "2023-11-07T05:31:56Z",
    "endedAt": "2023-11-07T05:31:56Z",
    "quantity": 123,
    "chargeAt": "2023-11-07T05:31:56Z",
    "startAt": "2023-11-07T05:31:56Z",
    "endAt": "2023-11-07T05:31:56Z",
    "totalCount": 123,
    "authAttempts": 123,
    "paidCount": 123,
    "remainingCount": 123,
    "shortUrl": "<string>",
    "hasScheduledChanges": true,
    "changeScheduledAt": "2023-11-07T05:31:56Z",
    "offerId": "<string>",
    "authorizationPaymentId": "pay_123",
    "authorizationVerifiedAt": "2023-11-07T05:31:56Z",
    "notes": {},
    "providerCreatedAt": "2023-11-07T05:31:56Z",
    "syncedAt": "2023-11-07T05:31:56Z",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

Razorpay Payments

# Verify Razorpay Subscription Authorization

Copy page

Verify the Razorpay Checkout signature for the subscription authorization payment before recording the authorization payment ID locally.

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

subscriptions

/

verify

Try it

Verify Razorpay Subscription Authorization

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions/verify \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "subscriptionId": "sub_123",
  "paymentId": "pay_123",
  "signature": "razorpay_signature"
}
'
```

200

400

401

403

404

```
{
  "verified": true,
  "subscription": {
    "subscriptionId": "sub_123",
    "planId": "plan_123",
    "customerId": "cust_123",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "currentStart": "2023-11-07T05:31:56Z",
    "currentEnd": "2023-11-07T05:31:56Z",
    "endedAt": "2023-11-07T05:31:56Z",
    "quantity": 123,
    "chargeAt": "2023-11-07T05:31:56Z",
    "startAt": "2023-11-07T05:31:56Z",
    "endAt": "2023-11-07T05:31:56Z",
    "totalCount": 123,
    "authAttempts": 123,
    "paidCount": 123,
    "remainingCount": 123,
    "shortUrl": "<string>",
    "hasScheduledChanges": true,
    "changeScheduledAt": "2023-11-07T05:31:56Z",
    "offerId": "<string>",
    "authorizationPaymentId": "pay_123",
    "authorizationVerifiedAt": "2023-11-07T05:31:56Z",
    "notes": {},
    "providerCreatedAt": "2023-11-07T05:31:56Z",
    "syncedAt": "2023-11-07T05:31:56Z",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

#### Authorizations

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

[​](#body-subscription-id)

subscriptionId

string

required

Minimum string length: `1`

Example:

`"sub_123"`

[​](#body-payment-id)

paymentId

string

required

Minimum string length: `1`

Example:

`"pay_123"`

[​](#body-signature)

signature

string

required

Minimum string length: `1`

#### Response

200

application/json

Razorpay subscription authorization verified

[​](#response-verified)

verified

boolean

required

[​](#response-subscription)

subscription

object

required

Show child attributes

[Create Razorpay Subscription](/api-reference/razorpay-payments/create-razorpay-subscription)[Cancel Razorpay Subscription](/api-reference/razorpay-payments/cancel-razorpay-subscription)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)