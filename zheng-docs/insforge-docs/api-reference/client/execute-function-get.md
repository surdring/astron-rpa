Execute function (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/functions/{slug}
```

200

404

502

```
{
  "message": "Hello, World!"
}
```

Client

# Execute function (GET)

Copy page

Execute a function using GET method. Proxied to Deno runtime.

Copy page

GET

/

functions

/

{slug}

Try it

Execute function (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/functions/{slug}
```

200

404

502

```
{
  "message": "Hello, World!"
}
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

[Delete function](/api-reference/admin/delete-function)[Execute function (PUT)](/api-reference/client/execute-function-put)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)