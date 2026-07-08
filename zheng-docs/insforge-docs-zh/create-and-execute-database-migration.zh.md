创建并执行数据库迁移

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/migrations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "version": "20260416170500",
  "name": "create_posts_table",
  "sql": "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
}
'
```

201

示例

```
{
  "version": "20260416170500",
  "name": "create_posts_table",
  "statements": [
    "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
  ],
  "createdAt": "2026-04-16T17:05:00.000Z",
  "message": "Migration executed successfully"
}
```

Admin

# 创建并执行数据库迁移

复制页面

复制页面

POST

/

api

/

database

/

migrations

尝试

创建并执行数据库迁移

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/migrations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "version": "20260416170500",
  "name": "create_posts_table",
  "sql": "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
}
'
```

201

示例

```
{
  "version": "20260416170500",
  "name": "create_posts_table",
  "statements": [
    "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
  ],
  "createdAt": "2026-04-16T17:05:00.000Z",
  "message": "Migration executed successfully"
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

#### 请求体

application/json

[​](#body-version)

version

string

required

数字迁移版本。接受 Drizzle 风格的顺序前缀（例如 `0001`）或 `YYYYMMDDHHmmss` 时间戳。版本按数字比较。

最大字符串长度：`64`

模式：`^\d{1,64}$`

[​](#body-name)

name

string

required

迁移名称

最小字符串长度：`1`

[​](#body-sql)

sql

string

required

要解析并立即执行的 SQL 文本

最小字符串长度：`1`

#### 响应

201

application/json

迁移执行并记录成功

[​](#response-version)

version

string

required

模式：`^\d{1,64}$`

[​](#response-name)

name

string

required

[​](#response-statements)

statements

string[]

required

[​](#response-created-at)

createdAt

string<date-time>

required

[​](#response-message)

message

string

required

[列出数据库迁移](/api-reference/admin/list-database-migrations)[获取公共认证配置](/api-reference/client/get-public-authentication-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)