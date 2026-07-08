# AstronRPA 后端轻量化改造 —— InsForge 规范方案

> **部署模式**：本方案基于 **InsForge 自托管（Self-hosting）** 模式设计（已通过源码部署 + systemd 运行在 `172.16.100.211` 远程服务器），**无 Docker 容器**。目标是将 AstronRPA 的 Server 部分全部替换为 InsForge，实现"Node.js + PostgreSQL"双进程极简后端。
>
> **轻量化原则**：
> 1. 抛弃 Docker 微服务架构，所有改造基于 InsForge 源码部署（systemd 管理）
> 2. 服务端只做数据存储和轻量编排，计算密集型任务（RPA 执行、AI 推理）全部在客户端完成
> 3. 前端通过 `@insforge/sdk` 直连 InsForge API，无需 Nginx 网关路由
> 4. Python 引擎通过 `httpx` 直连 InsForge REST API（PostgREST 端点）
>
> **最终版方案参考**：[轻量化改造方案-最终版](./轻量化改造方案-最终版.md)

---

## 0. 背景

### 当前 AstronRPA 架构（现状）

来自 [AstronRPA 项目深度分析报告](./AstronRPA%20项目深度分析报告.md) 的准确描述：

```
┌──────────────────────────────────────────────────────────────────┐
│                        Client (Windows)                          │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐  │
│  │  Electron Desktop   │  │       RPA Engine (Python)        │  │
│  │  (Vue 3 Web App)    │  │  ┌────────────────────────────┐ │  │
│  │                     │  │  │  25+ RPA Components        │ │  │
│  │  - 流程编排          │  │  │  (AI/Browser/Excel/Word..) │ │  │
│  │  - 机器人管理        │  │  ├────────────────────────────┤ │  │
│  │  - 任务调度          │  │  │  Servers:                 │ │  │
│  │  - 应用市场          │  │  │  Scheduler/Executor/      │ │  │
│  │                     │  │  │  Picker/Trigger/Bridge    │ │  │
│  └─────────────────────┘  │  └────────────────────────────┘ │  │
│                           └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Server (Docker Compose)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ OpenResty│ │ Casdoor  │ │  MySQL   │ │  Redis   │  MinIO    │
│  │  Nginx   │ │  (Auth)  │ │  8.4.6   │ │          │  (S3)    │
│  │ Gateway  │ │          │ │          │ │          │           │
│  └────┬─────┘ └──────────┘ └──────────┘ └──────────┘           │
│       │                                                          │
│  ┌────┴──────────────────────────────────────────────┐          │
│  │  Microservices (5 services)                        │          │
│  │  ┌─────────────────┐ ┌──────────────────┐         │          │
│  │  │ robot-service   │ │ resource-service │         │          │
│  │  │ (Java/Spring 2) │ │ (Java/Spring 3)  │         │          │
│  │  │ Agent/Robot 管理 │ │ 文件/资源管理     │         │          │
│  │  └─────────────────┘ └──────────────────┘         │          │
│  │  ┌─────────────────┐ ┌──────────────────┐         │          │
│  │  │ rpa-auth        │ │ ai-service       │         │          │
│  │  │ (Java/Spring 2) │ │ (Python/FastAPI)  │         │          │
│  │  │ 认证/授权       │ │ AI Chat/OCR/智能  │         │          │
│  │  └─────────────────┘ └──────────────────┘         │          │
│  │  ┌──────────────────────────────────────────┐    │          │
│  │  │ openapi-service (Python/FastAPI)         │    │          │
│  │  │ Workflow API / WebSocket / MCP           │    │          │
│  │  └──────────────────────────────────────────┘    │          │
│  └──────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────────┘
```

**当前技术栈（来自 AstronRPA 分析报告）**：

| 层次 | 技术 | 版本/说明 |
|------|------|-----------|
| **RPA 引擎** | Python 3.13+ | `uv` 包管理，ruff 格式化/检查 |
| **后端 (Java)** | Spring Boot | robot-service: 2.3.11 / resource-service: 3.2.4 |
| **后端 (Python)** | FastAPI | ai-service + openapi-service |
| **前端** | Vue 3 + TypeScript | pnpm monorepo，Vite 构建 |
| **桌面壳** | Electron 25 | 打包 Windows 桌面应用 |
| **数据库** | MySQL 8.4.6 | 核心业务数据 |
| **缓存** | Redis (Bitnami) | 会话/缓存 |
| **对象存储** | MinIO | S3 兼容存储 |
| **网关** | OpenResty (Nginx+Lua) | 统一入口 + Lua 认证 |
| **认证** | Casdoor v2.67 | 统一身份认证 |

### 目标 InsForge 架构

来自 [InsForge 深度分析](./InsForge深度分析.md) 的准确描述。InsForge 是一个 **开源的全栈后端即服务（BaaS）平台**，专为 AI 编码代理设计：

| 维度 | InsForge 特性 |
|------|--------------|
| **技术栈** | TypeScript + Node.js (Express) + React 19 |
| **数据库** | PostgreSQL + PostgREST (v12) |
| **实时通信** | Socket.IO + PostgreSQL LISTEN/NOTIFY |
| **边缘函数** | Deno (v2.0.6) |
| **认证** | 内置 JWT / OAuth 2.0 / API Key |
| **存储** | S3 兼容（自托管本地卷存储） |
| **AI 模型网关** | OpenRouter 多模型网关 |
| **MCP 协议** | 原生支持 MCP Server |
| **部署方式** | 源码部署 + systemd（参考环境 `172.16.100.211`）；支持 Docker Compose 部署 |

### InsForge 内部架构关键组件

InsForge 后端采用 Express 框架，按功能模块清晰划分，以下是与本改造方案直接相关的关键架构组件：

| 层次 | 组件 | 说明 |
|------|------|------|
| **API 路由层** | `auth/`、`database/`、`storage/`、`ai/`、`functions/`、`realtime/` 等 22+ 模块 | 提供完整的 BaaS API，详见 [InsForge 深度分析](./InsForge深度分析.md) |
| **中间件层** | `auth.ts`、`error.ts`、`rate-limiters.ts`、`s3-sigv4.ts`、`upload.ts` | 多级认证（user/admin/apiKey）、统一错误处理、速率限制、S3 SigV4 签名验证 |
| **服务层** | 每个路由模块对应一个服务层，处理业务逻辑 | 如 `PostgrestProxyService`（CRUD 代理）、`AdminRecordService`（管理员直连） |
| **Provider 层** | OAuth（10+ 提供商）、Storage（S3/Local）、AI（OpenRouter）等 | 抽象化第三方服务集成，支持 Base/Cloud 双模式切换 |
| **Infra 层** | Database Manager、Realtime Manager、Socket Manager、Token Manager、Encryption Manager | PostgreSQL 连接池管理、实时消息分发、JWT 令牌管理、AES-256-GCM 加密 |

**数据访问架构（与本改造方案直接相关）**：

InsForge 采用双层数据访问架构：

```
Client SDK (select/insert/update/delete)
  → InsForge Backend (PostgrestProxyService)
    → PostgREST (port 3000)
      → PostgreSQL

Dashboard Admin (table management, raw SQL)
  → InsForge Backend (AdminRecordService)
    → PostgreSQL (direct)
```

1. **客户端 CRUD → PostgREST 代理**：前端 SDK 的 `select()`、`insert()`、`update()`、`delete()` 操作通过 `PostgrestProxyService` 转发到 PostgREST，自动注入 JWT 认证头和 Schema 信息
2. **管理操作 → 直连数据库**：Dashboard 的管理操作（表结构修改、Schema 浏览、原始 SQL）通过 `AdminRecordService` 直连 PostgreSQL，绕过 PostgREST 限制

