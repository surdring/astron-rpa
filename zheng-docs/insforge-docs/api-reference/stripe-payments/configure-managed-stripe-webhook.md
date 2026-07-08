Configure Managed Stripe Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/webhook \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
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
  }
}
```

Stripe Payments

# Configure Managed Stripe Webhook

Copy page

Create or recreate the InsForge-managed Stripe webhook endpoint for one environment.

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

webhook

Try it

Configure Managed Stripe Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/webhook \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
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

#### Response

200

application/json

Managed webhook configuration result

[​](#response-connection)

connection

object

required

Show child attributes

[Sync Stripe Payments State For One Environment](/api-reference/stripe-payments/sync-stripe-payments-state-for-one-environment)[List Stripe Catalog](/api-reference/stripe-payments/list-stripe-catalog)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)