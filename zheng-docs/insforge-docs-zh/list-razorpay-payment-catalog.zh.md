列出 Razorpay 支付目录

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "items": [
    {
      "itemId": "item_123",
      "name": "Pro monthly",
      "description": "<string>",
      "active": true,
      "amount": 290000,
      "unitAmount": 290000,
      "currency": "inr",
      "type": "invoice",
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "plans": [
    {
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
  ]
}
```

Razorpay 支付

# 列出 Razorpay 支付目录

复制页面

返回单个环境的镜像 Razorpay 项目和计划。


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

catalog

尝试

列出 Razorpay 支付目录

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "items": [
    {
      "itemId": "item_123",
      "name": "Pro monthly",
      "description": "<string>",
      "active": true,
      "amount": 290000,
      "unitAmount": 290000,
      "currency": "inr",
      "type": "invoice",
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "plans": [
    {
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

#### 响应

200

application/json

已同步的 Razorpay 项目和计划


[​](#response-items)

items

object[]

必需

显示子属性

[​](#response-plans)

plans

object[]

必需

显示子属性

[Verify Razorpay Order Payment](/api-reference/razorpay-payments/verify-razorpay-order-payment)[Create Razorpay Item](/api-reference/razorpay-payments/create-razorpay-item)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)