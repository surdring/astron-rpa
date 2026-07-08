List Stripe Products

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products \
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
  ]
}
```

Stripe Payments

# List Stripe Products

Copy page

List mirrored Stripe products for one environment.

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

Try it

List Stripe Products

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products \
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

Stripe products

[​](#response-products)

products

object[]

required

Show child attributes

[List Stripe Catalog](/api-reference/stripe-payments/list-stripe-catalog)[Create Stripe Product](/api-reference/stripe-payments/create-stripe-product)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)