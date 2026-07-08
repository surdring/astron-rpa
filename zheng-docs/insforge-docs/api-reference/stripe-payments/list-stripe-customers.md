List Stripe Customers

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/customers \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "customers": [
    {
      "providerCustomerId": "cus_123",
      "email": "buyer@example.com",
      "name": "Buyer Example",
      "phone": "+1 555-0100",
      "deleted": true,
      "metadata": {},
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z",
      "paymentsCount": 1,
      "lastPaymentAt": "2023-11-07T05:31:56Z",
      "totalSpend": 1,
      "totalSpendCurrency": "<string>",
      "paymentMethodBrand": "<string>",
      "paymentMethodLast4": "<string>",
      "countryCode": "<string>"
    }
  ]
}
```

Stripe Payments

# List Stripe Customers

Copy page

Admin/debug read for mirrored Stripe customers. This is a display mirror only and should not replace app-owned billing tables.

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

customers

Try it

List Stripe Customers

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/customers \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "customers": [
    {
      "providerCustomerId": "cus_123",
      "email": "buyer@example.com",
      "name": "Buyer Example",
      "phone": "+1 555-0100",
      "deleted": true,
      "metadata": {},
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z",
      "paymentsCount": 1,
      "lastPaymentAt": "2023-11-07T05:31:56Z",
      "totalSpend": 1,
      "totalSpendCurrency": "<string>",
      "paymentMethodBrand": "<string>",
      "paymentMethodLast4": "<string>",
      "countryCode": "<string>"
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

[​](#parameter-limit)

limit

integer

default:50

Maximum rows to return.

Required range: `1 <= x <= 100`

#### Response

200

application/json

Stripe customers

[​](#response-customers)

customers

object[]

required

Show child attributes

[List Stripe Subscriptions](/api-reference/stripe-payments/list-stripe-subscriptions)[List Stripe Transactions](/api-reference/stripe-payments/list-stripe-transactions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)