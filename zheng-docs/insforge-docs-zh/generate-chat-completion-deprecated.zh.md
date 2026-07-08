生成聊天补全（已弃用）

cURL

```
curl --request POST \
  --url https://api.example.com/api/ai/chat/completion \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "openai/gpt-4",
  "messages": [
    {
      "content": "<string>",
      "tool_calls": [
        {
          "id": "<string>",
          "type": "function",
          "function": {
            "name": "<string>",
            "arguments": "<string>"
          }
        }
      ],
      "tool_call_id": "<string>"
    }
  ],
  "stream": false,
  "temperature": 1,
  "maxTokens": 123,
  "topP": 0.5,
  "thinking": true,
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "<string>",
        "description": "<string>",
        "parameters": {}
      }
    }
  ],
  "parallelToolCalls": true
}
'
```

200

```
{
  "text": "<string>",
  "tool_calls": [
    {
      "id": "<string>",
      "type": "function",
      "function": {
        "name": "<string>",
        "arguments": "<string>"
      }
    }
  ],
  "annotations": [
    {
      "type": "url_citation",
      "urlCitation": {
        "url": "<string>",
        "title": "<string>",
        "content": "<string>",
        "startIndex": 123,
        "endIndex": 123
      }
    }
  ],
  "metadata": {
    "model": "<string>",
    "usage": {
      "promptTokens": 123,
      "completionTokens": 123,
      "totalTokens": 123
    }
  }
}
```

Client

# 生成聊天补全（已弃用）

deprecated

复制页面

已弃用的兼容性代理。新的集成应直接使用已配置的 OpenRouter 密钥调用 <https://openrouter.ai/api/v1/chat/completions>。

复制页面

POST

/

api

/

ai

/

chat

/

completion

尝试

生成聊天补全（已弃用）

cURL

```
curl --request POST \
  --url https://api.example.com/api/ai/chat/completion \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "openai/gpt-4",
  "messages": [
    {
      "content": "<string>",
      "tool_calls": [
        {
          "id": "<string>",
          "type": "function",
          "function": {
            "name": "<string>",
            "arguments": "<string>"
          }
        }
      ],
      "tool_call_id": "<string>"
    }
  ],
  "stream": false,
  "temperature": 1,
  "maxTokens": 123,
  "topP": 0.5,
  "thinking": true,
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "<string>",
        "description": "<string>",
        "parameters": {}
      }
    }
  ],
  "parallelToolCalls": true
}
'
```

200

```
{
  "text": "<string>",
  "tool_calls": [
    {
      "id": "<string>",
      "type": "function",
      "function": {
        "name": "<string>",
        "arguments": "<string>"
      }
    }
  ],
  "annotations": [
    {
      "type": "url_citation",
      "urlCitation": {
        "url": "<string>",
        "title": "<string>",
        "content": "<string>",
        "startIndex": 123,
        "endIndex": 123
      }
    }
  ],
  "metadata": {
    "model": "<string>",
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

OpenRouter 模型标识符

示例：

`"openai/gpt-4"`

[​](#body-messages)

messages

object[]

必需

对话消息数组（支持文本、图片、音频和文件/PDF）

显示子属性

[​](#body-stream)

stream

boolean

默认值：false

通过 Server-Sent Events 启用流式响应

[​](#body-temperature)

temperature

number

控制生成结果的随机性

必需范围：`0 <= x <= 2`

[​](#body-max-tokens)

maxTokens

integer

生成的最大令牌数

[​](#body-top-p)

topP

number

核采样参数

必需范围：`0 <= x <= 1`

[​](#body-web-search)

webSearch

object

显示子属性

[​](#body-file-parser)

fileParser

object

显示子属性

[​](#body-thinking)

thinking

boolean

启用扩展推理能力（如果模型 ID 尚未包含 :thinking，则会追加）。并非所有模型都支持此功能，仅适用于带有 :thinking 后缀的 Anthropic 模型。

[​](#body-tools)

tools

object[]

用于函数调用的工具定义

显示子属性

[​](#body-tool-choice-one-of-0)

toolChoice

enum<string>objectenum<string>object

控制工具使用方式：auto、none、required 或指定函数

可用选项：

`auto`,

`none`,

`required`

[​](#body-parallel-tool-calls)

parallelToolCalls

boolean

允许模型并行调用多个工具

#### 响应

200

application/json

聊天补全响应

[​](#response-text)

text

string

AI 模型响应内容

[​](#response-tool-calls)

tool\_calls

object[]

模型请求的工具调用（当模型调用工具时出现）

显示子属性

[​](#response-annotations)

annotations

object[]

来自网络搜索结果的 URL 引用（当启用 webSearch 时出现）

显示子属性

[​](#response-metadata)

metadata

object

显示子属性

[获取活跃的 OpenRouter API 密钥](/api-reference/admin/get-active-openrouter-api-key)[生成图片（已弃用）](/api-reference/client/generate-images-deprecated)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)