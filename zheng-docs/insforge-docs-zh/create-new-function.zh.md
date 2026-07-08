创建新函数

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

示例

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

# 创建新函数

复制页面

使用在 Deno 运行时中运行的代码创建新函数

复制页面

POST

/

api

/

functions

尝试

创建新函数

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

示例

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

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 请求体

application/json

[​](#body-name)

name

string

required

函数的显示名称

最小字符串长度：`1`

示例：

`"Hello World Function"`

[​](#body-code)

code

string

required

导出异步函数的 JavaScript/TypeScript 代码

最小字符串长度：`1`

示例：

`"export default async function(request) {\n const { name = 'World' } = await request.json();\n return new Response(\n JSON.stringify({ message:`Hello, ${name}!`}),\n { headers: { 'Content-Type': 'application/json' } }\n );\n}\n"`

[​](#body-slug)

slug

string

URL 友好的标识符（如果未提供，则从名称自动生成）

模式：`^[a-zA-Z0-9_-]+$`

示例：

`"hello-world"`

[​](#body-description)

description

string

函数功能的描述

示例：

`"Returns a personalized greeting message"`

[​](#body-status)

status

enum<string>

默认值:active

初始状态（draft 或 active/deployed）

可用选项：

`draft`,

`active`

#### 响应

201

application/json

函数创建成功

[​](#response-success)

success

boolean

[​](#response-function)

function

object

显示子属性

[列出所有函数](/api-reference/admin/list-all-functions)[获取函数详情](/api-reference/admin/get-function-details)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)