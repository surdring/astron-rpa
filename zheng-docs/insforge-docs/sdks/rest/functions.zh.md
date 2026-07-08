## On this page

* [概述](#overview)
* [请求头](#headers)
* [调用函数](#invoke-function)
  + [路径参数](#path-parameters)
  + [请求体](#request-body)
  + [示例](#example)
  + [响应](#response)
* [管理端点](#admin-endpoints)
  + [列出所有函数](#list-all-functions)
  + [示例](#example-2)
  + [响应](#response-2)
  + [获取函数详情](#get-function-details)
  + [示例](#example-3)
  + [响应](#response-3)
  + [创建函数](#create-function)
  + [请求体](#request-body-2)
  + [示例](#example-4)
  + [响应](#response-4)
  + [更新函数](#update-function)
  + [请求体](#request-body-3)
  + [示例](#example-5)
  + [响应](#response-5)
  + [删除函数](#delete-function)
  + [示例](#example-6)
  + [响应](#response-6)
* [函数代码结构](#function-code-structure)
  + [访问请求数据](#accessing-request-data)
* [函数状态](#function-status)
* [错误响应](#error-responses)
  + [函数未找到（404）](#function-not-found-404)
  + [函数未激活（404）](#function-not-active-404)
  + [执行错误（502）](#execution-error-502)
  + [函数运行时错误（500）](#function-runtime-error-500)
  + [Slug 已存在（409）](#slug-already-exists-409)
  + [检测到危险代码（400）](#dangerous-code-detected-400)

REST API

# 函数 API 参考

Copy page

通过 REST API 调用 serverless 边缘函数

Copy page

## [​](#overview) 概述

函数 API 提供用于调用和管理 serverless 函数的端点。在云环境中，函数在边缘的 Deno Subhosting 上运行。在自托管（Docker）环境中，函数在本地 Deno 运行时中运行。

## [​](#headers) 请求头

```
Content-Type: application/json
```

用于已认证的函数调用：

```
Authorization: Bearer your-jwt-token-or-anon-key
```

用于管理端点：

```
Authorization: Bearer admin-jwt-token-or-api-key
```

---

## [​](#invoke-function) 调用函数

使用任何 HTTP 方法（GET、POST、PUT、PATCH、DELETE 等）执行已部署的函数。服务器会保留并转发调用者的原始方法到函数运行时。

```
ANY /functions/{slug}
```

注意：函数调用使用 `/functions/{slug}`（不带 `/api` 前缀），而不是 `/api/functions/{slug}`。

### [​](#path-parameters) 路径参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `slug` | string | 函数 slug 标识符 |

### [​](#request-body) 请求体

函数期望的任何 JSON 负载。

### [​](#example) 示例

```
curl -X POST "https://your-app.insforge.app/functions/hello-world" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John"
  }'
```

### [​](#response) 响应

响应取决于函数的返回值：

```
{
  "message": "Hello, John!"
}
```

---

## [​](#admin-endpoints) 管理端点

这些端点需要管理员认证。

### [​](#list-all-functions) 列出所有函数

```
GET /api/functions
```

### [​](#example-2) 示例

```
curl "https://your-app.insforge.app/api/functions" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key"
```

### [​](#response-2) 响应

```
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World 函数",
    "description": "返回问候消息",
    "status": "active",
    "created_at": "2024-01-21T10:30:00Z",
    "updated_at": "2024-01-21T10:35:00Z",
    "deployed_at": "2024-01-21T10:35:00Z"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "slug": "process-webhook",
    "name": "Webhook 处理器",
    "description": "处理传入的 webhooks",
    "status": "draft",
    "created_at": "2024-01-22T14:20:00Z",
    "updated_at": "2024-01-22T14:20:00Z",
    "deployed_at": null
  }
]
```

---

### [​](#get-function-details) 获取函数详情

```
GET /api/functions/{slug}
```

### [​](#example-3) 示例

```
curl "https://your-app.insforge.app/api/functions/hello-world" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key"
```

### [​](#response-3) 响应

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "slug": "hello-world",
  "name": "Hello World 函数",
  "description": "返回问候消息",
  "code": "export default async function(request) {\n  const { name = 'World' } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}!` }),\n    { headers: { 'Content-Type': 'application/json' } }\n  );\n}",
  "status": "active",
  "created_at": "2024-01-21T10:30:00Z",
  "updated_at": "2024-01-21T10:35:00Z",
  "deployed_at": "2024-01-21T10:35:00Z"
}
```

---

### [​](#create-function) 创建函数

目前，InsForge 仅支持在 Deno 环境中运行的 JavaScript/TypeScript 函数。

```
POST /api/functions
```

### [​](#request-body-2) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `name` | string | 是 | 函数的显示名称 |
| `code` | string | 是 | JavaScript/TypeScript 代码 |
| `slug` | string | 否 | URL 友好的标识符（未提供时自动生成） |
| `description` | string | 否 | 函数描述 |
| `status` | string | 否 | `draft` 或 `active`（默认：`active`） |

### [​](#example-4) 示例

```
curl -X POST "https://your-app.insforge.app/api/functions" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hello World 函数",
    "slug": "hello-world",
    "description": "返回个性化问候",
    "code": "export default async function(request) {\n  const { name = \"World\" } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}!` }),\n    { headers: { \"Content-Type\": \"application/json\" } }\n  );\n}",
    "status": "active"
  }'
```

### [​](#response-4) 响应

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World 函数",
    "description": "返回个性化问候",
    "status": "active",
    "created_at": "2024-01-21T10:30:00Z"
  }
}
```

---

### [​](#update-function) 更新函数

```
PUT /api/functions/{slug}
```

### [​](#request-body-3) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `name` | string | 否 | 更新后的显示名称 |
| `code` | string | 否 | 更新后的函数代码 |
| `description` | string | 否 | 更新后的描述 |
| `status` | string | 否 | `draft`、`active` 或 `error` |

### [​](#example-5) 示例

```
curl -X PUT "https://your-app.insforge.app/api/functions/hello-world" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hello World 函数 v2",
    "code": "export default async function(request) {\n  const { name = \"World\" } = await request.json();\n  return new Response(\n    JSON.stringify({ message: `Hello, ${name}! Welcome to v2.`, version: 2 }),\n    { headers: { \"Content-Type\": \"application/json\" } }\n  );\n}"
  }'
```

### [​](#response-5) 响应

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World 函数 v2",
    "description": "返回个性化问候",
    "status": "active",
    "updated_at": "2024-01-21T11:00:00Z"
  }
}
```

---

### [​](#delete-function) 删除函数

```
DELETE /api/functions/{slug}
```

### [​](#example-6) 示例

```
curl -X DELETE "https://your-app.insforge.app/api/functions/old-function" \
  -H "Authorization: Bearer admin-jwt-token-or-api-key"
```

### [​](#response-6) 响应

```
{
  "success": true,
  "message": "函数 old-function 已成功删除"
}
```

---

## [​](#function-code-structure) 函数代码结构

函数必须导出一个默认的异步函数，该函数接收一个 `Request` 对象并返回一个 `Response`：

```
export default async function(request) {
  // 解析请求体
  const body = await request.json();

  // 处理请求
  const result = { message: `Hello, ${body.name}!` };

  // 返回响应
  return new Response(
    JSON.stringify(result),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    }
  );
}
```

### [​](#accessing-request-data) 访问请求数据

```
export default async function(request) {
  // 获取 JSON 请求体
  const body = await request.json();

  // 获取请求头
  const authHeader = request.headers.get('Authorization');

  // 获取查询参数
  const url = new URL(request.url);
  const param = url.searchParams.get('param');

  // 获取请求方法
  const method = request.method;

  return new Response(JSON.stringify({ body, authHeader, param, method }));
}
```

---

## [​](#function-status) 函数状态

| 状态 | 描述 |
| --- | --- |
| `draft` | 函数已保存但未部署 |
| `active` | 函数已部署且可调用 |
| `error` | 函数存在部署错误 |

---

## [​](#error-responses) 错误响应

### [​](#function-not-found-404) 函数未找到（404）

```
{
  "error": "函数未找到"
}
```

### [​](#function-not-active-404) 函数未激活（404）

```
{
  "error": "函数未找到或未激活"
}
```

### [​](#execution-error-502) 执行错误（502）

当函数运行时不可达时（自托管：本地 Deno 运行时宕机；云：subhosting 代理失败）：

```
{
  "error": "代理函数失败"
}
```

### [​](#function-runtime-error-500) 函数运行时错误（500）

当函数代码抛出错误时：

```
{
  "error": "函数执行失败",
  "message": "TypeError: 无法读取未定义的属性 'name'"
}
```

### [​](#slug-already-exists-409) Slug 已存在（409）

```
{
  "error": "此 slug 的函数已存在",
  "details": "重复的键值违反唯一约束"
}
```

### [​](#dangerous-code-detected-400) 检测到危险代码（400）

```
{
  "error": "代码包含潜在危险模式",
  "pattern": "/Deno\\.run/i"
}
```

[存储 API 参考](/sdks/rest/storage)[AI REST 参考](/sdks/rest/ai)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)