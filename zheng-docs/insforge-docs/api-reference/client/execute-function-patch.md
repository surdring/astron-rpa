Execute function (PATCH)

cURL

```
curl --request PATCH \
  --url https://api.example.com/functions/{slug} \
  --header 'Content-Type: application/json' \
  --data '{}'
```

200

502

```
{}
```

Client

# Execute function (PATCH)

Copy page

Execute a function using PATCH method. Proxied to Deno runtime.

Copy page

PATCH

/

functions

/

{slug}

Try it

Execute function (PATCH)

cURL

```
curl --request PATCH \
  --url https://api.example.com/functions/{slug} \
  --header 'Content-Type: application/json' \
  --data '{}'
```

200

502

```
{}
```

#### Path Parameters

[​](#parameter-slug)

slug

string

required

Function slug identifier

Pattern: `^[a-zA-Z0-9_-]+$`

#### Body

application/json

The body is of type `object`.

#### Response

200

\*/\*

Function executed successfully

The response is of type `object`.

[Execute function (DELETE)](/api-reference/client/execute-function-delete)[List All Channels](/api-reference/channels/list-all-channels)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)