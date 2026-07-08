Update Stripe Price

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices/{priceId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "active": true,
  "lookupKey": "pro_monthly"
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

# Update Stripe Price

Copy page

Update mutable Stripe price fields, then mirror the price locally after Stripe succeeds.

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

prices

/

{priceId}

Try it

Update Stripe Price

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices/{priceId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "active": true,
  "lookupKey": "pro_monthly"
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

#### Body

application/json

[​](#body-active)

active

boolean

[​](#body-lookup-key-one-of-0)

lookupKey

string | null

Required string length: `1 - 200`

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

#### Response

200

application/json

Price updated

[​](#response-price)

price

object

required

Show child attributes

[Archive Stripe Price](/api-reference/stripe-payments/archive-stripe-price)[List Stripe Subscriptions](/api-reference/stripe-payments/list-stripe-subscriptions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)