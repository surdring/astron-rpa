轮换 Razorpay Webhook 密钥

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/webhook/rotate-secret \
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

# 轮换 Razorpay Webhook 密钥

复制页面

生成新的 Razorpay webhook 签名密钥。调用此端点后，在 Razorpay 仪表盘中更新 webhook 密钥。


复制页面

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

webhook

/

rotate-secret

尝试

轮换 Razorpay Webhook 密钥

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/webhook/rotate-secret \
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

带有轮换后密钥的 Razorpay webhook 设置值


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

[Get Razorpay Webhook Setup Values](/api-reference/razorpay-payments/get-razorpay-webhook-setup-values)[Create Razorpay Order](/api-reference/razorpay-payments/create-razorpay-order)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)