List Stripe Catalog

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "products": [
    {
      "productId": "prod_123",
      "name": "<string>",
      "description": "<string>",
      "active": true,
      "defaultPriceId": "price_123",
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "prices": [
    {
      "priceId": "price_123",
      "productId": "prod_123",
      "active": true,
      "currency": "usd",
      "unitAmount": 2900,
      "unitAmountDecimal": "2900",
      "type": "recurring",
      "lookupKey": "pro_monthly",
      "billingScheme": "per_unit",
      "taxBehavior": "unspecified",
      "recurringInterval": "month",
      "recurringIntervalCount": 1,
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ]
}
```

Stripe Payments

# List Stripe Catalog

Copy page

Return mirrored Stripe products and prices for one environment.

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

catalog

Try it

List Stripe Catalog

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "products": [
    {
      "productId": "prod_123",
      "name": "<string>",
      "description": "<string>",
      "active": true,
      "defaultPriceId": "price_123",
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "prices": [
    {
      "priceId": "price_123",
      "productId": "prod_123",
      "active": true,
      "currency": "usd",
      "unitAmount": 2900,
      "unitAmountDecimal": "2900",
      "type": "recurring",
      "lookupKey": "pro_monthly",
      "billingScheme": "per_unit",
      "taxBehavior": "unspecified",
      "recurringInterval": "month",
      "recurringIntervalCount": 1,
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z"
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

#### Response

200

application/json

Synced Stripe products and prices

[​](#response-products)

products

object[]

required

Show child attributes

[​](#response-prices)

prices

object[]

required

Show child attributes

[Configure Managed Stripe Webhook](/api-reference/stripe-payments/configure-managed-stripe-webhook)[List Stripe Products](/api-reference/stripe-payments/list-stripe-products)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)