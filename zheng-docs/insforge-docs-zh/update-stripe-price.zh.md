更新 Stripe 价格

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices/{priceId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "active": true,
  "lookupKey": "pro_monthly"
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

# 更新 Stripe 价格

复制页面

更新可变的 Stripe 价格字段，然后在 Stripe 成功后将其镜像到本地。


复制页面

PATCH

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

更新 Stripe 价格

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices/{priceId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "active": true,
  "lookupKey": "pro_monthly"
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

#### 请求体

application/json

[​](#body-active)

active

boolean

[​](#body-lookup-key-one-of-0)

lookupKey

string | null

所需字符串长度: `1 - 200`

[​](#body-tax-behavior)

taxBehavior

enum<string>

可用选项:

`exclusive`,

`inclusive`,

`unspecified`

[​](#body-metadata)

metadata

object

显示子属性

#### 响应

200

application/json

价格已更新


[​](#response-price)

price

object

必需

显示子属性

[Archive Stripe Price](/api-reference/stripe-payments/archive-stripe-price)[List Stripe Subscriptions](/api-reference/stripe-payments/list-stripe-subscriptions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)