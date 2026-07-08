List Razorpay Payment Catalog

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "items": [
    {
      "itemId": "item_123",
      "name": "Pro monthly",
      "description": "<string>",
      "active": true,
      "amount": 290000,
      "unitAmount": 290000,
      "currency": "inr",
      "type": "invoice",
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "plans": [
    {
      "planId": "plan_123",
      "itemId": "item_123",
      "period": "monthly",
      "interval": 1,
      "amount": 290000,
      "unitAmount": 290000,
      "currency": "inr",
      "active": true,
      "notes": {},
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ]
}
```

Razorpay Payments

# List Razorpay Payment Catalog

Copy page

Return mirrored Razorpay items and plans for one environment.

Copy page

GET

/

api

/

payments

/

razorpay

/

{environment}

/

catalog

Try it

List Razorpay Payment Catalog

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "items": [
    {
      "itemId": "item_123",
      "name": "Pro monthly",
      "description": "<string>",
      "active": true,
      "amount": 290000,
      "unitAmount": 290000,
      "currency": "inr",
      "type": "invoice",
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "plans": [
    {
      "planId": "plan_123",
      "itemId": "item_123",
      "period": "monthly",
      "interval": 1,
      "amount": 290000,
      "unitAmount": 290000,
      "currency": "inr",
      "active": true,
      "notes": {},
      "providerCreatedAt": "2023-11-07T05:31:56Z",
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

Synced Razorpay items and plans

[​](#response-items)

items

object[]

required

Show child attributes

[​](#response-plans)

plans

object[]

required

Show child attributes

[Verify Razorpay Order Payment](/api-reference/razorpay-payments/verify-razorpay-order-payment)[Create Razorpay Item](/api-reference/razorpay-payments/create-razorpay-item)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)