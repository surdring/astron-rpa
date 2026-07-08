列出所有函数

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

# 列出所有函数

复制页面

获取所有函数及其元数据

复制页面

GET

/

api

/

functions

尝试

列出所有函数

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

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 响应

200

application/json

函数列表

[​](#response-items-id)

id

string<uuid>

required

函数的唯一标识符

[​](#response-items-slug)

slug

string

required

URL 友好的标识符

示例：

`"hello-world"`

[​](#response-items-name)

name

string

required

函数的显示名称

示例：

`"Hello World Function"`

[​](#response-items-status)

status

enum<string>

required

函数的当前状态

可用选项：

`draft`,

`active`,

`error`

[​](#response-items-created-at)

created\_at

string<date-time>

required

函数的创建时间

[​](#response-items-updated-at)

updated\_at

string<date-time>

required

函数的最后更新时间

[​](#response-items-description-one-of-0)

description

string | null

函数功能的描述

[​](#response-items-deployed-at-one-of-0)

deployed\_at

string<date-time> | null

函数的最后部署时间（如果从未部署则为 null）

[生成嵌入向量（已弃用）](/api-reference/client/generate-embeddings-deprecated)[创建新函数](/api-reference/admin/create-new-function)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)