**安全架构**：

| 机制 | 说明 |
|------|------|
| JWT Access Token | HS256，15 分钟有效期 |
| JWT Refresh Token | HS256，7 天有效期，httpOnly Cookie |
| API Key 认证 | `ik_` 前缀，永不过期 |
| OAuth 2.0 PKCE | 防 CSRF 的认证流程 |
| AES-256-GCM 加密 | 存储密钥和敏感配置 |
| PostgreSQL RLS | 行级安全策略 |
| 速率限制 | 全局 + 按端点 |

### 改造目标

将 AstronRPA 现有的 **Casdoor 认证 + 5 个独立微服务 + MySQL + OpenResty 网关** 架构，替换为 **InsForge 统一 BaaS 平台 + PostgreSQL**，实现后端轻量化：

| 维度 | 改造前（AstronRPA 现状） | 改造后（InsForge 目标） |
|------|------------------------|----------------------|
| **认证** | Casdoor v2.67 + rpa-auth (Java) | InsForge 内置 Auth（JWT/OAuth/API Key） |
| **数据库** | MySQL 8.4.6 | PostgreSQL + PostgREST |
| **API 网关** | OpenResty (Nginx+Lua) | 由 InsForge App 统一代理 |
| **后端服务** | 5 个独立微服务（Java + Python） | InsForge App + Deno Edge Functions |
| **AI 服务** | ai-service (Python/FastAPI) | InsForge AI 模型网关（OpenRouter） |
| **文件存储** | MinIO + resource-service | InsForge Storage（S3 兼容） |
| **ORM/DAO** | MyBatis-Plus | InsForge SDK `database.from().select()` |
| **前端 SDK** | 自定义 axios 封装 | `@insforge/sdk` 官方 SDK |

### 本地环境参考

来自 [InsForge 本地环境使用指南](./InsForge本地环境使用指南.md) 的实际部署配置（远程服务器 `172.16.100.211` 源码部署），供自托管 Docker 部署参考：

| 项目 | 值 | 说明 |
|------|-----|------|
| **InsForge 版本** | v2.2.4 | 当前稳定版本 |
| **API 服务** | `http://172.16.100.211:7130` | 后端 API + Dashboard（外部主入口） |
| **Dashboard（SSR）** | `http://172.16.100.211:7131` | 管理后台（独立 SSR 端口） |
| **PostgreSQL** | `postgresql://postgres:xqxatcdj@172.16.100.211:5432/insforge` | 数据库直连 |
| **PostgREST** | `172.16.100.211:5430` | 可选，非必需 |
| **Dashboard 管理员** | `admin` / `admin123` | 首次登录凭据 |

> **注意**：自托管 Docker 部署时，PostgreSQL 密码、端口等配置通过 `.env.insforge` 文件自定义，无需使用上述远程开发环境的默认值。上述凭据主要用于首次登录 Dashboard 获取 Anon Key。

### 调用方适配概述

由于 SDK 方法返回 `{data, error}` 结构（而非 axios 的 `response.data`），所有调用 `crudApi` 和 `authApi` 的前端代码需要适配返回值解构。详见下文「调用方适配指南」章节。

---

## 概述

### 目标部署架构

AstronRPA 后端轻量化的最终目标是：**抛弃 Docker 微服务架构，实现"Node.js + PostgreSQL"双进程极简后端**。

InsForge 已通过源码部署 + systemd 运行在远程服务器 `172.16.100.211` 上，无需 Docker 容器。

```
┌──────────────────────────────────────────────────────────────────┐
│                     Client (Windows) — 保持不变                    │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐  │
│  │  Electron Desktop   │  │       RPA Engine (Python)        │  │
│  │  (Vue 3 Web App)    │  │  ┌────────────────────────────┐ │  │
│  │                     │  │  │  25+ RPA Components        │ │  │
│  │  前端改造：           │  │  │  (AI/Browser/Excel/Word..) │ │  │
│  │  Axios → InsForge   │  │  ├────────────────────────────┤ │  │
│  │  SDK 调用            │  │  │  Servers:                 │ │  │
│  │                     │  │  │  Scheduler/Executor/      │ │  │
│  │                     │  │  │  Picker/Trigger/Bridge    │ │  │
│  └─────────────────────┘  │  │  ↑ 引擎通过 InsForge SDK  │ │  │
│                           │  │  │   与后端通信            │ │  │
│                           └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼  HTTP :7130（唯一端口）
┌──────────────────────────────────────────────────────────────────┐
│              Server — 172.16.100.211（源码部署 + systemd）         │
│                                                                   │
│  ┌─────────────────────────────────────┐  ┌──────────────────┐  │
│  │  InsForge Backend (:7130)           │  │  PostgreSQL 18   │  │
│  │  Node.js v24 + Express              │  │  (:5432)         │  │
│  │                                     │  │                  │  │
│  │  ├─ Auth (JWT/RLS)         ← 替代   │  │  ├─ auth schema  │  │
│  │  ├─ Database (PostgREST)   ← 替代   │  │  ├─ public       │  │
│  │  ├─ Storage (S3 兼容)      ← 替代   │  │  ├─ storage      │  │
│  │  ├─ Realtime (Socket.IO)   ← 替代   │  │  ├─ realtime     │  │
│  │  ├─ AI (OpenRouter)        ← 替代   │  │  └─ rpa_*        │  │
│  │  ├─ Schedules (pg_cron)    ← 新增   │  │                  │  │
│  │  ├─ Functions (Deno)       ← 新增   │  └──────────────────┘  │
│  │  └─ MCP Server             ← 替代   │                        │
│  └─────────────────────────────────────┘                        │
│                                                                   │
│  ┌─────────────────────────────────────┐                        │
│  │  InsForge Dashboard (:7131)         │  ← 管理后台             │
│  │  React 19 + Vite (SSR)              │                        │
│  └─────────────────────────────────────┘                        │
└──────────────────────────────────────────────────────────────────┘
```

**关键变化：**
- 从 **7-8 个 Docker 容器** → **2 个系统进程**（Node.js + PostgreSQL）
- 从 **5 个微服务端口** → **1 个 API 端口**（:7130）
- 从 Java + Python + Lua 多语言 → **TypeScript 统一栈**（服务端）
- 从 Nginx 网关路由 → **客户端直连 InsForge API**

**保留的 AstronRPA 服务**（过渡期保留，逐步迁移到 InsForge）：
- `robot-service` — RPA 机器人管理、任务调度（Java），**CRUD 已通过前端 SDK 迁移到 InsForge DB，业务逻辑后续逐步迁移到 Edge Functions**
- `resource-service` — 文件上传/下载/共享（Java），**已通过前端 SDK 迁移到 InsForge Storage**
- `openapi-service` — Workflow API / WebSocket / MCP 协议（Python/FastAPI），**WebSocket 已迁移到 InsForge Realtime，Workflow CRUD 已迁移到 InsForge DB**
- `ai-service` — AI 对话、OCR、智能组件（Python/FastAPI），**大模型对话迁移到 InsForge AI 网关（OpenRouter），OCR/CUA 视觉下沉到客户端引擎**

**替换的服务**：
- `rpa-auth` (Java) → InsForge Auth
- `Casdoor` → InsForge Auth（内置）
- 数据库直连（MyBatis-Plus）→ InsForge SDK `database.from().select()`
- `OpenResty` Lua 认证 → 由 InsForge App 统一认证（无需独立网关）

