更新表结构

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/database/tables/{tableName}/schema \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "addColumns": [
    {
      "columnName": "<string>",
      "isNullable": true,
      "isUnique": false,
      "defaultValue": "<string>"
    }
  ],
  "dropColumns": [
    "<string>"
  ],
  "updateColumns": [
    {
      "columnName": "<string>",
      "newColumnName": "<string>",
      "defaultValue": "<string>"
    }
  ],
  "addForeignKeys": [
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
  "dropForeignKeys": [
    "<string>"
  ]
}
'
```

200

示例

```
{
  "message": "Table schema updated successfully",
  "tableName": "posts",
  "operations": [
    "added 2 columns",
    "dropped 1 columns",
    "renamed 1 columns",
    "added 1 foreign keys",
    "dropped 1 foreign keys"
  ]
}
```

Admin

# 更新表结构

复制页面

复制页面

PATCH

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

更新表结构

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/database/tables/{tableName}/schema \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "addColumns": [
    {
      "columnName": "<string>",
      "isNullable": true,
      "isUnique": false,
      "defaultValue": "<string>"
    }
  ],
  "dropColumns": [
    "<string>"
  ],
  "updateColumns": [
    {
      "columnName": "<string>",
      "newColumnName": "<string>",
      "defaultValue": "<string>"
    }
  ],
  "addForeignKeys": [
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
  "dropForeignKeys": [
    "<string>"
  ]
}
'
```

200

示例

```
{
  "message": "Table schema updated successfully",
  "tableName": "posts",
  "operations": [
    "added 2 columns",
    "dropped 1 columns",
    "renamed 1 columns",
    "added 1 foreign keys",
    "dropped 1 foreign keys"
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

#### 请求体

application/json

[​](#body-add-columns)

addColumns

object[]

向表中添加新列

显示子属性

[​](#body-drop-columns)

dropColumns

string[]

从表中删除列

要删除的列名

[​](#body-update-columns)

updateColumns

object[]

修改现有列（重命名或更改默认值）

显示子属性

[​](#body-add-foreign-keys)

addForeignKeys

object[]

添加外键约束（每个约束一个条目；复合键列出多个列映射）

显示子属性

[​](#body-drop-foreign-keys)

dropForeignKeys

string[]

要删除的外键约束名称

要删除的外键约束名称

[​](#body-rename-table)

renameTable

object

重命名表

显示子属性

#### 响应

200

application/json

表结构更新成功

[​](#response-message)

message

string

成功消息

[​](#response-table-name)

tableName

string

更新后的表名

[​](#response-operations)

operations

string[]

执行的操作列表

[获取表结构](/api-reference/admin/get-table-schema)[删除表](/api-reference/admin/delete-table)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)