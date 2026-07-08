## On this page

* [Installation](#installation)
* [invoke()](#invoke)
  + [Parameters](#parameters)
  + [Returns](#returns)
  + [Example (POST with body)](#example-post-with-body)
  + [Output (POST with body)](#output-post-with-body)
  + [Example (GET request)](#example-get-request)
  + [Output (GET request)](#output-get-request)
  + [Example (With custom headers)](#example-with-custom-headers)
  + [Output (With custom headers)](#output-with-custom-headers)
* [Complete Serverless Function Examples](#complete-serverless-function-examples)
  + [Example 1: Public Function (No Authentication Required)](#example-1-public-function-no-authentication-required)
  + [Example 2: Authenticated Function (Access User Data)](#example-2-authenticated-function-access-user-data)

TypeScript

# Functions SDK Reference

Copy page

Invoke serverless functions with the InsForge TypeScript SDK

Copy page

## [​](#installation) Installation

npm

yarn

pnpm

```
npm install @insforge/sdk@latest
```

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'  // Optional: for public/unauthenticated requests
});
```

## [​](#invoke) invoke()

Invoke a serverless function by slug.

### [​](#parameters) Parameters

* `slug` (string, required) - Function slug/name
* `body` (any, optional) - Request body (JSON-serializable)
* `headers` (object, optional) - Custom headers
* `method` (‘GET’ | ‘POST’ | ‘PUT’ | ‘PATCH’ | ‘DELETE’, optional) - HTTP method (default: POST)

### [​](#returns) Returns

```
{
  data: any | null,  // Response from function
  error: Error | null
}
```

SDK automatically includes authentication token from logged-in user.

### [​](#example-post-with-body) Example (POST with body)

```
const { data, error } = await insforge.functions.invoke('hello-world', {
  body: { name: 'World', greeting: 'Hello' }
})

console.log(data)
```

### [​](#output-post-with-body) Output (POST with body)

```
{
  "data": {
    "message": "Hello, World!",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "error": null
}
```

### [​](#example-get-request) Example (GET request)

```
const { data, error } = await insforge.functions.invoke('get-stats', {
  method: 'GET'
})

console.log(data)
```

### [​](#output-get-request) Output (GET request)

```
{
  "data": {
    "posts": 500,
    "comments": 1200
  },
  "error": null
}
```

### [​](#example-with-custom-headers) Example (With custom headers)

```
const { data, error } = await insforge.functions.invoke('api-endpoint', {
  method: 'PUT',
  body: { id: '123', status: 'active' },
  headers: { 'X-Custom-Header': 'value' }
})
```

### [​](#output-with-custom-headers) Output (With custom headers)

```
{
  "data": {
    "updated": true,
    "id": "123"
  },
  "error": null
}
```

## [​](#complete-serverless-function-examples) Complete Serverless Function Examples

### [​](#example-1-public-function-no-authentication-required) Example 1: Public Function (No Authentication Required)

```
import { createClient } from 'npm:@insforge/sdk';

export default async function(req: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Create client with anon token - no authentication needed
  const client = createClient({
    baseUrl: Deno.env.get('INSFORGE_BASE_URL'),
    anonKey: Deno.env.get('ANON_KEY')
  });

  // Access public data
  const { data, error } = await client.database
    .from('public_posts')
    .select('*')
    .limit(10);

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}
```

### [​](#example-2-authenticated-function-access-user-data) Example 2: Authenticated Function (Access User Data)

```
import { createClient } from 'npm:@insforge/sdk';

export default async function(req: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Extract token from request headers
  const authHeader = req.headers.get('Authorization');
  const userToken = authHeader ? authHeader.replace('Bearer ', '') : null;

  // Create client with user's token for authenticated access
  const client = createClient({
    baseUrl: Deno.env.get('INSFORGE_BASE_URL'),
    edgeFunctionToken: userToken
  });

  // Get authenticated user
  const { data: userData } = await client.auth.getCurrentUser();
  if (!userData?.user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Access user's private data or create records with user_id
  await client.database.from('user_posts').insert([{
    user_id: userData.user.id,
    content: 'My post'
  }]);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}
```

[Storage SDK Reference](/sdks/typescript/storage)[Model Gateway](/sdks/typescript/ai)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)