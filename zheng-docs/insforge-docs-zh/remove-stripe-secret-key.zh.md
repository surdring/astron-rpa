移除 Stripe 密钥

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/stripe/{environment}/config \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

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

# 移除 Stripe 密钥

复制页面

移除单个环境的已配置 Stripe 密钥，并尽力移除托管的 webhook 端点。


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

config

尝试

移除 Stripe 密钥

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/stripe/{environment}/config \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

404

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

#### 响应

200

application/json

更新后的 Stripe 密钥配置


[​](#response-keys)

keys

object[]

必需

显示子属性

[Configure Stripe Secret Key](/api-reference/stripe-payments/configure-stripe-secret-key)[Sync Stripe Payments State](/api-reference/stripe-payments/sync-stripe-payments-state)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)