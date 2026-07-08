获取函数详情

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

# 获取函数详情

复制页面

获取特定函数及其代码

复制页面

GET

/

api

/

functions

/

{slug}

尝试

获取函数详情

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

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 路径参数

[​](#parameter-slug)

slug

string

required

函数 slug 标识符

模式：`^[a-zA-Z0-9_-]+$`

#### 响应

200

application/json

函数详情及代码

[​](#response-id)

id

string<uuid>

required

函数的唯一标识符

[​](#response-slug)

slug

string

required

URL 友好的标识符

示例：

`"hello-world"`

[​](#response-name)

name

string

required

函数的显示名称

示例：

`"Hello World Function"`

[​](#response-status)

status

enum<string>

required

函数的当前状态

可用选项：

`draft`,

`active`,

`error`

[​](#response-created-at)

created\_at

string<date-time>

required

函数的创建时间

[​](#response-updated-at)

updated\_at

string<date-time>

required

函数的最后更新时间

[​](#response-code)

code

string

required

函数的 JavaScript/TypeScript 代码

[​](#response-description-one-of-0)

description

string | null

函数功能的描述

[​](#response-deployed-at-one-of-0)

deployed\_at

string<date-time> | null

函数的最后部署时间（如果从未部署则为 null）

[创建新函数](/api-reference/admin/create-new-function)[更新函数](/api-reference/admin/update-function)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)