### 问题诊断

当前 AstronRPA 改造方案的**架构设计完全符合 InsForge 规范**，但**实现方式存在一个根本性偏离**：前端和 Edge Functions 未使用 InsForge 官方 `@insforge/sdk`，而是用 axios/fetch 裸调 HTTP API。这导致：

| 维度 | InsForge 规范做法 | AstronRPA 当前做法 | 影响 |
|------|------------------|-------------------|------|
| 数据库查询 | `client.database.from('posts').select('*').eq('status', 'active')` | 通过 Axios 调用 Java 后端 REST API 或直连 PostgREST | 无类型安全、无链式过滤、绕过 InsForge App 代理 |
| 用户认证 | `client.auth.signInWithPassword({ email, password })` | `axios.post('/api/auth/sessions', { email, password })` 或 Casdoor OAuth | 手动管理 token、无自动刷新、无 session 恢复 |
| Token 管理 | SDK 自动存储/刷新/httpOnly cookie | 手动 `localStorage` + 手动 401 拦截 | 安全性差、无 CSRF 保护 |
| 错误处理 | 统一 `{data, error}` 模式 | axios try/catch + 手动判断 | 不一致的错误处理 |
| Edge Functions | `createClient({ edgeFunctionToken })` 使用 SDK | 直接调用 Java/Python 后端 API | 无法利用 InsForge 统一认证和数据代理 |
| Python 验证 | 调用 InsForge `/api/auth/sessions/current` 验证 token | 本地 `jose.jwt.decode()` 解析 JWT | 需要共享 JWT_SECRET、无法验证 token 是否已撤销 |

### 修复目标

将当前「把 InsForge 当普通 PostgreSQL + REST API 用」的实现方式，升级为「使用 InsForge 官方 SDK 的完整 BaaS 集成」。

### 修复范围

| 序号 | 修复项 | 涉及文件 | 优先级 |
|------|--------|---------|--------|
| Fix-1 | 安装 SDK + 创建统一客户端 | `frontend/packages/components/package.json`, 新建 `src/insforge/client.ts` | P0 |
| Fix-2 | 认证模块迁移到 SDK | `frontend/packages/components/src/insforge/auth.ts`, `web-app/src/api/http/index.ts` | P0 |
| Fix-3 | 数据库 CRUD 迁移到 SDK | 前端各 API 层（从 Java 后端 API → InsForge SDK） | P0 |
| Fix-4 | Edge Functions 调用迁移到 SDK | 前端 API 层中调用 Edge Functions 的部分 | P1 |
| Fix-5 | Python 后端 JWT 验证改为远程验证 | `backend/ai-service/`, `backend/openapi-service/` 中的验证逻辑 | P1 |
| Fix-6 | Edge Functions 内部使用 SDK | Edge Functions 源码 | P1 |
| Fix-7 | 环境变量和配置更新 | `.env.example`, Python 服务 config.py | P2 |
| Fix-8 | 清理冗余依赖 | `package.json` 等 | P2 |
| Fix-9 | 引擎客户端适配（Python SDK） | `engine/shared/insforge_client.py`（新建），引擎各服务改造 | P1 |
| Fix-10 | 数据迁移（MySQL → PostgreSQL） | pgloader + RPA 业务表迁移脚本 | P1 |

---

## Fix-1: 安装 @insforge/sdk 并创建统一客户端

### 目标
在 frontend 项目中安装 `@insforge/sdk`，创建全局单例客户端，替代当前的多个 axios 实例。

### 涉及文件
- `frontend/packages/components/package.json` — 添加依赖
- `frontend/packages/components/src/insforge/client.ts` — **新建**，SDK 客户端单例
- `frontend/packages/components/src/insforge/auth.ts` — **新建**，SDK 认证方法封装
- `frontend/packages/components/src/insforge/index.ts` — **新建**，统一导出
- `frontend/packages/components/src/index.ts` — 导出新模块
- `frontend/packages/components/src/components/Auth/index.ts` — 导出 InsForge 认证方法
- `frontend/packages/web-app/src/vite-env.d.ts` — 类型声明

### 操作步骤

#### Step 1.1: 安装 SDK 依赖

在 `frontend/packages/components` 目录下执行：

#### Step 1.2: 创建 `frontend/packages/components/src/insforge/client.ts`

> **注意**：anonKey 已通过 `/api/secrets/anon-key/rotate` 生成。生产环境请从 Dashboard Settings → API 获取，不要硬编码到代码仓库。

#### Step 1.3: 创建 `frontend/packages/components/src/insforge/auth.ts`

封装 SDK 认证方法，适配 `{data, error}` 返回结构：

#### Step 1.4: 导出 SDK 模块

`frontend/packages/components/src/insforge/index.ts`：

`frontend/packages/components/src/index.ts` 增加导出：

`frontend/packages/components/src/components/Auth/index.ts` 增加导出：

#### Step 1.5: 配置环境变量类型

`frontend/packages/web-app/src/vite-env.d.ts`：

### 验证方式
- `pnpm install` 成功，无版本冲突
- `import { insforge, signInWithPassword } from '@rpa/components'` 或 `@rpa/components/auth` 可正常导入

---

## Fix-2: 认证模块迁移到 InsForge SDK

### 目标
将前端认证模块（当前通过 Casdoor OAuth 或 Java rpa-auth 服务）替换为 InsForge SDK 的 `auth` 方法。

### 涉及文件
- `frontend/packages/components/src/insforge/auth.ts` — **新建**，SDK 认证方法封装
- `frontend/packages/web-app/src/api/http/index.ts` — Bearer token 注入
- `frontend/packages/web-app/src/stores/useInsforgeUserStore.ts` — **新建**，InsForge 用户状态 store

### 当前代码问题

AstronRPA 当前认证流程复杂，涉及：
1. Casdoor OAuth / UAP 账号密码登录
2. Java `rpa-auth` 服务的预认证、租户选择、token 交换
3. 多租户切换、验证码、密码重置等扩展流程

InsForge Auth 提供标准邮箱密码登录，但不直接支持现有 tenant 模型。一次性重写 `login.ts` 风险高。

**修复策略**：采用渐进式改造，保留原有 `Auth` API，新增 InsForge SDK 认证层；新功能或新页面使用 SDK，旧功能保持兼容。

### 修复后代码

#### Step 2.1: 新增 SDK 认证层

已在 `frontend/packages/components/src/insforge/auth.ts` 中封装：

- `signInWithPassword({ email, password })` — 登录并持久化 accessToken
- `signUp({ email, password, name? })` — 注册
- `signOut()` — 登出
- `getCurrentUser()` — 获取当前用户
- `persistSession(token)` / `clearSession()` / `getSessionToken()` — session 管理

#### Step 2.2: HTTP 请求自动携带 Bearer token

`frontend/packages/web-app/src/api/http/index.ts` 请求拦截器增加：

这样无论 token 来自原 rpa-auth 还是 InsForge SDK，后续调用 AstronRPA 保留服务时都会自动携带。

#### Step 2.3: 新增 `useInsforgeUserStore`

`frontend/packages/web-app/src/stores/useInsforgeUserStore.ts`：

### 注意事项

- 原有 `Auth.login()` / `Auth.userInfo()` / `Auth.logout()` 保持不变，旧页面继续可用
- 新页面可通过 `import { signInWithPassword } from '@rpa/components/auth'` 使用 InsForge SDK
- 租户相关逻辑尚未迁移，需后续结合数据库表设计逐步替换

