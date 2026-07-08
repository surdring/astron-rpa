# 迁移收尾 — 页面 API 迁移 & 服务端部署

## Why

现有 `insforge-migration` 规范已完成基础设施层（SDK 安装、认证迁移、`api-client.ts` 创建），但：

- **58 个前端页面文件**仍通过旧 `@/api/*` 模块调用后端，未切换到 `rpaApi`/`crudApi`
- **服务端** AstronRPA 保留服务（32742）和 Deno Edge Functions（7133）端口不可达
- **PostgreSQL 数据迁移** 未完成，`crudApi` 查询返回空
- **运行时验证** 均未执行，无法确认全链路贯通

本规范旨在完成以上所有未竟项，使迁移达到可验收状态。

## What Changes

### 1. 服务端部署（待处理项清单 一）
- 启动 Docker Compose 保留服务（robot-service、resource-service、ai-service、openapi-service）
- 暴露 Deno Edge Functions 端口 7133
- 执行 MySQL → PostgreSQL 数据迁移

### 2. 页面 API 调用迁移（页面迁移清单 P1-P5）
将 58 个前端页面/组件文件中的旧 `import { xxx } from '@/api/xxx'` 替换为 `import { rpaApi, crudApi } from '@rpa/shared'`，并按批次推进：

| 批次 | 范围 | 文件数 | 原则 |
|------|------|--------|------|
| **P1** | 只读查询页面 | ~30 | 只替换 GET/POST 查询，{data, error} 解构 |
| **P2** | 单一实体 CRUD | ~5 | 含 INSERT/UPDATE/DELETE，加锁保障 |
| **P3** | 复杂多表操作 | ~5 | 引擎交互保留旧 HTTP，其余迁移 |
| **P4** | WebSocket/SSE | ~5 | 保留旧实现，不做迁移 |
| **P5** | 清理旧 API 模块 | ~12 | 确认无引用后删除 |

### 3. 运行时验证（待处理项清单 二）
- 登录流程验证（signInWithPassword → session 恢复 → 401 自动处理）
- CRUD 操作验证（20 张表全量回归）
- Python 后端 JWT 验证（远程验证 + 本地降级）
- Edge Functions 验证（notify、param-validate、blacklist）

### 4. 文档更新
- 更新 `后端轻量化改造-InsForge规范方案.md` 总结和对比表

## Impact

- **修改文件**：~58 个前端页面文件（`web-app/src/views/` 下）
- **删除文件**：~12 个旧 API 模块（`web-app/src/api/` 下）
- **服务端操作**：需在 172.16.100.211 上执行 Docker Compose 启动和数据迁移
- **无新增依赖**：`api-client.ts` 中 `rpaApi` 已涵盖所有迁移目标端点的定义

## ADDED Requirements

### Requirement: 页面级 API 调用迁移
The system SHALL 将前端页面中所有 `@/api/*` 导入替换为 `@rpa/shared` 的 `rpaApi`/`crudApi`。

#### Scenario: 标准替换模式
- **WHEN** 页面文件从 `@/api/market` 导入 `getAppCards`
- **THEN** 替换为 `import { rpaApi } from '@rpa/shared'`，调用 `rpaApi.market.getAppCards(params)`
- **AND** 返回值适配 `{data, error}` 解构

#### Scenario: 保留旧模块
- **WHEN** 文件仅引用 `@/api/resource`（文件上传）或 `@/api/engine`（引擎调度）
- **THEN** 保留旧 `http` 调用，不做迁移
- **AND** `@/api/resource`、`@/api/engine` 等模块不移除

### Requirement: 服务端准备
AstronRPA 保留服务 SHALL 可通过 `http://172.16.100.211:32742` 访问。

#### Scenario: Docker Compose 启动
- **WHEN** 执行 `docker compose up -d`
- **THEN** robot-service、resource-service、ai-service、openapi-service 正常运行
- **AND** `curl http://localhost:32742/api/robot/robots` 返回 200

#### Scenario: 数据迁移
- **WHEN** 执行 pgloader 从 MySQL 迁移到 PostgreSQL
- **THEN** `c_atom_meta_new` 等 20 张表数据完整
- **AND** `crudApi.atomMeta.list({limit: 5})` 返回数据

### Requirement: 清理旧 API 模块
旧 API 模块 SHALL 在所有页面迁移完成后删除。

#### Scenario: 删除条件
- **WHEN** 某个 `@/api/xxx.ts` 的所有调用方已迁移
- **THEN** 删除该文件
- **AND** 确认 `pnpm dev:web` 无 TypeScript 错误

## MODIFIED Requirements

### Requirement: 日志窗口 WebSocket
- **修改前**：`LogWindow.vue` 引用 `Socket from '@/api/ws'`
- **修改后**：保留旧 WebSocket 接口，不做迁移

### Requirement: Picking 服务
- **修改前**：`Arrange/index.vue` 和 `Record/utils.ts` 引用 `@/api/pick`
- **修改后**：保留旧 picking 接口，不做迁移

## REMOVED Requirements

### Requirement: 旧 API 模块（迁移完成后删除）
**Reason**: 功能已全部由 `rpaApi`/`crudApi` 替代
**Migration**: 逐文件确认无引用后删除
- `@/api/market.ts`
- `@/api/robot.ts`
- `@/api/project.ts`
- `@/api/task.ts`
- `@/api/atom.ts`
- `@/api/component.ts`
- `@/api/record.ts`
- `@/api/contract.ts`
- `@/api/mail.ts`
- `@/api/setting.ts`
- 保留：`@/api/engine.ts`、`@/api/resource.ts`、`@/api/pick.ts`、`@/api/ws.ts`