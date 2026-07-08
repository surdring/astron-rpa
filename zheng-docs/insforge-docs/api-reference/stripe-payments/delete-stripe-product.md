Delete Stripe Product

cURL

```
curl --request DELETE \
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
  "productId": "prod_123",
  "deleted": true
}
```

Stripe Payments

# Delete Stripe Product

Copy page

Delete a Stripe product from one environment, then remove it from the local mirror.

Copy page

DELETE

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

Delete Stripe Product

cURL

```
curl --request DELETE \
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
  "productId": "prod_123",
  "deleted": true
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

Product deleted

[​](#response-product-id)

productId

string

required

Example:

`"prod_123"`

[​](#response-deleted)

deleted

boolean

required

[Get Stripe Product](/api-reference/stripe-payments/get-stripe-product)[Update Stripe Product](/api-reference/stripe-payments/update-stripe-product)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)