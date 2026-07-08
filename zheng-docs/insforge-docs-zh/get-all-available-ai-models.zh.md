获取所有可用 AI 模型

cURL

```
curl --request GET \
  --url https://api.example.com/api/ai/models \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  {
    "id": "openai/gpt-4o",
    "created": 123,
    "inputModality": [
      "text",
      "image"
    ],
    "outputModality": [
      "text"
    ],
    "provider": "openrouter",
    "modelId": "openai/gpt-4o",
    "inputPrice": 123,
    "outputPrice": 123,
    "inputPriceLabel": "<string>",
    "outputPriceLabel": "<string>"
  }
]
```

Admin

# 获取所有可用 AI 模型

复制页面

返回从 OpenRouter 获取的规范化模型目录（使用 output\_modalities=all）。

复制页面

GET

/

api

/

ai

/

models

尝试

获取所有可用 AI 模型

cURL

```
curl --request GET \
  --url https://api.example.com/api/ai/models \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  {
    "id": "openai/gpt-4o",
    "created": 123,
    "inputModality": [
      "text",
      "image"
    ],
    "outputModality": [
      "text"
    ],
    "provider": "openrouter",
    "modelId": "openai/gpt-4o",
    "inputPrice": 123,
    "outputPrice": 123,
    "inputPriceLabel": "<string>",
    "outputPriceLabel": "<string>"
  }
]
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

来自 OpenRouter 目录的可用模型扁平数组

[​](#response-items-id)

id

string

示例：

`"openai/gpt-4o"`

[​](#response-items-created)

created

integer

[​](#response-items-input-modality)

inputModality

string[]

示例：

```
["text", "image"]
```

[​](#response-items-output-modality)

outputModality

string[]

示例：

```
["text"]
```

[​](#response-items-provider)

provider

string

示例：

`"openrouter"`

[​](#response-items-model-id)

modelId

string

示例：

`"openai/gpt-4o"`

[​](#response-items-input-price)

inputPrice

number

有 token 定价时可用的每百万 token 输入价格（美元）

[​](#response-items-output-price)

outputPrice

number

有 token 定价时可用的每百万 token 输出价格（美元）

[​](#response-items-input-price-label)

inputPriceLabel

string

人类可读的输入定价标签，例如 "$2.50 / 1M tokens" 或 "Free"（如可用）

[​](#response-items-output-price-label)

outputPriceLabel

string

人类可读的输出定价标签，例如 "$10.00 / 1M tokens" 或 "Free"（如可用）

[S3 协议（HEAD）](/api-reference/s3-protocol/s3-protocol-head)[获取模型网关概览](/api-reference/admin/get-model-gateway-overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)