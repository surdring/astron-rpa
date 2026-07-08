# AstronRPA 后端轻量化改造 —— InsForge 集成规范

## Why

将 AstronRPA 从「Casdoor 认证 + 5 个独立 Java/Python 微服务 + MySQL + OpenResty 网关」架构，替换为 **InsForge 统一 BaaS 平台 + PostgreSQL**，实现后端轻量化。当前实现存在根本性偏离：前端和 Edge Functions 未使用 InsForge 官方 `@insforge/sdk`，而是用 axios/fetch 裸调 HTTP API，导致无类型安全、无自动 token 管理、错误处理不一致等问题。

## What Changes

- **Fix-1**: 安装 `@insforge/sdk` 并创建统一客户端（`client.ts`、`auth.ts`、`index.ts`）
- **Fix-2**: 认证模块从 Casdoor OAuth / rpa-auth 迁移到 InsForge SDK `auth` 方法（渐进式，保留旧认证）
- **Fix-3**: 数据库 CRUD 从 Java 后端 REST API 迁移到 InsForge SDK `database.from().select()` 链式查询
- **Fix-4**: Edge Functions 调用从 axios 裸调迁移到 SDK `functions.invoke()`
- **Fix-5**: Python 后端（ai-service、openapi-service）JWT 验证从本地 `jose.jwt.decode()` 改为远程调用 InsForge API
- **Fix-6**: Edge Functions 内部从裸 `fetch(POSTGREST_URL)` 改为 SDK `createClient`
- **Fix-7**: 更新前端和后端环境变量配置（`.env.example`），指向现有 InsForge 服务器 `172.16.100.211`
- **Fix-8**: 清理冗余依赖和导出

## Impact

- **认证流程**: 从 Casdoor OAuth → InsForge Auth（邮箱密码），保留旧认证做渐进式迁移
- **数据访问**: 从 Java MyBatis-Plus → InsForge SDK `database.from().select()`，经 PostgREST 代理到 PostgreSQL
- **部署架构**: 复用现有 InsForge 服务器 `172.16.100.211:7130`（源码部署 + systemd），AstronRPA 保留服务继续运行
- **前端 SDK**: 从自定义 axios 封装 → `@insforge/sdk` 官方 SDK，统一 `{data, error}` 返回结构
- **Python 服务**: 从本地 JWT 解析 → 远程 InsForge API 验证，支持降级到本地模式

## ADDED Requirements

### Requirement: InsForge SDK 集成
The system SHALL install and use `@insforge/sdk` as the primary client for all InsForge BaaS operations.

#### Scenario: SDK 客户端创建
- **WHEN** 前端应用初始化
- **THEN** 创建全局单例 `createClient({ baseUrl, anonKey })`，可通过 `import { insforge } from '@rpa/components'` 导入

#### Scenario: InsForge 认证
- **WHEN** 用户使用邮箱密码登录
- **THEN** `signInWithPassword({ email, password })` 返回 `{accessToken, user}`，SDK 自动管理 token
- **WHEN** 用户注册
- **THEN** `signUp({ email, password, name? })` 返回 `{accessToken, user}`
- **WHEN** 用户登出
- **THEN** `signOut()` 清除 session

#### Scenario: Database CRUD 使用 SDK
- **WHEN** 前端需要查询数据
- **THEN** 使用 `insforge.database.from('table_name').select('*').eq('field', value)` 链式 API
- **AND** 返回 `{data, error}` 统一结构
- **AND** insert 必须传数组格式 `[{...}]`

#### Scenario: Python 服务远程 JWT 验证
- **WHEN** Python 服务收到带 Bearer token 的请求
- **THEN** 调用 `GET http://172.16.100.211:7130/api/auth/sessions/current` 远程验证
- **AND** 当 InsForge 不可用时自动降级到本地 `jose.jwt.decode()`

#### Scenario: Edge Functions 使用 SDK
- **WHEN** Edge Function 需要访问数据库
- **THEN** 使用 `createClient({ baseUrl: 'http://172.16.100.211:7130', anonKey, edgeFunctionToken })` 通过 SDK 操作
- **AND** 通过 `npm:@insforge/sdk` 导入（Deno npm 兼容格式）

### Requirement: 渐进式迁移
The system SHALL支持渐进式迁移，旧功能保持兼容，新功能使用 InsForge SDK。

#### Scenario: 保留旧认证
- **WHEN** 旧页面使用原有 `Auth.login()`
- **THEN** 原有登录流程保持不变
- **WHEN** 新页面使用 InsForge 认证
- **THEN** 通过 `import { signInWithPassword } from '@rpa/components/auth'` 使用 SDK

#### Scenario: 保留 AstronRPA 服务
- **WHEN** 前端需要调用 robot-service、resource-service、openapi-service、ai-service
- **THEN** 通过 `rpaApi`（axios 封装，指向 OpenResty 网关 `:32742`）访问
- **AND** HTTP 请求自动携带 Bearer token（无论来自旧认证还是 InsForge）

## MODIFIED Requirements

### Requirement: 环境变量配置
**修改前**: 前端通过 `VITE_SERVICE_HOST`、`VITE_CASDOOR_URL` 等配置
**修改后**: 前端新增 `VITE_INSFORGE_URL`、`VITE_INSFORGE_ANON_KEY`，保留 `VITE_RPA_SERVICES_URL`；Python 服务新增 `INSFORGE_API_URL`、`AUTH_VERIFY_MODE`

## REMOVED Requirements

### Requirement: Casdoor 认证
**Reason**: 由 InsForge 内置 Auth（JWT/OAuth/API Key）替代
**Migration**: 渐进式迁移，旧用户通过 InsForge SDK 重新注册或配置用户迁移

### Requirement: VITE_POSTGREST_URL 和 VITE_CASDOOR_URL 环境变量
**Reason**: 前端不再直连 PostgREST 或 Casdoor，所有请求通过 InsForge App (7130) 代理
**Migration**: 移除环境变量配置，SDK 通过 `baseUrl` 自动路由