创建 Razorpay 项目

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/items \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "One-time setup",
  "amount": 50000,
  "currency": "INR"
}
'
```

201

400

401

403

```
{
  "item": {
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
}
```

Razorpay 支付

# 创建 Razorpay 项目

复制页面

创建 Razorpay 项目，然后在 Razorpay 成功后将其镜像到本地。


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

items

尝试

创建 Razorpay 项目

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/razorpay/{environment}/catalog/items \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "One-time setup",
  "amount": 50000,
  "currency": "INR"
}
'
```

201

400

401

403

```
{
  "item": {
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

[​](#body-name)

name

string

必需

所需字符串长度: `1 - 255`

[​](#body-amount)

amount

integer

必需

所需范围: `x >= 1`

[​](#body-currency)

currency

string

必需

所需字符串长度: `3`

Example:

`"INR"`

[​](#body-description-one-of-0)

description

string | null

最大字符串长度: `2048`

#### 响应

201

application/json

Razorpay 项目已创建


[​](#response-item)

item

object

必需

显示子属性

[List Razorpay Payment Catalog](/api-reference/razorpay-payments/list-razorpay-payment-catalog)[Update Razorpay Item](/api-reference/razorpay-payments/update-razorpay-item)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)