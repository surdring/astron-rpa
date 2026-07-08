创建 Razorpay 计划

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/plans \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "period": "monthly",
  "interval": 1,
  "item": {
    "name": "Pro monthly",
    "amount": 199900,
    "currency": "INR"
  }
}
'
```

201

400

401

403

```
{
  "plan": {
    "planId": "plan_123",
    "itemId": "item_123",
    "period": "monthly",
    "interval": 1,
    "amount": 290000,
    "unitAmount": 290000,
    "currency": "inr",
    "active": true,
    "notes": {},
    "providerCreatedAt": "2023-11-07T05:31:56Z",
    "syncedAt": "2023-11-07T05:31:56Z"
  }
}
```

Razorpay 支付

# 创建 Razorpay 计划

复制页面

使用带金额的项目定义创建 Razorpay 计划，然后在 Razorpay 成功后将其镜像到本地。


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

catalog

/

plans

尝试

创建 Razorpay 计划

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/plans \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "period": "monthly",
  "interval": 1,
  "item": {
    "name": "Pro monthly",
    "amount": 199900,
    "currency": "INR"
  }
}
'
```

201

400

401

403

```
{
  "plan": {
    "planId": "plan_123",
    "itemId": "item_123",
    "period": "monthly",
    "interval": 1,
    "amount": 290000,
    "unitAmount": 290000,
    "currency": "inr",
    "active": true,
    "notes": {},
    "providerCreatedAt": "2023-11-07T05:31:56Z",
    "syncedAt": "2023-11-07T05:31:56Z"
  }
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

#### 请求体

application/json

Notes keys starting with insforge\_ are reserved and rejected.

[​](#body-period)

period

enum<string>

必需

可用选项:

`daily`,

`weekly`,

`monthly`,

`yearly`

[​](#body-interval)

interval

integer

必需

所需范围: `x >= 1`

[​](#body-item)

item

object

必需

显示子属性

[​](#body-notes)

notes

object

显示子属性

#### 响应

201

application/json

Razorpay 计划已创建


[​](#response-plan)

plan

object

必需

显示子属性

[Update Razorpay Item](/api-reference/razorpay-payments/update-razorpay-item)[List Razorpay Subscriptions](/api-reference/razorpay-payments/list-razorpay-subscriptions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)