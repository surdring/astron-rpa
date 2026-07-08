Create Razorpay Order

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/orders \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "amount": 50000,
  "currency": "INR",
  "receipt": "order-team_123-pro",
  "description": "Pro upgrade",
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
  },
  "checkoutOptions": {
    "key": "rzp_test_xxx",
    "amount": 2,
    "currency": "INR",
    "order_id": "order_123",
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

# Create Razorpay Order

Copy page

Create a local Razorpay Order record with the caller’s user context, create a Razorpay Order, and return Checkout options for the client-side Razorpay Checkout script.

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

Try it

Create Razorpay Order

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/orders \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "amount": 50000,
  "currency": "INR",
  "receipt": "order-team_123-pro",
  "description": "Pro upgrade",
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
  },
  "checkoutOptions": {
    "key": "rzp_test_xxx",
    "amount": 2,
    "currency": "INR",
    "order_id": "order_123",
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

Notes keys starting with insforge\_ are reserved and rejected.

[​](#body-amount)

amount

integer

required

Required range: `x >= 1`

Example:

`50000`

[​](#body-currency)

currency

string

required

Required string length: `3`

Example:

`"INR"`

[​](#body-receipt-one-of-0)

receipt

string | null

Required string length: `1 - 40`

[​](#body-description-one-of-0)

description

string | null

Maximum string length: `2048`

[​](#body-subject)

subject

object

Show child attributes

[​](#body-customer-name-one-of-0)

customerName

string | null

Required string length: `1 - 255`

[​](#body-customer-email-one-of-0)

customerEmail

string<email> | null

[​](#body-customer-contact-one-of-0)

customerContact

string | null

Required string length: `1 - 32`

[​](#body-callback-url-one-of-0)

callbackUrl

string<uri> | null

[​](#body-notes)

notes

object

Native Razorpay notes. Use stable app identifiers such as `order_id` for webhook fulfillment triggers.

Show child attributes

#### Response

201

application/json

Razorpay Order created

[​](#response-order)

order

object

required

Show child attributes

[​](#response-checkout-options)

checkoutOptions

object

required

Show child attributes

[Rotate Razorpay Webhook Secret](/api-reference/razorpay-payments/rotate-razorpay-webhook-secret)[Verify Razorpay Order Payment](/api-reference/razorpay-payments/verify-razorpay-order-payment)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)