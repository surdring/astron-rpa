List Razorpay Subscriptions

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "subscriptions": [
    {
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
  ]
}
```

Razorpay Payments

# List Razorpay Subscriptions

Copy page

Admin/debug read for mirrored Razorpay subscriptions. Use app-owned tables with RLS for end-user payment state.

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

subscriptions

Try it

List Razorpay Subscriptions

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "subscriptions": [
    {
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

#### Query Parameters

[​](#parameter-subject-type)

subjectType

string

Billing subject type. Must be provided together with subjectId.

Required string length: `1 - 100`

[​](#parameter-subject-id)

subjectId

string

Billing subject ID. Must be provided together with subjectType.

Required string length: `1 - 255`

[​](#parameter-limit)

limit

integer

default:50

Maximum rows to return.

Required range: `1 <= x <= 100`

#### Response

200

application/json

Razorpay subscriptions

[​](#response-subscriptions)

subscriptions

object[]

required

Show child attributes

[Create Razorpay Plan](/api-reference/razorpay-payments/create-razorpay-plan)[Create Razorpay Subscription](/api-reference/razorpay-payments/create-razorpay-subscription)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)