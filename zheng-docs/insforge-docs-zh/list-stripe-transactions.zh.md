列出 Stripe 交易

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/transactions \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "transactions": [
    {
      "subjectType": "<string>",
      "subjectId": "<string>",
      "providerCustomerId": "cus_123",
      "customerEmailSnapshot": "jsmith@example.com",
      "providerReferenceId": "pi_123",
      "providerReferenceType": "payment_intent",
      "amount": 2900,
      "amountRefunded": 0,
      "currency": "usd",
      "description": "<string>",
      "paidAt": "2023-11-07T05:31:56Z",
      "failedAt": "2023-11-07T05:31:56Z",
      "refundedAt": "2023-11-07T05:31:56Z",
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ]
}
```

Stripe 支付

# 列出 Stripe 交易

复制页面

Admin/debug read for InsForge’s Stripe transaction projection. Use app-owned fulfillment tables with RLS for end-user order, credit, or entitlement state.

复制页面

GET

/

api

/

payments

/

stripe

/

{environment}

/

transactions

尝试

列出 Stripe 交易

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/transactions \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "transactions": [
    {
      "subjectType": "<string>",
      "subjectId": "<string>",
      "providerCustomerId": "cus_123",
      "customerEmailSnapshot": "jsmith@example.com",
      "providerReferenceId": "pi_123",
      "providerReferenceType": "payment_intent",
      "amount": 2900,
      "amountRefunded": 0,
      "currency": "usd",
      "description": "<string>",
      "paidAt": "2023-11-07T05:31:56Z",
      "failedAt": "2023-11-07T05:31:56Z",
      "refundedAt": "2023-11-07T05:31:56Z",
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
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

#### 路径参数

[​](#parameter-environment)

environment

enum<string>

必需

支付提供商环境。

可用选项:

`test`,

`live`

#### 查询参数

[​](#parameter-subject-type)

subjectType

string

计费主体类型。必须与 subjectId 一起提供。


所需字符串长度: `1 - 100`

[​](#parameter-subject-id)

subjectId

string

计费主体 ID。必须与 subjectType 一起提供。


所需字符串长度: `1 - 255`

[​](#parameter-limit)

limit

integer

default:50

最大返回行数。


所需范围: `1 <= x <= 100`

#### 响应

200

application/json

Stripe 交易


[​](#response-transactions)

transactions

object[]

必需

显示子属性

[List Stripe Customers](/api-reference/stripe-payments/list-stripe-customers)[Get Razorpay Payments Status](/api-reference/razorpay-payments/get-razorpay-payments-status)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)