归档 Stripe 价格

cURL

```
curl --request DELETE \
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
  },
  "archived": true
}
```

Stripe 支付

# 归档 Stripe 价格

复制页面

归档单个环境中的 Stripe 价格，然后在本地镜像归档状态。


复制页面

DELETE

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

归档 Stripe 价格

cURL

```
curl --request DELETE \
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
  },
  "archived": true
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

价格已归档


[​](#response-price)

price

object

必需

显示子属性

[​](#response-archived)

archived

boolean

必需

[Get Stripe Price](/api-reference/stripe-payments/get-stripe-price)[Update Stripe Price](/api-reference/stripe-payments/update-stripe-price)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)