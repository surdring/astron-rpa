## 本页内容

* [功能特性](#features)
  + [表即 API](#tables-as-apis)
  + [迁移](#migrations)
  + [分支](#branching)
  + [pgvector](#pgvector)
  + [行级安全](#row-level-security)
* [概念](#concepts)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

数据库

# 数据库

复制页面

使用 InsForge 管理你的数据。

复制页面

每个 InsForge 项目都附带一个完整的 [Postgres](https://www.postgresql.org/) 数据库。每个表都会自动成为类型化的 REST 和 SDK 端点。认证 token 通过行级安全策略限定每次读写操作。同一个 Postgres 同时处理关系查询、通过 pgvector 的语义搜索和实时变更推送。

![InsForge 仪表盘表编辑器，展示带有类型化列的 messages 表](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/database-table-editor.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=10bf2755b0be3e8a27e975e22a3e3790)

**需要文件存储？** 使用 [Storage](/core-concepts/storage/overview) 存储图片、PDF 和其他二进制内容。数据库存储行；存储存储对象。

## [​](#features) 功能特性

### [​](#tables-as-apis) 表即 API

定义一个表后，你立即获得 REST 端点以及类型化的 SDK 客户端。无需代码生成步骤。auth JWT 通过 RLS 限定每次查询。

### [​](#migrations) 迁移

按顺序追踪和应用 SQL 变更。[迁移](/core-concepts/database/migrations)以纯 `.sql` 文件形式存放在仓库中，通过 `npx @insforge/cli db migrations up --all` 或 MCP 工具应用。

### [​](#branching) 分支

启动一个隔离的数据库分支，在生产数据副本上测试有风险的架构变更。参见[分支](/agent-native/branching)。

### [​](#pgvector) pgvector

支持 HNSW 和 IVFFlat 索引的原生向量搜索，用于嵌入向量。参见 [pgvector](/core-concepts/database/pgvector)。

### [​](#row-level-security) 行级安全

Postgres RLS 策略在行级别强制执行访问控制。策略读取 auth JWT，因此相同的规则适用于 REST 查询、SDK 调用、实时订阅和存储请求。

## [​](#concepts) 概念

## 迁移

安全地按顺序应用 SQL 变更。

## 分支

用于预览和风险变更的隔离数据库。

## pgvector

用于嵌入向量的向量搜索。

## [​](#build-with-it) 构建应用

## TypeScript SDK

在 Node、浏览器和边缘运行时中进行类型化的查询、插入和更新。

## Swift SDK

适用于 iOS 和 macOS 的原生 Swift 数据库客户端。

## Kotlin SDK

适用于 Android 和 JVM 的协程优先数据库客户端。

## REST API

纯 HTTP 数据库端点，可从任何语言调用。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 以关联你的项目（推荐方式）。
* 浏览 [TypeScript SDK 参考](/sdks/typescript/database) 了解类型化查询。

[MCP 设置](/mcp-setup)[数据库迁移](/core-concepts/database/migrations)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)