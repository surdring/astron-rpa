通过浏览器链接点击打开密码重置流程

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/email/reset-password-link
```

Client

# 通过浏览器链接点击打开密码重置流程

复制页面

面向浏览器的密码重置链接流程。

此端点用于用户在电子邮件中点击密码重置链接。它在后端验证令牌，并将浏览器重定向到存储的、已验证的 `redirectTo` URL，同时在查询字符串中附带重置令牌。

重定向查询参数：

* 就绪：`token=...&insforge_status=ready&insforge_type=reset_password`
* 错误：`insforge_status=error&insforge_type=reset_password&insforge_error=...`
* `token`：仅在 `insforge_status=ready` 时出现
* `insforge_status`：`ready` 或 `error`
* `insforge_type`：始终为 `reset_password`
* `insforge_error`：仅在出错时出现，人类可读的错误消息

您的应用应仅在 `insforge_status=ready` 且存在 `token` 时渲染密码重置表单。

复制页面

GET

/

api

/

auth

/

email

/

reset-password-link

尝试

通过浏览器链接点击打开密码重置流程

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/email/reset-password-link
```

#### 查询参数

[​](#parameter-token)

token

string

必需

来自电子邮件链接的 64 位密码重置令牌

#### 响应

302

浏览器重定向到存储的重定向 URL

[交换密码重置码以获取重置令牌](/api-reference/client/exchange-reset-password-code-for-reset-token)[使用令牌重置密码](/api-reference/client/reset-password-with-token)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)