# AGENTS.md

Guidance for AI coding agents working in the **astron-rpa** (AstronRPA)
repository — an agent-ready RPA suite with out-of-the-box automation tools for
desktop applications, web systems, and business-process automation.

AstronRPA uses a **server–client** architecture: backend services are powered
by [InsForge](https://insforge.dev) (BaaS, source-deployed on
`172.16.100.211`), and the client (RPA engine + desktop app) is packaged and
run on the machine that executes RPA tasks. The client toolchain is
Windows-first.

> **后端轻量化改造方案**：详见 [后端轻量化改造-InsForge规范方案](./zheng-docs/后端轻量化改造-InsForge规范方案.md) 和 [轻量化改造-未完成清单](./zheng-docs/轻量化改造-未完成清单.md)。
> 该方案将 AstronRPA 从「Casdoor 认证 + 5 个独立微服务 + MySQL + OpenResty 网关」架构（Docker 容器），
> 逐步替换为 **InsForge BaaS 平台 + PostgreSQL（无 Docker 双进程架构）**。
> - 前端通过 `@insforge/sdk` 直连 InsForge API
> - 引擎通过 Python SDK（`engine/shared/insforge_client.py`）直连
> - 保留的 Python 服务（ai-service、openapi-service）通过远程 JWT 验证协作

## Project layout

This is a multi-language monorepo driven by a unified `Makefile` (with modular
includes under `makefiles/`).

- `backend/` — server-side services（过渡阶段，逐步迁移到 InsForge）:
  - `src/infra/database/migrations/` — PostgreSQL DDL migration scripts（RPA 业务表）
  - `robot-service/`, `resource-service/`, `rpa-auth/` — Java / Spring Boot
    services (Maven; each ships `checkstyle.xml`, `pmd-ruleset.xml`,
    `spotbugs-exclude.xml`).
    - `rpa-auth/` 已被 InsForge Auth 替代
    - `robot-service/`、`resource-service/` 过渡期保留，通过 `VITE_RPA_SERVICES_URL` 访问
  - `ai-service/`, `openapi-service/` — Python services (managed with `uv`).
    - 过渡期保留，通过 InsForge API 远程验证 JWT（`AUTH_VERIFY_MODE=remote`）
- `engine/` — the Python RPA execution engine (managed with `uv`, linted with
  `ruff`): `main.py`, `components/` (RPA components), `servers/`, `shared/`.
  - `shared/insforge_client.py` — InsForge Python SDK 封装（直连认证/Robot/数据/文件 API）
- `frontend/` — pnpm workspace monorepo (Vue 3 + TypeScript, Vitest, ESLint,
  i18n under `locales/`). Notable packages under `frontend/packages/`:
  `electron-app` (desktop client), `web-app` (web console), `browser-plugin`,
  `auth-app`, `cli`, `components`, `shared`.
- `functions/` — Edge Functions（Deno TypeScript，部署到 InsForge Deno 运行时 `:7133`）:
  - `notify/index.ts` — 通知发送（email/sms/in_app）
  - `blacklist/index.ts` — 黑名单检查（user_id/email/ip）
  - `deno.json` — Deno TypeScript 配置
- `docker/` — Docker Compose manifests（保留服务，已逐步去容器化）。
- `makefiles/` — modular Make components (`common.mk`, `python.mk`, `java.mk`,
  `typescript.mk`, `go.mk`, `git.mk`).
- `resources/` — packaged client resources. `docs/`, `FAQ.md`, `BUILD_GUIDE.md`
  — documentation.
- `migrate.load` — pgloader 配置文件，用于 MySQL → PostgreSQL 数据迁移

## Toolchain

- **Python 3.13.x** + **uv 0.8+** — RPA engine and Python services.
- **Node.js 22+** + **pnpm 9+** — frontend workspace.
- **Java JDK 8+** + **Maven** — Java backend services.
- **Docker & Docker Compose** — server deployment.
- Windows client packaging also needs **SWIG** (Python↔C/C++ bindings, e.g.
  `pywinhook`) and **7-Zip** (deployment archives). See `BUILD_GUIDE.md`.

## Common commands

Quality and git workflow are driven by the root `Makefile` (run `make help` to
see detected projects and targets):

