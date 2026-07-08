Generate chat completion (deprecated)

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

# Generate chat completion (deprecated)

deprecated

Copy page

Deprecated compatibility proxy. New integrations should call <https://openrouter.ai/api/v1/chat/completions> directly with the provisioned OpenRouter key.

Copy page

POST

/

api

/

ai

/

chat

/

completion

Try it

Generate chat completion (deprecated)

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

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

[​](#body-model)

model

string

required

OpenRouter model identifier

Example:

`"openai/gpt-4"`

[​](#body-messages)

messages

object[]

required

Array of messages for conversation (supports text, images, audio, and files/PDFs)

Show child attributes

[​](#body-stream)

stream

boolean

default:false

Enable streaming response via Server-Sent Events

[​](#body-temperature)

temperature

number

Controls randomness in generation

Required range: `0 <= x <= 2`

[​](#body-max-tokens)

maxTokens

integer

Maximum number of tokens to generate

[​](#body-top-p)

topP

number

Nucleus sampling parameter

Required range: `0 <= x <= 1`

[​](#body-web-search)

webSearch

object

Show child attributes

[​](#body-file-parser)

fileParser

object

Show child attributes

[​](#body-thinking)

thinking

boolean

Enable extended reasoning capabilities (appends :thinking to model ID if not already present). Not every model supports this, only works with Anthropic models with the :thinking suffix.

[​](#body-tools)

tools

object[]

Tool definitions for function calling

Show child attributes

[​](#body-tool-choice-one-of-0)

toolChoice

enum<string>objectenum<string>object

Controls tool usage: auto, none, required, or a specific function

Available options:

`auto`,

`none`,

`required`

[​](#body-parallel-tool-calls)

parallelToolCalls

boolean

Allow the model to call multiple tools in parallel

#### Response

200

application/json

Chat completion response

[​](#response-text)

text

string

AI model response content

[​](#response-tool-calls)

tool\_calls

object[]

Tool calls requested by the model (present when the model invokes tools)

Show child attributes

[​](#response-annotations)

annotations

object[]

URL citations from web search results (present when webSearch is enabled)

Show child attributes

[​](#response-metadata)

metadata

object

Show child attributes

[Get active OpenRouter API key](/api-reference/admin/get-active-openrouter-api-key)[Generate images (deprecated)](/api-reference/client/generate-images-deprecated)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)