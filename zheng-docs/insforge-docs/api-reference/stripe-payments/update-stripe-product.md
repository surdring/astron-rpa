Update Stripe Product

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products/{productId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "Pro Plan",
  "active": true
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

# Update Stripe Product

Copy page

Update a Stripe product, then mirror it locally after Stripe succeeds.

Copy page

PATCH

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

Update Stripe Product

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products/{productId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "Pro Plan",
  "active": true
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

[​](#parameter-product-id)

productId

string

required

Stripe product ID.

Minimum string length: `1`

#### Body

application/json

[​](#body-name)

name

string

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

#### Response

200

application/json

Product updated

[​](#response-product)

product

object

required

Show child attributes

[Delete Stripe Product](/api-reference/stripe-payments/delete-stripe-product)[List Stripe Prices](/api-reference/stripe-payments/list-stripe-prices)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)