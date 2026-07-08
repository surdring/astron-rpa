Sync Stripe Payments State For One Environment

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/sync \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "results": [
    {
      "connection": {
        "accountId": "acct_123",
        "accountEmail": "owner@example.com",
        "accountLivemode": true,
        "webhookEndpointId": "we_123",
        "webhookEndpointUrl": "https://api.example.com/api/webhooks/stripe/test",
        "webhookConfiguredAt": "2023-11-07T05:31:56Z",
        "maskedKey": "sk_test_...abcd",
        "lastSyncedAt": "2023-11-07T05:31:56Z",
        "lastSyncError": "<string>",
        "lastSyncCounts": {}
      },
      "subscriptions": {
        "synced": 1,
        "unmapped": 1,
        "deleted": 1
      }
    }
  ]
}
```

Stripe Payments

# Sync Stripe Payments State For One Environment

Copy page

Sync products, prices, customers, and subscriptions for one Stripe environment. Stripe remains the source of truth.

Copy page

POST

/

api

/

payments

/

stripe

/

{environment}

/

sync

Try it

Sync Stripe Payments State For One Environment

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/sync \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "results": [
    {
      "connection": {
        "accountId": "acct_123",
        "accountEmail": "owner@example.com",
        "accountLivemode": true,
        "webhookEndpointId": "we_123",
        "webhookEndpointUrl": "https://api.example.com/api/webhooks/stripe/test",
        "webhookConfiguredAt": "2023-11-07T05:31:56Z",
        "maskedKey": "sk_test_...abcd",
        "lastSyncedAt": "2023-11-07T05:31:56Z",
        "lastSyncError": "<string>",
        "lastSyncCounts": {}
      },
      "subscriptions": {
        "synced": 1,
        "unmapped": 1,
        "deleted": 1
      }
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

Sync result for the requested environment

[​](#response-results)

results

object[]

required

Show child attributes

[Sync Stripe Payments State](/api-reference/stripe-payments/sync-stripe-payments-state)[Configure Managed Stripe Webhook](/api-reference/stripe-payments/configure-managed-stripe-webhook)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)