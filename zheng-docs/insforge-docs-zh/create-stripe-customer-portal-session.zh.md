创建 Stripe 客户门户会话

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/customer-portal-sessions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "returnUrl": "https://app.example.com/billing"
}
'
```

201

400

401

403

404

500

```
{
  "customerPortalSession": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerId": "cus_123",
    "returnUrl": "https://app.example.com/billing",
    "configuration": "<string>",
    "url": "https://billing.stripe.com/p/session/test_123",
    "lastError": "<string>",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

Stripe 支付

# 创建 Stripe 客户门户会话

复制页面

Create a Stripe Billing Portal Session for an authenticated user’s mapped billing subject.

复制页面

POST

/

api

/

payments

/

stripe

/

{environment}

/

customer-portal-sessions

尝试

创建 Stripe 客户门户会话

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/customer-portal-sessions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "returnUrl": "https://app.example.com/billing"
}
'
```

201

400

401

403

404

500

```
{
  "customerPortalSession": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerId": "cus_123",
    "returnUrl": "https://app.example.com/billing",
    "configuration": "<string>",
    "url": "https://billing.stripe.com/p/session/test_123",
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

[​](#body-subject)

subject

object

必需

显示子属性

[​](#body-return-url)

returnUrl

string<uri>

[​](#body-configuration)

configuration

string

所需字符串长度: `1 - 255`

#### 响应

201

application/json

客户门户会话已创建


[​](#response-customer-portal-session)

customerPortalSession

object

必需

显示子属性

[Create Stripe Checkout Session](/api-reference/stripe-payments/create-stripe-checkout-session)[Get Stripe Payments Status](/api-reference/stripe-payments/get-stripe-payments-status)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)