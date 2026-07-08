查询记录

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

400

404

```
[
  {
    "id": "248373e1-0aea-45ce-8844-5ef259203749",
    "title": "Getting Started with InsForge",
    "content": "This is a guide to help you get started...",
    "createdAt": "2025-07-18T05:37:24.338Z",
    "updatedAt": "2025-07-18T05:37:24.338Z"
  },
  {
    "id": "348373e1-0aea-45ce-8844-5ef259203750",
    "title": "Advanced Database Queries",
    "content": "Learn how to write complex queries...",
    "createdAt": "2025-07-19T08:15:10.123Z",
    "updatedAt": "2025-07-19T08:15:10.123Z"
  }
]
```

Client

# 查询记录

复制页面

从表中查询记录，支持过滤、排序和分页

复制页面

GET

/

api

/

database

/

records

/

{tableName}

尝试

查询记录

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

400

404

```
[
  {
    "id": "248373e1-0aea-45ce-8844-5ef259203749",
    "title": "Getting Started with InsForge",
    "content": "This is a guide to help you get started...",
    "createdAt": "2025-07-18T05:37:24.338Z",
    "updatedAt": "2025-07-18T05:37:24.338Z"
  },
  {
    "id": "348373e1-0aea-45ce-8844-5ef259203750",
    "title": "Advanced Database Queries",
    "content": "Learn how to write complex queries...",
    "createdAt": "2025-07-19T08:15:10.123Z",
    "updatedAt": "2025-07-19T08:15:10.123Z"
  }
]
```

#### 认证

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

必需

Bearer 认证请求头，格式为 `Bearer <token>`，其中 `<token>` 是您的认证令牌。

#### 路径参数

[​](#parameter-table-name)

tableName

string

必需

要查询的表名

#### 查询参数

[​](#parameter-limit)

limit

integer

默认值：100

返回的最大记录数

必需范围：`1 <= x <= 1000`

[​](#parameter-offset)

offset

integer

默认值：0

分页时跳过的记录数

必需范围：`x >= 0`

[​](#parameter-order)

order

string

排序方式（例如 "createdAt.desc"、"name.asc"）

[​](#parameter-select)

select

string

要返回的列名，以逗号分隔

[​](#parameter-field)

field

string

按字段值过滤（例如 "?status=eq.active"、"?age=gt.18"）

#### 响应

200

application/json

记录列表

[删除自定义 OAuth 配置](/api-reference/admin/delete-custom-oauth-configuration)[创建记录](/api-reference/client/create-records)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)