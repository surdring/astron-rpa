Create Stripe Checkout Session

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/checkout-sessions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "mode": "subscription",
  "lineItems": [
    {
      "priceId": "price_123",
      "quantity": 1
    }
  ],
  "successUrl": "https://app.example.com/billing/success",
  "cancelUrl": "https://app.example.com/billing/cancel",
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "customerEmail": "buyer@example.com",
  "idempotencyKey": "checkout-team_123-pro"
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
  "checkoutSession": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerEmail": "jsmith@example.com",
    "checkoutSessionId": "cs_test_123",
    "customerId": "cus_123",
    "paymentIntentId": "pi_123",
    "subscriptionId": "sub_123",
    "url": "https://checkout.stripe.com/c/pay/cs_test_123",
    "lastError": "<string>",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

Stripe Payments

# Create Stripe Checkout Session

Copy page

Create a local checkout attempt with the caller’s user context and then create a Stripe Checkout Session. Subscription mode requires a billing subject.

Copy page

POST

/

api

/

payments

/

stripe

/

{environment}

/

checkout-sessions

Try it

Create Stripe Checkout Session

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/checkout-sessions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "mode": "subscription",
  "lineItems": [
    {
      "priceId": "price_123",
      "quantity": 1
    }
  ],
  "successUrl": "https://app.example.com/billing/success",
  "cancelUrl": "https://app.example.com/billing/cancel",
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "customerEmail": "buyer@example.com",
  "idempotencyKey": "checkout-team_123-pro"
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
  "checkoutSession": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerEmail": "jsmith@example.com",
    "checkoutSessionId": "cs_test_123",
    "customerId": "cus_123",
    "paymentIntentId": "pi_123",
    "subscriptionId": "sub_123",
    "url": "https://checkout.stripe.com/c/pay/cs_test_123",
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

Metadata keys starting with insforge\_ are reserved and rejected.

[​](#body-mode)

mode

enum<string>

required

Available options:

`payment`,

`subscription`

[​](#body-line-items)

lineItems

object[]

required

Required array length: `1 - 100` elements

Show child attributes

[​](#body-success-url)

successUrl

string<uri>

required

[​](#body-cancel-url)

cancelUrl

string<uri>

required

[​](#body-subject)

subject

object

Show child attributes

[​](#body-customer-email-one-of-0)

customerEmail

string<email> | null

[​](#body-metadata)

metadata

object

Show child attributes

[​](#body-idempotency-key)

idempotencyKey

string

Required string length: `1 - 200`

#### Response

201

application/json

Checkout Session created

[​](#response-checkout-session)

checkoutSession

object

required

Show child attributes

[Send raw HTML email](/api-reference/client/send-raw-html-email)[Create Stripe Customer Portal Session](/api-reference/stripe-payments/create-stripe-customer-portal-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)