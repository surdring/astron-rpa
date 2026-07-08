获取 Stripe 支付状态

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

Stripe 支付

# 获取 Stripe 支付状态

复制页面

返回每个环境的 Stripe 连接、同步和托管 webhook 状态。


复制页面

GET

/

api

/

payments

/

stripe

/

status

尝试

获取 Stripe 支付状态

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

Stripe 支付状态


[​](#response-connections)

connections

object[]

必需

显示子属性

[Create Stripe Customer Portal Session](/api-reference/stripe-payments/create-stripe-customer-portal-session)[Get Stripe Key Configuration](/api-reference/stripe-payments/get-stripe-key-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)