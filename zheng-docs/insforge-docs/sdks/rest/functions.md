## On this page

* [Overview](#overview)
* [Headers](#headers)
* [Invoke Function](#invoke-function)
  + [Path Parameters](#path-parameters)
  + [Request Body](#request-body)
  + [Example](#example)
  + [Response](#response)
* [Admin Endpoints](#admin-endpoints)
  + [List All Functions](#list-all-functions)
  + [Example](#example-2)
  + [Response](#response-2)
  + [Get Function Details](#get-function-details)
  + [Example](#example-3)
  + [Response](#response-3)
  + [Create Function](#create-function)
  + [Request Body](#request-body-2)
  + [Example](#example-4)
  + [Response](#response-4)
  + [Update Function](#update-function)
  + [Request Body](#request-body-3)
  + [Example](#example-5)
  + [Response](#response-5)
  + [Delete Function](#delete-function)
  + [Example](#example-6)
  + [Response](#response-6)
* [Function Code Structure](#function-code-structure)
  + [Accessing Request Data](#accessing-request-data)
* [Function Status](#function-status)
* [Error Responses](#error-responses)
  + [Function Not Found (404)](#function-not-found-404)
  + [Function Not Active (404)](#function-not-active-404)
  + [Execution Error (502)](#execution-error-502)
  + [Function Runtime Error (500)](#function-runtime-error-500)
  + [Slug Already Exists (409)](#slug-already-exists-409)
  + [Dangerous Code Detected (400)](#dangerous-code-detected-400)

REST API

# Functions API Reference

Copy page

Serverless edge functions via REST API

Copy page

## [​](#overview) Overview

The Functions API provides endpoints for invoking and managing serverless functions. In cloud environments, functions run on Deno Subhosting at the edge. In self-hosted (Docker) environments, functions run in a local Deno runtime.

## [​](#headers) Headers

```
Content-Type: application/json
```

For authenticated function invocations:

```
Authorization: Bearer your-jwt-token-or-anon-key
```

For admin endpoints:

```
Authorization: Bearer admin-jwt-token-or-api-key
```

---

## [​](#invoke-function) Invoke Function

Execute a deployed function using any HTTP method (GET, POST, PUT, PATCH, DELETE, etc.). The server preserves and forwards the caller’s original method to the function runtime.

```
ANY /functions/{slug}
```

Note: Function invocation uses `/functions/{slug}` (without `/api` prefix), not `/api/functions/{slug}`.

### [​](#path-parameters) Path Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `slug` | string | Function slug identifier |

### [​](#request-body) Request Body

Any JSON payload that the function expects.

### [​](#example) Example

```
curl -X POST "https://your-app.insforge.app/functions/hello-world" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John"
  }'
```

### [​](#response) Response

The response depends on what the function returns:

```
{
  "message": "Hello, John!"
}
```

---

## [​](#admin-endpoints) Admin Endpoints

These endpoints require admin authentication.

### [​](#list-all-functions) List All Functions

```
GET /api/functions
```

### [​](#example-2) Example

```
curl "https://your-app.insforge.app/api/functions" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key"
```

### [​](#response-2) Response

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

---

### [​](#get-function-details) Get Function Details

```
GET /api/functions/{slug}
```

### [​](#example-3) Example

```
curl "https://your-app.insforge.app/api/functions/hello-world" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key"
```

### [​](#response-3) Response

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "slug": "hello-world",
  "name": "Hello World Function",
  "description": "Returns a greeting message",
  "code": "export default async function(request) {\n  const { name = 'World' } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}!` }),\n    { headers: { 'Content-Type': 'application/json' } }\n  );\n}",
  "status": "active",
  "created_at": "2024-01-21T10:30:00Z",
  "updated_at": "2024-01-21T10:35:00Z",
  "deployed_at": "2024-01-21T10:35:00Z"
}
```

---

### [​](#create-function) Create Function

Currently, InsForge only supports JavaScript/TypeScript functions running in a Deno environment.

```
POST /api/functions
```

### [​](#request-body-2) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Display name for the function |
| `code` | string | Yes | JavaScript/TypeScript code |
| `slug` | string | No | URL-friendly identifier (auto-generated if not provided) |
| `description` | string | No | Description of the function |
| `status` | string | No | `draft` or `active` (default: `active`) |

### [​](#example-4) Example

```
curl -X POST "https://your-app.insforge.app/api/functions" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hello World Function",
    "slug": "hello-world",
    "description": "Returns a personalized greeting",
    "code": "export default async function(request) {\n  const { name = \"World\" } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}!` }),\n    { headers: { \"Content-Type\": \"application/json\" } }\n  );\n}",
    "status": "active"
  }'
```

### [​](#response-4) Response

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function",
    "description": "Returns a personalized greeting",
    "status": "active",
    "created_at": "2024-01-21T10:30:00Z"
  }
}
```

---

### [​](#update-function) Update Function

```
PUT /api/functions/{slug}
```

### [​](#request-body-3) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | No | Updated display name |
| `code` | string | No | Updated function code |
| `description` | string | No | Updated description |
| `status` | string | No | `draft`, `active`, or `error` |

### [​](#example-5) Example

```
curl -X PUT "https://your-app.insforge.app/api/functions/hello-world" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hello World Function v2",
    "code": "export default async function(request) {\n  const { name = \"World\" } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}! Welcome to v2.`, version: 2 }),\n    { headers: { \"Content-Type\": \"application/json\" } }\n  );\n}"
  }'
```

### [​](#response-5) Response

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function v2",
    "description": "Returns a personalized greeting",
    "status": "active",
    "updated_at": "2024-01-21T11:00:00Z"
  }
}
```

---

### [​](#delete-function) Delete Function

```
DELETE /api/functions/{slug}
```

### [​](#example-6) Example

```
curl -X DELETE "https://your-app.insforge.app/api/functions/old-function" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key"
```

### [​](#response-6) Response

```
{
  "success": true,
  "message": "Function old-function deleted successfully"
}
```

---

## [​](#function-code-structure) Function Code Structure

Functions must export a default async function that receives a `Request` object and returns a `Response`:

```
export default async function(request) {
  // Parse request body
  const body = await request.json();

  // Process request
  const result = { message: `Hello, ${body.name}!` };

  // Return response
  return new Response(
    JSON.stringify(result),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    }
  );
}
```

### [​](#accessing-request-data) Accessing Request Data

```
export default async function(request) {
  // Get JSON body
  const body = await request.json();

  // Get headers
  const authHeader = request.headers.get('Authorization');

  // Get query parameters
  const url = new URL(request.url);
  const param = url.searchParams.get('param');

  // Get request method
  const method = request.method;

  return new Response(JSON.stringify({ body, authHeader, param, method }));
}
```

---

## [​](#function-status) Function Status

| Status | Description |
| --- | --- |
| `draft` | Function is saved but not deployed |
| `active` | Function is deployed and can be invoked |
| `error` | Function has a deployment error |

---

## [​](#error-responses) Error Responses

### [​](#function-not-found-404) Function Not Found (404)

```
{
  "error": "Function not found"
}
```

### [​](#function-not-active-404) Function Not Active (404)

```
{
  "error": "Function not found or not active"
}
```

### [​](#execution-error-502) Execution Error (502)

When the function runtime is unreachable (self-hosted: local Deno runtime down; cloud: subhosting proxy failure):

```
{
  "error": "Failed to proxy function"
}
```

### [​](#function-runtime-error-500) Function Runtime Error (500)

When the function code throws an error:

```
{
  "error": "Function execution failed",
  "message": "TypeError: Cannot read property 'name' of undefined"
}
```

### [​](#slug-already-exists-409) Slug Already Exists (409)

```
{
  "error": "Function with this slug already exists",
  "details": "duplicate key value violates unique constraint"
}
```

### [​](#dangerous-code-detected-400) Dangerous Code Detected (400)

```
{
  "error": "Code contains potentially dangerous patterns",
  "pattern": "/Deno\\.run/i"
}
```

[Storage API Reference](/sdks/rest/storage)[AI REST Reference](/sdks/rest/ai)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)