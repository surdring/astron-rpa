## 本页内容

* [通道](#channels)
* [功能特性](#features)
  + [统一 API，所有通道](#one-api-every-channel)
  + [托管投递或自带服务](#managed-delivery-or-bring-your-own)
  + [模板](#templates)
  + [投递追踪](#delivery-tracking)
  + [速率限制](#rate-limits)
* [概念](#concepts)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

消息

# 消息

复制页面

从你的项目发送事务性消息。目前支持邮件，短信和推送通知已在路线图中。

复制页面

InsForge Messaging 从你的项目发送事务性通知：收据、摘要、密码重置验证码、通知汇总——任何你原本需要接入 SendGrid、Postmark 或 Twilio 才能完成的事情。邮件是第一个通道；短信和推送已在路线图中，并将共享相同的 API 接口。

**只需要发送认证邮件？** 魔法链接、验证码和密码重置已直接集成到[身份认证](/core-concepts/authentication/overview)中。你只需要在需要发送认证之外的事务性消息时才使用此产品。

## [​](#channels) 通道

## 邮件

托管 SMTP 或自带服务提供商。支持模板、投递追踪和 Webhook 事件。

## 短信

即将推出。相同的 API，后台使用 Twilio 或 Sinch。

## 推送通知

即将推出。通过单一端点支持 APNs 和 FCM。

## [​](#features) 功能特性

### [​](#one-api-every-channel) 统一 API，所有通道

目前邮件的 `emails.send()` 接口，短信和推送上线后也将使用相同的格式。切换通道只需更改字段，无需重写代码。

### [​](#managed-delivery-or-bring-your-own) 托管投递或自带服务

通过 InsForge Cloud（目前邮件使用 AWS SES）发送，无需任何配置；或在需要控制投递能力和发件人信誉时接入自己的服务提供商。参见[自定义 SMTP](/core-concepts/messaging/custom-smtp)。

### [​](#templates) 模板

按名称选择模板，传递变量，InsForge 会渲染并发送。模板可按项目编辑；四个认证模板（`email-verification-*`、`reset-password-*`）已提供合理的默认值。

### [​](#delivery-tracking) 投递追踪

每条消息都会记录发送事件（`accepted` 已接受、`delivered` 已投递、`bounced` 已退回、`complained` 已投诉）。在 Postgres 中查询审计表，通过 Webhook 订阅，或在仪表盘中查看。

### [​](#rate-limits) 速率限制

按项目和按计划的限制可防止失控循环破坏投递能力。可在仪表盘配置，在网关强制执行。

## [​](#concepts) 概念

## 自定义 SMTP

自带 SMTP 服务提供商（SendGrid、Postmark、AWS SES 等）。

## [​](#build-with-it) 构建应用

## TypeScript SDK

从 Node、浏览器和边缘运行时发送邮件。

## REST API

纯 HTTP 消息端点，可从任何语言调用。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 以关联你的项目（推荐方式）。
* 浏览 [TypeScript SDK 参考](/sdks/typescript/email) 了解发送模式。

[概览](/core-concepts/sites/overview)[自定义 SMTP](/core-concepts/messaging/custom-smtp)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)