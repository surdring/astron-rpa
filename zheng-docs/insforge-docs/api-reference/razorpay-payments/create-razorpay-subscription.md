Create Razorpay Subscription

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "planId": "plan_123",
  "totalCount": 12,
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "customerEmail": "buyer@example.com"
}
'
```

201

400

401

403

500

```
{
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
  },
  "checkoutOptions": {
    "key": "rzp_test_xxx",
    "subscription_id": "sub_123",
    "prefill": {
      "name": "<string>",
      "email": "jsmith@example.com",
      "contact": "<string>"
    },
    "name": "<string>",
    "description": "<string>",
    "callback_url": "<string>"
  }
}
```

Razorpay Payments

# Create Razorpay Subscription

Copy page

Create a Razorpay Subscription and mirror it locally, then return Checkout options for authorization. The backend first evaluates the caller’s INSERT policy on payments.razorpay\_subscriptions so apps can restrict which subjects can start subscriptions.

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

Try it

Create Razorpay Subscription

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "planId": "plan_123",
  "totalCount": 12,
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "customerEmail": "buyer@example.com"
}
'
```

201

400

401

403

500

```
{
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
  },
  "checkoutOptions": {
    "key": "rzp_test_xxx",
    "subscription_id": "sub_123",
    "prefill": {
      "name": "<string>",
      "email": "jsmith@example.com",
      "contact": "<string>"
    },
    "name": "<string>",
    "description": "<string>",
    "callback_url": "<string>"
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

* Option 1
* Option 2

Notes keys starting with insforge\_ are reserved and rejected. Either totalCount or endAt is required.

[​](#body-one-of-0-plan-id)

planId

string

required

Minimum string length: `1`

Example:

`"plan_123"`

[​](#body-one-of-0-total-count)

totalCount

integer

required

Required range: `x >= 1`

[​](#body-one-of-0-subject)

subject

object

required

Show child attributes

[​](#body-one-of-0-end-at)

endAt

integer

Unix timestamp in seconds.

Required range: `x >= 1`

[​](#body-one-of-0-quantity)

quantity

integer

Required range: `x >= 1`

[​](#body-one-of-0-start-at)

startAt

integer

Unix timestamp in seconds.

Required range: `x >= 1`

[​](#body-one-of-0-expire-by)

expireBy

integer

Unix timestamp in seconds.

Required range: `x >= 1`

[​](#body-one-of-0-customer-notify)

customerNotify

boolean

[​](#body-one-of-0-offer-id-one-of-0)

offerId

string | null

Required string length: `1 - 255`

[​](#body-one-of-0-description-one-of-0)

description

string | null

Maximum string length: `2048`

[​](#body-one-of-0-customer-name-one-of-0)

customerName

string | null

Required string length: `1 - 255`

[​](#body-one-of-0-customer-email-one-of-0)

customerEmail

string<email> | null

[​](#body-one-of-0-customer-contact-one-of-0)

customerContact

string | null

Required string length: `1 - 32`

[​](#body-one-of-0-callback-url-one-of-0)

callbackUrl

string<uri> | null

[​](#body-one-of-0-notes)

notes

object

Native Razorpay subscription notes, available in webhook payloads.

Show child attributes

#### Response

201

application/json

Razorpay subscription created

[​](#response-subscription)

subscription

object

required

Show child attributes

[​](#response-checkout-options)

checkoutOptions

object

required

Show child attributes

[List Razorpay Subscriptions](/api-reference/razorpay-payments/list-razorpay-subscriptions)[Verify Razorpay Subscription Authorization](/api-reference/razorpay-payments/verify-razorpay-subscription-authorization)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)