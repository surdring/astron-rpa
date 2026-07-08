Get Stripe Product

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products/{productId} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

```
{
  "product": {
    "productId": "prod_123",
    "name": "<string>",
    "description": "<string>",
    "active": true,
    "defaultPriceId": "price_123",
    "metadata": {},
    "syncedAt": "2023-11-07T05:31:56Z"
  },
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

# Get Stripe Product

Copy page

Get one mirrored Stripe product and its associated prices.

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

/

products

/

{productId}

Try it

Get Stripe Product

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products/{productId} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

```
{
  "product": {
    "productId": "prod_123",
    "name": "<string>",
    "description": "<string>",
    "active": true,
    "defaultPriceId": "price_123",
    "metadata": {},
    "syncedAt": "2023-11-07T05:31:56Z"
  },
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

[​](#parameter-product-id)

productId

string

required

Stripe product ID.

Minimum string length: `1`

#### Response

200

application/json

Product and prices

[​](#response-product)

product

object

required

Show child attributes

[​](#response-prices)

prices

object[]

required

Show child attributes

[Create Stripe Product](/api-reference/stripe-payments/create-stripe-product)[Delete Stripe Product](/api-reference/stripe-payments/delete-stripe-product)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)