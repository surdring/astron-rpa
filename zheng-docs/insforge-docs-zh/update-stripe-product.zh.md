更新 Stripe 产品

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products/{productId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "Pro Plan",
  "active": true
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
  "product": {
    "productId": "prod_123",
    "name": "<string>",
    "description": "<string>",
    "active": true,
    "defaultPriceId": "price_123",
    "metadata": {},
    "syncedAt": "2023-11-07T05:31:56Z"
  }
}
```

Stripe 支付

# 更新 Stripe 产品

复制页面

更新 Stripe 产品，然后在 Stripe 成功后将其镜像到本地。


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

products

/

{productId}

尝试

更新 Stripe 产品

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products/{productId} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "Pro Plan",
  "active": true
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
  "product": {
    "productId": "prod_123",
    "name": "<string>",
    "description": "<string>",
    "active": true,
    "defaultPriceId": "price_123",
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

[​](#parameter-product-id)

productId

string

必需

Stripe 产品 ID。


最小字符串长度: `1`

#### 请求体

application/json

[​](#body-name)

name

string

最小字符串长度: `1`

[​](#body-description-one-of-0)

description

string | null

最大字符串长度: `5000`

[​](#body-active)

active

boolean

[​](#body-metadata)

metadata

object

显示子属性

#### 响应

200

application/json

产品已更新


[​](#response-product)

product

object

必需

显示子属性

[Delete Stripe Product](/api-reference/stripe-payments/delete-stripe-product)[List Stripe Prices](/api-reference/stripe-payments/list-stripe-prices)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)