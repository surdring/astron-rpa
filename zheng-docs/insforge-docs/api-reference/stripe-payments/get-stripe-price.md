Get Stripe Price

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices/{priceId} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

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

# Get Stripe Price

Copy page

Get one mirrored Stripe price.

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

prices

/

{priceId}

Try it

Get Stripe Price

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices/{priceId} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

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

[​](#parameter-price-id)

priceId

string

required

Stripe price ID.

Minimum string length: `1`

#### Response

200

application/json

Price

[​](#response-price)

price

object

required

Show child attributes

[Create Stripe Price](/api-reference/stripe-payments/create-stripe-price)[Archive Stripe Price](/api-reference/stripe-payments/archive-stripe-price)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)