创建 Stripe 结账会话

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/checkout-sessions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "mode": "subscription",
  "lineItems": [
    {
      "priceId": "price_123",
      "quantity": 1
    }
  ],
  "successUrl": "https://app.example.com/billing/success",
  "cancelUrl": "https://app.example.com/billing/cancel",
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "customerEmail": "buyer@example.com",
  "idempotencyKey": "checkout-team_123-pro"
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
  "checkoutSession": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerEmail": "jsmith@example.com",
    "checkoutSessionId": "cs_test_123",
    "customerId": "cus_123",
    "paymentIntentId": "pi_123",
    "subscriptionId": "sub_123",
    "url": "https://checkout.stripe.com/c/pay/cs_test_123",
    "lastError": "<string>",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  }
}
```

Stripe 支付

# 创建 Stripe 结账会话

复制页面

Create a local checkout attempt with the caller’s user context and then create a Stripe Checkout Session. Subscription mode requires a billing subject.

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

checkout-sessions

尝试

创建 Stripe 结账会话

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/checkout-sessions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "mode": "subscription",
  "lineItems": [
    {
      "priceId": "price_123",
      "quantity": 1
    }
  ],
  "successUrl": "https://app.example.com/billing/success",
  "cancelUrl": "https://app.example.com/billing/cancel",
  "subject": {
    "type": "team",
    "id": "team_123"
  },
  "customerEmail": "buyer@example.com",
  "idempotencyKey": "checkout-team_123-pro"
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
  "checkoutSession": {
    "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "customerEmail": "jsmith@example.com",
    "checkoutSessionId": "cs_test_123",
    "customerId": "cus_123",
    "paymentIntentId": "pi_123",
    "subscriptionId": "sub_123",
    "url": "https://checkout.stripe.com/c/pay/cs_test_123",
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

Metadata keys starting with insforge\_ are reserved and rejected.

[​](#body-mode)

mode

enum<string>

必需

可用选项:

`payment`,

`subscription`

[​](#body-line-items)

lineItems

object[]

必需

Required array length: `1 - 100` elements

显示子属性

[​](#body-success-url)

successUrl

string<uri>

必需

[​](#body-cancel-url)

cancelUrl

string<uri>

必需

[​](#body-subject)

subject

object

显示子属性

[​](#body-customer-email-one-of-0)

customerEmail

string<email> | null

[​](#body-metadata)

metadata

object

显示子属性

[​](#body-idempotency-key)

idempotencyKey

string

所需字符串长度: `1 - 200`

#### 响应

201

application/json

结账会话已创建


[​](#response-checkout-session)

checkoutSession

object

必需

显示子属性

[Send raw HTML email](/api-reference/client/send-raw-html-email)[Create Stripe Customer Portal Session](/api-reference/stripe-payments/create-stripe-customer-portal-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)