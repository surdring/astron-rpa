## 本页内容

* [它们如何协同工作](#它们如何协同工作)

入门指南

# 产品

复制页面

所有 InsForge 产品一览。点击任意卡片深入了解。

复制页面

InsForge 提供十款产品，每款产品都通过相同的 REST 接口、相同的 JWT 认证、相同的 MCP 服务器和相同的 SDK 对外暴露。

## 数据库

每个项目都配备 Postgres。支持迁移、分支、pgvector、S3 备份。
每个表都变成类型化的 REST 和 SDK 接口。

## 身份认证

通过同一 API 支持邮箱密码、无密码登录、OAuth 和移动端登录。提供 JWT 会话、行级安全策略、OAuth 服务器模式。

## 存储

兼容 S3 的对象存储，支持签名 URL 和行级策略。
可与 rclone、AWS CLI、Terraform 配合使用。

## 实时通信

通过单一 WebSocket 连接实现数据库变更、广播和在线状态。
订阅和客户端发布都使用 RLS 检查。

## 边缘函数

基于 Deno 的无服务器 TypeScript，支持一流的定时任务。可按需触发、从数据库触发器链式调用，或按 cron 计划运行。

## 模型网关

通过一个 InsForge 管理的密钥访问 OpenRouter 支持的聊天、流式传输和嵌入功能。支持按项目配额和使用量跟踪。

## 站点

将前端部署到 InsForge 管理的托管服务，并自动关联到您的项目后端。

## 消息服务

目前支持事务性邮件；短信和推送通知已在路线图中。统一的 API。

## 支付

支持 Stripe 结账、订阅和客户门户流程。

## 计算

超越边缘函数模型的长期运行服务。

## [​](#它们如何协同工作) 它们如何协同工作

每款产品共享相同的认证身份、相同的行级安全策略，以及面向 AI 智能体的相同 MCP 接口。通过**身份认证**登录的用户会获得一个 JWT，**数据库**、**存储**、**实时通信**和**边缘函数**层都使用该 JWT 来执行相同的访问规则。

## MCP 服务器

连接智能体以读取模式、运行查询和部署代码。

## SDK

支持 TypeScript、Swift、Kotlin 和纯 REST API。

## 自托管

在您自己的基础设施上运行整个技术栈。

[概述](/introduction)[CLI 设置 · 推荐](/quickstart)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)