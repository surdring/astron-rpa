接收 Stripe Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/webhooks/stripe/{environment} \
  --header 'Content-Type: application/json' \
  --header 'stripe-signature: <api-key>' \
  --data '{}'
```

200

400

401

500

```
{
  "received": true,
  "handled": true,
  "event": {
    "eventId": "evt_123",
    "eventType": "checkout.session.completed",
    "livemode": true,
    "accountId": "acct_123",
    "objectType": "checkout.session",
    "objectId": "cs_test_123",
    "attemptCount": 123,
    "lastError": "<string>",
    "receivedAt": "2023-11-07T05:31:56Z",
    "processedAt": "2023-11-07T05:31:56Z",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

支付 Webhook

# 接收 Stripe Webhook

复制页面

接收单个环境的 Stripe 事件。请求体必须是原始的 Stripe JSON 体，并且必须包含 Stripe 签名头部。


复制页面

POST

/

api

/

webhooks

/

stripe

/

{environment}

尝试

接收 Stripe Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/webhooks/stripe/{environment} \
  --header 'Content-Type: application/json' \
  --header 'stripe-signature: <api-key>' \
  --data '{}'
```

200

400

401

500

```
{
  "received": true,
  "handled": true,
  "event": {
    "eventId": "evt_123",
    "eventType": "checkout.session.completed",
    "livemode": true,
    "accountId": "acct_123",
    "objectType": "checkout.session",
    "objectId": "cs_test_123",
    "attemptCount": 123,
    "lastError": "<string>",
    "receivedAt": "2023-11-07T05:31:56Z",
    "processedAt": "2023-11-07T05:31:56Z",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

#### 授权

[​](#authorization-stripe-signature)

stripe-signature

string

header

必需

#### 路径参数

[​](#parameter-environment)

environment

enum<string>

必需

支付提供商环境。

可用选项:

`test`,

`live`

#### 请求体

application/json

请求体类型为 `object`。

#### 响应

200

application/json

Webhook 已接收


[​](#response-received)

received

boolean

必需

[​](#response-handled)

handled

boolean

必需

[​](#response-event)

event

object

显示子属性

[List Razorpay Transactions](/api-reference/razorpay-payments/list-razorpay-transactions)[Receive Razorpay Webhook](/api-reference/payment-webhooks/receive-razorpay-webhook)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)