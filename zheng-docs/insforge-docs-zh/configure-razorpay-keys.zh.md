配置 Razorpay 密钥

cURL

```
curl --request PUT \
  --url https://api.example.com/api/payments/razorpay/{environment}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "keyId": "rzp_test_xxx",
  "keySecret": "razorpay_secret_xxx",
  "webhookSecret": "webhook_secret_xxx"
}
'
```

200

400

401

403

```
{
  "keys": [
    {
      "hasKey": true,
      "maskedKey": "rzp_test_...abcd"
    }
  ]
}
```

Razorpay 支付

# 配置 Razorpay 密钥

复制页面

验证并存储单个环境的 Razorpay API 密钥。当 webhook 密钥不存在时，会自动生成一个。


复制页面

PUT

/

api

/

payments

/

razorpay

/

{environment}

/

config

尝试

配置 Razorpay 密钥

cURL

```
curl --request PUT \
  --url https://api.example.com/api/payments/razorpay/{environment}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "keyId": "rzp_test_xxx",
  "keySecret": "razorpay_secret_xxx",
  "webhookSecret": "webhook_secret_xxx"
}
'
```

200

400

401

403

```
{
  "keys": [
    {
      "hasKey": true,
      "maskedKey": "rzp_test_...abcd"
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

#### 请求体

application/json

[​](#body-key-id)

keyId

string

必需

最小字符串长度: `1`

Example:

`"rzp_test_xxx"`

[​](#body-key-secret)

keySecret

string

必需

只写

最小字符串长度: `1`

Example:

`"razorpay_secret_xxx"`

[​](#body-webhook-secret)

webhookSecret

string

只写

Example:

`"webhook_secret_xxx"`

#### 响应

200

application/json

更新后的 Razorpay 密钥配置


[​](#response-keys)

keys

object[]

必需

显示子属性

[Sync Razorpay Payments State](/api-reference/razorpay-payments/sync-razorpay-payments-state)[Remove Razorpay Keys](/api-reference/razorpay-payments/remove-razorpay-keys)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)