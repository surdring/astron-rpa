通过浏览器链接点击验证邮箱

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/email/verify-link
```

Client

# 通过浏览器链接点击验证邮箱

复制页面

面向浏览器的链接验证流程。

此端点用于用户在电子邮件中点击验证链接。它在后端验证令牌，并将浏览器重定向到存储的、已验证的 `redirectTo` URL，同时附带验证结果。

重定向查询参数：

* 成功：`insforge_status=success&insforge_type=verify_email`
* 错误：`insforge_status=error&insforge_type=verify_email&insforge_error=...`
* `insforge_status`：`success` 或 `error`
* `insforge_type`：始终为 `verify_email`
* `insforge_error`：仅在出错时出现，人类可读的错误消息

建议处理方式：将您的登录页面用作 `redirectTo`。当重定向到达且 `insforge_status=success` 时，显示确认消息并让用户使用邮箱和密码登录。

复制页面

GET

/

api

/

auth

/

email

/

verify-link

尝试

通过浏览器链接点击验证邮箱

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/email/verify-link
```

#### 查询参数

[​](#parameter-token)

token

string

必需

来自电子邮件链接的 64 位邮箱验证令牌

#### 响应

302

浏览器重定向到存储的重定向 URL

[发送邮箱验证（根据配置使用验证码或链接）](/api-reference/client/send-email-verification-code-or-link-based-on-config)[通过验证码验证邮箱](/api-reference/client/verify-email-with-code)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)