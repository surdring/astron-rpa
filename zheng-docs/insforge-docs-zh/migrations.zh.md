## 本页内容

* [概念](#concepts)
* [使用方法](#usage)
* [特定使用场景](#specific-usage-cases)
* [更多资源](#more-resources)

数据库

# 数据库迁移

复制页面

在 git 中追踪架构变更，并通过 InsForge CLI 应用它们

复制页面

迁移是 `migrations/` 目录下的版本化 SQL 文件，通过 `@insforge/cli` 应用。每次成功运行都会记录在 `system.custom_migrations` 中。工作流是仅向前推进的。

## [​](#concepts) 概念

一个迁移就是一个 SQL 文件，文件名以 14 位 UTC 时间戳为前缀：`<YYYYMMDDHHmmss>_<name>.sql`。CLI 在事务内按顺序应用待处理的文件，设置 `search_path` 为 `public`，并且仅在成功时记录历史。PostgREST 会自动重新加载模式元数据。文件中不允许包含 `BEGIN`/`COMMIT`/`ROLLBACK`。

## [​](#usage) 使用方法

关联后端，然后创建一个文件。

```
npx @insforge/cli login
npx @insforge/cli link
npx @insforge/cli db migrations new create-employees-table
```

编写 SQL。

```
create table if not exists public.employees (
  id bigint primary key generated always as identity,
  name text not null,
  email text,
  created_at timestamptz default now()
);
```

应用待处理的迁移并查看历史。

```
npx @insforge/cli db migrations up --all
npx @insforge/cli db migrations list
```

使用 `up <version>` 针对单个文件，或使用 `up --to <version>` 应用截至并包括目标版本的所有待处理文件。

## [​](#specific-usage-cases) 特定使用场景

在现有项目上采用迁移：首先运行 `db migrations fetch` 将远程历史物化到本地文件。一旦在远程应用，切勿就地编辑迁移文件。应编写向前迁移。
一旦选择使用迁移，所有架构变更都应通过文件进行。临时的仪表盘编辑会导致 git 与 `system.custom_migrations` 之间出现偏差。

## [​](#more-resources) 更多资源

* [数据库分支](/agent-native/branching) 在副本上演练迁移。
* [数据库概览](/core-concepts/database/overview) 了解 PostgREST 如何获取架构变更。
* [PostgreSQL DDL 文档](https://www.postgresql.org/docs/15/ddl.html) 了解你编写的 SQL。

[概览](/core-concepts/database/overview)[pgvector](/core-concepts/database/pgvector)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)