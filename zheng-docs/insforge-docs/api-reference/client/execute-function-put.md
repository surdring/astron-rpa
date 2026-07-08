Execute function (PUT)

cURL

```
curl --request PUT \
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

# Execute function (PUT)

Copy page

Execute a function using PUT method. Proxied to Deno runtime.

Copy page

PUT

/

functions

/

{slug}

Try it

Execute function (PUT)

cURL

```
curl --request PUT \
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

[Execute function (GET)](/api-reference/client/execute-function-get)[Execute function (POST)](/api-reference/client/execute-function-post)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)