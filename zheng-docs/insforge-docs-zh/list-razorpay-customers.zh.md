列出 Razorpay 客户

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/customers \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "customers": [
    {
      "providerCustomerId": "cus_123",
      "email": "buyer@example.com",
      "name": "Buyer Example",
      "phone": "+1 555-0100",
      "deleted": true,
      "metadata": {},
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z",
      "paymentsCount": 1,
      "lastPaymentAt": "2023-11-07T05:31:56Z",
      "totalSpend": 1,
      "totalSpendCurrency": "<string>",
      "paymentMethodBrand": "<string>",
      "paymentMethodLast4": "<string>",
      "countryCode": "<string>"
    }
  ]
}
```

Razorpay 支付

# 列出 Razorpay 客户

复制页面

镜像 Razorpay 客户的管理/调试读取。仅用于显示镜像，不应替代应用拥有的计费表。


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

customers

尝试

列出 Razorpay 客户

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/{environment}/customers \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "customers": [
    {
      "providerCustomerId": "cus_123",
      "email": "buyer@example.com",
      "name": "Buyer Example",
      "phone": "+1 555-0100",
      "deleted": true,
      "metadata": {},
      "providerCreatedAt": "2023-11-07T05:31:56Z",
      "syncedAt": "2023-11-07T05:31:56Z",
      "paymentsCount": 1,
      "lastPaymentAt": "2023-11-07T05:31:56Z",
      "totalSpend": 1,
      "totalSpendCurrency": "<string>",
      "paymentMethodBrand": "<string>",
      "paymentMethodLast4": "<string>",
      "countryCode": "<string>"
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

[​](#parameter-limit)

limit

integer

default:50

最大返回行数。


所需范围: `1 <= x <= 100`

#### 响应

200

application/json

Razorpay 客户


[​](#response-customers)

customers

object[]

必需

显示子属性

[Resume Razorpay Subscription](/api-reference/razorpay-payments/resume-razorpay-subscription)[List Razorpay Transactions](/api-reference/razorpay-payments/list-razorpay-transactions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)