更新函数

cURL

```
curl --request PUT \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "<string>",
  "code": "<string>",
  "description": "<string>"
}
'
```

200

400

404

500

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function v2",
    "description": "Returns a greeting message",
    "status": "active",
    "updated_at": "2024-01-21T11:00:00Z"
  }
}
```

Admin

# 更新函数

复制页面

更新现有函数的代码或元数据

复制页面

PUT

/

api

/

functions

/

{slug}

尝试

更新函数

cURL

```
curl --request PUT \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "<string>",
  "code": "<string>",
  "description": "<string>"
}
'
```

200

400

404

500

```
{
  "success": true,
  "function": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "hello-world",
    "name": "Hello World Function v2",
    "description": "Returns a greeting message",
    "status": "active",
    "updated_at": "2024-01-21T11:00:00Z"
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

#### 路径参数

[​](#parameter-slug)

slug

string

required

函数 slug 标识符

模式：`^[a-zA-Z0-9_-]+$`

#### 请求体

application/json

[​](#body-name)

name

string

新的显示名称

[​](#body-code)

code

string

更新后的函数代码

[​](#body-description)

description

string

更新后的描述

[​](#body-status)

status

enum<string>

函数状态

可用选项：

`draft`,

`active`,

`error`

#### 响应

200

application/json

函数更新成功

[​](#response-success)

success

boolean

[​](#response-function)

function

object

显示子属性

[获取函数详情](/api-reference/admin/get-function-details)[删除函数](/api-reference/admin/delete-function)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)