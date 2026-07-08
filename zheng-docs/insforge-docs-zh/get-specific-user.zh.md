获取特定用户

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/users/{userId} \
  --header 'Authorization: Bearer <token>'
```

200

```
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
```

Admin

# 获取特定用户

复制页面

通过 ID 获取用户详情（仅管理员）

复制页面

GET

/

api

/

auth

/

users

/

{userId}

尝试

获取特定用户

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/users/{userId} \
  --header 'Authorization: Bearer <token>'
```

200

```
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
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 路径参数

[​](#parameter-user-id)

userId

string<uuid>

required

用户 ID

#### 响应

200

application/json

用户详情

[​](#response-id)

id

string<uuid>

[​](#response-email)

email

string<email>

[​](#response-profile-one-of-0)

profile

object | null

用户资料数据（name、avatar\_url 和自定义字段）

显示子属性

[​](#response-metadata-one-of-0)

metadata

object | null

系统元数据（设备 ID、登录 IP 等）

[​](#response-email-verified)

emailVerified

boolean

[​](#response-providers)

providers

string[]

[​](#response-created-at)

createdAt

string<date-time>

[​](#response-updated-at)

updatedAt

string<date-time>

[删除用户（仅管理员）](/api-reference/admin/delete-users-admin-only)[管理员登录](/api-reference/admin/admin-login)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)