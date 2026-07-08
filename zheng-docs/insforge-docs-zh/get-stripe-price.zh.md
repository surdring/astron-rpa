获取 Stripe 价格

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices/{priceId} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

```
{
  "price": {
    "priceId": "price_123",
    "productId": "prod_123",
    "active": true,
    "currency": "usd",
    "unitAmount": 2900,
    "unitAmountDecimal": "2900",
    "type": "recurring",
    "lookupKey": "pro_monthly",
    "billingScheme": "per_unit",
    "taxBehavior": "unspecified",
    "recurringInterval": "month",
    "recurringIntervalCount": 1,
    "metadata": {},
    "syncedAt": "2023-11-07T05:31:56Z"
  }
}
```

Stripe 支付

# 获取 Stripe 价格

复制页面

获取一个镜像的 Stripe 价格。


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

catalog

/

prices

/

{priceId}

尝试

获取 Stripe 价格

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices/{priceId} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

```
{
  "price": {
    "priceId": "price_123",
    "productId": "prod_123",
    "active": true,
    "currency": "usd",
    "unitAmount": 2900,
    "unitAmountDecimal": "2900",
    "type": "recurring",
    "lookupKey": "pro_monthly",
    "billingScheme": "per_unit",
    "taxBehavior": "unspecified",
    "recurringInterval": "month",
    "recurringIntervalCount": 1,
    "metadata": {},
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

[​](#parameter-price-id)

priceId

string

必需

Stripe 价格 ID。


最小字符串长度: `1`

#### 响应

200

application/json

价格


[​](#response-price)

price

object

必需

显示子属性

[Create Stripe Price](/api-reference/stripe-payments/create-stripe-price)[Archive Stripe Price](/api-reference/stripe-payments/archive-stripe-price)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)