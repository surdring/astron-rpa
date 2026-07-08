列出 Stripe 订阅

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/subscriptions \
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
      "customerId": "cus_123",
      "subjectType": "<string>",
      "subjectId": "<string>",
      "currentPeriodStart": "2023-11-07T05:31:56Z",
      "currentPeriodEnd": "2023-11-07T05:31:56Z",
      "cancelAtPeriodEnd": true,
      "cancelAt": "2023-11-07T05:31:56Z",
      "canceledAt": "2023-11-07T05:31:56Z",
      "trialStart": "2023-11-07T05:31:56Z",
      "trialEnd": "2023-11-07T05:31:56Z",
      "latestInvoiceId": "in_123",
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z",
      "items": [
        {
          "subscriptionItemId": "si_123",
          "subscriptionId": "sub_123",
          "productId": "prod_123",
          "priceId": "price_123",
          "quantity": 1,
          "metadata": {},
          "createdAt": "2023-11-07T05:31:56Z",
          "updatedAt": "2023-11-07T05:31:56Z"
        }
      ]
    }
  ]
}
```

Stripe 支付

# 列出 Stripe 订阅

复制页面

镜像 Stripe 订阅的管理/调试读取。使用带有 RLS 的应用自有表来存储最终用户支付状态。


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

subscriptions

尝试

列出 Stripe 订阅

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/subscriptions \
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
      "customerId": "cus_123",
      "subjectType": "<string>",
      "subjectId": "<string>",
      "currentPeriodStart": "2023-11-07T05:31:56Z",
      "currentPeriodEnd": "2023-11-07T05:31:56Z",
      "cancelAtPeriodEnd": true,
      "cancelAt": "2023-11-07T05:31:56Z",
      "canceledAt": "2023-11-07T05:31:56Z",
      "trialStart": "2023-11-07T05:31:56Z",
      "trialEnd": "2023-11-07T05:31:56Z",
      "latestInvoiceId": "in_123",
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z",
      "items": [
        {
          "subscriptionItemId": "si_123",
          "subscriptionId": "sub_123",
          "productId": "prod_123",
          "priceId": "price_123",
          "quantity": 1,
          "metadata": {},
          "createdAt": "2023-11-07T05:31:56Z",
          "updatedAt": "2023-11-07T05:31:56Z"
        }
      ]
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

Stripe 订阅


[​](#response-subscriptions)

subscriptions

object[]

必需

显示子属性

[Update Stripe Price](/api-reference/stripe-payments/update-stripe-price)[List Stripe Customers](/api-reference/stripe-payments/list-stripe-customers)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)