登出管理员仪表盘会话

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/logout
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

Admin

# 登出管理员仪表盘会话

复制页面

清除仅仪表盘使用的 `insforge_admin_refresh_token` cookie。

复制页面

POST

/

api

/

auth

/

admin

/

logout

尝试

登出管理员仪表盘会话

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/admin/logout
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

#### 响应

200 - application/json

登出成功

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[刷新管理员仪表盘访问令牌](/api-reference/admin/refresh-admin-dashboard-access-token)[获取匿名密钥（已弃用）](/api-reference/admin/get-anon-key-deprecated)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)