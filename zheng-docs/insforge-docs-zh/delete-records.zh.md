删除记录

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

records\_deleted

```
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Deleted Post",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-21T11:00:00Z"
  }
]
```

Client

# 删除记录

复制页面

删除匹配查询过滤条件的记录

复制页面

DELETE

/

api

/

database

/

records

/

{tableName}

尝试

删除记录

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

records\_deleted

```
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Deleted Post",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-21T11:00:00Z"
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

#### 请求头

[​](#parameter-prefer)

Prefer

enum<string>

包含此参数可在响应中返回删除的记录

可用选项：

`return=representation`

#### 路径参数

[​](#parameter-table-name)

tableName

string

必需

表名

#### 查询参数

[​](#parameter-id)

id

string

按 ID 过滤记录（例如 "?id=eq.123e4567-e89b-12d3-a456-426614174000"）

#### 响应

200

application/json

记录已删除（使用 Prefer 请求头时）

[创建记录](/api-reference/client/create-records)[更新记录](/api-reference/client/update-records)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)