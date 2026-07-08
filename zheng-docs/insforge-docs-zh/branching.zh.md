## 本页内容

* [概念](#概念)
* [使用方法](#使用方法)
* [特定使用场景](#特定使用场景)
* [更多资源](#更多资源)

Agent-Native 计划

# 后端分支

复制页面

启动项目的隔离副本，用于测试 schema 和配置变更

复制页面

分支是一个子项目，拥有独立的 Postgres、认证配置、存储、边缘函数、邮件模板、实时通道和调度计划。准备就绪后合并回去，或者重置后重试。适用于 InsForge OSS 2.1.0 及以上版本。

## [​](#概念) 概念

每个分支运行在自己的 EC2 实例上，创建时从父项目恢复。`merge` 对父项目的创建时状态执行三路差异比较。分支共享父项目的 `JWT_SECRET`，但拥有自己的 `API_KEY`。计算服务和前端部署不会分支。

## [​](#使用方法) 使用方法

使用 `full`（schema + 数据）或 `schema-only`（更快，清空用户表）模式创建分支。

```
npx @insforge/cli branch create feat-billing --mode full
npx @insforge/cli branch list
```

在应用前预览合并 SQL。

```
npx @insforge/cli branch merge feat-billing --dry-run --save-sql ./preview.sql
npx @insforge/cli branch merge feat-billing
```

回滚到创建时的快照，或删除分支。

```
npx @insforge/cli branch reset feat-billing
npx @insforge/cli branch delete feat-billing
```

## [​](#特定使用场景) 特定使用场景

将分支用于有风险的 schema 迁移、RLS 重写、OAuth 提供商切换和边缘函数重构。对于小变更和数据回填（用户数据行不会自动合并）则跳过。
合并时遇到冲突会阻塞。在分支上解决冲突，或重置后重试。配额：每个组织 3 个父项目，每个父项目 2 个活跃分支，不支持嵌套。成功合并不会自动删除分支。

## [​](#更多资源) 更多资源

* [数据库迁移](/core-concepts/database/migrations)，了解只前向的 SQL 文件。
* [数据库概述](/core-concepts/database/overview)，了解每个分支下运行的内容。
* [CLI 参考](https://github.com/InsForge/InsForge)，了解完整的 `branch` 标志集。

[配置即代码](/agent-native/config-as-code)[合作伙伴集成](/partnership)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)