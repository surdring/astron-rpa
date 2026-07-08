获取 Razorpay 支付状态

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/status \
  --header 'Authorization: Bearer <token>'
```

200

401

403

```
{
  "razorpayConnections": [
    {
      "accountId": "acc_123",
      "merchantName": "Example Merchant",
      "accountLivemode": true,
      "webhookEndpointId": "manual",
      "webhookEndpointUrl": "https://api.example.com/api/webhooks/razorpay/test",
      "webhookConfiguredAt": "2023-11-07T05:31:56Z",
      "maskedKey": "rzp_test_...abcd",
      "lastSyncedAt": "2023-11-07T05:31:56Z",
      "lastSyncError": "<string>",
      "lastSyncCounts": {}
    }
  ]
}
```

Razorpay 支付

# 获取 Razorpay 支付状态

复制页面

返回每个环境的 Razorpay 连接和同步状态。


复制页面

GET

/

api

/

payments

/

razorpay

/

status

尝试

获取 Razorpay 支付状态

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/status \
  --header 'Authorization: Bearer <token>'
```

200

401

403

```
{
  "razorpayConnections": [
    {
      "accountId": "acc_123",
      "merchantName": "Example Merchant",
      "accountLivemode": true,
      "webhookEndpointId": "manual",
      "webhookEndpointUrl": "https://api.example.com/api/webhooks/razorpay/test",
      "webhookConfiguredAt": "2023-11-07T05:31:56Z",
      "maskedKey": "rzp_test_...abcd",
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

Razorpay 支付状态


[​](#response-razorpay-connections)

razorpayConnections

object[]

必需

显示子属性

[List Stripe Transactions](/api-reference/stripe-payments/list-stripe-transactions)[Get Razorpay Key Configuration](/api-reference/razorpay-payments/get-razorpay-key-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)