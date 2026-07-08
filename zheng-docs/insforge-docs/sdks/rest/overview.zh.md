## On this page

* [基础 URL](#base-url)
* [认证](#authentication)
  + [Bearer Token](#bearer-token)
* [快速开始](#quick-start)
* [响应格式](#response-format)
  + [成功响应](#success-response)
  + [错误响应](#error-response)
* [常见 HTTP 状态码](#common-http-status-codes)
* [功能特性](#features)
* [API 参考](#api-reference)

REST API

# REST API

Copy page

直接通过 HTTP API 访问 InsForge 服务

Copy page

InsForge REST API 提供对所有 InsForge 服务的直接 HTTP 访问。当您需要在没有官方 SDK 的语言或平台上集成时，请使用此 API。

## [​](#base-url) 基础 URL

```
https://your-app.insforge.app
```

## [​](#authentication) 认证

所有 API 请求都需要通过 `Authorization` 请求头进行认证：

### [​](#bearer-token) Bearer Token

```
Authorization: Bearer your-jwt-token-or-anon-key
```

## [​](#quick-start) 快速开始

```
# 注册新用户
curl -X POST https://your-app.insforge.app/api/auth/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword123"}'

# 登录并获取令牌
curl -X POST https://your-app.insforge.app/api/auth/sessions \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword123"}'

# 使用令牌进行已认证请求
curl https://your-app.insforge.app/api/database/records/posts \
  -H "Authorization: Bearer your-jwt-token"
```

## [​](#response-format) 响应格式

### [​](#success-response) 成功响应

数据直接返回在响应体中：

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### [​](#error-response) 错误响应

```
{
  "error": "ERROR_CODE",
  "message": "人类可读的错误消息",
  "statusCode": 400,
  "nextActions": "解决错误的建议操作"
}
```

## [​](#common-http-status-codes) 常见 HTTP 状态码

| 状态码 | 描述 |
| --- | --- |
| `200` | 成功 |
| `201` | 已创建 |
| `204` | 无内容（用于 DELETE） |
| `400` | 错误请求 - 无效输入 |
| `401` | 未授权 - 令牌无效或缺失 |
| `403` | 禁止 - 权限不足 |
| `404` | 未找到 |
| `409` | 冲突 - 资源已存在 |
| `500` | 服务器内部错误 |

## [​](#features) 功能特性

* **数据库** - PostgREST 风格的 CRUD 操作
* **认证** - 邮箱/密码和 OAuth 认证
* **存储** - 文件上传、下载和管理
* **函数** - 调用 serverless 边缘函数
* **AI** - 聊天补全和图像生成
* **Realtime** - 频道管理和消息历史（WebSocket 用于实时）

## [​](#api-reference) API 参考

## 数据库

CRUD 操作、过滤器和查询

## 认证

注册、登录、OAuth 和用户管理

## 存储

文件上传、下载和管理

## 函数

调用 serverless 边缘函数

## AI

聊天补全和图像生成

## Realtime

频道管理和消息历史

[Realtime SDK 参考](/sdks/kotlin/realtime)[数据库 API 参考](/sdks/rest/database)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)