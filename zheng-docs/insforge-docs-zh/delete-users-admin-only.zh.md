删除用户（仅管理员）

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/users \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "userIds": [
    "<string>"
  ]
}
'
```

200

```
{
  "message": "<string>",
  "deletedCount": 123
}
```

Admin

# 删除用户（仅管理员）

复制页面

通过用户 ID 批量删除用户

复制页面

DELETE

/

api

/

auth

/

users

尝试

删除用户（仅管理员）

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/users \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "userIds": [
    "<string>"
  ]
}
'
```

200

```
{
  "message": "<string>",
  "deletedCount": 123
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 请求体

application/json

[​](#body-user-ids)

userIds

string[]

required

#### 响应

200

application/json

用户删除成功

[​](#response-message)

message

string

[​](#response-deleted-count)

deletedCount

integer

[列出所有用户（仅管理员）](/api-reference/admin/list-all-users-admin-only)[获取特定用户](/api-reference/admin/get-specific-user)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)