Create Stripe Product

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "Pro Plan",
  "description": "Monthly access to Pro features",
  "active": true,
  "metadata": {
    "tier": "pro"
  },
  "idempotencyKey": "product-pro-plan"
}
'
```

201

400

401

403

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
  }
}
```

Stripe Payments

# Create Stripe Product

Copy page

Create a Stripe product in the requested environment, then mirror it locally after Stripe succeeds.

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

products

Try it

Create Stripe Product

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "Pro Plan",
  "description": "Monthly access to Pro features",
  "active": true,
  "metadata": {
    "tier": "pro"
  },
  "idempotencyKey": "product-pro-plan"
}
'
```

201

400

401

403

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

[​](#body-name)

name

string

required

Minimum string length: `1`

[​](#body-description-one-of-0)

description

string | null

Maximum string length: `5000`

[​](#body-active)

active

boolean

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

Product created

[​](#response-product)

product

object

required

Show child attributes

[List Stripe Products](/api-reference/stripe-payments/list-stripe-products)[Get Stripe Product](/api-reference/stripe-payments/get-stripe-product)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)