获取数据库元数据

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/database \
  --header 'Authorization: Bearer <token>'
```

200

401

```
{
  "tables": [
    {
      "name": "posts",
      "recordCount": 5678
    },
    {
      "name": "comments",
      "recordCount": 9012
    }
  ],
  "totalTables": 15,
  "totalRecords": 16924,
  "databaseSize": "125 MB",
  "lastUpdated": "2024-01-21T10:30:00Z"
}
```

Admin

# 获取数据库元数据

复制页面

获取数据库统计信息和表信息，用于仪表盘展示

复制页面

GET

/

api

/

metadata

/

database

尝试

获取数据库元数据

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata/database \
  --header 'Authorization: Bearer <token>'
```

200

401

```
{
  "tables": [
    {
      "name": "posts",
      "recordCount": 5678
    },
    {
      "name": "comments",
      "recordCount": 9012
    }
  ],
  "totalTables": 15,
  "totalRecords": 16924,
  "databaseSize": "125 MB",
  "lastUpdated": "2024-01-21T10:30:00Z"
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

200

application/json

数据库元数据

[​](#response-tables)

tables

object[]

显示子属性

[​](#response-total-tables)

totalTables

integer

[​](#response-total-records)

totalRecords

integer

[​](#response-database-size)

databaseSize

string

[​](#response-last-updated)

lastUpdated

string<date-time>

[获取应用元数据](/api-reference/admin/get-app-metadata)[获取 API 密钥](/api-reference/admin/get-api-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)