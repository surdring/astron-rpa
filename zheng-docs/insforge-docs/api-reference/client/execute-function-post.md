Execute function (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/functions/{slug} \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "John",
  "age": 30
}
'
```

200

404

502

```
{
  "message": "Hello, John!"
}
```

Client

# Execute function (POST)

Copy page

Execute a function using POST method with JSON body. Proxied to Deno runtime.

Copy page

POST

/

functions

/

{slug}

Try it

Execute function (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/functions/{slug} \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "John",
  "age": 30
}
'
```

200

404

502

```
{
  "message": "Hello, John!"
}
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

[Execute function (PUT)](/api-reference/client/execute-function-put)[Execute function (DELETE)](/api-reference/client/execute-function-delete)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)