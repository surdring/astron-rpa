Update Razorpay Item

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/items/{itemId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "active": false
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
  "item": {
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
}
```

Razorpay Payments

# Update Razorpay Item

Copy page

Update mutable Razorpay Item fields, then mirror the item locally after Razorpay succeeds.

Copy page

PATCH

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

items

/

{itemId}

Try it

Update Razorpay Item

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/items/{itemId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "active": false
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
  "item": {
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

[​](#parameter-item-id)

itemId

string

required

Razorpay item ID.

Minimum string length: `1`

#### Body

application/json

[​](#body-name)

name

string

Required string length: `1 - 255`

[​](#body-description-one-of-0)

description

string | null

Maximum string length: `2048`

[​](#body-amount)

amount

integer

Required range: `x >= 1`

[​](#body-currency)

currency

string

Required string length: `3`

Example:

`"INR"`

[​](#body-active)

active

boolean

#### Response

200

application/json

Razorpay item updated

[​](#response-item)

item

object

required

Show child attributes

[Create Razorpay Item](/api-reference/razorpay-payments/create-razorpay-item)[Create Razorpay Plan](/api-reference/razorpay-payments/create-razorpay-plan)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)