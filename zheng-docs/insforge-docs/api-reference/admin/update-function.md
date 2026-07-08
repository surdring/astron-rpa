Update function

cURL

```
curl --request PUT \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "<string>",
  "code": "<string>",
  "description": "<string>"
}
'
```

200

400

404

500

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function v2",
    "description": "Returns a greeting message",
    "status": "active",
    "updated_at": "2024-01-21T11:00:00Z"
  }
}
```

Admin

# Update function

Copy page

Update an existing function’s code or metadata

Copy page

PUT

/

api

/

functions

/

{slug}

Try it

Update function

cURL

```
curl --request PUT \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "<string>",
  "code": "<string>",
  "description": "<string>"
}
'
```

200

400

404

500

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function v2",
    "description": "Returns a greeting message",
    "status": "active",
    "updated_at": "2024-01-21T11:00:00Z"
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

#### Path Parameters

[​](#parameter-slug)

slug

string

required

Function slug identifier

Pattern: `^[a-zA-Z0-9_-]+$`

#### Body

application/json

[​](#body-name)

name

string

New display name

[​](#body-code)

code

string

Updated function code

[​](#body-description)

description

string

Updated description

[​](#body-status)

status

enum<string>

Function status

Available options:

`draft`,

`active`,

`error`

#### Response

200

application/json

Function updated successfully

[​](#response-success)

success

boolean

[​](#response-function)

function

object

Show child attributes

[Get function details](/api-reference/admin/get-function-details)[Delete function](/api-reference/admin/delete-function)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)