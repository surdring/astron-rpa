交换云提供商授权码以获取管理员会话

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/sessions/exchange \
  --header 'Content-Type: application/json' \
  --data '
{
  "code": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
'
```

200

400

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

# 交换云提供商授权码以获取管理员会话

复制页面

验证来自 Insforge 云平台的授权码/JWT，并颁发具有 project\_admin 角色的内部管理员会话令牌

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

/

exchange

尝试

交换云提供商授权码以获取管理员会话

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/sessions/exchange \
  --header 'Content-Type: application/json' \
  --data '
{
  "code": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
'
```

200

400

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

[​](#body-code)

code

string

required

来自 Insforge 的授权码或 JWT

示例：

`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`

#### 响应

200

application/json

云授权已验证，管理员会话已创建

[​](#response-project-admin)

projectAdmin

object

显示子属性

[​](#response-access-token)

accessToken

string

用于管理员认证的内部 JWT

[​](#response-csrf-token)

csrfToken

string

用于 `/api/auth/admin/refresh` 的 CSRF 令牌

[管理员登录](/api-reference/admin/admin-login)[刷新管理员仪表盘访问令牌](/api-reference/admin/refresh-admin-dashboard-access-token)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)