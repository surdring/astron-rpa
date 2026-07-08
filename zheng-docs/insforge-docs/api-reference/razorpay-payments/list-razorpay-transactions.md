List Razorpay Transactions

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/transactions \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "transactions": [
    {
      "subjectType": "<string>",
      "subjectId": "<string>",
      "providerCustomerId": "cus_123",
      "customerEmailSnapshot": "jsmith@example.com",
      "providerReferenceId": "pi_123",
      "providerReferenceType": "payment_intent",
      "amount": 2900,
      "amountRefunded": 0,
      "currency": "usd",
      "description": "<string>",
      "paidAt": "2023-11-07T05:31:56Z",
      "failedAt": "2023-11-07T05:31:56Z",
      "refundedAt": "2023-11-07T05:31:56Z",
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ]
}
```

Razorpay Payments

# List Razorpay Transactions

Copy page

Admin/debug read for InsForge’s Razorpay transaction projection. Use app-owned fulfillment tables with RLS for end-user order, credit, or entitlement state.

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

transactions

Try it

List Razorpay Transactions

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/transactions \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "transactions": [
    {
      "subjectType": "<string>",
      "subjectId": "<string>",
      "providerCustomerId": "cus_123",
      "customerEmailSnapshot": "jsmith@example.com",
      "providerReferenceId": "pi_123",
      "providerReferenceType": "payment_intent",
      "amount": 2900,
      "amountRefunded": 0,
      "currency": "usd",
      "description": "<string>",
      "paidAt": "2023-11-07T05:31:56Z",
      "failedAt": "2023-11-07T05:31:56Z",
      "refundedAt": "2023-11-07T05:31:56Z",
      "providerCreatedAt": "2023-11-07T05:31:56Z",
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

Razorpay transactions

[​](#response-transactions)

transactions

object[]

required

Show child attributes

[List Razorpay Customers](/api-reference/razorpay-payments/list-razorpay-customers)[Receive Stripe Webhook](/api-reference/payment-webhooks/receive-stripe-webhook)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)