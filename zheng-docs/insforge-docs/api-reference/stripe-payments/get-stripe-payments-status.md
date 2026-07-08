Get Stripe Payments Status

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/status \
  --header 'Authorization: Bearer <token>'
```

200

401

403

```
{
  "connections": [
    {
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
  ]
}
```

Stripe Payments

# Get Stripe Payments Status

Copy page

Return Stripe connection, sync, and managed webhook status for each environment.

Copy page

GET

/

api

/

payments

/

stripe

/

status

Try it

Get Stripe Payments Status

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/status \
  --header 'Authorization: Bearer <token>'
```

200

401

403

```
{
  "connections": [
    {
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

#### Response

200

application/json

Stripe payments status

[​](#response-connections)

connections

object[]

required

Show child attributes

[Create Stripe Customer Portal Session](/api-reference/stripe-payments/create-stripe-customer-portal-session)[Get Stripe Key Configuration](/api-reference/stripe-payments/get-stripe-key-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)