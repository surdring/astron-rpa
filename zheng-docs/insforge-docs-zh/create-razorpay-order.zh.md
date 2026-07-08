创建 Razorpay 订单

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/orders \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "amount": 50000,
  "currency": "INR",
  "receipt": "order-team_123-pro",
  "description": "Pro upgrade",
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "customerEmail": "buyer@example.com"
}
'
```

201

400

401

403

500

```
{
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
  },
  "checkoutOptions": {
    "key": "rzp_test_xxx",
    "amount": 2,
    "currency": "INR",
    "order_id": "order_123",
    "prefill": {
      "name": "<string>",
      "email": "jsmith@example.com",
      "contact": "<string>"
    },
    "name": "<string>",
    "description": "<string>",
    "callback_url": "<string>"
  }
}
```

Razorpay 支付

# 创建 Razorpay 订单

复制页面

Create a local Razorpay Order record with the caller’s user context, create a Razorpay Order, and return Checkout options for the client-side Razorpay Checkout script.

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

尝试

创建 Razorpay 订单

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/orders \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "amount": 50000,
  "currency": "INR",
  "receipt": "order-team_123-pro",
  "description": "Pro upgrade",
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "customerEmail": "buyer@example.com"
}
'
```

201

400

401

403

500

```
{
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
  },
  "checkoutOptions": {
    "key": "rzp_test_xxx",
    "amount": 2,
    "currency": "INR",
    "order_id": "order_123",
    "prefill": {
      "name": "<string>",
      "email": "jsmith@example.com",
      "contact": "<string>"
    },
    "name": "<string>",
    "description": "<string>",
    "callback_url": "<string>"
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

Notes keys starting with insforge\_ are reserved and rejected.

[​](#body-amount)

amount

integer

必需

所需范围: `x >= 1`

Example:

`50000`

[​](#body-currency)

currency

string

必需

所需字符串长度: `3`

Example:

`"INR"`

[​](#body-receipt-one-of-0)

receipt

string | null

所需字符串长度: `1 - 40`

[​](#body-description-one-of-0)

description

string | null

最大字符串长度: `2048`

[​](#body-subject)

subject

object

显示子属性

[​](#body-customer-name-one-of-0)

customerName

string | null

所需字符串长度: `1 - 255`

[​](#body-customer-email-one-of-0)

customerEmail

string<email> | null

[​](#body-customer-contact-one-of-0)

customerContact

string | null

所需字符串长度: `1 - 32`

[​](#body-callback-url-one-of-0)

callbackUrl

string<uri> | null

[​](#body-notes)

notes

object

Native Razorpay notes. Use stable app identifiers such as `order_id` for webhook fulfillment triggers.

显示子属性

#### 响应

201

application/json

Razorpay 订单已创建


[​](#response-order)

order

object

必需

显示子属性

[​](#response-checkout-options)

checkoutOptions

object

必需

显示子属性

[Rotate Razorpay Webhook Secret](/api-reference/razorpay-payments/rotate-razorpay-webhook-secret)[Verify Razorpay Order Payment](/api-reference/razorpay-payments/verify-razorpay-order-payment)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)