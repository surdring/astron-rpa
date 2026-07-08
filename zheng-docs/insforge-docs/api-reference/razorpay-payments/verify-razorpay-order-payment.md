Verify Razorpay Order Payment

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/orders/verify \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "orderId": "order_123",
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
  "order": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerName": "<string>",
    "customerEmail": "jsmith@example.com",
    "customerContact": "<string>",
    "orderId": "order_123",
    "receipt": "<string>",
    "amount": 50000,
    "amountPaid": 123,
    "amountDue": 123,
    "currency": "inr",
    "attempts": 123,
    "verifiedPaymentId": "pay_123",
    "verifiedAt": "2023-11-07T05:31:56Z",
    "notes": {},
    "lastError": "<string>",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

Razorpay Payments

# Verify Razorpay Order Payment

Copy page

Verify the Razorpay Checkout signature for an order payment before recording the verified payment ID locally.

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

orders

/

verify

Try it

Verify Razorpay Order Payment

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/orders/verify \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "orderId": "order_123",
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
  "order": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerName": "<string>",
    "customerEmail": "jsmith@example.com",
    "customerContact": "<string>",
    "orderId": "order_123",
    "receipt": "<string>",
    "amount": 50000,
    "amountPaid": 123,
    "amountDue": 123,
    "currency": "inr",
    "attempts": 123,
    "verifiedPaymentId": "pay_123",
    "verifiedAt": "2023-11-07T05:31:56Z",
    "notes": {},
    "lastError": "<string>",
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

[​](#body-order-id)

orderId

string

required

Minimum string length: `1`

Example:

`"order_123"`

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

Razorpay order payment verified

[​](#response-verified)

verified

boolean

required

[​](#response-order)

order

object

required

Show child attributes

[Create Razorpay Order](/api-reference/razorpay-payments/create-razorpay-order)[List Razorpay Payment Catalog](/api-reference/razorpay-payments/list-razorpay-payment-catalog)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)