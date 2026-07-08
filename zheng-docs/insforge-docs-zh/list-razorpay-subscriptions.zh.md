列出 Razorpay 订阅

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "subscriptions": [
    {
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
  ]
}
```

Razorpay 支付

# 列出 Razorpay 订阅

复制页面

镜像 Razorpay 订阅的管理/调试读取。使用带有 RLS 的应用自有表来存储最终用户支付状态。


复制页面

GET

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

列出 Razorpay 订阅

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/subscriptions \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "subscriptions": [
    {
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

Razorpay 订阅


[​](#response-subscriptions)

subscriptions

object[]

必需

显示子属性

[Create Razorpay Plan](/api-reference/razorpay-payments/create-razorpay-plan)[Create Razorpay Subscription](/api-reference/razorpay-payments/create-razorpay-subscription)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)