
### 一、 架构映射与替换矩阵

| AstronRPA 原生组件 | 作用 | InsForge 替代方案 | 收益 / 说明 |
| :--- | :--- | :--- | :--- |
| **MySQL 8.4** | 业务数据 | **PostgreSQL 18** | 必须迁移，InsForge 强依赖 PG |
| **Casdoor + rpa-auth** | 认证/鉴权 | **InsForge Auth** | 抛弃独立认证中心，改用内置 JWT 和 RLS |
| **MinIO + resource-service** | 文件/存储 | **InsForge Storage** | 直接使用内置的 S3 兼容网关或本地存储模式 |
| **OpenResty (Nginx)** | API网关/路由 | **InsForge Backend (`:7130`)**| 单一端口提供所有服务，无需前置网关 |
| **Redis** | 缓存/Session | **不需要** | InsForge 基于 PG 内存/JWT，完全去 Redis |
| **robot-service (Java)** | CRUD/调度 | **PostgREST + Schedules** | 通过客户端直接调用表，定时任务由内置 Cron 接管 |
| **openapi-service (Python)** | WS/MCP | **InsForge Realtime + MCP**| 使用内置 Socket.IO 频道和原生 MCP 支持 |
| **ai-service (Python)** | AI/OCR/逻辑 | **InsForge AI + Deno 函数**| 调用内置 AI 网关，复杂逻辑降级到客户端执行 |

---

### 二、 环境准备 (非 Docker 纯裸机部署)

由于不使用 Docker，你需要在 Linux 服务器（如 Ubuntu/Debian）上进行本地部署。

**1. 基础环境安装**
*   **Node.js**: v24+（用于运行 InsForge）
*   **PostgreSQL**: v18（需安装 `pgvector`, `pg_cron`, `pgcrypto` 扩展）
*   **PostgREST**: v12（二进制文件，用于自动生成 REST API）
*   **Deno**: v2.0+（可选，如果需要写后端自定义云函数）

**2. 启动 InsForge 服务**
通过 `systemd` 或 `pm2` 管理 InsForge 进程：
```bash
# 进入代码库编译
cd /path/to/InsForge
npm install
npm run build:shared

# 使用 pm2 启动后端和 Dashboard（轻量化推荐）
npm install -g pm2
pm2 start "npm run dev:backend" --name "insforge-api"
pm2 start "npm run dev:frontend" --name "insforge-dash"
```

---

### 三、 核心模块迁移实施步骤

#### 1. 数据库迁移 (MySQL -> PostgreSQL)
这是工作量最大的一步。你需要将 AstronRPA 的数据库 Schema 转换为 PostgreSQL，并通过 InsForge 的迁移系统管理。
*   **操作**: 在 `InsForge/backend/src/infra/database/migrations/` 下创建 SQL 脚本。
*   **例如**: `001_create_rpa_tables.sql`
```sql
-- AstronRPA 机器人表改造
CREATE TABLE public.robots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'offline',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) -- 关联 InsForge 用户
);
-- 启用行级安全策略 (RLS)，确保数据隔离
ALTER TABLE public.robots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see their own robots" ON public.robots
    FOR SELECT USING (auth.uid() = user_id);
```

#### 2. API 层大换血 (Java -> TypeScript SDK)
AstronRPA 客户端（Vue 3 / Electron）中对 `robot-service` 的 Axios 请求，全部替换为 `@insforge/sdk` 调用。不需要在后端写一行 Java 代码，PostgREST 会自动生成 CRUD。

**改造前 (AstronRPA 客户端代码):**
```typescript
// frontend/packages/web-app/src/api/http/index.ts
axios.get('/api/robot/list', { params: { status: 'online' }})
```

**改造后 (引入 InsForge SDK):**
```typescript
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'http://<你的IP>:7130',
  anonKey: 'anon_xxx...' // 从 Dashboard 获取
});

// 直接查询，受 RLS 保护，绝对安全
const { data: robots } = await insforge.database
  .from('robots')
  .select('*')
  .eq('status', 'online');
```

#### 3. 存储与资源服务替换 (MinIO -> InsForge Storage)
不再需要维护独立的 MinIO 容器和 `resource-service`。
*   进入 InsForge Dashboard (:7131) -> Storage。
*   创建一个名为 `rpa-resources` 的存储桶（可设为公开或私有）。
*   **前端改造**：
```typescript
// 上传 RPA 脚本/资源
const file = event.target.files[0];
await insforge.storage
  .from('rpa-resources')
  .upload(`scripts/${file.name}`, file);
```

#### 4. 实时通信替换 (WebSocket -> Realtime)
AstronRPA 的 `openapi-service` 使用自定义 WS 发送任务执行日志。InsForge 自带 Socket.IO 和 Postgres `LISTEN/NOTIFY`。
*   **触发器改造**: 当数据库中的 `executions`（执行记录表）发生变化时，InsForge 会自动广播。
*   **前端监听**:
```typescript
// 监听 RPA 引擎的执行状态变化
insforge.realtime
  .channel('rpa-status')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'executions' }, payload => {
    console.log('任务状态更新:', payload.new.status);
  })
  .subscribe();
```

#### 5. AI 与 Python 服务 (ai-service) 处理策略
AstronRPA 中有大量的 Python AI 组件（OCR、CUA、视觉处理）。InsForge 是 Node.js 栈，这里有两种处理策略：

*   **策略 A（云端转接）**：对于大模型对话、知识问答，直接使用 InsForge 内置的 AI 网关（OpenRouter/OpenAI 兼容）：
    ```typescript
    await insforge.ai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: '提取合同要素' }]
    });
    ```
*   **策略 B（下沉到客户端引擎）**：由于 AstronRPA 客户端本身就带了一个强大的 Python 环境（`astronverse` 系列组件 ），**将强依赖 Python 的组件（如 OCR、系统级图像识别 astronverse-vision）完全下沉到 Windows 客户端的本地 Python 引擎执行**。执行完毕后，将结果通过 InsForge SDK 更新到 PostgreSQL 中。这符合“重客户端、轻服务端”的 RPA 理念。

---

### 四、 改造后的架构对比

#### 改造前 (重型微服务)
*   运维成本：极高（需要维护 7-8 个 Docker 容器，解决 Java/Python 服务间的 Feign/HTTP 调用，维护注册中心和网关）。
*   资源占用：高（Java Spring Boot 启动慢，内存占用大）。
*   协议转换：繁琐（HTTP -> 网关 -> Java -> 数据库）。

#### 改造后 (极简 Agent-Native BaaS)
*   运维成本：极低（只需维护 `node` 和 `postgres` 两个系统级进程）。
*   资源占用：极低（Node.js 单体 + PG 内存占用少于 500MB）。
*   API 模式：客户端直连数据库（通过 PostgREST），无需写后端 CRUD 代码。
*   **AI 友好**: AI Agent 可以通过 InsForge 内置的 MCP 工具，直接利用 `fetch-docs`, `run-raw-sql` 了解和操作系统，无需为 Agent 单独写接口。