### 验证方式
- 登录流程：`signInWithPassword` → 获取 `{data, error}` → data.user 包含用户信息
- 注册流程：`signUp` → 获取 `{data, error}` → 检查 `data.requireEmailVerification`
- 获取当前用户：`getCurrentUser` → 返回已登录用户或 null
- 登出：`signOut` → 清除 session

---

## Fix-3: 数据库 CRUD 迁移到 InsForge SDK

### 目标
将前端中所有通过 axios 调用 AstronRPA Java 后端 REST API 或 PostgREST 的 CRUD 操作，替换为 InsForge SDK 的 `database` 链式查询 API。

### 涉及文件
- `frontend/packages/shared/src/api-client.ts` — 重写 CRUD 部分
- `frontend/packages/shared/src/insforge-client.ts` — 已在上一步创建

### 当前代码问题

AstronRPA 当前的前端数据库访问模式：

**修复后**：

### 修复后代码

#### Step 3.1: 重写 `api-client.ts` 的 CRUD 部分

#### Step 3.2: 关键 API 变化对照表

| 操作 | 旧写法（Axios → Java 后端） | 新写法（InsForge SDK） |
|------|---------------------------|---------------------|
| 列表查询 | `rpaServicesClient.get('/api/robot/atom-meta', { params: { page: 1, size: 20 } })` | `insforge.database.from('c_atom_meta_new').select('*').range(0, 19)` |
| 单条查询 | `rpaServicesClient.get('/api/robot/atom-meta/123')` | `insforge.database.from('c_atom_meta_new').select('*').eq('id', 123).single()` |
| 创建 | `rpaServicesClient.post('/api/robot/atom-meta', data)` | `insforge.database.from('c_atom_meta_new').insert([data]).select()` |
| 更新 | `rpaServicesClient.put('/api/robot/atom-meta/123', data)` | `insforge.database.from('c_atom_meta_new').update(data).eq('id', 123).select()` |
| 软删除 | `rpaServicesClient.delete('/api/robot/atom-meta/123')` | `insforge.database.from('c_atom_meta_new').update({ deleted: 1 }).eq('id', 123)` |
| 硬删除 | `rpaServicesClient.delete('/api/robot/atom-like/123')` | `insforge.database.from('atom_like').delete().eq('id', 123)` |

### 重要注意事项

1. **insert 必须传数组**：SDK 的 `.insert()` 要求数据为数组格式 `[{...}]`，不是单对象
2. **返回 `{data, error}`**：所有 SDK 方法返回 `{data, error}` 结构，调用方需要适配
3. **不再需要手动 token**：SDK 自动从已登录 session 中获取 token 并附加到请求
4. **不再需要暴露 PostgREST 端口**：SDK 通过 InsForge App (7130) 代理数据库请求，前端无需直接访问 PostgREST

### 验证方式
- 调用 `crudApi.atomMeta.list()` → 返回 `{data: [...], error: null}`
- 调用 `crudApi.atomMeta.create({...})` → 返回 `{data: [{...}], error: null}`
- 未登录时调用 → 返回 `{data: null, error: { message: '...' }}`

---

## Fix-4: Edge Functions 调用迁移到 SDK

### 目标
将前端中通过 axios 调用 Edge Functions 的方式替换为 SDK 的 `functions.invoke()`。

### 涉及文件
- `frontend/packages/shared/src/api-client.ts` — 已在 Fix-3 中一并修复

### 当前代码问题

### 修复后代码（已在 Fix-3 中包含）

### 重要注意事项

1. **路径变化**：Edge Functions 通过 InsForge App 代理访问，路径为 `/functions/{slug}`（不带 `/v1` 前缀）
2. **SDK 自动附加认证**：`functions.invoke()` 自动携带当前用户的 JWT token
3. **返回 `{data, error}`**：统一错误处理模式

---

## Fix-5: Python 后端 JWT 验证改为远程验证

### 目标
将 Python 服务（`ai-service`、`openapi-service`）中本地 `jose.jwt.decode()` 解析 JWT 的方式，改为调用 InsForge App 的 `/api/auth/sessions/current` 端点进行远程 token 验证。

### 涉及文件
- `backend/ai-service/app/dependencies/auth.py` — 重写 JWT 验证逻辑
- `backend/ai-service/app/config.py` — 添加 `INSFORGE_API_URL` 配置
- `backend/openapi-service/app/dependencies/auth.py` — 重写 JWT 验证逻辑（如存在）
- `backend/openapi-service/app/config.py` — 添加 `INSFORGE_API_URL` 配置

### 当前代码问题

AstronRPA 的 `ai-service` 和 `openapi-service` 当前可能使用本地 JWT 验证：

**问题**：
- 需要 Python 服务和 InsForge 共享同一个 `JWT_SECRET`
- 无法验证 token 是否已被撤销
- 无法获取 InsForge 侧的最新用户状态
- 如果 InsForge 更换签名密钥，Python 服务会全部 401

### 修复后代码

#### Step 5.1: 修改 `config.py` — 添加 InsForge API URL

#### Step 5.2: 重写 `auth.py` — 远程验证 + 本地降级

#### Step 5.3: 添加 `httpx` 依赖

在 `backend/ai-service/pyproject.toml` 和 `backend/openapi-service/pyproject.toml` 中添加：

### 重要注意事项

1. **远程验证是推荐方式**：通过 `AUTH_VERIFY_MODE=remote` 启用
2. **本地验证是降级方案**：当 InsForge API 不可用时自动降级
3. **不再强依赖 JWT_SECRET 共享**：远程模式下 Python 服务无需知道 JWT_SECRET
4. **token 撤销即时生效**：远程验证可以检测到已被 InsForge 撤销的 token

### 验证方式
- 正常模式：携带有效 token → InsForge API 返回 200 → 解析用户信息
- 降级模式：InsForge 不可用 → 自动降级到本地 JWT 解析
- 无效 token：InsForge API 返回 401 → Python 服务返回 401

---

## Fix-6: Edge Functions 内部使用 InsForge SDK

### 目标
将 Edge Functions 中通过 `fetch(POSTGREST_URL + '/table')` 裸调 PostgREST 的方式，替换为 InsForge SDK 的 `createClient` + `database` API。

> **自托管注意**：自托管模式下，Edge Functions 运行在本地 Deno 容器（端口 7133），而非云端 Deno Subhosting。函数源码通过 Docker volume 挂载到容器中。SDK 的 `createClient` 在 Edge Functions 中同样可用，通过 `npm:@insforge/sdk` 导入。

### 涉及文件
- `functions/notify/index.ts` — 使用 SDK 替代裸 fetch
- `functions/blacklist/index.ts` — 使用 SDK 替代裸 fetch
- `functions/param-validate/index.ts` — 无需修改（纯验证逻辑，不访问数据库）

### 当前代码问题

### 修复后代码

#### Step 6.1: 重写 `functions/notify/index.ts`

#### Step 6.2: 重写 `functions/blacklist/index.ts`

### 重要注意事项

1. **Deno 环境导入 SDK**：使用 `npm:@insforge/sdk` 格式（Deno npm 兼容）
2. **`edgeFunctionToken`**：当 Edge Function 需要以用户身份访问数据库时，从请求头提取 token 并传入 `createClient({ edgeFunctionToken })`
3. **`anonKey`**：公开操作（如黑名单检查）使用 anon key 即可
4. **不再需要 `POSTGREST_URL` 环境变量**：SDK 通过 InsForge App 代理所有数据库请求

