Delete function

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>'
```

200

404

500

```
{
  "success": true,
  "message": "Function hello-world deleted successfully"
}
```

Admin

# Delete function

Copy page

Permanently delete a function

Copy page

DELETE

/

api

/

functions

/

{slug}

Try it

Delete function

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>'
```

200

404

500

```
{
  "success": true,
  "message": "Function hello-world deleted successfully"
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

[​](#parameter-slug)

slug

string

required

Function slug identifier

Pattern: `^[a-zA-Z0-9_-]+$`

#### Response

200

application/json

Function deleted successfully

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[Update function](/api-reference/admin/update-function)[Execute function (GET)](/api-reference/client/execute-function-get)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)