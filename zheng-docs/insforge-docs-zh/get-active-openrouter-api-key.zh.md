获取活跃的 OpenRouter API 密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/ai/openrouter/api-key \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "apiKey": "<string>",
  "maskedKey": "<string>"
}
```

Admin

# 获取活跃的 OpenRouter API 密钥

复制页面

返回活跃的 OpenRouter API 密钥详情，用于管理员复制操作。

复制页面

GET

/

api

/

ai

/

openrouter

/

api-key

尝试

获取活跃的 OpenRouter API 密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/ai/openrouter/api-key \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "apiKey": "<string>",
  "maskedKey": "<string>"
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

活跃的 OpenRouter API 密钥详情

[​](#response-api-key)

apiKey

string

用于管理员复制操作的活跃 OpenRouter API 密钥

[​](#response-masked-key)

maskedKey

string

用于显示的掩码 OpenRouter API 密钥

[获取模型网关概览](/api-reference/admin/get-model-gateway-overview)[生成聊天补全（已弃用）](/api-reference/client/generate-chat-completion-deprecated)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)