创建记录

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
[
  {
    "title": "My First Post",
    "content": "Hello world! This is my first post.",
    "published": true
  }
]
'
```

201

without\_prefer

```
[]
```

Client

# 创建记录

复制页面

创建一个或多个记录。请求体必须是数组。

复制页面

POST

/

api

/

database

/

records

/

{tableName}

尝试

创建记录

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/records/{tableName} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
[
  {
    "title": "My First Post",
    "content": "Hello world! This is my first post.",
    "published": true
  }
]
'
```

201

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

包含此参数可在响应中返回创建的记录（否则返回空数组）

可用选项：

`return=representation`

#### 路径参数

[​](#parameter-table-name)

tableName

string

必需

表名

#### 请求体

application/json

最小数组长度：`1`

#### 响应

201

application/json

记录已创建

[查询记录](/api-reference/client/query-records)[删除记录](/api-reference/client/delete-records)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)