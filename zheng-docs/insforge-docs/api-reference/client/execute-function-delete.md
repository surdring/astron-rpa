Execute function (DELETE)

cURL

```
curl --request DELETE \
  --url https://api.example.com/functions/{slug}
```

200

502

```
{}
```

Client

# Execute function (DELETE)

Copy page

Execute a function using DELETE method. Proxied to Deno runtime.

Copy page

DELETE

/

functions

/

{slug}

Try it

Execute function (DELETE)

cURL

```
curl --request DELETE \
  --url https://api.example.com/functions/{slug}
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

#### Response

200

\*/\*

Function executed successfully

The response is of type `object`.

[Execute function (POST)](/api-reference/client/execute-function-post)[Execute function (PATCH)](/api-reference/client/execute-function-patch)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)