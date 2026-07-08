Create Stripe Price

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "productId": "prod_123",
  "currency": "usd",
  "unitAmount": 2900,
  "recurring": {
    "interval": "month",
    "intervalCount": 1
  },
  "lookupKey": "pro_monthly",
  "idempotencyKey": "price-pro-monthly"
}
'
```

201

400

401

403

```
{
  "price": {
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
}
```

Stripe Payments

# Create Stripe Price

Copy page

Create a Stripe price in the requested environment, then mirror it locally after Stripe succeeds.

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

catalog

/

prices

Try it

Create Stripe Price

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "productId": "prod_123",
  "currency": "usd",
  "unitAmount": 2900,
  "recurring": {
    "interval": "month",
    "intervalCount": 1
  },
  "lookupKey": "pro_monthly",
  "idempotencyKey": "price-pro-monthly"
}
'
```

201

400

401

403

```
{
  "price": {
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

#### Body

application/json

[​](#body-product-id)

productId

string

required

Minimum string length: `1`

[​](#body-currency)

currency

string

required

Required string length: `3`

Example:

`"usd"`

[​](#body-unit-amount)

unitAmount

integer

required

Required range: `x >= 0`

Example:

`2900`

[​](#body-lookup-key-one-of-0)

lookupKey

string | null

Required string length: `1 - 200`

[​](#body-active)

active

boolean

[​](#body-recurring)

recurring

object

Show child attributes

[​](#body-tax-behavior)

taxBehavior

enum<string>

Available options:

`exclusive`,

`inclusive`,

`unspecified`

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

Price created

[​](#response-price)

price

object

required

Show child attributes

[List Stripe Prices](/api-reference/stripe-payments/list-stripe-prices)[Get Stripe Price](/api-reference/stripe-payments/get-stripe-price)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)