管理员登录

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/sessions \
  --header 'Content-Type: application/json' \
  --data '
{
  "username": "admin",
  "password": "<string>"
}
'
```

200

```
{
  "projectAdmin": {
    "subject": "local:admin",
    "username": "admin"
  },
  "accessToken": "<string>",
  "csrfToken": "<string>"
}
```

Admin

# 管理员登录

复制页面

认证管理员用户以访问仪表盘

复制页面

POST

/

api

/

auth

/

admin

/

sessions

尝试

管理员登录

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/sessions \
  --header 'Content-Type: application/json' \
  --data '
{
  "username": "admin",
  "password": "<string>"
}
'
```

200

```
{
  "projectAdmin": {
    "subject": "local:admin",
    "username": "admin"
  },
  "accessToken": "<string>",
  "csrfToken": "<string>"
}
```

#### 请求体

application/json

[​](#body-username)

username

string

required

示例：

`"admin"`

[​](#body-password)

password

string

required

#### 响应

200

application/json

管理员登录成功

[​](#response-project-admin)

projectAdmin

object

显示子属性

[​](#response-access-token)

accessToken

string

[​](#response-csrf-token)

csrfToken

string

用于 `/api/auth/admin/refresh` 的 CSRF 令牌

[获取特定用户](/api-reference/admin/get-specific-user)[交换云提供商授权码以获取管理员会话](/api-reference/admin/exchange-cloud-provider-authorization-code-for-admin-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)