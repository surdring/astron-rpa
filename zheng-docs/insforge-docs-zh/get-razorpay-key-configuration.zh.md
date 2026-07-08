获取 Razorpay 密钥配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/config \
  --header 'Authorization: Bearer <token>'
```

200

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

# 获取 Razorpay 密钥配置

复制页面

返回测试和生产环境的掩码 Razorpay 密钥配置。


复制页面

GET

/

api

/

payments

/

razorpay

/

config

尝试

获取 Razorpay 密钥配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/payments/razorpay/config \
  --header 'Authorization: Bearer <token>'
```

200

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

#### 响应

200

application/json

Razorpay 密钥配置


[​](#response-keys)

keys

object[]

必需

显示子属性

[Get Razorpay Payments Status](/api-reference/razorpay-payments/get-razorpay-payments-status)[Sync Razorpay Payments State](/api-reference/razorpay-payments/sync-razorpay-payments-state)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)