创建表

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/tables \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "tableName": "<string>",
  "columns": [
    {
      "name": "<string>",
      "nullable": true,
      "unique": true,
      "defaultValue": "<string>"
    }
  ],
  "foreignKeys": [
    {
      "referenceTable": "<string>",
      "referenceColumns": [
        {
          "sourceColumn": "<string>",
          "referenceColumn": "<string>"
        }
      ],
      "constraintName": "<string>"
    }
  ],
  "rlsEnabled": false
}
'
```

201

400

422

```
{
  "message": "Table created successfully",
  "tableName": "posts"
}
```

Admin

# 创建表

复制页面

复制页面

POST

/

api

/

database

/

tables

尝试

创建表

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/tables \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "tableName": "<string>",
  "columns": [
    {
      "name": "<string>",
      "nullable": true,
      "unique": true,
      "defaultValue": "<string>"
    }
  ],
  "foreignKeys": [
    {
      "referenceTable": "<string>",
      "referenceColumns": [
        {
          "sourceColumn": "<string>",
          "referenceColumn": "<string>"
        }
      ],
      "constraintName": "<string>"
    }
  ],
  "rlsEnabled": false
}
'
```

201

400

422

```
{
  "message": "Table created successfully",
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

#### 请求体

application/json

[​](#body-table-name)

tableName

string

required

[​](#body-columns)

columns

object[]

required

显示子属性

[​](#body-foreign-keys)

foreignKeys

object[]

表级外键约束

显示子属性

[​](#body-rls-enabled)

rlsEnabled

boolean

默认值:false

在表上启用行级安全

#### 响应

201

application/json

表已创建

[​](#response-message)

message

string

[​](#response-table-name)

table\_name

string

[列出表](/api-reference/admin/list-tables)[获取表结构](/api-reference/admin/get-table-schema)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)