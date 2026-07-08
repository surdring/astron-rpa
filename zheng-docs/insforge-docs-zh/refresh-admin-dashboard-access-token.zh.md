刷新管理员仪表盘访问令牌

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/refresh \
  --header 'X-CSRF-Token: <x-csrf-token>'
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

# 刷新管理员仪表盘访问令牌

复制页面

使用仅仪表盘的 httpOnly `insforge_admin_refresh_token` cookie 和 `X-CSRF-Token` 请求头。

复制页面

POST

/

api

/

auth

/

admin

/

refresh

尝试

刷新管理员仪表盘访问令牌

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/refresh \
  --header 'X-CSRF-Token: <x-csrf-token>'
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

#### 请求头

[​](#parameter-x-csrf-token)

X-CSRF-Token

string

required

从管理员登录或管理员刷新返回的 CSRF 令牌

#### 响应

200

application/json

管理员令牌刷新成功

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

用于下一次管理员刷新请求的 CSRF 令牌

[交换云提供商授权码以获取管理员会话](/api-reference/admin/exchange-cloud-provider-authorization-code-for-admin-session)[登出管理员仪表盘会话](/api-reference/admin/logout-admin-dashboard-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)