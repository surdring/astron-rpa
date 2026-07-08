获取模型网关概览

cURL

```
curl --request GET \
  --url https://api.example.com/api/ai/overview \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "key": {
    "label": "<string>",
    "limit": 123,
    "limitRemaining": 123,
    "limitReset": "<string>",
    "usage": 123,
    "usageDaily": 123,
    "usageWeekly": 123,
    "usageMonthly": 123,
    "isFreeTier": true,
    "observabilityAvailable": true,
    "observabilityError": "<string>"
  },
  "charts": {
    "spend": [
      {
        "label": "<string>",
        "value": 123
      }
    ],
    "requests": [
      {
        "label": "<string>",
        "value": 123
      }
    ],
    "tokens": [
      {
        "label": "<string>",
        "value": 123
      }
    ]
  }
}
```

Admin

# 获取模型网关概览

复制页面

当密钥具有活动访问权限时，返回密钥级别的 OpenRouter 使用情况和活动时间序列。

复制页面

GET

/

api

/

ai

/

overview

尝试

获取模型网关概览

cURL

```
curl --request GET \
  --url https://api.example.com/api/ai/overview \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "key": {
    "label": "<string>",
    "limit": 123,
    "limitRemaining": 123,
    "limitReset": "<string>",
    "usage": 123,
    "usageDaily": 123,
    "usageWeekly": 123,
    "usageMonthly": 123,
    "isFreeTier": true,
    "observabilityAvailable": true,
    "observabilityError": "<string>"
  },
  "charts": {
    "spend": [
      {
        "label": "<string>",
        "value": 123
      }
    ],
    "requests": [
      {
        "label": "<string>",
        "value": 123
      }
    ],
    "tokens": [
      {
        "label": "<string>",
        "value": 123
      }
    ]
  }
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 响应

200

application/json

模型网关概览

[​](#response-key)

key

object

显示子属性

[​](#response-charts)

charts

object

显示子属性

[获取所有可用 AI 模型](/api-reference/admin/get-all-available-ai-models)[获取活跃的 OpenRouter API 密钥](/api-reference/admin/get-active-openrouter-api-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)