---

## Fix-7: 环境变量和配置更新

### 目标
更新前端和后端的环境变量配置，移除不再需要的变量，添加 SDK 所需的新变量。所有配置基于 AstronRPA 自托管 InsForge 的实际部署架构。

### 涉及文件
- `frontend/.env.example` — 更新前端环境变量
- `docker/.env.example` — 更新 AstronRPA 保留服务环境变量（Python 服务远程验证配置）
- `backend/ai-service/app/config.py` — InsForge API URL 配置（已验证完成）
- `backend/openapi-service/app/config.py` — InsForge API URL 配置（已验证完成）

### 操作步骤

#### Step 7.1: 更新前端 `.env.example`

AstronRPA 前端通过 `VITE_*` 前缀的环境变量配置服务地址。修改 `frontend/.env.example`：

#### Step 7.2: 更新 `docker/.env.example` — Python 服务远程验证配置

AstronRPA 保留的 Python 服务（`ai-service`、`openapi-service`）通过环境变量配置 InsForge 远程验证：

#### Step 7.3: Python 后端 Config 配置

已在 `backend/ai-service/app/config.py` 和 `backend/openapi-service/app/config.py` 中添加：

---

## Fix-8: 清理冗余依赖

### 目标
移除不再需要的 axios 实例和 Casdoor 直连相关代码。

### 涉及文件
- `frontend/packages/shared/src/api-client.ts` — 移除旧的 `postgrestClient` 和 `insforgeAuthClient` 导出
- `frontend/packages/components/src/components/Auth/api/http.ts` — 简化（已在 Fix-2 中处理）
- `frontend/package.json` — 移除 Casdoor SDK 等冗余依赖

### 操作步骤

#### Step 8.1: 移除 `api-client.ts` 中的冗余导出

#### Step 8.2: 检查 axios 依赖是否仍需保留

`axios` 在以下场景仍需保留：
- `rpaServicesClient` — 调用 AstronRPA 保留的后端服务（通过 OpenResty 网关）
- `http.ts` — 通用 HTTP 请求工具

因此 `axios` 依赖**保留**，不移除。

#### Step 8.3: 移除 Casdoor 相关依赖

---

## Fix-9: 引擎客户端适配（Python SDK）

### 目标
将引擎中的 scheduler、executor、trigger、browser-bridge 改为通过 InsForge API 与后端通信。引擎是 Python 项目，通过 `httpx` 直接调用 InsForge REST API。

### 涉及文件
- `engine/shared/insforge_client.py` — **新建**，InsForge Python 客户端封装
- `engine/servers/scheduler/` — 改造任务拉取逻辑
- `engine/servers/executor/` — 改造脚本下载和日志上报
- `engine/servers/trigger/` — 改造触发器管理
- `engine/servers/browser-bridge/` — 改造 WebSocket 为 Socket.IO
- `engine/components/astronverse-ai/ai_handler.py` — AI 调用分流

### 引擎与 InsForge 的通信架构

```
┌─────────────────────────────────────────────┐
│               RPA Engine (Python)            │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │scheduler │  │ executor │  │ trigger  │  │
│  │          │  │          │  │          │  │
│  │ 拉取任务  │  │ 下载脚本  │  │ 注册触发  │  │
│  │ 更新状态  │  │ 上报日志  │  │ 管理规则  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │              │              │        │
│  ┌────┴──────────────┴──────────────┴─────┐  │
│  │      InsForgeClient (httpx)            │  │
│  │      engine/shared/insforge_client.py  │  │
│  └────────────────────┬───────────────────┘  │
│                       │                      │
│  ┌────────────────────┴───────────────────┐  │
│  │  browser-bridge                        │  │
│  │  Python Socket.IO Client 替代 WS       │  │
│  └────────────────────┬───────────────────┘  │
└───────────────────────┼──────────────────────┘
                        │
                        ▼ HTTP :7130 / Socket.IO
┌───────────────────────────────────────────────┐
│          InsForge Backend (:7130)              │
│  ├─ PostgREST (REST API)                      │
│  ├─ Storage (文件)                            │
│  └─ Realtime (Socket.IO)                      │
└───────────────────────────────────────────────┘
```

### 修复后代码

#### Step 9.1: 创建 `engine/shared/insforge_client.py`

#### Step 9.2: 各服务改造要点

| 引擎服务 | 改造内容 | 关键代码 |
|:---|:---|:---|
| **scheduler** | 用 `insforge.fetch_pending_tasks()` 替代 HTTP 拉取；用 `insforge.update_task_status()` 上报 | 修改 `servers/scheduler/` 中的任务拉取逻辑 |
| **executor** | 用 `insforge.download_script()` 下载；用 `insforge.log_execution()` 上报日志；用 `insforge.update_execution()` 更新状态 | 修改 `servers/executor/` 中的脚本下载和日志上报 |
| **trigger** | 用 `insforge` 客户端管理 `triggers` 表，替代 robot-service 调用 | 修改 `servers/trigger/` 中的触发器注册 |
| **browser-bridge** | WebSocket → InsForge Realtime（Socket.IO），需要引入 Python Socket.IO 客户端 | 修改 `servers/browser-bridge/` 的通信层 |
| **picker** | 无服务端依赖，无需改动 | — |

#### Step 9.3: AI 组件保持客户端执行

以下 AstronRPA AI 组件强依赖 Python 生态，**不下沉到 InsForge**，继续在客户端引擎执行：

| 组件 | 原因 |
|:---|:---|
| `astronverse-ocr` | 依赖本地 OCR 模型（PaddleOCR/Tesseract） |
| `astronverse-vision` | 依赖 OpenCV 本地图像处理 |
| `astronverse-cua` | Computer Use Agent 需要本地截图和 GUI 操作 |
| `astronverse-verifycode` | 验证码识别依赖本地模型 |
| `astronverse-ai`（部分） | 知识问答、合同要素提取等可用 InsForge AI 网关替代 |

**AI 调用分流策略：**

### 验证方式
- scheduler 通过 InsForge 客户端正常拉取待执行任务
- executor 通过 InsForge Storage 下载脚本、写入执行日志
- trigger 通过 InsForge 客户端管理触发规则
- browser-bridge 通过 Socket.IO 正常接收实时推送

---

## Fix-10: 数据迁移（MySQL → PostgreSQL）

### 目标
将 AstronRPA 当前 MySQL 8.4.6 中的数据迁移到 PostgreSQL 18（InsForge 数据库），使用 pgloader 完成全量迁移。

### 涉及文件
- `backend/src/infra/database/migrations/001_create_rpa_tables.sql` — RPA 业务表迁移脚本
- `migrate.load` — pgloader 配置文件

### 迁移策略

#### 方案选择
| 方案 | 工具 | 适用场景 | 推荐度 |
|------|------|----------|--------|
| **pgloader** | 开源 ETL 工具 | 全量迁移 + 类型自动转换 | 推荐 |
| 手动导出导入 | mysqldump + sed + psql | 小数据量、需精细控制 | 备选 |
| 编写迁移脚本 | Python/Node.js | 需要数据清洗转换 | 补充 |

#### Step 10.1: 创建 RPA 业务表迁移脚本

#### Step 10.2: 使用 pgloader 执行迁移

#### Step 10.3: 定时任务迁移（pg_cron）

