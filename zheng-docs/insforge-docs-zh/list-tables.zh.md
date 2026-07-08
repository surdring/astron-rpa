列出表

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/tables \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  "posts",
  "comments",
  "categories"
]
```

Admin

# 列出表

复制页面

复制页面

GET

/

api

/

database

/

tables

尝试

列出表

cURL

```
curl --request GET \
  --url https://api.example.com/api/database/tables \
  --header 'Authorization: Bearer <token>'
```

200

```
[
  "posts",
  "comments",
  "categories"
]
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

表名列表

[创建表](/api-reference/admin/create-table)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)