- `make install-tools` — install the formatting/linting toolchain.
- `make fmt` — format across languages (`fmt-python`, `fmt-java`, `fmt-ts`, …).
- `make check` (alias `make lint`) — format check + linters
  (`check-python`, `check-java`, `check-ts`, …). CI is check-only; it does not
  auto-fix.
- `make new-feature name=<short-name>` / `make new-bugfix name=<short-name>` —
  branch helpers following the project's branch strategy.

Pre-commit hooks (install with `pre-commit install`) format the engine with
ruff: `uv run --project engine --dev ruff format ./engine`.

### Backend（无 Docker 双进程架构）

InsForge 后端部署在远程服务器 `172.16.100.211`（源码部署 + systemd），提供认证、数据库、存储、Edge Functions 等全部后端能力：

```bash
# 查看 InsForge 服务状态（在 172.16.100.211 上执行）
sudo systemctl status insforge.service

# InsForge API: http://172.16.100.211:7130
# InsForge Dashboard: http://172.16.100.211:7131
# Deno Edge Functions: http://172.16.100.211:7133
```

过渡期保留的 AstronRPA 服务（robot-service、resource-service、ai-service、openapi-service）部署在 `172.16.100.211` 上，通过环境变量 `INSFORGE_API_URL` 远程验证 JWT：

```bash
# 过渡期配置（docker/.env.example）
AUTH_VERIFY_MODE=remote        # Python 服务通过 InsForge API 远程验证 JWT
INSFORGE_API_URL=http://172.16.100.211:7130
JWT_SECRET=...                  # 与 InsForge JWT_SECRET 一致
```

**架构要点**：
- 前端（`@insforge/sdk`）直连 `:7130`，不走网关
- 引擎（`insforge_client.py`）直连 `:7130`
- 过渡期保留的 Java/Python 服务也直连 `:7130`（远程 JWT 验证）
- 单端口（`:7130`）对外暴露，无 Docker 容器依赖

### Build the client (Windows)

```bash
# full build (engine + frontend desktop app) from the repo root
./build.bat --python-exe "C:\Program Files\Python313\python.exe"
./build.bat --skip-frontend   # engine only
./build.bat --skip-engine     # frontend only
```

The packaged installer is written to `frontend/packages/electron-app/dist/`.

### Frontend (pnpm workspace, from `frontend/`)

```bash
pnpm install
pnpm dev:web         # run the web console in dev
pnpm dev:desktop     # run the desktop app in dev
pnpm build:desktop   # build the Windows desktop app
```

## Testing instructions

There is no aggregate `make test`; run tests per component:

- **Frontend**: `pnpm test` (Vitest) or `pnpm test:run` for a single run.
- **Python** (`engine`, `backend/ai-service`, `backend/openapi-service`):
  `uv run pytest` within the project where tests exist (e.g. `backend/ai-service`
  has a `tests/` directory).
- **Java** (`backend/robot-service`, `resource-service`, `rpa-auth`):
  `mvn test` within the service directory.

Run `make check` and the relevant tests before opening a PR, and add or update
tests for code you change.

## Code style

Formatting and linting are wired through `make fmt` / `make check`:

| Language        | Format / Lint                                                        |
| --------------- | -------------------------------------------------------------------- |
| Python          | `ruff` format + `ruff` check (see `engine/.ruff.toml`)               |
| Java            | Checkstyle + PMD + SpotBugs (per-service configs)                     |
| TypeScript/Vue  | ESLint (`frontend/eslint.config.mjs`); `pnpm lint` / `pnpm lint:fix` |

## PR instructions

- Create branches with the Make helpers (`make new-feature name=<…>`).
- Run `make check` and the relevant component tests before committing; make sure
  pre-commit hooks pass.
- Keep PRs focused and write clear, conventional commit messages.
- For build and deployment details, see `BUILD_GUIDE.md`.

---

# InsForge SDK Documentation

> InsForge 后端部署在远程服务器 `172.16.100.211`（源码部署 + systemd），详情见 [InsForge 本地环境使用指南](./zheng-docs/InsForge本地环境使用指南.md)。
>
> **AstronRPA 集成方案**：详见 [后端轻量化改造-InsForge规范方案](./zheng-docs/后端轻量化改造-InsForge规范方案.md)，包含 SDK 客户端创建、认证迁移、CRUD 迁移、Edge Functions 适配等完整步骤。
> 
> **MCP Server 配置**：
> - API Key: `ik_71ebd83cad88edeeb2dc7c21d5cdd6772a490066ccc5da7a34b585000ba3edef`
> - API_BASE_URL: `http://172.16.100.211:7130`
> - Dashboard: `http://172.16.100.211:7131`
>
> 注意：API Key 与 anonKey 不同。API Key 用于 MCP Server/管理操作；anonKey 用于前端 SDK 初始化。

