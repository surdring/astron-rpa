## On this page

* [概述](#overview)
* [请求头](#headers)
* [查询记录](#query-records)
  + [查询参数](#query-parameters)
  + [过滤器操作符](#filter-operators)
  + [示例](#example)
  + [响应](#response)
  + [响应头](#response-headers)
* [创建记录](#create-records)
  + [请求头](#headers-2)
  + [示例](#example-2)
  + [响应](#response-2)
* [更新记录](#update-records)
  + [查询参数](#query-parameters-2)
  + [请求头](#headers-3)
  + [示例](#example-3)
  + [响应](#response-3)
* [删除记录](#delete-records)
  + [查询参数](#query-parameters-3)
  + [请求头](#headers-4)
  + [示例](#example-4)
  + [响应](#response-4)
* [错误响应](#error-responses)
  + [表未找到（404）](#table-not-found-404)
  + [无效查询（400）](#invalid-query-400)
  + [验证错误（400）](#validation-error-400)
* [示例](#examples)
  + [分页](#pagination)
  + [复杂过滤器](#complex-filters)
  + [Upsert（插入或更新）](#upsert-insert-or-update)
  + [请求头](#headers-5)
  + [示例](#example-5)
  + [响应](#response-5)
* [调用 RPC 函数](#call-rpc-function)
  + [示例](#example-6)
  + [响应](#response-6)
* [管理端点](#admin-endpoints)
  + [管理端点的请求头](#headers-for-admin-endpoints)
* [列出数据库函数](#list-database-functions)
  + [示例](#example-7)
  + [响应](#response-7)
* [列出数据库索引](#list-database-indexes)
  + [示例](#example-8)
  + [响应](#response-8)
* [列出 RLS 策略](#list-rls-policies)
  + [示例](#example-9)
  + [响应](#response-9)
* [列出数据库触发器](#list-database-triggers)
  + [示例](#example-10)
  + [响应](#response-10)
* [列出数据库迁移](#list-database-migrations)
  + [示例](#example-11)
  + [响应](#response-11)
* [创建数据库迁移](#create-database-migration)
  + [请求体](#request-body)
  + [示例](#example-12)
  + [响应](#response-12)
* [执行原始 SQL（严格模式）](#execute-raw-sql-strict-mode)
  + [请求体](#request-body-2)
  + [示例](#example-13)
  + [响应](#response-13)
* [执行原始 SQL（宽松模式）](#execute-raw-sql-relaxed-mode)
  + [请求体](#request-body-3)
  + [示例](#example-14)
  + [响应](#response-14)
* [导出数据库](#export-database)
  + [请求体](#request-body-4)
  + [示例](#example-15)
  + [响应](#response-15)
* [导入数据库](#import-database)
  + [请求（multipart/form-data）](#request-multipart%2Fform-data)
  + [示例](#example-16)
  + [响应](#response-16)
* [批量 Upsert](#bulk-upsert)
  + [请求（multipart/form-data）](#request-multipart%2Fform-data-2)
  + [示例](#example-17)
  + [响应](#response-17)

REST API

# 数据库 API 参考

Copy page

通过 REST API 进行 PostgREST 风格的数据库操作

Copy page

## [​](#overview) 概述

数据库 API 为您的数据库表提供 PostgREST 风格的 CRUD 操作。所有请求都需要认证请求头。

## [​](#headers) 请求头

```
Authorization: Bearer your-jwt-token-or-anon-key
Content-Type: application/json
```

---

## [​](#query-records) 查询记录

从表中检索记录，支持过滤、排序和分页。

```
GET /api/database/records/{tableName}
```

### [​](#query-parameters) 查询参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `limit` | integer | 最大返回记录数（1-1000，默认：100） |
| `offset` | integer | 分页跳过的记录数（默认：0） |
| `order` | string | 排序顺序（例如 `createdAt.desc`、`name.asc`） |
| `select` | string | 逗号分隔的返回列名 |
| `{field}` | string | PostgREST 过滤器（例如 `status=eq.active`） |

### [​](#filter-operators) 过滤器操作符

| 操作符 | 描述 | 示例 |
| --- | --- | --- |
| `eq` | 等于 | `status=eq.active` |
| `neq` | 不等于 | `status=neq.deleted` |
| `gt` | 大于 | `age=gt.18` |
| `gte` | 大于等于 | `price=gte.100` |
| `lt` | 小于 | `quantity=lt.10` |
| `lte` | 小于等于 | `score=lte.50` |
| `like` | 模式匹配（区分大小写） | `name=like.*john*` |
| `ilike` | 模式匹配（不区分大小写） | `email=ilike.*@gmail.com` |
| `in` | 在列表中 | `status=in.(active,pending)` |
| `is` | 为 null/true/false | `deleted_at=is.null` |

### [​](#example) 示例

```
# 获取所有帖子
curl "https://your-app.insforge.app/api/database/records/posts" \
  -H "Authorization: Bearer your-jwt-token"

# 带过滤条件获取帖子
curl "https://your-app.insforge.app/api/database/records/posts?status=eq.published&order=createdAt.desc&limit=10" \
  -H "Authorization: Bearer your-jwt-token"

# 选择特定列
curl "https://your-app.insforge.app/api/database/records/posts?select=id,title,author" \
  -H "Authorization: Bearer your-jwt-token"
```

### [​](#response) 响应

```
[
  {
    "id": "248373e1-0aea-45ce-8844-5ef259203749",
    "title": "InsForge 入门指南",
    "content": "这是一份帮助您入门的指南...",
    "createdAt": "2025-07-18T05:37:24.338Z",
    "updatedAt": "2025-07-18T05:37:24.338Z"
  }
]
```

### [​](#response-headers) 响应头

| 请求头 | 描述 |
| --- | --- |
| `X-Total-Count` | 匹配查询的总记录数 |
| `Content-Range` | 返回的记录范围（例如 `0-99/1234`） |

---

## [​](#create-records) 创建记录

在表中创建一条或多条记录。

```
POST /api/database/records/{tableName}
```

**重要**：请求体必须是数组，即使只创建单条记录也是如此。

### [​](#headers-2) 请求头

| 请求头 | 值 | 描述 |
| --- | --- | --- |
| `Prefer` | `return=representation` | 包含此头以返回创建的记录 |

### [​](#example-2) 示例

```
# 创建单条记录
curl -X POST "https://your-app.insforge.app/api/database/records/posts" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '[{
    "title": "我的第一篇帖子",
    "content": "Hello world!",
    "published": true
  }]'

# 创建多条记录
curl -X POST "https://your-app.insforge.app/api/database/records/posts" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '[
    {"title": "帖子 1", "content": "内容 1"},
    {"title": "帖子 2", "content": "内容 2"}
  ]'
```

### [​](#response-2) 响应

不带 `Prefer` 请求头：

```
[]
```

带 `Prefer: return=representation`：

```
[
  {
    "id": "248373e1-0aea-45ce-8844-5ef259203749",
    "title": "我的第一篇帖子",
    "content": "Hello world!",
    "published": true,
    "createdAt": "2025-07-18T05:37:24.338Z",
    "updatedAt": "2025-07-18T05:37:24.338Z"
  }
]
```

---

## [​](#update-records) 更新记录

更新匹配查询过滤器的记录。

```
PATCH /api/database/records/{tableName}
```

### [​](#query-parameters-2) 查询参数

使用过滤器操作符指定要更新的记录。

### [​](#headers-3) 请求头

| 请求头 | 值 | 描述 |
| --- | --- | --- |
| `Prefer` | `return=representation` | 包含此头以返回更新后的记录 |

### [​](#example-3) 示例

```
# 按 ID 更新单条记录
curl -X PATCH "https://your-app.insforge.app/api/database/records/posts?id=eq.248373e1-0aea-45ce-8844-5ef259203749" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "title": "更新后的帖子标题",
    "content": "此内容已更新。"
  }'

# 更新多条记录
curl -X PATCH "https://your-app.insforge.app/api/database/records/posts?status=eq.draft" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"status": "archived"}'
```

### [​](#response-3) 响应

```
[
  {
    "id": "248373e1-0aea-45ce-8844-5ef259203749",
    "title": "更新后的帖子标题",
    "content": "此内容已更新。",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-21T11:00:00Z"
  }
]
```

---

## [​](#delete-records) 删除记录

删除匹配查询过滤器的记录。

```
DELETE /api/database/records/{tableName}
```

### [​](#query-parameters-3) 查询参数

使用过滤器操作符指定要删除的记录。

### [​](#headers-4) 请求头

| 请求头 | 值 | 描述 |
| --- | --- | --- |
| `Prefer` | `return=representation` | 包含此头以返回已删除的记录 |

### [​](#example-4) 示例

```
# 按 ID 删除
curl -X DELETE "https://your-app.insforge.app/api/database/records/posts?id=eq.248373e1-0aea-45ce-8844-5ef259203749" \
  -H "Authorization: Bearer your-jwt-token"

# 带 Prefer 请求头以查看已删除的记录
curl -X DELETE "https://your-app.insforge.app/api/database/records/posts?status=eq.archived" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Prefer: return=representation"
```

### [​](#response-4) 响应

不带 `Prefer` 请求头：`204 No Content`
带 `Prefer: return=representation`：

```
[
  {
    "id": "248373e1-0aea-45ce-8844-5ef259203749",
    "title": "已删除的帖子",
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

---

## [​](#error-responses) 错误响应

### [​](#table-not-found-404) 表未找到（404）

```
{
  "error": "TABLE_NOT_FOUND",
  "message": "表 'nonexistent' 不存在",
  "statusCode": 404,
  "nextActions": "检查表名并重试"
}
```

### [​](#invalid-query-400) 无效查询（400）

```
{
  "error": "INVALID_QUERY",
  "message": "无效的过滤器语法",
  "statusCode": 400,
  "nextActions": "查看 PostgREST 过滤器文档"
}
```

### [​](#validation-error-400) 验证错误（400）

```
{
  "error": "VALIDATION_ERROR",
  "message": "无效的字段类型：'published' 应为 boolean",
  "statusCode": 400,
  "nextActions": "确保字段类型与表架构匹配"
}
```

---

## [​](#examples) 示例

### [​](#pagination) 分页

```
# 第 1 页（前 20 条记录）
curl "https://your-app.insforge.app/api/database/records/posts?limit=20&offset=0"

# 第 2 页（接下来 20 条记录）
curl "https://your-app.insforge.app/api/database/records/posts?limit=20&offset=20"
```

### [​](#complex-filters) 复杂过滤器

```
# 多个条件
curl "https://your-app.insforge.app/api/database/records/posts?status=eq.published&author_id=eq.123&order=createdAt.desc"

# 模式搜索
curl "https://your-app.insforge.app/api/database/records/users?email=ilike.*@company.com"

# 列表查询
curl "https://your-app.insforge.app/api/database/records/orders?status=in.(pending,processing)"

# 空值检查
curl "https://your-app.insforge.app/api/database/records/tasks?completed_at=is.null"
```

### [​](#upsert-insert-or-update) Upsert（插入或更新）

插入记录或在唯一约束冲突时更新。

```
POST /api/database/records/{tableName}
```

#### [​](#headers-5) 请求头

| 请求头 | 值 | 描述 |
| --- | --- | --- |
| `Prefer` | `resolution=merge-duplicates` | 冲突时更新现有记录 |
| `Prefer` | `resolution=ignore-duplicates` | 记录存在时忽略插入 |

#### [​](#example-5) 示例

```
# Upsert：冲突时插入或更新
curl -X POST "https://your-app.insforge.app/api/database/records/user_settings" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -H "Prefer: resolution=merge-duplicates,return=representation" \
  -d '[{
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "theme": "dark",
    "notifications": true
  }]'
```

#### [​](#response-5) 响应

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "theme": "dark",
    "notifications": true,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-21T11:00:00Z"
  }
]
```

Upsert 需要表上有一个唯一约束（例如主键或唯一索引）。冲突解决基于此约束。

---

## [​](#call-rpc-function) 调用 RPC 函数

通过 PostgREST RPC 执行数据库函数。支持所有 HTTP 方法（GET、POST、PUT、PATCH、DELETE）。

```
POST /api/database/rpc/{functionName}
```

### [​](#example-6) 示例

```
# 带参数调用函数
curl -X POST "https://your-app.insforge.app/api/database/rpc/get_user_stats" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "123e4567-e89b-12d3-a456-426614174000"}'

# 不带参数调用函数
curl -X POST "https://your-app.insforge.app/api/database/rpc/get_total_count" \
  -H "Authorization: Bearer your-jwt-token"
```

### [​](#response-6) 响应

```
{
  "total_posts": 42,
  "total_comments": 128,
  "last_activity": "2025-01-15T10:30:00Z"
}
```

---

## [​](#admin-endpoints) 管理端点

以下端点需要管理员认证。

### [​](#headers-for-admin-endpoints) 管理端点的请求头

```
Authorization: Bearer admin-jwt-token-Or-API-Key
Content-Type: application/json
```

---

## [​](#list-database-functions) 列出数据库函数

获取 public 模式中的所有数据库函数。**需要管理员认证。**

```
GET /api/database/functions
```

### [​](#example-7) 示例

```
curl "https://your-app.insforge.app/api/database/functions" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key"
```

### [​](#response-7) 响应

```
[
  {
    "name": "get_user_stats",
    "schema": "public",
    "language": "plpgsql",
    "returnType": "json",
    "arguments": "user_id uuid",
    "definition": "BEGIN ... END;"
  }
]
```

---

## [​](#list-database-indexes) 列出数据库索引

获取所有数据库索引。**需要管理员认证。**

```
GET /api/database/indexes
```

### [​](#example-8) 示例

```
curl "https://your-app.insforge.app/api/database/indexes" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key"
```

### [​](#response-8) 响应

```
[
  {
    "name": "posts_pkey",
    "tableName": "posts",
    "columns": ["id"],
    "isUnique": true,
    "isPrimary": true,
    "definition": "CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id)"
  }
]
```

---

## [​](#list-rls-policies) 列出 RLS 策略

获取所有行级安全策略。**需要管理员认证。**

```
GET /api/database/policies
```

### [​](#example-9) 示例

```
curl "https://your-app.insforge.app/api/database/policies" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key"
```

### [​](#response-9) 响应

```
[
  {
    "name": "用户可查看自己的帖子",
    "tableName": "posts",
    "command": "SELECT",
    "roles": ["authenticated"],
    "using": "(auth.uid() = user_id)",
    "withCheck": null
  }
]
```

---

## [​](#list-database-triggers) 列出数据库触发器

获取所有数据库触发器。**需要管理员认证。**

```
GET /api/database/triggers
```

### [​](#example-10) 示例

```
curl "https://your-app.insforge.app/api/database/triggers" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key"
```

### [​](#response-10) 响应

```
[
  {
    "name": "update_timestamp",
    "tableName": "posts",
    "timing": "BEFORE",
    "events": ["UPDATE"],
    "functionName": "update_updated_at_column",
    "enabled": true
  }
]
```

---

## [​](#list-database-migrations) 列出数据库迁移

获取成功自定义迁移的历史记录。InsForge 将这些存储在 `system.custom_migrations` 中，但端点只返回迁移元数据和已执行的语句。**需要管理员认证。**

```
GET /api/database/migrations
```

### [​](#example-11) 示例

```
curl "https://your-app.insforge.app/api/database/migrations" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key"
```

### [​](#response-11) 响应

```
{
  "migrations": [
    {
      "version": "20260416170500",
      "name": "create-posts-table",
      "statements": [
        "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
      ],
      "createdAt": "2026-04-16T17:05:00.000Z"
    }
  ]
}
```

---

## [​](#create-database-migration) 创建数据库迁移

创建并立即对数据库执行自定义迁移。仅当每个语句都成功时，才会记录迁移。**需要管理员认证。**

```
POST /api/database/migrations
```

### [​](#request-body) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `version` | string | 是 | 数字迁移版本（最多 64 位）。接受 Drizzle 风格的顺序前缀（例如 `0001`）或 `YYYYMMDDHHmmss` 时间戳。版本按数字比较。InsForge CLI 为本地迁移文件名生成 14 位 UTC 时间戳。 |
| `name` | string | 是 | 迁移名称，仅限小写字母、数字和连字符 |
| `sql` | string | 是 | 要解析和执行的 SQL 文本 |

### [​](#example-12) 示例

```
curl -X POST "https://your-app.insforge.app/api/database/migrations" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "20260416170500",
    "name": "create-posts-table",
    "sql": "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
  }'
```

### [​](#response-12) 响应

```
{
  "version": "20260416170500",
  "name": "create-posts-table",
  "statements": [
    "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
  ],
  "createdAt": "2026-04-16T17:05:00.000Z",
  "message": "迁移执行成功"
}
```

不要在自定义迁移中包含 `BEGIN`、`COMMIT` 或 `ROLLBACK`。InsForge 在自己的事务中执行迁移。

---

## [​](#execute-raw-sql-strict-mode) 执行原始 SQL（严格模式）

执行带有严格清理的原始 SQL 查询。阻止访问系统表和 auth.users。**需要管理员认证。**

```
POST /api/database/advance/rawsql
```

### [​](#request-body-2) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `query` | string | 是 | 要执行的 SQL 查询 |
| `params` | array | 否 | 参数化查询的查询参数 |

### [​](#example-13) 示例

```
curl -X POST "https://your-app.insforge.app/api/database/advance/rawsql" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT * FROM posts WHERE published = $1",
    "params": [true]
  }'
```

### [​](#response-13) 响应

```
{
  "rows": [
    {
      "id": "248373e1-0aea-45ce-8844-5ef259203749",
      "title": "我的帖子",
      "published": true
    }
  ],
  "rowCount": 1,
  "command": "SELECT"
}
```

---

## [​](#execute-raw-sql-relaxed-mode) 执行原始 SQL（宽松模式）

执行带有宽松清理的原始 SQL 查询。允许 SELECT 和 INSERT 到系统表。**谨慎使用。需要管理员认证。**

```
POST /api/database/advance/rawsql/unrestricted
```

### [​](#request-body-3) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `query` | string | 是 | 要执行的 SQL 查询 |
| `params` | array | 否 | 参数化查询的查询参数 |

### [​](#example-14) 示例

```
curl -X POST "https://your-app.insforge.app/api/database/advance/rawsql/unrestricted" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT * FROM auth.users LIMIT 10"
  }'
```

### [​](#response-14) 响应

```
{
  "rows": [...],
  "rowCount": 10,
  "command": "SELECT"
}
```

此端点具有宽松的限制，可以访问系统表。仅在必要时使用，并确保适当的授权。

---

## [​](#export-database) 导出数据库

以 SQL 或 JSON 格式导出数据库架构和/或数据。**需要管理员认证。**

```
POST /api/database/advance/export
```

### [​](#request-body-4) 请求体

| 字段 | 类型 | 必填 | 默认 | 描述 |
| --- | --- | --- | --- | --- |
| `tables` | array | 否 | all | 要导出的表列表 |
| `format` | string | 否 | sql | 导出格式（`sql` 或 `json`） |
| `includeData` | boolean | 否 | true | 包含表数据 |
| `includeFunctions` | boolean | 否 | false | 包含数据库函数 |
| `includeSequences` | boolean | 否 | false | 包含序列 |
| `includeViews` | boolean | 否 | false | 包含视图 |
| `rowLimit` | integer | 否 | - | 每表最大行数 |

### [​](#example-15) 示例

```
curl -X POST "https://your-app.insforge.app/api/database/advance/export" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key" \
  -H "Content-Type: application/json" \
  -d '{
    "tables": ["posts", "comments"],
    "format": "sql",
    "includeData": true,
    "rowLimit": 1000
  }'
```

### [​](#response-15) 响应

```
{
  "format": "sql",
  "content": "CREATE TABLE posts (...); INSERT INTO posts VALUES (...);",
  "tables": ["posts", "comments"]
}
```

---

## [​](#import-database) 导入数据库

从 SQL 文件导入数据库。**需要管理员认证。**

```
POST /api/database/advance/import
```

### [​](#request-multipart/form-data) 请求（multipart/form-data）

| 字段 | 类型 | 必填 | 默认 | 描述 |
| --- | --- | --- | --- | --- |
| `file` | file | 是 | - | 要导入的 SQL 文件 |
| `truncate` | boolean | 否 | false | 导入前是否清空现有表 |

### [​](#example-16) 示例

```
curl -X POST "https://your-app.insforge.app/api/database/advance/import" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key" \
  -F "file=@backup.sql" \
  -F "truncate=false"
```

### [​](#response-16) 响应

```
{
  "filename": "backup.sql",
  "fileSize": 102400,
  "tables": ["posts", "comments", "users"],
  "rowsImported": 1500
}
```

---

## [​](#bulk-upsert) 批量 Upsert

从 CSV 或 JSON 文件批量插入或更新数据。**需要管理员认证。**

```
POST /api/database/advance/bulk-upsert
```

### [​](#request-multipart/form-data-2) 请求（multipart/form-data）

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `file` | file | 是 | 包含数据的 CSV 或 JSON 文件 |
| `table` | string | 是 | 目标表名 |
| `upsertKey` | string | 否 | 用于 upsert 冲突解决的列名 |

### [​](#example-17) 示例

```
# 从 CSV 导入
curl -X POST "https://your-app.insforge.app/api/database/advance/bulk-upsert" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key" \
  -F "file=@data.csv" \
  -F "table=posts" \
  -F "upsertKey=id"

# 从 JSON 导入
curl -X POST "https://your-app.insforge.app/api/database/advance/bulk-upsert" \
  -H "Authorization: Bearer admin-jwt-token-Or-API-Key" \
  -F "file=@data.json" \
  -F "table=posts"
```

### [​](#response-17) 响应

```
{
  "rowsAffected": 150,
  "totalRecords": 150,
  "table": "posts"
}
```

[REST API](/sdks/rest/overview)[认证 API 参考](/sdks/rest/auth)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)