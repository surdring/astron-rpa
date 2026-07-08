用户注销

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/logout
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

Client

# 用户注销

复制页面

注销并清除刷新令牌 cookie

复制页面

POST

/

api

/

auth

/

logout

尝试

用户注销

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/logout
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

注销成功

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[刷新访问令牌](/api-reference/client/refresh-access-token)[获取当前会话](/api-reference/client/get-current-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)