
# AstronRPA 项目深度分析报告

## 一、项目概览

**AstronRPA** 是由科大讯飞开源的企业级 RPA（机器人流程自动化）平台，采用 **Server-Client 分离架构**。服务端通过 Docker Compose 部署，客户端（RPA 引擎 + 桌面应用）在 Windows 机器上运行并执行自动化任务。整个项目是一个 **多语言 Monorepo**，由统一的 Makefile 驱动。

---

## 二、架构总览

```
┌──────────────────────────────────────────────────────────────────┐
│                        Client (Windows)                          │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐  │
│  │  Electron Desktop   │  │       RPA Engine (Python)        │  │
│  │  (Vue 3 Web App)    │  │  ┌────────────────────────────┐ │  │
│  │                     │  │  │  25+ RPA Components        │ │  │
│  │  - 流程编排          │  │  │  (AI/Browser/Excel/Word..) │ │  │
│  │  - 机器人管理         │  │  ├────────────────────────────┤ │  │
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
│  │  ┌──────────────────────────────────────┐         │          │
│  │  │ openapi-service (Python/FastAPI)     │         │          │
│  │  │ Workflow API / WebSocket / MCP       │         │          │
│  │  └──────────────────────────────────────┘         │          │
│  └──────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 三、技术栈矩阵

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
| **CI/CD** | GitHub Actions | 路径变更检测 + 风格检查 |

---

## 四、后端微服务详解

### 4.1 `robot-service` (Java / Spring Boot 2.3.11)
- **端口**: 8040
- **职责**: 机器人（Agent）管理、任务调度、OpenFeign 远程调用
- **关键能力**: 启用 `@EnableFeignClients`、`@EnableScheduling`、`@EnableAsync`
- **技术栈**: MyBatis-Plus 3.3.2、Druid 1.1.21、AWS S3 SDK 1.11

### 4.2 `resource-service` (Java / Spring Boot 3.2.4)
- **端口**: 8030
- **职责**: 文件上传/下载/共享、S3 存储管理
- **关键类**: [FileController.java](file:///d:/develop/astron-rpa/backend/resource-service/src/main/java/com/iflytek/rpa/resource/file/controller/FileController.java) — 提供 REST API 处理文件 CRUD
- **技术栈**: Spring Boot 3.2.4、MyBatis-Plus 3.5.3、AWS S3 SDK 2.26（通过 MinIO 兼容）

### 4.3 `rpa-auth` (Java / Spring Boot 2.3.11)
- **端口**: 10251
- **职责**: 用户认证、授权、会话管理
- **关键类**: [LoginController.java](file:///d:/develop/astron-rpa/backend/rpa-auth/src/main/java/com/iflytek/rpa/auth/core/controller/LoginController.java) — 登录接口
- **技术栈**: Spring Cloud Hoxton、Redis Session、OpenFeign

### 4.4 `ai-service` (Python / FastAPI)
- **端口**: 8010
- **职责**: AI 对话、OCR 识别、智能组件、邮件生成、翻译、代码审查
- **路由**: `/chat`、`/ocr`、`/smart_component`、`/jfbym`、`/computer_use`
- **技术栈**: FastAPI + SQLAlchemy + Redis + aiomysql

### 4.5 `openapi-service` (Python / FastAPI)
- **端口**: 8020
- **职责**: 开放 API 管理、Workflow CRUD、WebSocket 实时通信、**MCP 协议支持**
- **路由**: `/workflows`、`/executions`、`/api_keys`、`/ws`、`/mcp`
- **技术栈**: FastAPI + MCP 协议 + 自定义 WebSocket 库

---

## 五、RPA 引擎深度分析

### 5.1 引擎架构

引擎入口位于 [main.py](file:///d:/develop/astron-rpa/engine/main.py)，实际启动的是 `astronverse-scheduler` 调度服务。引擎采用**组件化插件架构**：

```
engine/
├── components/     ← 25 个 RPA 原子能力组件（每个都是独立的 Python 包）
├── servers/        ← 5 个引擎服务进程
├── shared/         ← 共享库（actionlib、locator、workflowlib、baseline）
└── main.py         ← 入口
```

### 5.2 自动化组件清单（25 个）

| 组件 | 能力 |
|------|------|
| `astronverse-ai` | AI 工作流/对话、Dify 集成、星辰 Agent、知识问答、合同要素提取、简历评分 |
| `astronverse-browser` | Web 浏览器自动化：元素等待/点击/输入/截图/滚动、表格数据抓取、JS 执行、Cookie 管理 |
| `astronverse-cua` | Computer Use Agent：基于视觉大模型分析屏幕执行 GUI 操作 |
| `astronverse-excel` | Excel 读写、公式计算、数据处理 |
| `astronverse-word` | Word 文档操作 |
| `astronverse-pdf` | PDF 处理 |
| `astronverse-email` | 邮件收发 |
| `astronverse-database` | 数据库操作 |
| `astronverse-network` | HTTP 请求、网络通信 |
| `astronverse-window` | Windows 窗口操作（置顶、最小化等） |
| `astronverse-winelement` | Windows 桌面元素识别与操作（UIA/MSAA/JAB） |
| `astronverse-input` | 键盘鼠标模拟输入 |
| `astronverse-dialog` | 对话框/消息框交互 |
| `astronverse-vision` | 计算机视觉（图像识别） |
| `astronverse-verifycode` | 验证码识别 |
| `astronverse-encrypt` | 加密解密 |
| `astronverse-system` | 系统命令执行 |
| `astronverse-software` | 软件启动/管理 |
| `astronverse-smart` | 智能自动化 |
| `astronverse-script` | Python 脚本执行 |
| `astronverse-openapi` | OpenAPI 调用 |
| `astronverse-report` | 报表生成 |
| `astronverse-dataprocess` | 数据处理 |
| `astronverse-datatable` | 数据表格操作 |
| `astronverse-enterprise` | 企业微信集成 |

### 5.3 引擎服务进程

| 服务 | 职责 |
|------|------|
| **scheduler** | 流程调度核心，任务编排与执行 |
| **executor** | 流程执行器，运行具体 RPA 流程 |
| **picker** | 元素拾取器，辅助定位 UI 元素 |
| **trigger** | 事件/定时触发器 |
| **browser-bridge** | 浏览器进程通信桥接 |

### 5.4 共享库

- **actionlib**: 定义 RPA 原子能力的参数类型体系（输入、选择、开关、文件、拾取、键盘、鼠标、CV 等控件类型）
- **locator**: 统一元素定位管理器，根据类型分派到 UIA、Web、MSAA、JAB、SAP 等定位器
- **workflowlib**: 流程参数解析与表达式求值、变量管理

---

## 六、前端项目分析

### 6.1 前端架构（pnpm Monorepo）

```
frontend/
├── packages/
│   ├── web-app/          ← Web 控制台（Vue 3 + Ant Design Vue）
│   ├── electron-app/     ← Electron 桌面壳（打包 Windows 客户端）
│   ├── browser-plugin/   ← 浏览器扩展（Chrome Extension）
│   ├── auth-app/         ← 独立认证应用（登录/邀请页）
│   ├── cli/              ← RPA CLI 命令行工具
│   ├── components/       ← 共享 UI 组件库
│   └── shared/           ← 共享工具/类型
├── locales/              ← 国际化 (zh-CN / en-US)
└── eslint.config.mjs     ← 统一 ESLint 配置
```

### 6.2 `web-app` — Web 控制台

- **核心路由**: 流程编排 (Arrange)、设计器 (Designer)、执行器 (Actuator)、应用市场 (ApplicationMarket)
- **功能页面**: 项目管理、组件管理、机器人管理、任务列表、团队市场、日志查看、录制回放
- **关键依赖**: [Ant Design Vue](https://antdv.com)、VxeTable（高性能表格）、Tiptap（富文本）、Sentry（监控）、Module Federation（微前端）
- **API 层**: 统一 Axios 封装（[index.ts](file:///d:/develop/astron-rpa/frontend/packages/web-app/src/api/http/index.ts)），支持 JWT token、SSE、WebSocket

### 6.3 `electron-app` — 桌面客户端

- **主进程**: 窗口管理、RPA 协议注册、托盘、自动更新、后端服务启动
- **构建工具**: electron-vite + electron-builder
- **打包目标**: Windows (.exe)、macOS、Linux

### 6.4 `browser-plugin` — 浏览器扩展

- **核心能力**: DOM 元素定位（selector/xpath/rect）、Shadow DOM 支持、WebSocket 通信
- **使用场景**: 配合 RPA 引擎进行 Web 自动化时的元素拾取与交互

---

## 七、基础设施与部署

### 7.1 Docker 服务栈

| 服务 | 镜像 | 说明 |
|------|------|------|
| MySQL | mysql:8.4.6 | 持久化数据存储 |
| Redis | bitnami/redis:latest | 缓存/会话 |
| MinIO | minio:latest | S3 兼容对象存储 |
| OpenResty | openresty:1.27.1.1 | 统一 API 网关 + Lua 认证 |
| Casdoor | casbin/casdoor:v2.67 | 身份认证平台 |
| Atlas | arigaio/atlas:latest | 数据库 Schema 迁移工具 |

### 7.2 API 网关路由

网关监听 `32742` 端口，通过 OpenResty Nginx 进行路由分发：

| 路径前缀 | 后端服务 | 认证 |
|----------|----------|------|
| `/api/resource/` | resource-service:8030 | Lua 认证 |
| `/api/robot/` | robot-service:8040 | 可选认证 |
| `/api/rpa-ai-service/` | ai-service:8010 | Lua 认证（600s 超时） |
| `/api/rpa-openapi/` | openapi-service:8020 | Lua 认证 / MCP 免认证 |
| `/api/rpa-openapi/ws` | openapi-service WebSocket | Lua 认证 |
| `/api/rpa-auth/` | rpa-auth:10251 | 认证自身 |
| `/api/casdoor/` | casdoor:8000 | 透传 |

### 7.3 CI/CD

- **路径变更检测**: 按 `engine/`、`frontend/`、`backend/` 增量触发
- **风格检查**: 代码格式化 + Lint 检查（Python: ruff、Java: Checkstyle+PMD+SpotBugs、TS: ESLint）
- **Pre-commit**: 仅配置 ruff 自动格式化 engine 目录

### 7.4 客户端构建

[build.bat](file:///d:/develop/astron-rpa/build.bat) 实现两步构建：
1. **引擎构建**: `uv build --all-packages` → 生成 wheel → 安装到嵌入式 Python → 7z 压缩
2. **前端构建**: `pnpm build:desktop` → Electron Builder 打包 Windows 安装包

---

## 八、关键设计亮点

1. **组件化插件架构**: 25 个 RPA 组件各自独立，通过 `meta.json` 声明能力，引擎动态加载，扩展性强
2. **多语言混合微服务**: Java（传统企业级服务）+ Python（AI/API 服务），按场景选择最佳技术栈
3. **统一 API 网关**: OpenResty + Lua 实现集中认证、路由、超时控制
4. **MCP 协议支持**: openapi-service 原生支持 MCP（Model Context Protocol），可被 AI 代理直接调用
5. **CUA（Computer Use Agent）**: 基于视觉大模型分析屏幕执行 GUI 操作，是前沿的 AI+RPA 融合实践
6. **多端覆盖**: Web 控制台 + Electron 桌面应用 + 浏览器扩展 + CLI 工具，覆盖不同使用场景
7. **国际化**: 完整的中英文 i18n 支持（前端 + 文档）

---

## 九、技术债务与改进空间

1. **Java 版本不统一**: robot-service 和 rpa-auth 使用 Spring Boot 2.3.11 + Java 8（已 EOL），而 resource-service 已升级到 Spring Boot 3.2.4 + Java 21，存在版本分裂
2. **测试覆盖不足**: 没有聚合测试命令，CI 中仅运行风格检查，缺少自动化测试阶段
3. **部分组件缺少测试**: 25 个组件中仅少数有 `tests/` 目录
4. **文档分散**: 中英文 README 分散在各子目录，缺少统一的开发者文档站