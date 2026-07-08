同步 Razorpay 支付状态

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/sync \
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
      },
      "syncCounts": {
        "plans": 1,
        "items": 1,
        "customers": 1,
        "subscriptions": 1,
        "invoices": 1,
        "payments": 1
      },
      "error": "<string>"
    }
  ]
}
```

Razorpay 支付

# 同步 Razorpay 支付状态

复制页面

同步每个已配置 Razorpay 环境的项目、计划、客户、订阅、发票和支付。Razorpay 仍然是数据源。


复制页面

POST

/

api

/

payments

/

razorpay

/

sync

尝试

同步 Razorpay 支付状态

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/sync \
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
      },
      "syncCounts": {
        "plans": 1,
        "items": 1,
        "customers": 1,
        "subscriptions": 1,
        "invoices": 1,
        "payments": 1
      },
      "error": "<string>"
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

已配置 Razorpay 环境的同步结果


[​](#response-results)

results

object[]

必需

显示子属性

[Get Razorpay Key Configuration](/api-reference/razorpay-payments/get-razorpay-key-configuration)[Configure Razorpay Keys](/api-reference/razorpay-payments/configure-razorpay-keys)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)