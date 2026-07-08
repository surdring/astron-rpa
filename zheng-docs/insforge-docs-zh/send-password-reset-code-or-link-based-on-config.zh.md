发送密码重置（根据配置使用验证码或链接）

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/send-reset-password \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "redirectTo": "<string>"
}
'
```

202

```
{
  "success": true,
  "message": "If your email is registered, we have sent you a password reset code/link. Please check your inbox."
}
```

Client

# 发送密码重置（根据配置使用验证码或链接）

复制页面

使用认证设置中配置的方法（resetPasswordMethod）发送密码重置邮件。当方法为 'code' 时，发送 6 位数字验证码用于两步流程。当方法为 'link' 时，发送浏览器重置链接，该链接首先经过 InsForge 后端端点。即使邮箱不存在也返回成功，以防止用户枚举。

复制页面

POST

/

api

/

auth

/

email

/

send-reset-password

尝试

发送密码重置（根据配置使用验证码或链接）

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/send-reset-password \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "redirectTo": "<string>"
}
'
```

202

```
{
  "success": true,
  "message": "If your email is registered, we have sent you a password reset code/link. Please check your inbox."
}
```

#### 请求体

application/json

[​](#body-email)

email

string<email>

必需

示例：

`"user@example.com"`

[​](#body-redirect-to)

redirectTo

string<uri>

用于基于链接的密码重置。电子邮件链接始终先打开 InsForge 后端端点；然后 InsForge 将浏览器重定向到此 URL，并在查询字符串中附带重置令牌。此 URL 必须包含在 allowedRedirectUrls 中。建议使用您的应用的专用密码重置页面。

#### 响应

202

application/json

密码重置邮件已发送（如果邮箱存在）。消息根据配置的方法而变化。

[​](#response-success)

success

boolean

[​](#response-message)

message

string

示例：

`"If your email is registered, we have sent you a password reset code/link. Please check your inbox."`

[通过验证码验证邮箱](/api-reference/client/verify-email-with-code)[交换密码重置码以获取重置令牌](/api-reference/client/exchange-reset-password-code-for-reset-token)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)