交换密码重置码以获取重置令牌

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/exchange-reset-password-token \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "code": "123456"
}
'
```

200

```
{
  "token": "<string>",
  "expiresAt": "2023-11-07T05:31:56Z"
}
```

Client

# 交换密码重置码以获取重置令牌

复制页面

两步密码重置流程的步骤 1（仅在 resetPasswordMethod 为 'code' 时使用）：

1. 验证发送到用户邮箱的 6 位验证码
2. 返回可用于实际重置密码的重置令牌

当 resetPasswordMethod 为 'link' 时不使用此端点，因为浏览器重置链接流程直接使用邮件中的链接令牌。

复制页面

POST

/

api

/

auth

/

email

/

exchange-reset-password-token

尝试

交换密码重置码以获取重置令牌

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/exchange-reset-password-token \
  --header 'Content-Type: application/json' \
  --data '
{
  "email": "user@example.com",
  "code": "123456"
}
'
```

200

```
{
  "token": "<string>",
  "expiresAt": "2023-11-07T05:31:56Z"
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

[​](#body-code)

code

string

必需

来自邮件的 6 位数字验证码

格式：`^\d{6}$`

示例：

`"123456"`

#### 响应

200

application/json

验证码验证成功，已返回重置令牌

[​](#response-token)

token

string

用于 reset-password 端点的重置令牌

[​](#response-expires-at)

expiresAt

string<date-time>

令牌过期时间戳

[发送密码重置（根据配置使用验证码或链接）](/api-reference/client/send-password-reset-code-or-link-based-on-config)[通过浏览器链接点击打开密码重置流程](/api-reference/client/open-password-reset-flow-from-browser-link-click)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)