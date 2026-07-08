## On this page

* [安装](#installation)
* [invoke()](#invoke)
  + [参数](#parameters)
  + [返回值](#returns)
  + [示例（POST 带请求体）](#example-post-with-body)
  + [输出（POST 带请求体）](#output-post-with-body)
  + [示例（GET 请求）](#example-get-request)
  + [输出（GET 请求）](#output-get-request)
  + [示例（使用自定义请求头）](#example-with-custom-headers)
  + [输出（使用自定义请求头）](#output-with-custom-headers)
* [完整的 Serverless 函数示例](#complete-serverless-function-examples)
  + [示例 1：公共函数（无需认证）](#example-1-public-function-no-authentication-required)
  + [示例 2：已认证函数（访问用户数据）](#example-2-authenticated-function-access-user-data)

TypeScript

# Functions SDK 参考

Copy page

使用 InsForge TypeScript SDK 调用 serverless 函数

Copy page

## [​](#installation) 安装

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
  anonKey: 'your-anon-key'  // 可选：用于公共/未认证请求
});
```

## [​](#invoke) invoke()

通过 slug 调用 serverless 函数。

### [​](#parameters) 参数

* `slug` (string, 必填) - 函数 slug/名称
* `body` (any, 可选) - 请求体（JSON 可序列化）
* `headers` (object, 可选) - 自定义请求头
* `method` ('GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', 可选) - HTTP 方法（默认：POST）

### [​](#returns) 返回值

```
{
  data: any | null,  // 函数的响应
  error: Error | null
}
```

SDK 自动包含来自已登录用户的认证令牌。

### [​](#example-post-with-body) 示例（POST 带请求体）

```
const { data, error } = await insforge.functions.invoke('hello-world', {
  body: { name: 'World', greeting: 'Hello' }
})

console.log(data)
```

### [​](#output-post-with-body) 输出（POST 带请求体）

```
{
  "data": {
    "message": "Hello, World!",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "error": null
}
```

### [​](#example-get-request) 示例（GET 请求）

```
const { data, error } = await insforge.functions.invoke('get-stats', {
  method: 'GET'
})

console.log(data)
```

### [​](#output-get-request) 输出（GET 请求）

```
{
  "data": {
    "posts": 500,
    "comments": 1200
  },
  "error": null
}
```

### [​](#example-with-custom-headers) 示例（使用自定义请求头）

```
const { data, error } = await insforge.functions.invoke('api-endpoint', {
  method: 'PUT',
  body: { id: '123', status: 'active' },
  headers: { 'X-Custom-Header': 'value' }
})
```

### [​](#output-with-custom-headers) 输出（使用自定义请求头）

```
{
  "data": {
    "updated": true,
    "id": "123"
  },
  "error": null
}
```

## [​](#complete-serverless-function-examples) 完整的 Serverless 函数示例

### [​](#example-1-public-function-no-authentication-required) 示例 1：公共函数（无需认证）

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

  // 使用 anon token 创建客户端 - 无需认证
  const client = createClient({
    baseUrl: Deno.env.get('INSFORGE_BASE_URL'),
    anonKey: Deno.env.get('ANON_KEY')
  });

  // 访问公共数据
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

### [​](#example-2-authenticated-function-access-user-data) 示例 2：已认证函数（访问用户数据）

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

  // 从请求头中提取令牌
  const authHeader = req.headers.get('Authorization');
  const userToken = authHeader ? authHeader.replace('Bearer ', '') : null;

  // 使用用户令牌创建客户端进行已认证访问
  const client = createClient({
    baseUrl: Deno.env.get('INSFORGE_BASE_URL'),
    edgeFunctionToken: userToken
  });

  // 获取已认证用户
  const { data: userData } = await client.auth.getCurrentUser();
  if (!userData?.user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // 访问用户的私有数据或使用 user_id 创建记录
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

[Storage SDK 参考](/sdks/typescript/storage)[模型网关](/sdks/typescript/ai)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)