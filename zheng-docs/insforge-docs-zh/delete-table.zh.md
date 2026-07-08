删除表

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/database/tables/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "message": "Table deleted successfully",
  "tableName": "posts"
}
```

Admin

# 删除表

复制页面

复制页面

DELETE

/

api

/

database

/

tables

/

{tableName}

尝试

删除表

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/database/tables/{tableName} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "message": "Table deleted successfully",
  "tableName": "posts"
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

#### 路径参数

[​](#parameter-table-name)

tableName

string

required

#### 响应

200

application/json

表已删除

[​](#response-message)

message

string

[​](#response-table-name)

table\_name

string

[更新表结构](/api-reference/admin/update-table-schema)[列出数据库迁移](/api-reference/admin/list-database-migrations)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)