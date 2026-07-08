Archive Stripe Price

cURL

```
curl --request DELETE \
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
  },
  "archived": true
}
```

Stripe Payments

# Archive Stripe Price

Copy page

Archive a Stripe price in one environment, then mirror the archived state locally.

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

prices

/

{priceId}

Try it

Archive Stripe Price

cURL

```
curl --request DELETE \
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
  },
  "archived": true
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

Price archived

[​](#response-price)

price

object

required

Show child attributes

[​](#response-archived)

archived

boolean

required

[Get Stripe Price](/api-reference/stripe-payments/get-stripe-price)[Update Stripe Price](/api-reference/stripe-payments/update-stripe-price)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)