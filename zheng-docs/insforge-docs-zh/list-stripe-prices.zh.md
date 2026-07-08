列出 Stripe 价格

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "prices": [
    {
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
  ]
}
```

Stripe 支付

# 列出 Stripe 价格

复制页面

列出单个环境的镜像 Stripe 价格，可按产品筛选。


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

尝试

列出 Stripe 价格

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/prices \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "prices": [
    {
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

[​](#parameter-product-id)

productId

string

按 Stripe 产品 ID 筛选价格。


最小字符串长度: `1`

#### 响应

200

application/json

Stripe 价格


[​](#response-prices)

prices

object[]

必需

显示子属性

[Update Stripe Product](/api-reference/stripe-payments/update-stripe-product)[Create Stripe Price](/api-reference/stripe-payments/create-stripe-price)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)