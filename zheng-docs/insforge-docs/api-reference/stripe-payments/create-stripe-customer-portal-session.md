Create Stripe Customer Portal Session

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/customer-portal-sessions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "returnUrl": "https://app.example.com/billing"
}
'
```

201

400

401

403

404

500

```
{
  "customerPortalSession": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerId": "cus_123",
    "returnUrl": "https://app.example.com/billing",
    "configuration": "<string>",
    "url": "https://billing.stripe.com/p/session/test_123",
    "lastError": "<string>",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

Stripe Payments

# Create Stripe Customer Portal Session

Copy page

Create a Stripe Billing Portal Session for an authenticated user’s mapped billing subject.

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

customer-portal-sessions

Try it

Create Stripe Customer Portal Session

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/customer-portal-sessions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "returnUrl": "https://app.example.com/billing"
}
'
```

201

400

401

403

404

500

```
{
  "customerPortalSession": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerId": "cus_123",
    "returnUrl": "https://app.example.com/billing",
    "configuration": "<string>",
    "url": "https://billing.stripe.com/p/session/test_123",
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

[​](#body-subject)

subject

object

required

Show child attributes

[​](#body-return-url)

returnUrl

string<uri>

[​](#body-configuration)

configuration

string

Required string length: `1 - 255`

#### Response

201

application/json

Customer Portal Session created

[​](#response-customer-portal-session)

customerPortalSession

object

required

Show child attributes

[Create Stripe Checkout Session](/api-reference/stripe-payments/create-stripe-checkout-session)[Get Stripe Payments Status](/api-reference/stripe-payments/get-stripe-payments-status)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)