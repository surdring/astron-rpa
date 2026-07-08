使用令牌重置密码

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/reset-password \
  --header 'Content-Type: application/json' \
  --data '
{
  "newPassword": "newSecurePassword123",
  "otp": "a1b2c3d4..."
}
'
```

200

```
{
  "message": "Password reset successfully"
}
```

Client

# 使用令牌重置密码

复制页面

使用令牌重置用户密码。令牌可以是：

* 魔法链接令牌（当方法为 'link' 时，来自 send-reset-password 的 64 位十六进制令牌）
* 重置令牌（当方法为 'code' 时，来自 exchange-reset-password-token 验证码验证后）

两种令牌类型都使用 RESET\_PASSWORD 用途，验证方式相同。

流程总结：

* 验证码方法：send-reset-password → exchange-reset-password-token → reset-password（使用 resetToken）
* 链接方法：send-reset-password → GET /api/auth/email/reset-password-link → reset-password

复制页面

POST

/

api

/

auth

/

email

/

reset-password

尝试

使用令牌重置密码

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/email/reset-password \
  --header 'Content-Type: application/json' \
  --data '
{
  "newPassword": "newSecurePassword123",
  "otp": "a1b2c3d4..."
}
'
```

200

```
{
  "message": "Password reset successfully"
}
```

#### 请求体

application/json

[​](#body-new-password)

newPassword

string

必需

满足配置要求的新密码

示例：

`"newSecurePassword123"`

[​](#body-otp)

otp

string

必需

重置令牌（来自魔法链接或来自 exchange-reset-password-token 端点）

示例：

`"a1b2c3d4..."`

#### 响应

200

application/json

密码重置成功

[​](#response-message)

message

string

示例：

`"Password reset successfully"`

[通过浏览器链接点击打开密码重置流程](/api-reference/client/open-password-reset-flow-from-browser-link-click)[发起 OAuth 流程 (PKCE)](/api-reference/client/initiate-oauth-flow-pkce)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)