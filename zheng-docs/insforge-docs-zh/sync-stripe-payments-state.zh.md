同步 Stripe 支付状态

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/sync \
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

Stripe 支付

# 同步 Stripe 支付状态

复制页面

同步每个已配置 Stripe 环境的产品、价格、客户和订阅。Stripe 仍然是数据源。


复制页面

POST

/

api

/

payments

/

stripe

/

sync

尝试

同步 Stripe 支付状态

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/sync \
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

#### 授权

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

授权

string

header

必需

Bearer 认证头部，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 响应

200

application/json

已配置环境的同步结果


[​](#response-results)

results

object[]

必需

显示子属性

[Remove Stripe Secret Key](/api-reference/stripe-payments/remove-stripe-secret-key)[Sync Stripe Payments State For One Environment](/api-reference/stripe-payments/sync-stripe-payments-state-for-one-environment)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)