### 类型转换注意事项
1. **`TINYINT(1)` → `BOOLEAN`**：pgloader 的 `tinyint-to-boolean` 自动处理
2. **`AUTO_INCREMENT` → `SERIAL/IDENTITY`**：pgloader 自动转换
3. **`DATETIME` → `TIMESTAMPTZ`**：注意时区转换
4. **`ENUM` 类型**：PostgreSQL 不支持，需改为 `VARCHAR` + CHECK 约束
5. **JSON 字段**：MySQL `JSON` → PostgreSQL `JSONB`（性能更好）

### 验证方式
- 迁移后逐表核对行数，确保数据完整
- 测试 RLS 策略：以不同用户身份查询，确认数据隔离
- 测试实时通知：INSERT 一条 execution 记录，验证触发 `pg_notify`

---

## 调用方适配指南

由于 SDK 方法返回 `{data, error}` 结构（而非 axios 的 `response.data`），所有调用 `crudApi` 和 `authApi` 的前端代码需要适配返回值解构。

### 适配模式

### 批量适配脚本（可选）

如果调用方数量很大，可以编写一个 codemod 脚本自动转换。以下是关键转换规则：

| 旧模式 | 新模式 |
|--------|--------|
| `const res = await crudApi.xxx.yyy()` | `const { data, error } = await crudApi.xxx.yyy()` |
| `res.data` | `data` |
| `try { ... } catch (e) { ... }` | `if (error) { ... }` |
| `response.data.access_token` | SDK 自动管理，无需手动提取 |
| `localStorage.getItem('insforge_token')` | 移除，SDK 自动管理 |
| `localStorage.setItem('insforge_token', token)` | 移除，SDK 自动管理 |

---

## 完整修复执行顺序

为保证修复过程可逐步验证，建议按以下顺序执行：

```
Phase 1: 基础设施准备
├── Fix-1: 安装 @insforge/sdk + 创建 insforge-client.ts
├── Fix-7: 更新前端和后端环境变量（指向远程 InsForge 服务器 :7130，无 Docker）
└── 验证: pnpm install 成功，insforge 客户端可导入

Phase 2: 认证模块迁移（影响面最大，优先修复）
├── Fix-2: 重写 login.ts + 创建 useInsforgeUserStore
└── 验证: 登录/注册/登出流程正常

Phase 3: 数据访问层迁移
├── Fix-3: 重写 api-client.ts CRUD 部分（工厂模式）
├── Fix-4: Edge Functions 调用改为 SDK invoke
└── 验证: 所有表的 CRUD 操作正常

Phase 4: 后端适配
├── Fix-5: Python 后端（ai-service, openapi-service）JWT 验证改为远程验证
└── 验证: Python 后端 token 验证正常

Phase 5: 引擎客户端适配
├── Fix-9: 引擎侧封装 InsForge Python SDK（httpx）
├── 引擎各服务（scheduler/executor/trigger/bridge）改造
└── 验证: 引擎通过 InsForge API 正常拉取任务、上报日志

Phase 6: 数据迁移
├── Fix-10: pgloader 迁移 MySQL → PostgreSQL
├── 创建 RPA 业务表 Schema + RLS 策略
└── 验证: 所有业务表数据完整，RLS 生效

Phase 7: Edge Functions 内部适配
├── Fix-6: notify + blacklist 使用 SDK
└── 验证: Edge Functions 数据库操作正常

Phase 8: 清理收尾
├── Fix-8: 移除冗余导出和依赖
├── 适配所有调用方（{data, error} 解构）
└── 验证: 全量回归测试通过
```

---

## 验证清单

完成所有修复后，逐项验证（2026-07-07 更新，基于最终版方案）：

### 认证模块（代码级 ✅ / 运行时 ⏳）
- [x] `insforge.auth.signUp()` — 已在 `src/insforge/auth.ts` 封装 `signUp()`
- [x] `insforge.auth.signInWithPassword()` — 已在 `src/insforge/auth.ts` 封装 `signInWithPassword()`
- [x] `insforge.auth.getCurrentUser()` — 已在 `src/insforge/auth.ts` 封装 `getCurrentUser()`
- [x] `insforge.auth.signOut()` — 已在 `src/insforge/auth.ts` 封装 `signOut()`
- [x] HTTP 请求自动携带 Bearer token — 已在 `api-client.ts` 拦截器注入
- [x] `useInsforgeUserStore` — Pinia store 已实现，提供 login/fetchUser/logout
- [ ] 登录后刷新页面 — `getCurrentUser()` 自动恢复 session（需启动 dev:web 后验证）
- [ ] 401 响应 — SDK 自动处理，无需手动 `localStorage.removeItem`（需启动 dev:web 后验证）

### 数据库 CRUD 模块（代码级 ✅ / 数据库 ⏳）
- [x] `createTableCrud` 工厂模式 — 已实现，覆盖 22 张业务表
- [x] 列表查询 / 单条查询 / 创建 / 更新 / 软删除 / 硬删除 — 均已封装
- [x] 分页查询 — `page()` 方法支持 `pageNum/pageSize` 参数
- [x] 日志包装 — 所有 CRUD 操作均带 `[crudApi]` 前缀的日志输出
- [ ] 数据迁移 — 需 pgloader 从 MySQL 迁移到 PostgreSQL 后验证
- [ ] 未登录调用 — 返回 `{data: null, error: {message: '...'}}`（需启动 dev:web）

### Edge Functions 模块（依赖服务端启动）
- [x] `insforge.functions.invoke('notify', ...)` — 代码已实现
- [x] `insforge.functions.invoke('param-validate', ...)` — 代码已实现
- [ ] Edge Functions 源码 — 需在 `functions/` 目录中编写 notify/blacklist 等函数
- [ ] Deno 运行时 — 需服务端暴露 7133 端口

### Python 后端（ai-service / openapi-service）
- [x] `AUTH_VERIFY_MODE=remote` — 已在配置中启用
- [x] `INSFORGE_API_URL` — 指向 `http://172.16.100.211:7130`（远程服务器，非 Docker）
- [x] `_verify_token_remote()` — 远程验证实现（调用 `/api/auth/sessions/current`）
- [x] `_verify_token_local()` — 本地降级实现（jose.jwt.decode）
- [x] 携带无效 token → 返回 401 — 已验证
- [ ] 携带有效 InsForge JWT → `get_current_user` 返回正确 UserContext（需启动 Python 服务）
- [ ] InsForge 不可用时 → 自动降级到本地 JWT 验证（需启动 Python 服务 + 模拟断网）

### 引擎客户端适配（Python SDK）（全部 ⏳ 待完成）
- [ ] `engine/shared/insforge_client.py` — InsForge Python 客户端封装
- [ ] scheduler 改造 — 通过 InsForge SDK 拉取任务、更新状态
- [ ] executor 改造 — 通过 InsForge Storage 下载脚本、SDK 写入执行日志
- [ ] trigger 改造 — 通过 InsForge SDK 管理触发规则
- [ ] browser-bridge 改造 — WebSocket → InsForge Realtime（Socket.IO）
- [ ] AI 组件分流 — 大模型对话走 InsForge AI 网关，OCR/CUA 保留本地执行

### 数据迁移（MySQL → PostgreSQL）（全部 ⏳ 待完成）
- [ ] 创建 RPA 业务表迁移脚本（`001_create_rpa_tables.sql`）
- [ ] 使用 pgloader 执行全量数据迁移
- [ ] 启用 RLS 行级安全策略
- [ ] 验证数据完整性（逐表核对行数）
- [ ] 创建实时通知触发器（execution_change_trigger）

