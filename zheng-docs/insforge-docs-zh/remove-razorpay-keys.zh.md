移除 Razorpay 密钥

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/razorpay/{environment}/config \
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
      "maskedKey": "rzp_test_...abcd"
    }
  ]
}
```

Razorpay 支付

# 移除 Razorpay 密钥

复制页面

移除单个环境的已配置 Razorpay 密钥。


复制页面

DELETE

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

移除 Razorpay 密钥

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/payments/razorpay/{environment}/config \
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

#### 响应

200

application/json

更新后的 Razorpay 密钥配置


[​](#response-keys)

keys

object[]

必需

显示子属性

[Configure Razorpay Keys](/api-reference/razorpay-payments/configure-razorpay-keys)[Sync Razorpay Payments State For One Environment](/api-reference/razorpay-payments/sync-razorpay-payments-state-for-one-environment)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)