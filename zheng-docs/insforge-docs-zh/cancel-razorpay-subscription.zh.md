取消 Razorpay 订阅

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions/{subscriptionId}/cancel \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "cancelAtCycleEnd": true
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
  }
}
```

Razorpay 支付

# 取消 Razorpay 订阅

复制页面

Cancel a Razorpay subscription after evaluating the caller’s UPDATE policy on payments.razorpay\_subscriptions.

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

/

{subscriptionId}

/

cancel

尝试

取消 Razorpay 订阅

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions/{subscriptionId}/cancel \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "cancelAtCycleEnd": true
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

[​](#parameter-subscription-id)

subscriptionId

string

必需

Razorpay 订阅 ID。


最小字符串长度: `1`

#### 请求体

application/json

[​](#body-cancel-at-cycle-end)

cancelAtCycleEnd

boolean

default:false

当为 true 时，在当前计费周期结束时取消。默认为立即取消。


#### 响应

200

application/json

Razorpay 订阅已取消


[​](#response-subscription)

subscription

object

必需

显示子属性

[Verify Razorpay Subscription Authorization](/api-reference/razorpay-payments/verify-razorpay-subscription-authorization)[Pause Razorpay Subscription](/api-reference/razorpay-payments/pause-razorpay-subscription)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)