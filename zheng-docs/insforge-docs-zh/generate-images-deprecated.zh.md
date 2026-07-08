生成图片（已弃用）

cURL

```
curl --request POST \
  --url https://api.example.com/api/ai/image/generation \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "openai/dall-e-3",
  "prompt": "A serene landscape with mountains and a lake at sunset"
}
'
```

200

```
{
  "model": "<string>",
  "images": [
    {
      "type": "image_url",
      "image_url": {
        "url": "<string>"
      }
    }
  ],
  "text": "<string>",
  "count": 123,
  "metadata": {
    "model": "<string>",
    "revisedPrompt": "<string>",
    "usage": {
      "promptTokens": 123,
      "completionTokens": 123,
      "totalTokens": 123
    }
  },
  "nextActions": "Images have been generated successfully. Use the returned URLs or base64 data to access them."
}
```

Client

# 生成图片（已弃用）

deprecated

复制页面

已弃用的兼容性代理。新的集成应直接使用已配置的 OpenRouter 密钥，调用支持图片生成的 OpenRouter 模型。

复制页面

POST

/

api

/

ai

/

image

/

generation

尝试

生成图片（已弃用）

cURL

```
curl --request POST \
  --url https://api.example.com/api/ai/image/generation \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "openai/dall-e-3",
  "prompt": "A serene landscape with mountains and a lake at sunset"
}
'
```

200

```
{
  "model": "<string>",
  "images": [
    {
      "type": "image_url",
      "image_url": {
        "url": "<string>"
      }
    }
  ],
  "text": "<string>",
  "count": 123,
  "metadata": {
    "model": "<string>",
    "revisedPrompt": "<string>",
    "usage": {
      "promptTokens": 123,
      "completionTokens": 123,
      "totalTokens": 123
    }
  },
  "nextActions": "Images have been generated successfully. Use the returned URLs or base64 data to access them."
}
```

#### 认证

[​](#authorization-authorization)

Authorization

string

header

必需

Bearer 认证请求头，格式为 `Bearer <token>`，其中 `<token>` 是您的认证令牌。

#### 请求体

application/json

[​](#body-model)

model

string

必需

用于图片生成的 OpenRouter 模型标识符

示例：

`"openai/dall-e-3"`

[​](#body-prompt)

prompt

string

必需

描述所需图片的文字提示

示例：

`"A serene landscape with mountains and a lake at sunset"`

#### 响应

200

application/json

图片生成成功

[​](#response-model)

model

string

用于生成的模型

[​](#response-images)

images

object[]

显示子属性

[​](#response-text)

text

string

来自多模态模型的文本内容

[​](#response-count)

count

integer

生成的图片数量

[​](#response-metadata)

metadata

object

显示子属性

[​](#response-next-actions)

nextActions

string

示例：

`"Images have been generated successfully. Use the returned URLs or base64 data to access them."`

[生成聊天补全（已弃用）](/api-reference/client/generate-chat-completion-deprecated)[生成嵌入向量（已弃用）](/api-reference/client/generate-embeddings-deprecated)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)