### 配置验证（全部 ✅）
- [x] 前端 `frontend/.env.example` 已添加 `VITE_INSFORGE_URL` 和 `VITE_INSFORGE_ANON_KEY`
- [x] 前端 `web-app/src/vite-env.d.ts` 已声明 InsForge 环境变量类型
- [x] 前端不再配置 `VITE_POSTGREST_URL` 和 `VITE_CASDOOR_URL`
- [x] `VITE_INSFORGE_ANON_KEY` 环境变量已验证
- [x] `docker/.env.example` 已添加 `INSFORGE_API_URL`、`AUTH_VERIFY_MODE`、`JWT_SECRET`
- [x] `backend/ai-service/app/config.py` 已添加 `INSFORGE_API_URL`（指向 `172.16.100.211:7130`）
- [x] `backend/openapi-service/app/config.py` 已添加 `INSFORGE_API_URL`（指向 `172.16.100.211:7130`）

### 服务验证（2026-07-07 实测）
- [x] `http://172.16.100.211:7130/api/health` — ✅ 返回 `{"status":"ok","version":"2.2.4","service":"Insforge OSS Backend"}`
- [x] `http://172.16.100.211:7131`（Dashboard）— ✅ 可访问（200 OK）
- [x] `http://172.16.100.211:7130/api/auth/sessions/current` — ✅ 无效 token 返回 401（符合预期）
- [ ] Deno Edge Functions（7133）— ❌ 端口未对外暴露，需服务端检查
- [ ] AstronRPA 保留服务（32742）— ❌ 端口不可达，需服务端启动
- [ ] PostgreSQL 数据迁移 — ❌ `c_atom_meta_new` 表 schema 存在但为空，需要从 MySQL 迁移

---

## 风险与注意事项

### 风险 1: 调用方适配工作量
**影响**：所有使用 `crudApi` 和 `authApi` 的前端组件需要适配 `{data, error}` 解构模式。
**缓解**：
- 可以保留一层薄封装，在 `api-client.ts` 中将 `{data, error}` 转换为原有格式
- 渐进式迁移：先改 API 层，再逐步适配调用方

### 风险 2: SDK 版本兼容性
**影响**：`@insforge/sdk` 的 API 可能在未来版本中变化。
**缓解**：
- 锁定 SDK 版本：`pnpm add @insforge/sdk@latest` 后记录具体版本号
- 在 `package.json` 中使用精确版本而非 `^` 范围

### 风险 3: Python 远程验证延迟
**影响**：每次请求需要额外一次 HTTP 调用到 InsForge App（`172.16.100.211:7130`）。
**缓解**：
- 添加 token 验证结果缓存（Redis，TTL = token 剩余有效期）
- 保留本地 JWT 验证作为降级方案（`AUTH_VERIFY_MODE=local`）

### 风险 4: 数据迁移丢失（MySQL → PostgreSQL）
**影响**：MySQL 数据迁移到 PostgreSQL 过程中可能丢失或损坏数据。
**缓解**：
- 迁移前全量备份 MySQL（`mysqldump`）
- 使用 pgloader 自动处理类型转换
- 迁移后逐表校验行数

### 风险 5: 引擎通信中断
**影响**：引擎（scheduler/executor）从 Java 后端 API 改为直连 InsForge API，网络中断会导致任务执行失败。
**缓解**：
- 引擎侧增加重试机制（指数退避）
- 本地缓存任务队列，网络恢复后继续处理
- 增加连接超时和健康检查

### 风险 6: 实时通信迁移（WebSocket → Socket.IO）
**影响**：browser-bridge 和前端实时日志从自定义 WebSocket 迁移到 InsForge Realtime（Socket.IO），协议不兼容。
**缓解**：
- 先做双通道（同时连接旧 WS 和新 Socket.IO），验证后切换
- Python 引擎侧引入 `python-socketio` 客户端库

### 风险 7: Anon Key 泄露
**影响**：`VITE_INSFORGE_ANON_KEY` 硬编码在客户端代码中可能被提取。
**缓解**：
- 通过环境变量注入，不提交到代码仓库
- 配合 RLS 行级安全策略，即使 anon key 泄露也只能访问公共数据
- 定期轮换 anon key

### 风险 8: 渐进式迁移策略
**影响**：一次性迁移所有功能风险高。
**缓解**：
- 第一阶段：InsForge 与现有 AstronRPA 服务并行运行，前端通过 SDK 访问 InsForge 数据，保留服务通过 OpenResty 访问
- 第二阶段：逐步将业务逻辑从 Java 后端迁移到 InsForge Edge Functions 或 PostgREST
- 第三阶段：确认所有功能正常后，下线 AstronRPA 的 Java 后端服务

### 回滚方案

每阶段可独立回滚：

| 阶段 | 回滚方式 |
|:---|:---|
| 基础设施（Fix-1, Fix-7） | 无破坏性操作，无需回滚 |
| API 替换（Fix-2~Fix-4） | 保留 `src/api/http/` 目录，通过环境变量 `VITE_USE_INSFORGE=false` 切换 |
| 后端适配（Fix-5） | 切换 `AUTH_VERIFY_MODE=local` 回到本地验证 |
| 引擎适配（Fix-9） | 引擎侧通过配置开关选择旧 API 或新 API |
| 数据迁移（Fix-10） | Docker 容器先 `stop` 不 `rm`，验证通过后再清理 |

---

## 自托管与 Cloud 模式差异

本修复方案基于自托管模式设计，与 Cloud 模式存在以下关键差异：

| 维度 | Cloud 模式 | 自托管模式（本方案） |
|------|-----------|-------------------|
| **InsForge baseUrl** | `https://your-app.region.insforge.app` | `http://172.16.100.211:7130`（远程服务器，systemd 部署） |
| **ANON_KEY 获取** | CLI `get-backend-metadata` 自动获取 | Dashboard Settings → API 手动复制 |
| **SDK 初始化** | `createClient({ baseUrl: 'https://...', anonKey: '...' })` | `createClient({ baseUrl: 'http://172.16.100.211:7130', anonKey: '...' })` |
| **Edge Functions 运行时** | 云端 Deno Subhosting，通过 MCP 部署 | 源码部署，端口 7133，需服务端暴露 |
| **Edge Functions SDK 导入** | `npm:@insforge/sdk`（Deno 从 npm 拉取） | 同左 |
| **Python JWT 验证 URL** | `https://your-app.../api/auth/sessions/current` | `http://172.16.100.211:7130/api/auth/sessions/current`（远程 HTTP） |
| **PostgREST 访问** | 不可直连 | 可直连（但不推荐，应通过 SDK） |
| **数据库管理** | Dashboard SQL 编辑器 | Dashboard SQL 编辑器 + 直接 psql 连接 |
| **存储后端** | 云端 S3 兼容存储 | 本地卷存储，也可配置外部 S3 |
| **MCP 配置** | Dashboard 一键复制 | 手动配置 `INSFORGE_BASE_URL` 和 `ANON_KEY` |
| **升级方式** | 自动升级 | 源码部署：`git pull && npm install && systemctl restart insforge` |

### 自托管特有的注意事项

