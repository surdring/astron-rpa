配置托管 Stripe Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/webhook \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "connection": {
    "accountId": "acct_123",
    "accountEmail": "owner@example.com",
    "accountLivemode": true,
    "webhookEndpointId": "we_123",
    "webhookEndpointUrl": "https://api.example.com/api/webhooks/stripe/test",
    "webhookConfiguredAt": "2023-11-07T05:31:56Z",
    "maskedKey": "sk_test_...abcd",
    "lastSyncedAt": "2023-11-07T05:31:56Z",
    "lastSyncError": "<string>",
    "lastSyncCounts": {}
  }
}
```

Stripe 支付

# 配置托管 Stripe Webhook

复制页面

创建或重新创建单个环境的 InsForge 托管 Stripe webhook 端点。


复制页面

POST

/

api

/

payments

/

stripe

/

{environment}

/

webhook

尝试

配置托管 Stripe Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/payments/stripe/{environment}/webhook \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "connection": {
    "accountId": "acct_123",
    "accountEmail": "owner@example.com",
    "accountLivemode": true,
    "webhookEndpointId": "we_123",
    "webhookEndpointUrl": "https://api.example.com/api/webhooks/stripe/test",
    "webhookConfiguredAt": "2023-11-07T05:31:56Z",
    "maskedKey": "sk_test_...abcd",
    "lastSyncedAt": "2023-11-07T05:31:56Z",
    "lastSyncError": "<string>",
    "lastSyncCounts": {}
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

#### 响应

200

application/json

托管 webhook 配置结果


[​](#response-connection)

connection

object

必需

显示子属性

[Sync Stripe Payments State For One Environment](/api-reference/stripe-payments/sync-stripe-payments-state-for-one-environment)[List Stripe Catalog](/api-reference/stripe-payments/list-stripe-catalog)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)