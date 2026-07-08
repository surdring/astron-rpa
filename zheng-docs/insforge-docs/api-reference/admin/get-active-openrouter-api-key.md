Get active OpenRouter API key

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

# Get active OpenRouter API key

Copy page

Returns the active OpenRouter API key details for admin copy workflows.

Copy page

GET

/

api

/

ai

/

openrouter

/

api-key

Try it

Get active OpenRouter API key

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

Active OpenRouter API key details

[​](#response-api-key)

apiKey

string

Active OpenRouter API key for admin copy workflows

[​](#response-masked-key)

maskedKey

string

Masked OpenRouter API key for display

[Get Model Gateway overview](/api-reference/admin/get-model-gateway-overview)[Generate chat completion (deprecated)](/api-reference/client/generate-chat-completion-deprecated)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)