## What is InsForge?

Backend-as-a-service (BaaS) platform providing:

- **Database**: PostgreSQL with PostgREST API
- **Authentication**: Email/password + OAuth (Google, GitHub)
- **Storage**: File upload/download
- **AI**: OpenRouter key provisioning and model catalog for direct OpenAI-compatible integrations
- **Functions**: Serverless function deployment
- **Realtime**: WebSocket pub/sub (database + client events)

## Installation

### Step 1: Install SDK

```bash
npm install @insforge/sdk@latest
```

### Step 2: Create SDK Client

```javascript
import { createClient } from '@insforge/sdk';

const client = createClient({
  baseUrl: 'http://172.16.100.211:7130',   // 自托管 InsForge 后端地址
  // 本地开发环境 anonKey，已通过 /api/secrets/anon-key/rotate 生成
  // 注意：生产环境请通过 Dashboard Settings → API 获取，不要硬编码到代码仓库
  anonKey: 'anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f'
});
```

**API BASE URL**: `http://172.16.100.211:7130`

## Getting Detailed Documentation

### Always Fetch Documentation Before Writing Code

InsForge provides official SDKs and REST APIs:

- [TypeScript SDK](/sdks/typescript/overview) - JavaScript/TypeScript
- [Swift SDK](/sdks/swift/overview) - iOS, macOS, tvOS, and watchOS
- [Kotlin SDK](/sdks/kotlin/overview) - Android and Kotlin Multiplatform
- [REST API](/sdks/rest/overview) - Direct HTTP API access

Before writing or editing any InsForge integration code, call InsForge MCP's `fetch-docs` tool to get the latest SDK documentation.

### Available `fetch-docs` Documentation Types

| Type | Description |
|------|-------------|
| `"instructions"` | Essential backend setup (START HERE) |
| `"real-time"` | Real-time pub/sub via WebSockets |
| `"db-sdk-typescript"` | Database operations with TypeScript SDK |
| `"auth-sdk-typescript"` | Auth with TypeScript SDK (custom flows) |
| `"auth-components-react"` | Pre-built auth UI for React+Vite |
| `"auth-components-react-router"` | Pre-built auth UI for React+Vite+React Router |
| `"auth-components-nextjs"` | Pre-built auth UI for Next.js |
| `"storage-sdk"` | File storage operations |
| `"functions-sdk"` | Serverless functions invocation |
| `"ai-integration-sdk"` | AI integration with OpenRouter |
| `"deployment"` | Deploy frontend applications |
| `"payments"` | Stripe Checkout, Billing Portal |

### Available `fetch-sdk-docs` Types

**Feature types**: `db`, `storage`, `functions`, `auth`, `ai`, `realtime`, `payments`

**Languages**: `typescript`, `swift`, `kotlin`, `rest-api`

## When to Use SDK vs MCP Tools

### Always Use SDK for Application Logic:

- Authentication (register, login, logout, profiles)
- Database CRUD (select, insert, update, delete)
- Storage operations (upload, download files)
- AI integration via OpenRouter with OpenAI SDK
- Serverless function invocation
- Payments checkout and customer portal session creation

### Use MCP Tools for Infrastructure:

- Project scaffolding (`download-template`)
- Backend setup and metadata (`get-backend-metadata`)
- Database schema management (`run-raw-sql`, `get-table-schema`)
- Storage bucket management (`create-bucket`, `list-buckets`, `delete-bucket`)
- Serverless function deployment (`create-function`, `update-function`, `delete-function`)
- Frontend deployment (`create-deployment`)

## Important Notes

- SDK returns `{data, error}` structure for all operations
- Database inserts require array format: `[{...}]`
- Serverless functions have one endpoint and do not support nested route paths
- Storage: Upload files to buckets, store URLs in database
- AI integrations call OpenRouter directly with `baseURL: "https://openrouter.ai/api/v1"` and a server-side `OPENROUTER_API_KEY`
- **Extra Important**: Use Tailwind CSS 3.4 (do not upgrade to v4). Lock these dependencies in `package.json`
