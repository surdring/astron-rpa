列出 Stripe 产品

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "products": [
    {
      "productId": "prod_123",
      "name": "<string>",
      "description": "<string>",
      "active": true,
      "defaultPriceId": "price_123",
      "metadata": {},
      "syncedAt": "2023-11-07T05:31:56Z"
    }
  ]
}
```

Stripe 支付

# 列出 Stripe 产品

复制页面

列出单个环境的镜像 Stripe 产品。


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

products

尝试

列出 Stripe 产品

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "products": [
    {
      "productId": "prod_123",
      "name": "<string>",
      "description": "<string>",
      "active": true,
      "defaultPriceId": "price_123",
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

#### 响应

200

application/json

Stripe 产品


[​](#response-products)

products

object[]

必需

显示子属性

[List Stripe Catalog](/api-reference/stripe-payments/list-stripe-catalog)[Create Stripe Product](/api-reference/stripe-payments/create-stripe-product)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)