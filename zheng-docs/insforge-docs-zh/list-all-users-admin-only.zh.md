列出所有用户（仅管理员）

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/users \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "data": [
    {
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "email": "jsmith@example.com",
      "profile": {
        "name": "<string>",
        "avatar_url": "<string>"
      },
      "metadata": {},
      "emailVerified": true,
      "providers": [
        "<string>"
      ],
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "pagination": {
    "offset": 123,
    "limit": 123,
    "total": 123
  }
}
```

Admin

# 列出所有用户（仅管理员）

复制页面

返回带分页的用户列表

复制页面

GET

/

api

/

auth

/

users

尝试

列出所有用户（仅管理员）

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/users \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "data": [
    {
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "email": "jsmith@example.com",
      "profile": {
        "name": "<string>",
        "avatar_url": "<string>"
      },
      "metadata": {},
      "emailVerified": true,
      "providers": [
        "<string>"
      ],
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "pagination": {
    "offset": 123,
    "limit": 123,
    "total": 123
  }
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 查询参数

[​](#parameter-offset)

offset

string

默认值:0

要跳过的记录数

[​](#parameter-limit)

limit

string

默认值:10

返回的最大记录数

[​](#parameter-search)

search

string

按邮箱或名称搜索

#### 响应

200

application/json

用户列表

[​](#response-data)

data

object[]

显示子属性

[​](#response-pagination)

pagination

object

显示子属性

[更新认证配置](/api-reference/admin/update-authentication-configuration)[删除用户（仅管理员）](/api-reference/admin/delete-users-admin-only)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)