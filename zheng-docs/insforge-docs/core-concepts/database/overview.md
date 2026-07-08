## On this page

* [Features](#features)
  + [Tables as APIs](#tables-as-apis)
  + [Migrations](#migrations)
  + [Branching](#branching)
  + [pgvector](#pgvector)
  + [Row-level security](#row-level-security)
* [Concepts](#concepts)
* [Build with it](#build-with-it)
* [Next steps](#next-steps)

Database

# Database

Copy page

Use InsForge to manage your data.

Copy page

Every InsForge project comes with a full [Postgres](https://www.postgresql.org/) database. Every table is automatically a typed REST and SDK endpoint. Auth tokens scope every read and write through row-level security. The same Postgres handles relational queries, semantic search via pgvector, and realtime change feeds.

![InsForge dashboard table editor showing a messages table with typed columns](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/database-table-editor.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=10bf2755b0be3e8a27e975e22a3e3790)

**Looking for file storage?** Use [Storage](/core-concepts/storage/overview) for images, PDFs, and other binary content. The database stores rows; storage stores objects.

## [​](#features) Features

### [​](#tables-as-apis) Tables as APIs

Define a table and you immediately get REST endpoints plus a typed SDK client for it. No code generation step. The auth JWT scopes every query through RLS.

### [​](#migrations) Migrations

Track and apply SQL changes in order. [Migrations](/core-concepts/database/migrations) ship as plain `.sql` files in your repo, applied with `npx @insforge/cli db migrations up --all` or via the MCP tool.

### [​](#branching) Branching

Spin up an isolated database branch to test risky schema changes against a copy of production data. See [Branching](/agent-native/branching).

### [​](#pgvector) pgvector

Native vector search for embeddings, with HNSW and IVFFlat indexes. See [pgvector](/core-concepts/database/pgvector).

### [​](#row-level-security) Row-level security

Postgres RLS policies enforce access at the row level. Policies read the auth JWT, so the same rule applies to REST queries, SDK calls, realtime subscriptions, and storage requests.

## [​](#concepts) Concepts

## Migrations

Apply SQL changes in order, safely.

## Branching

Isolated databases for preview and risky changes.

## pgvector

Vector search for embeddings.

## [​](#build-with-it) Build with it

## TypeScript SDK

Typed queries, inserts, and updates from Node, browser, and edge.

## Swift SDK

Native Swift database client for iOS and macOS.

## Kotlin SDK

Coroutines-first database client for Android and JVM.

## REST API

Plain HTTP database endpoints, callable from any language.

## [​](#next-steps) Next steps

* Set up the [CLI](/quickstart) to link your project (the recommended path).
* Browse the [TypeScript SDK reference](/sdks/typescript/database) for typed queries.

[MCP setup](/mcp-setup)[Database migrations](/core-concepts/database/migrations)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)