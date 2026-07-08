Generate images (deprecated)

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

# Generate images (deprecated)

deprecated

Copy page

Deprecated compatibility proxy. New integrations should use OpenRouter image-capable models directly with the provisioned OpenRouter key.

Copy page

POST

/

api

/

ai

/

image

/

generation

Try it

Generate images (deprecated)

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

OpenRouter model identifier for image generation

Example:

`"openai/dall-e-3"`

[​](#body-prompt)

prompt

string

required

Text prompt describing the desired image

Example:

`"A serene landscape with mountains and a lake at sunset"`

#### Response

200

application/json

Images generated successfully

[​](#response-model)

model

string

Model used for generation

[​](#response-images)

images

object[]

Show child attributes

[​](#response-text)

text

string

Text content from multimodal models

[​](#response-count)

count

integer

Number of images generated

[​](#response-metadata)

metadata

object

Show child attributes

[​](#response-next-actions)

nextActions

string

Example:

`"Images have been generated successfully. Use the returned URLs or base64 data to access them."`

[Generate chat completion (deprecated)](/api-reference/client/generate-chat-completion-deprecated)[Generate embeddings (deprecated)](/api-reference/client/generate-embeddings-deprecated)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)