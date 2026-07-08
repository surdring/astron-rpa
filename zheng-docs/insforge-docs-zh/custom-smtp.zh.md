## 本页内容

* [概念](#concepts)
* [使用方法](#usage)
* [邮件模板](#email-templates)
* [注意事项](#considerations)
* [更多资源](#more-resources)

消息

# 自定义 SMTP

复制页面

通过你自己的 SMTP 服务器路由所有外发邮件

复制页面

启用后，所有邮件（认证流程和 `emails.send()` 调用）都将通过你的 SMTP 服务器路由。关闭开关可恢复默认设置；凭据会被保留。

## [​](#concepts) 概念

每次发送时都会解析提供商配置，因此保存的配置会在下一次请求时生效。InsForge 在保存前会运行 `transporter.verify()`，因此持久化的配置始终有效。密码使用 AES-256-GCM 加密存储，API 永远不会返回密码原文。

## [​](#usage) 使用方法

在**认证 → 邮件**下配置 SMTP。

1

启用自定义 SMTP

在 **SMTP 提供商** 卡片上打开开关。

2

输入凭据

主机、端口（`25`、`465`、`587`、`2525`）、用户名、密码、发件人邮箱、发件人名称。私有 IP 和自签名证书会被拒绝。

3

保存

InsForge 在持久化之前会运行 SMTP 握手。错误的凭据会快速失败。

4

编辑模板（可选）

**邮件模板** 卡片会解锁四个认证模板。

`From:` 头部始终是你配置的发件人地址。SDK 调用者无法伪造。

## [​](#email-templates) 邮件模板

模板从 `email.templates` 本地渲染。变量使用 `{{ variable }}` 语法，并会进行 HTML 转义。

| 模板 | 发送时机 |
| --- | --- |
| `email-verification-code` | 新用户验证，使用 6 位验证码 |
| `email-verification-link` | 新用户验证，使用可点击链接 |
| `reset-password-code` | 密码重置，使用 6 位验证码 |
| `reset-password-link` | 密码重置，使用可点击链接 |

变量：`{{ token }}`（验证码模板）、`{{ link }}`（链接模板，必须以 `http://` 或 `https://` 开头）、`{{ name }}` 和 `{{ email }}`（所有模板）。

## [​](#considerations) 注意事项

* **速率限制。** **最小间隔（秒）** 限制每个收件人的发送频率。冷却期内的发送返回 HTTP `429`。默认为 `60`；设为 `0` 则禁用。
* **SSRF 防护。** 私有地址、回环地址、链路本地地址和运营商级 NAT 地址段会被拒绝。
* **审计日志。** 配置保存记录 `UPDATE_SMTP_CONFIG`；模板编辑记录 `UPDATE_EMAIL_TEMPLATE`。

## [​](#more-resources) 更多资源

* [消息概览](/core-concepts/messaging/overview) 了解路由模型。
* [nodemailer SMTP 传输](https://nodemailer.com/smtp/) 了解连接选项。
* [身份认证概览](/core-concepts/authentication/overview) 了解发送这些邮件的流程。

[概览](/core-concepts/messaging/overview)[概览](/core-concepts/payments/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)