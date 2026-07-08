创建 Stripe 价格

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "productId": "prod_123",
  "currency": "usd",
  "unitAmount": 2900,
  "recurring": {
    "interval": "month",
    "intervalCount": 1
  },
  "lookupKey": "pro_monthly",
  "idempotencyKey": "price-pro-monthly"
}
'
```

201

400

401

403

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

# 创建 Stripe 价格

复制页面

在请求的环境中创建 Stripe 价格，然后在 Stripe 成功后将其镜像到本地。


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

catalog

/

prices

尝试

创建 Stripe 价格

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "productId": "prod_123",
  "currency": "usd",
  "unitAmount": 2900,
  "recurring": {
    "interval": "month",
    "intervalCount": 1
  },
  "lookupKey": "pro_monthly",
  "idempotencyKey": "price-pro-monthly"
}
'
```

201

400

401

403

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

#### 请求体

application/json

[​](#body-product-id)

productId

string

必需

最小字符串长度: `1`

[​](#body-currency)

currency

string

必需

所需字符串长度: `3`

Example:

`"usd"`

[​](#body-unit-amount)

unitAmount

integer

必需

所需范围: `x >= 0`

Example:

`2900`

[​](#body-lookup-key-one-of-0)

lookupKey

string | null

所需字符串长度: `1 - 200`

[​](#body-active)

active

boolean

[​](#body-recurring)

recurring

object

显示子属性

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

[​](#body-idempotency-key)

idempotencyKey

string

所需字符串长度: `1 - 200`

#### 响应

201

application/json

价格已创建


[​](#response-price)

price

object

必需

显示子属性

[List Stripe Prices](/api-reference/stripe-payments/list-stripe-prices)[Get Stripe Price](/api-reference/stripe-payments/get-stripe-price)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)