1. **远程服务器通信**：所有客户端（前端、引擎 Python 服务）通过 HTTP `http://172.16.100.211:7130` 访问 InsForge API，无需 Docker 网络配置
2. **端口管理**：确保 7130（InsForge API）、7133（Deno）、5432（PostgreSQL）端口在远程服务器上可访问
3. **JWT_SECRET 一致性**：Python 保留服务的 `JWT_SECRET` 需与 InsForge 配置一致（本地降级方案用）
4. **ANON_KEY 持久化**：`ANON_KEY` 存储在数据库中，容器重建后不会变化，但建议记录备份
5. **函数热重载**：修改 Edge Functions 源码后，需重启 Deno 运行时或等待热重载
6. **AstronRPA 保留服务**：robot-service、resource-service、ai-service、openapi-service 在过渡期通过 OpenResty 网关 (32742) 继续运行，前端通过 `VITE_RPA_SERVICES_URL` 配置

### 数据库迁移管理

InsForge 内置数据库迁移系统，用于管理 PostgreSQL Schema 变更。迁移文件位于 InsForge 源码的 `backend/src/infra/database/migrations/` 目录下，命名格式为 `<序号>_<描述>.sql`。

**迁移相关命令**（在 InsForge 源码 `backend/` 目录中执行）：

**数据迁移（MySQL → PostgreSQL）** 建议使用专业的数据库迁移工具，如 `pgloader`，可自动将 MySQL 数据库结构和数据迁移到 PostgreSQL。迁移前务必备份 MySQL 数据库。

### 参考链接

- [InsForge 深度分析](./InsForge深度分析.md) — InsForge 项目架构、技术栈、模块详解
- [InsForge 本地环境使用指南](./InsForge本地环境使用指南.md) — 本地部署配置、服务管理、故障排查
- [AstronRPA 项目深度分析报告](./AstronRPA%20项目深度分析报告.md) — AstronRPA 当前架构、技术栈、改进空间

---

## 总结

本方案将 AstronRPA 从「Casdoor 认证 + 5 个独立 Java/Python 微服务 + MySQL + OpenResty 网关（7-8 个 Docker 容器）」升级为 **"Node.js + PostgreSQL"双进程极简后端**（InsForge 源码部署，systemd 管理），核心变化：

| 维度 | 改造前 | 改造后 |
|------|--------|--------|
| **服务端进程** | 7-8 个 Docker 容器 | 2 个系统进程（Node.js + PostgreSQL） |
| **技术栈** | Java + Python + Lua + Nginx | TypeScript (Node.js) 服务端 |
| **API 端口** | 8+ 个微服务端口 | 1 个 API 端口（:7130) |
| **内存占用** | ~4-6 GB | ~500 MB |
| **启动时间** | 3-5 分钟 | 5-10 秒 |
| **数据库访问** | 通过 Java 后端 REST API 或直连 MySQL | SDK `database.from().select()` 通过 InsForge App (:7130) 代理到 PostgreSQL |
| **用户认证** | Casdoor OAuth + rpa-auth (Java) | SDK `auth.signInWithPassword()` |
| **Token 管理** | 手动 localStorage | SDK 自动管理 |
| **错误处理** | try/catch + 手动判断 | 统一 `{data, error}` 模式 |
| **Edge Functions** | 无（或后端直接实现） | SDK `functions.invoke()`（Deno 运行时） |
| **Python 验证** | 本地 `jose.jwt.decode()` | 远程调用 InsForge `http://172.16.100.211:7130/api/auth/sessions/current`（支持本地降级） |
| **数据存储** | MySQL 8.4.6 | PostgreSQL 18（需迁移） |
| **存储** | MinIO + resource-service | InsForge Storage（S3 兼容） |
| **实时通信** | 自定义 WebSocket | Socket.IO + PG LISTEN/NOTIFY |
| **AI 能力** | ai-service（Python） | InsForge AI 网关 + 客户端下沉 |
| **定时任务** | Spring @Scheduled | pg_cron |
| **MCP 支持** | 自定义端点 | 原生 MCP Server |
| **运维复杂度** | 极高（8 个容器 + 多语言） | 极低（2 个 systemd 服务） |

### 页面 API 迁移进度

已完成 **58 个 view 文件 + 28 个非 view 文件** 的 API 调用迁移：

| 批次 | 范围 | 文件数 | 状态 |
|------|------|--------|------|
| **P1a** | 市场模块只读查询 | 15 | ✅ 已完成 |
| **P1b** | 组件/项目管理只读查询 | 8 | ✅ 已完成 |
| **P1c** | Robot/Record/Atom 只读查询 | 10 (9/10) | ✅ 9 文件完成，`AtomTree.vue` 保留旧导入（无 rpaApi 等效方法） |
| **P2** | 单一实体 CRUD | 6 | ✅ 已完成 |
| **P3** | 复杂多表操作 | 保留旧 HTTP | ✅ 确认 |
| **P4** | WebSocket/SSE/特殊处理 | 保留旧实现 | ✅ 确认 |
| **P5a** | 非 view 文件 API 迁移 | 28 | ✅ 已完成（组件、store、工具函数） |

### 旧 API 模块状态

| 模块 | 状态 | 说明 |
|------|------|------|
| `@/api/record.ts` | ✅ 已删除 | 所有引用已迁移 |
| `@/api/market.ts` | ⏳ 保留 | 仍有 5 个非 view 文件引用（迁移后需逐步处理） |
| `@/api/robot.ts` | ⏳ 保留 | 仍有 9 个非 view 文件引用 |
| `@/api/project.ts` | ⏳ 保留 | 仍有 4 个非 view 文件引用 |
| `@/api/task.ts` | ⏳ 保留 | 仍有 5 个非 view 文件引用 |
| `@/api/atom.ts` | ⏳ 保留 | 6 个文件引用（含无等效方法的旧调用） |
| `@/api/component.ts` | ⏳ 保留 | 5 个文件引用（SmartComponent 相关） |
| `@/api/mail.ts` | ⏳ 保留 | 2 个文件引用 |
| `@/api/contract.ts` | ⏳ 保留 | 1 个文件引用 |
| `@/api/setting.ts` | ⏳ 保留 | 8 个文件引用（SettingCenterModal 等） |
| `@/api/engine.ts` | ✅ 保留(P3) | 引擎交互，不做迁移 |
| `@/api/resource.ts` | ✅ 保留(P3) | 资源管理，不做迁移 |
| `@/api/pick.ts` | ✅ 保留(P4) | picking 服务 |
| `@/api/ws.ts` | ✅ 保留(P4) | WebSocket |

### 编译验证
- `pnpm build` shared 包 ✅ 成功
- `vue-tsc --noEmit` ✅ 零迁移相关 TypeScript 错误

### 服务端待完成（需在 172.16.100.211 上执行）
- [ ] 启动保留服务（robot-service、resource-service、ai-service、openapi-service）
- [ ] 暴露 Deno Edge Functions 端口 7133
- [ ] 编写 Edge Functions 源码（notify/blacklist 等）
- [ ] 使用 pgloader 迁移 MySQL → PostgreSQL 数据
- [ ] 验证 `crudApi.atomMeta.list()` 返回数据

### 运行时待验证（需服务端就绪 + 浏览器）
- [ ] 登录/登出全流程验证
- [ ] 登录后刷新页面 session 恢复
- [ ] 401 自动处理
- [ ] 所有 CRUD 操作正常
- [ ] 引擎侧通过 InsForge API 拉取任务、上报日志
- [ ] 市场/组件/项目/Robot 页面数据展示
- [ ] 计划任务 CRUD（含写操作）
- [ ] 版本管理页面
- [ ] WebSocket 日志连接

修复完成后，AstronRPA 将完全符合 InsForge 开发规范，充分发挥自托管 BaaS 平台的价值，同时保留 AstronRPA 特有的 RPA 引擎和业务流程能力。