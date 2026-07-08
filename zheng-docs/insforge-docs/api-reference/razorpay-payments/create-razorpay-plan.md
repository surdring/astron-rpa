Create Razorpay Plan

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/plans \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "period": "monthly",
  "interval": 1,
  "item": {
    "name": "Pro monthly",
    "amount": 199900,
    "currency": "INR"
  }
}
'
```

201

400

401

403

```
{
  "plan": {
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
}
```

Razorpay Payments

# Create Razorpay Plan

Copy page

Create a Razorpay Plan with its amount-bearing item definition, then mirror it locally after Razorpay succeeds.

Copy page

POST

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

/

plans

Try it

Create Razorpay Plan

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/plans \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "period": "monthly",
  "interval": 1,
  "item": {
    "name": "Pro monthly",
    "amount": 199900,
    "currency": "INR"
  }
}
'
```

201

400

401

403

```
{
  "plan": {
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

Notes keys starting with insforge\_ are reserved and rejected.

[​](#body-period)

period

enum<string>

required

Available options:

`daily`,

`weekly`,

`monthly`,

`yearly`

[​](#body-interval)

interval

integer

required

Required range: `x >= 1`

[​](#body-item)

item

object

required

Show child attributes

[​](#body-notes)

notes

object

Show child attributes

#### Response

201

application/json

Razorpay plan created

[​](#response-plan)

plan

object

required

Show child attributes

[Update Razorpay Item](/api-reference/razorpay-payments/update-razorpay-item)[List Razorpay Subscriptions](/api-reference/razorpay-payments/list-razorpay-subscriptions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)