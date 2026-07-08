创建 Razorpay 订阅

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "planId": "plan_123",
  "totalCount": 12,
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
  "subscription": {
    "subscriptionId": "sub_123",
    "planId": "plan_123",
    "customerId": "cust_123",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "currentStart": "2023-11-07T05:31:56Z",
    "currentEnd": "2023-11-07T05:31:56Z",
    "endedAt": "2023-11-07T05:31:56Z",
    "quantity": 123,
    "chargeAt": "2023-11-07T05:31:56Z",
    "startAt": "2023-11-07T05:31:56Z",
    "endAt": "2023-11-07T05:31:56Z",
    "totalCount": 123,
    "authAttempts": 123,
    "paidCount": 123,
    "remainingCount": 123,
    "shortUrl": "<string>",
    "hasScheduledChanges": true,
    "changeScheduledAt": "2023-11-07T05:31:56Z",
    "offerId": "<string>",
    "authorizationPaymentId": "pay_123",
    "authorizationVerifiedAt": "2023-11-07T05:31:56Z",
    "notes": {},
    "providerCreatedAt": "2023-11-07T05:31:56Z",
    "syncedAt": "2023-11-07T05:31:56Z",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  },
  "checkoutOptions": {
    "key": "rzp_test_xxx",
    "subscription_id": "sub_123",
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

# 创建 Razorpay 订阅

复制页面

Create a Razorpay Subscription and mirror it locally, then return Checkout options for authorization. The backend first evaluates the caller’s INSERT policy on payments.razorpay\_subscriptions so apps can restrict which subjects can start subscriptions.

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

subscriptions

尝试

创建 Razorpay 订阅

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "planId": "plan_123",
  "totalCount": 12,
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
  "subscription": {
    "subscriptionId": "sub_123",
    "planId": "plan_123",
    "customerId": "cust_123",
    "subjectType": "<string>",
    "subjectId": "<string>",
    "currentStart": "2023-11-07T05:31:56Z",
    "currentEnd": "2023-11-07T05:31:56Z",
    "endedAt": "2023-11-07T05:31:56Z",
    "quantity": 123,
    "chargeAt": "2023-11-07T05:31:56Z",
    "startAt": "2023-11-07T05:31:56Z",
    "endAt": "2023-11-07T05:31:56Z",
    "totalCount": 123,
    "authAttempts": 123,
    "paidCount": 123,
    "remainingCount": 123,
    "shortUrl": "<string>",
    "hasScheduledChanges": true,
    "changeScheduledAt": "2023-11-07T05:31:56Z",
    "offerId": "<string>",
    "authorizationPaymentId": "pay_123",
    "authorizationVerifiedAt": "2023-11-07T05:31:56Z",
    "notes": {},
    "providerCreatedAt": "2023-11-07T05:31:56Z",
    "syncedAt": "2023-11-07T05:31:56Z",
    "createdAt": "2023-11-07T05:31:56Z",
    "updatedAt": "2023-11-07T05:31:56Z"
  },
  "checkoutOptions": {
    "key": "rzp_test_xxx",
    "subscription_id": "sub_123",
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

* Option 1
* Option 2

Notes keys starting with insforge\_ are reserved and rejected. Either totalCount or endAt is required.

[​](#body-one-of-0-plan-id)

planId

string

必需

最小字符串长度: `1`

Example:

`"plan_123"`

[​](#body-one-of-0-total-count)

totalCount

integer

必需

所需范围: `x >= 1`

[​](#body-one-of-0-subject)

subject

object

必需

显示子属性

[​](#body-one-of-0-end-at)

endAt

integer

Unix 时间戳（秒）。


所需范围: `x >= 1`

[​](#body-one-of-0-quantity)

quantity

integer

所需范围: `x >= 1`

[​](#body-one-of-0-start-at)

startAt

integer

Unix 时间戳（秒）。


所需范围: `x >= 1`

[​](#body-one-of-0-expire-by)

expireBy

integer

Unix 时间戳（秒）。


所需范围: `x >= 1`

[​](#body-one-of-0-customer-notify)

customerNotify

boolean

[​](#body-one-of-0-offer-id-one-of-0)

offerId

string | null

所需字符串长度: `1 - 255`

[​](#body-one-of-0-description-one-of-0)

description

string | null

最大字符串长度: `2048`

[​](#body-one-of-0-customer-name-one-of-0)

customerName

string | null

所需字符串长度: `1 - 255`

[​](#body-one-of-0-customer-email-one-of-0)

customerEmail

string<email> | null

[​](#body-one-of-0-customer-contact-one-of-0)

customerContact

string | null

所需字符串长度: `1 - 32`

[​](#body-one-of-0-callback-url-one-of-0)

callbackUrl

string<uri> | null

[​](#body-one-of-0-notes)

notes

object

原生 Razorpay 订阅备注，可在 webhook 负载中使用。


显示子属性

#### 响应

201

application/json

Razorpay 订阅已创建


[​](#response-subscription)

subscription

object

必需

显示子属性

[​](#response-checkout-options)

checkoutOptions

object

必需

显示子属性

[List Razorpay Subscriptions](/api-reference/razorpay-payments/list-razorpay-subscriptions)[Verify Razorpay Subscription Authorization](/api-reference/razorpay-payments/verify-razorpay-subscription-authorization)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)