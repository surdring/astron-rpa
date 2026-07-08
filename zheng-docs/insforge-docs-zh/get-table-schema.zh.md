获取表结构

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/tables/{tableName}/schema \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "tableName": "posts",
  "columns": [
    {
      "name": "id",
      "type": "uuid",
      "nullable": false,
      "unique": true,
      "default": "gen_random_uuid()",
      "isPrimaryKey": true
    },
    {
      "name": "title",
      "type": "string",
      "nullable": false,
      "unique": false,
      "default": null,
      "isPrimaryKey": false
    },
    {
      "name": "userId",
      "type": "uuid",
      "nullable": false,
      "unique": false,
      "default": null,
      "isPrimaryKey": false
    }
  ],
  "foreignKeys": [
    {
      "constraintName": "fk_userId_auth_users_id",
      "referenceTable": "auth.users",
      "referenceColumns": [
        {
          "sourceColumn": "userId",
          "referenceColumn": "id"
        }
      ],
      "onDelete": "CASCADE",
      "onUpdate": "CASCADE"
    }
  ]
}
```

Admin

# 获取表结构

复制页面

复制页面

GET

/

api

/

database

/

tables

/

{tableName}

/

schema

尝试

获取表结构

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/tables/{tableName}/schema \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "tableName": "posts",
  "columns": [
    {
      "name": "id",
      "type": "uuid",
      "nullable": false,
      "unique": true,
      "default": "gen_random_uuid()",
      "isPrimaryKey": true
    },
    {
      "name": "title",
      "type": "string",
      "nullable": false,
      "unique": false,
      "default": null,
      "isPrimaryKey": false
    },
    {
      "name": "userId",
      "type": "uuid",
      "nullable": false,
      "unique": false,
      "default": null,
      "isPrimaryKey": false
    }
  ],
  "foreignKeys": [
    {
      "constraintName": "fk_userId_auth_users_id",
      "referenceTable": "auth.users",
      "referenceColumns": [
        {
          "sourceColumn": "userId",
          "referenceColumn": "id"
        }
      ],
      "onDelete": "CASCADE",
      "onUpdate": "CASCADE"
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

#### 路径参数

[​](#parameter-table-name)

tableName

string

required

#### 响应

200

application/json

表结构

[​](#response-table-name)

table\_name

string

[​](#response-columns)

columns

object[]

显示子属性

[​](#response-foreign-keys)

foreignKeys

object[]

表级外键约束（每个约束一个条目）

显示子属性

[创建表](/api-reference/admin/create-table)[更新表结构](/api-reference/admin/update-table-schema)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)