接收 Razorpay Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/webhooks/razorpay/{environment} \
  --header 'Content-Type: application/json' \
  --header 'x-razorpay-signature: <api-key>' \
  --data '{}'
```

200

400

401

500

```
{
  "received": true,
  "handled": true
}
```

支付 Webhook

# 接收 Razorpay Webhook

复制页面

接收单个环境的 Razorpay 事件。请求体必须是原始的 Razorpay JSON 体，并且必须包含 Razorpay 签名头部。


复制页面

POST

/

api

/

webhooks

/

razorpay

/

{environment}

尝试

接收 Razorpay Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/webhooks/razorpay/{environment} \
  --header 'Content-Type: application/json' \
  --header 'x-razorpay-signature: <api-key>' \
  --data '{}'
```

200

400

401

500

```
{
  "received": true,
  "handled": true
}
```

#### 授权

[​](#authorization-x-razorpay-signature)

x-razorpay-signature

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

[Receive Stripe Webhook](/api-reference/payment-webhooks/receive-stripe-webhook)[List all secrets](/api-reference/admin/list-all-secrets)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)