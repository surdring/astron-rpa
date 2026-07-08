Get all available AI models

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

# Get all available AI models

Copy page

Returns the normalized OpenRouter model catalog fetched from OpenRouter with output\_modalities=all.

Copy page

GET

/

api

/

ai

/

models

Try it

Get all available AI models

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

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

200

application/json

Flat array of available models from the OpenRouter catalog

[​](#response-items-id)

id

string

Example:

`"openai/gpt-4o"`

[​](#response-items-created)

created

integer

[​](#response-items-input-modality)

inputModality

string[]

Example:

```
["text", "image"]
```

[​](#response-items-output-modality)

outputModality

string[]

Example:

```
["text"]
```

[​](#response-items-provider)

provider

string

Example:

`"openrouter"`

[​](#response-items-model-id)

modelId

string

Example:

`"openai/gpt-4o"`

[​](#response-items-input-price)

inputPrice

number

Input price per million tokens in USD when token pricing is available.

[​](#response-items-output-price)

outputPrice

number

Output price per million tokens in USD when token pricing is available.

[​](#response-items-input-price-label)

inputPriceLabel

string

Human-readable input pricing label, such as "$2.50 / 1M tokens" or "Free", when available.

[​](#response-items-output-price-label)

outputPriceLabel

string

Human-readable output pricing label, such as "$10.00 / 1M tokens" or "Free", when available.

[S3 protocol (HEAD)](/api-reference/s3-protocol/s3-protocol-head)[Get Model Gateway overview](/api-reference/admin/get-model-gateway-overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)