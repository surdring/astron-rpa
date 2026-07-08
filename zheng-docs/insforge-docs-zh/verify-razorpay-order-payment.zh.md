验证 Razorpay 订单支付

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/orders/verify \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "orderId": "order_123",
  "paymentId": "pay_123",
  "signature": "razorpay_signature"
}
'
```

200

400

401

403

404

```
{
  "verified": true,
  "order": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerName": "<string>",
    "customerEmail": "jsmith@example.com",
    "customerContact": "<string>",
    "orderId": "order_123",
    "receipt": "<string>",
    "amount": 50000,
    "amountPaid": 123,
    "amountDue": 123,
    "currency": "inr",
    "attempts": 123,
    "verifiedPaymentId": "pay_123",
    "verifiedAt": "2023-11-07T05:31:56Z",
    "notes": {},
    "lastError": "<string>",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

Razorpay 支付

# 验证 Razorpay 订单支付

复制页面

在本地记录已验证的支付 ID 之前，验证订单支付的 Razorpay Checkout 签名。


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

orders

/

verify

尝试

验证 Razorpay 订单支付

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/orders/verify \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "orderId": "order_123",
  "paymentId": "pay_123",
  "signature": "razorpay_signature"
}
'
```

200

400

401

403

404

```
{
  "verified": true,
  "order": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerName": "<string>",
    "customerEmail": "jsmith@example.com",
    "customerContact": "<string>",
    "orderId": "order_123",
    "receipt": "<string>",
    "amount": 50000,
    "amountPaid": 123,
    "amountDue": 123,
    "currency": "inr",
    "attempts": 123,
    "verifiedPaymentId": "pay_123",
    "verifiedAt": "2023-11-07T05:31:56Z",
    "notes": {},
    "lastError": "<string>",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

#### 授权

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

#### 请求体

application/json

[​](#body-order-id)

orderId

string

必需

最小字符串长度: `1`

Example:

`"order_123"`

[​](#body-payment-id)

paymentId

string

必需

最小字符串长度: `1`

Example:

`"pay_123"`

[​](#body-signature)

signature

string

必需

最小字符串长度: `1`

#### 响应

200

application/json

Razorpay 订单支付已验证


[​](#response-verified)

verified

boolean

必需

[​](#response-order)

order

object

必需

显示子属性

[Create Razorpay Order](/api-reference/razorpay-payments/create-razorpay-order)[List Razorpay Payment Catalog](/api-reference/razorpay-payments/list-razorpay-payment-catalog)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)