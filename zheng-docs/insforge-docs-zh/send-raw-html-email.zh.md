发送原始 HTML 邮件

cURL

```
curl --request POST \
  --url https://api.example.com/api/email/send-raw \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "to": "user@example.com",
  "subject": "Welcome to our platform",
  "html": "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
  "cc": "jsmith@example.com",
  "bcc": "jsmith@example.com",
  "from": "My App",
  "replyTo": "support@example.com"
}
'
```

200

400

401

403

500

```
{}
```

Client

# 发送原始 HTML 邮件

复制页面

向一个或多个收件人发送自定义 HTML 邮件。需要用户认证。

复制页面

POST

/

api

/

email

/

send-raw

尝试

发送原始 HTML 邮件

cURL

```
curl --request POST \
  --url https://api.example.com/api/email/send-raw \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "to": "user@example.com",
  "subject": "Welcome to our platform",
  "html": "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
  "cc": "jsmith@example.com",
  "bcc": "jsmith@example.com",
  "from": "My App",
  "replyTo": "support@example.com"
}
'
```

200

400

401

403

500

```
{}
```

#### 认证

[​](#authorization-authorization)

Authorization

string

header

必需

Bearer 认证请求头，格式为 `Bearer <token>`，其中 `<token>` 是您的认证令牌。

#### 请求体

application/json

[​](#body-to-one-of-0)

to

string<email>string<email>[]string<email>string<email>[]

必需

收件人邮箱地址 - 最多 50 个收件人

示例：

`"user@example.com"`

[​](#body-subject)

subject

string

必需

邮件主题行

必需字符串长度：`1 - 500`

示例：

`"Welcome to our platform"`

[​](#body-html)

html

string

必需

邮件正文的 HTML 内容

最小字符串长度：`1`

示例：

`"<h1>Welcome!</h1><p>Thank you for joining us.</p>"`

[​](#body-cc-one-of-0)

cc

string<email>string<email>[]string<email>string<email>[]

抄送收件人 - 最多 50 个收件人

[​](#body-bcc-one-of-0)

bcc

string<email>string<email>[]string<email>string<email>[]

密送收件人 - 最多 50 个收件人

[​](#body-from)

from

string

自定义发件人名称（未提供时使用默认值）

最大字符串长度：`100`

示例：

`"My App"`

[​](#body-reply-to)

replyTo

string<email>

回复邮箱地址

示例：

`"support@example.com"`

#### 响应

200

application/json

邮件发送成功

成功时返回空对象 - 后续可根据需要扩展可选字段

[更新 Realtime 配置](/api-reference/configuration/update-realtime-config)[创建 Stripe Checkout 会话](/api-reference/stripe-payments/create-stripe-checkout-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)