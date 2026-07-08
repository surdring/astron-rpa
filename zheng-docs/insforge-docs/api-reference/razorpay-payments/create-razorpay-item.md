Create Razorpay Item

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/items \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "One-time setup",
  "amount": 50000,
  "currency": "INR"
}
'
```

201

400

401

403

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

# Create Razorpay Item

Copy page

Create a Razorpay Item, then mirror it locally after Razorpay succeeds.

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

items

Try it

Create Razorpay Item

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/items \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "One-time setup",
  "amount": 50000,
  "currency": "INR"
}
'
```

201

400

401

403

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

#### Body

application/json

[​](#body-name)

name

string

required

Required string length: `1 - 255`

[​](#body-amount)

amount

integer

required

Required range: `x >= 1`

[​](#body-currency)

currency

string

required

Required string length: `3`

Example:

`"INR"`

[​](#body-description-one-of-0)

description

string | null

Maximum string length: `2048`

#### Response

201

application/json

Razorpay item created

[​](#response-item)

item

object

required

Show child attributes

[List Razorpay Payment Catalog](/api-reference/razorpay-payments/list-razorpay-payment-catalog)[Update Razorpay Item](/api-reference/razorpay-payments/update-razorpay-item)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)