发送邮箱验证（根据配置使用验证码或链接）

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/send-verification \
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
  "message": "If your email is registered, we have sent you a verification code/link. Please check your inbox."
}
```

Client

# 发送邮箱验证（根据配置使用验证码或链接）

复制页面

使用认证设置中配置的方法（verifyEmailMethod）发送邮箱验证。当方法为 'code' 时，发送 6 位数字验证码。当方法为 'link' 时，发送浏览器验证链接，该链接首先经过 InsForge 后端端点。即使邮箱不存在也返回成功，以防止用户枚举。

复制页面

POST

/

api

/

auth

/

email

/

send-verification

尝试

发送邮箱验证（根据配置使用验证码或链接）

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/send-verification \
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
  "message": "If your email is registered, we have sent you a verification code/link. Please check your inbox."
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

用于基于链接的邮箱验证。电子邮件链接始终先打开 InsForge 后端端点；令牌验证通过后，InsForge 将浏览器重定向到此 URL。此 URL 必须包含在 allowedRedirectUrls 中。建议使用您的应用的登录页面。

#### 响应

202

application/json

验证邮件已发送（如果邮箱存在）。消息根据配置的方法而变化。

[​](#response-success)

success

boolean

[​](#response-message)

message

string

示例：

`"If your email is registered, we have sent you a verification code/link. Please check your inbox."`

[获取当前会话](/api-reference/client/get-current-session)[通过浏览器链接点击验证邮箱](/api-reference/client/verify-email-from-browser-link-click)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)