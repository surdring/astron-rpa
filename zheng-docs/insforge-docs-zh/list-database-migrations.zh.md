列出数据库迁移

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/migrations \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "migrations": [
    {
      "version": "20260416170500",
      "name": "create_posts_table",
      "statements": [
        "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
      ],
      "createdAt": "2026-04-16T17:05:00.000Z"
    }
  ]
}
```

Admin

# 列出数据库迁移

复制页面

复制页面

GET

/

api

/

database

/

migrations

尝试

列出数据库迁移

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/migrations \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "migrations": [
    {
      "version": "20260416170500",
      "name": "create_posts_table",
      "statements": [
        "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
      ],
      "createdAt": "2026-04-16T17:05:00.000Z"
    }
  ]
}
```

#### 授权

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 响应

200 - application/json

列出成功的自定义迁移

[​](#response-migrations)

migrations

object[]

required

显示子属性

[删除表](/api-reference/admin/delete-table)[创建并执行数据库迁移](/api-reference/admin/create-and-execute-database-migration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)