Get function details

cURL

```
curl --request GET \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>'
```

200

404

500

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "slug": "hello-world",
  "name": "Hello World Function",
  "description": "Returns a greeting message",
  "code": "export default async function(request) {\n  const { name = 'World' } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}!` }),\n    { headers: { 'Content-Type': 'application/json' } }\n  );\n}\n",
  "status": "active",
  "created_at": "2024-01-21T10:30:00Z",
  "updated_at": "2024-01-21T10:35:00Z",
  "deployed_at": "2024-01-21T10:35:00Z"
}
```

Admin

# Get function details

Copy page

Get a specific function including its code

Copy page

GET

/

api

/

functions

/

{slug}

Try it

Get function details

cURL

```
curl --request GET \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>'
```

200

404

500

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "slug": "hello-world",
  "name": "Hello World Function",
  "description": "Returns a greeting message",
  "code": "export default async function(request) {\n  const { name = 'World' } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}!` }),\n    { headers: { 'Content-Type': 'application/json' } }\n  );\n}\n",
  "status": "active",
  "created_at": "2024-01-21T10:30:00Z",
  "updated_at": "2024-01-21T10:35:00Z",
  "deployed_at": "2024-01-21T10:35:00Z"
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

Function details with code

[​](#response-id)

id

string<uuid>

required

Unique identifier for the function

[​](#response-slug)

slug

string

required

URL-friendly identifier

Example:

`"hello-world"`

[​](#response-name)

name

string

required

Display name for the function

Example:

`"Hello World Function"`

[​](#response-status)

status

enum<string>

required

Current status of the function

Available options:

`draft`,

`active`,

`error`

[​](#response-created-at)

created\_at

string<date-time>

required

When the function was created

[​](#response-updated-at)

updated\_at

string<date-time>

required

When the function was last updated

[​](#response-code)

code

string

required

The function's JavaScript/TypeScript code

[​](#response-description-one-of-0)

description

string | null

Description of what the function does

[​](#response-deployed-at-one-of-0)

deployed\_at

string<date-time> | null

When the function was last deployed (null if never deployed)

[Create new function](/api-reference/admin/create-new-function)[Update function](/api-reference/admin/update-function)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)