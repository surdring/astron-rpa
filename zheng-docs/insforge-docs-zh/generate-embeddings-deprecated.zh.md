生成嵌入向量（已弃用）

cURL

```
curl --request POST \
  --url https://api.example.com/api/ai/embeddings \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "google/gemini-embedding-001",
  "input": "Hello world",
  "encoding_format": "float",
  "dimensions": 1
}
'
```

200

```
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        123
      ],
      "index": 123
    }
  ],
  "metadata": {
    "model": "text-embedding-ada-002",
    "usage": {
      "promptTokens": 123,
      "completionTokens": 123,
      "totalTokens": 123
    }
  }
}
```

Client

# 生成嵌入向量（已弃用）

deprecated

复制页面

已弃用的兼容性代理。新的集成应直接使用已配置的 OpenRouter 密钥调用 <https://openrouter.ai/api/v1/embeddings>。

复制页面

POST

/

api

/

ai

/

embeddings

尝试

生成嵌入向量（已弃用）

cURL

```
curl --request POST \
  --url https://api.example.com/api/ai/embeddings \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "google/gemini-embedding-001",
  "input": "Hello world",
  "encoding_format": "float",
  "dimensions": 1
}
'
```

200

```
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        123
      ],
      "index": 123
    }
  ],
  "metadata": {
    "model": "text-embedding-ada-002",
    "usage": {
      "promptTokens": 123,
      "completionTokens": 123,
      "totalTokens": 123
    }
  }
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

嵌入模型标识符

示例：

`"google/gemini-embedding-001"`

[​](#body-input-one-of-0)

input

stringstring[]stringstring[]

必需

要嵌入的单个文本输入

示例：

`"Hello world"`

[​](#body-encoding-format)

encoding\_format

enum<string>

默认值：float

返回嵌入向量的格式。可以是 float 或 base64。

可用选项：

`float`,

`base64`

[​](#body-dimensions)

dimensions

integer

生成的输出嵌入向量应具有的维度数。仅部分模型支持。

必需范围：`x >= 0`

#### 响应

200

application/json

嵌入向量生成成功

[​](#response-object)

object

enum<string>

对象类型，始终为 "list"

可用选项：

`list`

[​](#response-data)

data

object[]

显示子属性

[​](#response-metadata)

metadata

object

显示子属性

[生成图片（已弃用）](/api-reference/client/generate-images-deprecated)[列出所有函数](/api-reference/admin/list-all-functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)