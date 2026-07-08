更新记录

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "title": "Updated Post Title",
  "content": "This content has been updated."
}
'
```

200

without\_prefer

```
[]
```

Client

# 更新记录

复制页面

更新匹配查询过滤条件的记录

复制页面

PATCH

/

api

/

database

/

records

/

{tableName}

尝试

更新记录

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "title": "Updated Post Title",
  "content": "This content has been updated."
}
'
```

200

without\_prefer

```
[]
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

包含此参数可在响应中返回更新的记录

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

#### 请求体

application/json

请求体类型为 `object`。

#### 响应

200

application/json

记录已更新

[删除记录](/api-reference/client/delete-records)[列出所有存储桶](/api-reference/admin/list-all-buckets)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)