获取 Razorpay Webhook 设置值

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/webhook \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
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
  "webhookUrl": "https://api.example.com/api/webhooks/razorpay/test",
  "webhookSecret": "webhook_secret_xxx"
}
```

Razorpay 支付

# 获取 Razorpay Webhook 设置值

复制页面

返回必须复制到 Razorpay 仪表盘以进行手动 webhook 设置的 Razorpay webhook URL 和签名密钥。


复制页面

GET

/

api

/

payments

/

razorpay

/

{environment}

/

webhook

尝试

获取 Razorpay Webhook 设置值

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/webhook \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
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
  "webhookUrl": "https://api.example.com/api/webhooks/razorpay/test",
  "webhookSecret": "webhook_secret_xxx"
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

#### 路径参数

[​](#parameter-environment)

environment

enum<string>

必需

支付提供商环境。

可用选项:

`test`,

`live`

#### 响应

200

application/json

Razorpay webhook 设置值


[​](#response-connection)

connection

object

必需

显示子属性

[​](#response-webhook-url)

webhookUrl

string

必需

要复制到 Razorpay 仪表盘的 Webhook 端点 URL。


Example:

`"https://api.example.com/api/webhooks/razorpay/test"`

[​](#response-webhook-secret)

webhookSecret

string

必需

要复制到 Razorpay 仪表盘的原始签名密钥。


Example:

`"webhook_secret_xxx"`

[Sync Razorpay Payments State For One Environment](/api-reference/razorpay-payments/sync-razorpay-payments-state-for-one-environment)[Rotate Razorpay Webhook Secret](/api-reference/razorpay-payments/rotate-razorpay-webhook-secret)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)