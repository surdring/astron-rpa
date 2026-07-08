配置 Stripe 密钥

cURL

```
curl --request PUT \
  --url https://api.example.com/api/payments/stripe/{environment}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "secretKey": "sk_test_xxx"
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
      "maskedKey": "sk_test_...abcd"
    }
  ]
}
```

Stripe 支付

# 配置 Stripe 密钥

复制页面

验证并存储 Stripe 密钥。新 Stripe 账户尝试托管 webhook 设置，然后运行统一同步。


复制页面

PUT

/

api

/

payments

/

stripe

/

{environment}

/

config

尝试

配置 Stripe 密钥

cURL

```
curl --request PUT \
  --url https://api.example.com/api/payments/stripe/{environment}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "secretKey": "sk_test_xxx"
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
      "maskedKey": "sk_test_...abcd"
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

[​](#body-secret-key)

secretKey

string

必需

只写

最小字符串长度: `1`

Example:

`"sk_test_xxx"`

#### 响应

200

application/json

更新后的 Stripe 密钥配置


[​](#response-keys)

keys

object[]

必需

显示子属性

[Get Stripe Key Configuration](/api-reference/stripe-payments/get-stripe-key-configuration)[Remove Stripe Secret Key](/api-reference/stripe-payments/remove-stripe-secret-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)