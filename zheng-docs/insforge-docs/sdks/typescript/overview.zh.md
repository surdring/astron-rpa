## 本页内容

* [安装](#installation)
* [快速开始](#quick-start)
* [功能特性](#features)
* [SDK 参考](#sdk-reference)

TypeScript

# TypeScript SDK

复制页面

InsForge 官方 TypeScript/JavaScript SDK

复制页面

InsForge TypeScript SDK 提供了一个类型安全的客户端，用于从 JavaScript 和 TypeScript 应用程序与 InsForge 服务进行交互。

## [​](#installation) 安装

npm

yarn

pnpm

```
npm install @insforge/sdk@latest
```

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'  // 可选：用于公共/未认证请求
});
```

## [​](#quick-start) 快速开始

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'  // 可选：用于公共/未认证请求
});
```

## [​](#features) 功能特性

* **数据库** - 基于 PostgREST 的类型安全 CRUD 操作
* **认证** - 邮箱/密码和 OAuth 认证
* **存储** - 文件上传、下载和管理
* **函数** - 调用无服务器边缘函数
* **AI** - 聊天补全和图像生成
* **实时** - 基于 WebSocket 的发布/订阅消息
* **支付** - 提供商范围的 Stripe 和 Razorpay 支付辅助工具

## [​](#sdk-reference) SDK 参考

## 数据库

CRUD 操作、过滤器和查询

## 认证

注册、登录、OAuth 和用户管理

## 存储

文件上传、下载和管理

## 函数

调用无服务器边缘函数

## AI

聊天补全和图像生成

## 实时

WebSocket 发布/订阅消息

## 支付

提供商范围的 Stripe 和 Razorpay 支付辅助工具

[数据库 SDK 参考](/sdks/typescript/database)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)