List Stripe Subscriptions

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/subscriptions \
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
      "customerId": "cus_123",
      "subjectType": "<string>",
      "subjectId": "<string>",
      "currentPeriodStart": "2023-11-07T05:31:56Z",
      "currentPeriodEnd": "2023-11-07T05:31:56Z",
      "cancelAtPeriodEnd": true,
      "cancelAt": "2023-11-07T05:31:56Z",
      "canceledAt": "2023-11-07T05:31:56Z",
      "trialStart": "2023-11-07T05:31:56Z",
      "trialEnd": "2023-11-07T05:31:56Z",
      "latestInvoiceId": "in_123",
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z",
      "items": [
        {
          "subscriptionItemId": "si_123",
          "subscriptionId": "sub_123",
          "productId": "prod_123",
          "priceId": "price_123",
          "quantity": 1,
          "metadata": {},
          "createdAt": "2023-11-07T05:31:56Z",
          "updatedAt": "2023-11-07T05:31:56Z"
        }
      ]
    }
  ]
}
```

Stripe Payments

# List Stripe Subscriptions

Copy page

Admin/debug read for mirrored Stripe subscriptions. Use app-owned tables with RLS for end-user payment state.

Copy page

GET

/

api

/

payments

/

stripe

/

{environment}

/

subscriptions

Try it

List Stripe Subscriptions

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/subscriptions \
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
      "customerId": "cus_123",
      "subjectType": "<string>",
      "subjectId": "<string>",
      "currentPeriodStart": "2023-11-07T05:31:56Z",
      "currentPeriodEnd": "2023-11-07T05:31:56Z",
      "cancelAtPeriodEnd": true,
      "cancelAt": "2023-11-07T05:31:56Z",
      "canceledAt": "2023-11-07T05:31:56Z",
      "trialStart": "2023-11-07T05:31:56Z",
      "trialEnd": "2023-11-07T05:31:56Z",
      "latestInvoiceId": "in_123",
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z",
      "items": [
        {
          "subscriptionItemId": "si_123",
          "subscriptionId": "sub_123",
          "productId": "prod_123",
          "priceId": "price_123",
          "quantity": 1,
          "metadata": {},
          "createdAt": "2023-11-07T05:31:56Z",
          "updatedAt": "2023-11-07T05:31:56Z"
        }
      ]
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

Stripe subscriptions

[​](#response-subscriptions)

subscriptions

object[]

required

Show child attributes

[Update Stripe Price](/api-reference/stripe-payments/update-stripe-price)[List Stripe Customers](/api-reference/stripe-payments/list-stripe-customers)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)