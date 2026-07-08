Resume Razorpay Subscription

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions/{subscriptionId}/resume \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

200

400

401

403

404

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
  }
}
```

Razorpay Payments

# Resume Razorpay Subscription

Copy page

Resume a paused Razorpay subscription immediately after evaluating the caller’s UPDATE policy on payments.razorpay\_subscriptions.

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

{subscriptionId}

/

resume

Try it

Resume Razorpay Subscription

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions/{subscriptionId}/resume \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

200

400

401

403

404

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

[​](#parameter-subscription-id)

subscriptionId

string

required

Razorpay subscription ID.

Minimum string length: `1`

#### Body

application/json

The body is of type `object`.

#### Response

200

application/json

Razorpay subscription resumed

[​](#response-subscription)

subscription

object

required

Show child attributes

[Pause Razorpay Subscription](/api-reference/razorpay-payments/pause-razorpay-subscription)[List Razorpay Customers](/api-reference/razorpay-payments/list-razorpay-customers)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)