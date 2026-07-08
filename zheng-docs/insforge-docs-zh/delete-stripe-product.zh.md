删除 Stripe 产品

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products/{productId} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

```
{
  "productId": "prod_123",
  "deleted": true
}
```

Stripe 支付

# 删除 Stripe 产品

复制页面

从单个环境中删除 Stripe 产品，然后从本地镜像中移除。


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

products

/

{productId}

尝试

删除 Stripe 产品

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/stripe/{environment}/catalog/products/{productId} \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

```
{
  "productId": "prod_123",
  "deleted": true
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

#### 响应

200

application/json

产品已删除


[​](#response-product-id)

productId

string

必需

Example:

`"prod_123"`

[​](#response-deleted)

deleted

boolean

必需

[Get Stripe Product](/api-reference/stripe-payments/get-stripe-product)[Update Stripe Product](/api-reference/stripe-payments/update-stripe-product)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)