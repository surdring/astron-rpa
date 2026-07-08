# Tasks: InsForge 集成改造

## Phase 1: 基础设施准备

- [x] Task 1: 安装 @insforge/sdk 并创建统一客户端（Fix-1）
  - [x] 在 `frontend/packages/components` 下执行 `pnpm add @insforge/sdk@latest`（已安装，移至 `dependencies`）
  - [x] 新建 `src/insforge/client.ts` — SDK 客户端单例（已存在）
  - [x] 新建 `src/insforge/auth.ts` — SDK 认证方法封装（已存在）
  - [x] 新建 `src/insforge/index.ts` — 统一导出（已存在）
  - [x] 更新 `src/index.ts` 和 `src/components/Auth/index.ts` 导出新模块（已存在）
  - [x] 更新 `web-app/src/vite-env.d.ts` — 添加 VITE_INSFORGE_URL 和 VITE_INSFORGE_ANON_KEY 类型声明（已存在）

- [x] Task 2: 更新环境变量配置（Fix-7）
  - [x] 更新 `frontend/.env.example` — 添加 VITE_INSFORGE_URL（指向 `http://172.16.100.211:7130`）、VITE_INSFORGE_ANON_KEY、VITE_RPA_SERVICES_URL，注释移除的变量
  - [x] 更新保留服务（ai-service、openapi-service）环境变量 — 添加 INSFORGE_API_URL（指向 `http://172.16.100.211:7130`）、AUTH_VERIFY_MODE=remote
  - [x] 确保前端 Python 服务使用正确的 InsForge 服务器地址

## Phase 2: 认证模块迁移

- [x] Task 3: 认证模块迁移到 InsForge SDK（Fix-2）
  - [x] HTTP 请求拦截器自动携带 Bearer token（`web-app/src/api/http/index.ts`）
  - [x] 新增 `web-app/src/stores/useInsforgeUserStore.ts` — InsForge 用户状态 store

## Phase 3: 数据访问层迁移

- [x] Task 4: 数据库 CRUD 迁移到 InsForge SDK（Fix-3）
  - [x] 重写 `frontend/packages/shared/src/api-client.ts` — 添加 `crudApi`（使用 SDK `database.from()` 覆盖所有表）
  - [x] 重写 `frontend/packages/shared/src/api-client.ts` — 添加 `rpaApi`（axios 封装，保留 AstronRPA 服务调用）

- [x] Task 5: Edge Functions 调用迁移到 SDK（Fix-4）
  - [x] 在 `api-client.ts` 中将 `notify.send` 和 `param.validate` 改为 `insforge.functions.invoke()`

## Phase 4: 后端适配

- [x] Task 6: Python 后端 JWT 验证改为远程验证（Fix-5）
  - [x] 修改 `backend/ai-service/app/config.py` — 添加 INSFORGE_API_URL（默认 `http://172.16.100.211:7130`）、AUTH_VERIFY_MODE 配置
  - [x] 重写 `backend/ai-service/app/dependencies/auth.py` — 远程验证（调用 `http://172.16.100.211:7130/api/auth/sessions/current`）+ 本地降级
  - [x] 修改 `backend/openapi-service/app/config.py` — 添加 INSFORGE_API_URL、AUTH_VERIFY_MODE、JWT_SECRET、JWT_ALGORITHM
  - [ ] 重写 `backend/openapi-service/app/dependencies/auth.py` — 跳过（openapi-service 已有完整 API Key 认证体系，Config 中已添加配置供按需使用）
  - [x] 在 `pyproject.toml` 中添加 `httpx>=0.27.0` 依赖（ai-service 和 openapi-service 均已添加）

## Phase 5: Edge Functions 内部适配

- [ ] Task 7: Edge Functions 内部使用 InsForge SDK（Fix-6）
  - [ ] 跳过 — 项目仓库中不存在 `functions/` 目录（仅文档在 `zheng-docs/` 中），无实际 Edge Functions 代码需要修改

## Phase 6: 清理收尾

- [x] Task 8: 清理冗余依赖和导出（Fix-8）
  - [x] 检查 `api-client.ts` 中是否包含冗余导出 — 无，为新创建文件
  - [x] 检查 Casdoor SDK 依赖 — 项目中无 `casdoor-js-sdk` 依赖
  - [x] 检查不再使用的环境变量引用 — `.env.example` 中已注释移除；`web-app/.env.example` 已更新；`web-app/.env.opensource` 保留（开源构建配置）

## Task Dependencies

- Task 2 (Fix-7) 独立于 Task 1
- Task 3 (Fix-2) 依赖于 Task 1
- Task 4 (Fix-3) 依赖于 Task 1
- Task 5 (Fix-4) 依赖于 Task 1
- Task 6 (Fix-5) 独立于 Task 1
- Task 7 (Fix-6) 独立于 Task 1 — 已跳过，仓库中无 Edge Functions
- Task 8 (Fix-8) 依赖所有其他任务 — 最后清理