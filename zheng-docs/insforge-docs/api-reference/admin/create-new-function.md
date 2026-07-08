Create new function

cURL

```
curl --request POST \
  --url https://api.example.com/api/functions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data @- <<EOF
{
  "name": "Hello World Function",
  "code": "export default async function(request) {\n  const { name = 'World' } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}!` }),\n    { headers: { 'Content-Type': 'application/json' } }\n  );\n}\n",
  "slug": "hello-world",
  "description": "Returns a personalized greeting message",
  "status": "active"
}
EOF
```

201

Example

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function",
    "description": "Returns a greeting message",
    "status": "active",
    "created_at": "2024-01-21T10:30:00Z"
  }
}
```

Admin

# Create new function

Copy page

Create a new function with code that runs in Deno runtime

Copy page

POST

/

api

/

functions

Try it

Create new function

cURL

```
curl --request POST \
  --url https://api.example.com/api/functions \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data @- <<EOF
{
  "name": "Hello World Function",
  "code": "export default async function(request) {\n  const { name = 'World' } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}!` }),\n    { headers: { 'Content-Type': 'application/json' } }\n  );\n}\n",
  "slug": "hello-world",
  "description": "Returns a personalized greeting message",
  "status": "active"
}
EOF
```

201

Example

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function",
    "description": "Returns a greeting message",
    "status": "active",
    "created_at": "2024-01-21T10:30:00Z"
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

[​](#body-name)

name

string

required

Display name for the function

Minimum string length: `1`

Example:

`"Hello World Function"`

[​](#body-code)

code

string

required

JavaScript/TypeScript code that exports an async function

Minimum string length: `1`

Example:

`"export default async function(request) {\n const { name = 'World' } = await request.json();\n return new Response(\n JSON.stringify({ message:`Hello, ${name}!`}),\n { headers: { 'Content-Type': 'application/json' } }\n );\n}\n"`

[​](#body-slug)

slug

string

URL-friendly identifier (auto-generated from name if not provided)

Pattern: `^[a-zA-Z0-9_-]+$`

Example:

`"hello-world"`

[​](#body-description)

description

string

Description of what the function does

Example:

`"Returns a personalized greeting message"`

[​](#body-status)

status

enum<string>

default:active

Initial status (draft or active/deployed)

Available options:

`draft`,

`active`

#### Response

201

application/json

Function created successfully

[​](#response-success)

success

boolean

[​](#response-function)

function

object

Show child attributes

[List all functions](/api-reference/admin/list-all-functions)[Get function details](/api-reference/admin/get-function-details)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)