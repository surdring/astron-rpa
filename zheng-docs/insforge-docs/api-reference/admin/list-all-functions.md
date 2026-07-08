List all functions

cURL

```
curl --request GET \
  --url https://api.example.com/api/functions \
  --header 'Authorization: Bearer <token>'
```

200

500

```
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function",
    "description": "Returns a greeting message",
    "status": "active",
    "created_at": "2024-01-21T10:30:00Z",
    "updated_at": "2024-01-21T10:35:00Z",
    "deployed_at": "2024-01-21T10:35:00Z"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "slug": "process-webhook",
    "name": "Webhook Processor",
    "description": "Processes incoming webhooks",
    "status": "draft",
    "created_at": "2024-01-22T14:20:00Z",
    "updated_at": "2024-01-22T14:20:00Z",
    "deployed_at": null
  }
]
```

Admin

# List all functions

Copy page

Get all functions with their metadata

Copy page

GET

/

api

/

functions

Try it

List all functions

cURL

```
curl --request GET \
  --url https://api.example.com/api/functions \
  --header 'Authorization: Bearer <token>'
```

200

500

```
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function",
    "description": "Returns a greeting message",
    "status": "active",
    "created_at": "2024-01-21T10:30:00Z",
    "updated_at": "2024-01-21T10:35:00Z",
    "deployed_at": "2024-01-21T10:35:00Z"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "slug": "process-webhook",
    "name": "Webhook Processor",
    "description": "Processes incoming webhooks",
    "status": "draft",
    "created_at": "2024-01-22T14:20:00Z",
    "updated_at": "2024-01-22T14:20:00Z",
    "deployed_at": null
  }
]
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

List of functions

[​](#response-items-id)

id

string<uuid>

required

Unique identifier for the function

[​](#response-items-slug)

slug

string

required

URL-friendly identifier

Example:

`"hello-world"`

[​](#response-items-name)

name

string

required

Display name for the function

Example:

`"Hello World Function"`

[​](#response-items-status)

status

enum<string>

required

Current status of the function

Available options:

`draft`,

`active`,

`error`

[​](#response-items-created-at)

created\_at

string<date-time>

required

When the function was created

[​](#response-items-updated-at)

updated\_at

string<date-time>

required

When the function was last updated

[​](#response-items-description-one-of-0)

description

string | null

Description of what the function does

[​](#response-items-deployed-at-one-of-0)

deployed\_at

string<date-time> | null

When the function was last deployed (null if never deployed)

[Generate embeddings (deprecated)](/api-reference/client/generate-embeddings-deprecated)[Create new function](/api-reference/admin/create-new-function)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)