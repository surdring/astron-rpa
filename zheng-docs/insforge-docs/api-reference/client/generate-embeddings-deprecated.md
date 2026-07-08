Generate embeddings (deprecated)

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

# Generate embeddings (deprecated)

deprecated

Copy page

Deprecated compatibility proxy. New integrations should call <https://openrouter.ai/api/v1/embeddings> directly with the provisioned OpenRouter key.

Copy page

POST

/

api

/

ai

/

embeddings

Try it

Generate embeddings (deprecated)

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

Embedding model identifier

Example:

`"google/gemini-embedding-001"`

[​](#body-input-one-of-0)

input

stringstring[]stringstring[]

required

Single text input to embed

Example:

`"Hello world"`

[​](#body-encoding-format)

encoding\_format

enum<string>

default:float

The format to return the embeddings in. Can be either float or base64.

Available options:

`float`,

`base64`

[​](#body-dimensions)

dimensions

integer

The number of dimensions the resulting output embeddings should have. Only supported in certain models.

Required range: `x >= 0`

#### Response

200

application/json

Embeddings generated successfully

[​](#response-object)

object

enum<string>

Object type, always "list"

Available options:

`list`

[​](#response-data)

data

object[]

Show child attributes

[​](#response-metadata)

metadata

object

Show child attributes

[Generate images (deprecated)](/api-reference/client/generate-images-deprecated)[List all functions](/api-reference/admin/list-all-functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)