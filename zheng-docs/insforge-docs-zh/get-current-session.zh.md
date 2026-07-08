获取当前会话

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/sessions/current \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "user": {
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
}
```

Client

# 获取当前会话

复制页面

从访问令牌返回当前已认证用户的基本信息。项目管理员令牌返回 projectAdmin 会话对象，而不是 auth.users 行。

此端点本身不会刷新已过期的访问令牌。对于浏览器应用使用 TypeScript SDK，请在启动时调用 `auth.getCurrentUser()`。SDK 会在可以刷新会话时自动使用 httpOnly 刷新 cookie。服务端、移动端和其他非浏览器客户端应显式调用 `/api/auth/refresh`。

复制页面

GET

/

api

/

auth

/

sessions

/

current

尝试

获取当前会话

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/sessions/current \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "user": {
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
}
```

#### 认证

[​](#authorization-authorization)

Authorization

string

header

必需

Bearer 认证请求头，格式为 `Bearer <token>`，其中 `<token>` 是您的认证令牌。

#### 响应

200

application/json

当前会话信息

* 选项 1
* 选项 2

[​](#response-one-of-0-user)

user

object

必需

显示子属性

[用户注销](/api-reference/client/logout-user)[发送邮箱验证（根据配置使用验证码或链接）](/api-reference/client/send-email-verification-code-or-link-based-on-config)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)