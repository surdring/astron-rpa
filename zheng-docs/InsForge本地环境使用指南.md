# InsForge 本地环境使用指南

> 本文档针对当前远程部署的 InsForge 实例，包含真实配置值、服务状态和操作指南。
> 服务器地址：`172.16.100.211`（InsForge + PostgreSQL 部署在此服务器上）
> 最后更新：2026-07-04

---

## 目录

1. [环境概览](#1-环境概览)
2. [服务端点](#2-服务端点)
3. [访问 Dashboard](#3-访问-dashboard)
4. [数据库连接](#4-数据库连接)
5. [SDK 客户端初始化](#5-sdk-客户端初始化)
6. [连接 AI 编码助手（MCP 配置）](#6-连接-ai-编码助手mcp-配置)
7. [服务管理](#7-服务管理)
8. [数据库迁移管理](#8-数据库迁移管理)
9. [常用操作](#9-常用操作)
10. [API 概览](#10-api-概览)
11. [故障排查](#11-故障排查)

---

## 1. 环境概览

| 项目 | 值 |
|------|------|
| **服务器 IP** | `172.16.100.211` |
| **项目路径** | `/home/zhengxueen/github-project/InsForge` |
| **版本** | v2.2.4 |
| **Node.js** | v24.15.0 |
| **PostgreSQL** | 18 |
| **部署方式** | 远程服务器源码部署（非 Docker） |

### 运行中服务

| 服务 | 端口 | 状态 | 用途 |
|------|------|------|------|
| **InsForge Backend** | `172.16.100.211:7130` | ✅ 运行中 | API + Dashboard（外部唯一入口） |
| **InsForge Dashboard** | `172.16.100.211:7131` | ✅ 运行中 | 管理后台（SSR） |
| **PostgreSQL** | `172.16.100.211:5432` | ✅ 运行中 | 数据库 |
| **PostgREST** | `172.16.100.211:5430` | ❌ 未启动 | REST API 网关（可选） |

---

## 2. 服务端点

| 用途 | URL |
|------|-----|
| **API 服务** | `http://172.16.100.211:7130` |
| **Dashboard** | `http://172.16.100.211:7131` |
| **健康检查** | `http://172.16.100.211:7130/api/health` |
| **数据库直连** | `postgresql://postgres:xqxatcdj@172.16.100.211:5432/insforge` |

---

## 3. 访问 Dashboard

1. 浏览器打开 [http://172.16.100.211:7131](http://172.16.100.211:7131)（或 [http://172.16.100.211:7130](http://172.16.100.211:7130)）
2. 使用以下凭据登录：

   | 字段 | 值 |
   |------|------|
   | 用户名 | `admin` |
   | 密码 | `admin123` |

3. 登录后可在 **Settings → API** 页面查看：
   - **Anon Key**（匿名密钥，以 `anon_` 开头）
   - **API Key**（管理密钥，以 `ik_` 开头）

> **注意**：首次启动后端时，Anon Key 和 API Key 会自动生成并在启动日志中打印。当前配置文件中为占位值，实际值以 Dashboard 显示为准。

---

## 4. 数据库连接

### 4.1 连接字符串

```
postgresql://postgres:xqxatcdj@172.16.100.211:5432/insforge
```

### 4.2 使用 psql 连接

```bash
psql -h 172.16.100.211 -U postgres -d insforge
# 密码：xqxatcdj
```

### 4.3 数据库配置

| 配置项 | 值 |
|--------|------|
| 主机 | `172.16.100.211` |
| 端口 | `5432` |
| 用户 | `postgres` |
| 密码 | `xqxatcdj` |
| 数据库 | `insforge` |

### 4.4 已安装扩展

| 扩展 | 用途 |
|------|------|
| `pg_cron` | 定时任务调度 |
| `http` | HTTP 请求（pg_net） |
| `pgcrypto` | 加密函数 |
| `vector` | 向量相似度搜索（pgvector） |

### 4.5 常用查询

```bash
# 查看迁移记录
sudo -u postgres psql -d insforge -c "SELECT * FROM system.migrations ORDER BY id;"

# 查看已有表
sudo -u postgres psql -d insforge -c "\dt"

# 查看所有模式
sudo -u postgres psql -d insforge -c "\dn"
```

---

## 5. SDK 客户端初始化

### 5.1 安装 SDK

```bash
npm install @insforge/sdk@latest
```

### 5.2 创建客户端实例（本地环境）

```typescript
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'http://172.16.100.211:7130',
  // 本地开发环境 anonKey，已通过 /api/secrets/anon-key/rotate 生成
  // 注意：生产环境请通过 Dashboard Settings → API 获取，不要硬编码到代码仓库
  anonKey: 'anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f',
});
```

### 5.3 使用示例

```typescript
// 查询数据
const { data, error } = await insforge.database
  .from('your_table')
  .select('*');

// 插入数据
const { data, error } = await insforge.database
  .from('your_table')
  .insert({ field: 'value' })
  .select();

// 调用 RPC
const { data, error } = await insforge.database
  .rpc('your_function', { param: 'value' });
```

---

## 6. 连接 AI 编码助手（MCP 配置）

将 InsForge 的 MCP 服务器安装到 AI 编码工具中，让 AI 可以直接操作你的后端。

### 6.1 安装 MCP 服务器（Trae）

在终端中执行以下命令：

```bash
npx @insforge/install --client trae --env API_KEY=ik_insforge-local-dev-api-key-2024-min-32-chars --env API_BASE_URL=http://172.16.100.211:7130
```

### 6.2 验证连接

安装完成后，向 AI 编码助手发送以下提示词以验证连接：

```text
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to learn about InsForge instructions.
```

### 6.3 其他 AI 工具

根据使用的 AI 编码工具替换 `--client` 参数值：

| 工具 | `--client` 值 |
|------|---------------|
| Trae | `trae` |
| Cursor | `cursor` |
| Claude Code | `claude-code` |
| Cline | `cline` |
| Codex | `codex` |
| Copilot | `copilot` |
| OpenCode | `opencode` |
| Antigravity | `antigravity` |

### 6.4 手动 MCP 配置（可选）

如需手动配置而非使用一键安装命令，可在 AI 工具的 MCP 配置文件中添加：

```json
{
  "mcpServers": {
    "insforge": {
      "command": "npx",
      "args": [
        "-y",
        "@insforge/mcp",
        "--env",
        "API_KEY=ik_insforge-local-dev-api-key-2024-min-32-chars",
        "--env",
        "API_BASE_URL=http://172.16.100.211:7130"
      ],
      "env": {
        "API_KEY": "ik_insforge-local-dev-api-key-2024-min-32-chars",
        "API_BASE_URL": "http://172.16.100.211:7130"
      }
    }
  }
}
```

---

## 7. 服务管理

当前环境已配置为 **systemd 服务**，可直接通过 `systemctl` 命令管理。

### 7.1 查看服务状态

```bash
sudo systemctl status insforge.service
```

### 7.2 启动服务

```bash
sudo systemctl start insforge.service
```

服务启动后后端监听 `:7130`，前端 Dashboard 监听 `:7131`。

### 7.3 停止服务

```bash
sudo systemctl stop insforge.service
```

### 7.4 重启服务

```bash
sudo systemctl restart insforge.service
```

### 7.5 开机自启

已启用，无需额外操作。如需禁用：

```bash
sudo systemctl disable insforge.service
```

### 7.6 查看实时日志

```bash
# 实时追踪日志
sudo journalctl -u insforge.service -f

# 查看最近 50 行
sudo journalctl -u insforge.service -n 50 --no-pager

# 查看某段时间的日志
sudo journalctl -u insforge.service --since "5 min ago"
```

### 7.7 健康检查

```bash
curl http://172.16.100.211:7130/api/health
```

预期响应：
```json
{"status":"ok","version":"2.2.4","service":"Insforge OSS Backend"}
```

### 7.8 备用启动方式（非 systemd）

如需临时手动启动（调试用途）：

```bash
cd /home/zhengxueen/github-project/InsForge
npx concurrently -n backend,frontend -c cyan,magenta "npm run dev:backend" "npm run dev:frontend"
```

---

## 8. 数据库迁移管理

### 8.1 迁移脚本

```bash
cd /home/zhengxueen/github-project/InsForge/backend

# 运行所有待执行迁移
npm run migrate:up:local

# 回滚最近一次迁移
npm run migrate:down:local

# 创建新迁移文件
npm run migrate:create -- <migration-name>
```

### 8.2 迁移文件位置

所有迁移文件位于：
```
backend/src/infra/database/migrations/
```

文件命名格式：`<序号>_<描述>.sql`，例如：
- `001_create-auth-schema.sql`
- `050_create-memory-schema.sql`
- `057_create-database-advisor.sql`

### 8.3 迁移状态

```bash
# 查看已执行的迁移
sudo -u postgres psql -d insforge -c "SELECT id, name, run_on FROM system.migrations ORDER BY id;"
```

---

## 9. 常用操作

### 9.1 安装依赖

```bash
cd /home/zhengxueen/github-project/InsForge
npm install
npm run build:shared
```

### 9.2 构建共享包

```bash
npm run build:shared
```

### 9.3 数据库备份

```bash
# 备份到文件（在服务器上执行）
pg_dump -h 172.16.100.211 -U postgres -d insforge -F c -f insforge_backup_$(date +%Y%m%d).dump
# 密码：xqxatcdj

# 恢复（在服务器上执行）
pg_restore -h 172.16.100.211 -U postgres -d insforge -c insforge_backup_20260704.dump
```

### 9.4 查看日志

后端日志直接输出到终端（开发模式使用 `tsx watch`，热重载）。

---

## 10. API 概览

### 10.1 健康检查

```bash
curl http://172.16.100.211:7130/api/health
```

响应示例：
```json
{
  "status": "ok",
  "version": "2.2.4",
  "service": "Insforge OSS Backend",
  "timestamp": "2026-07-04T03:11:33.370Z"
}
```

### 10.2 认证相关

| 端点 | 方法 | 用途 |
|------|------|------|
| `/api/auth/signup` | POST | 用户注册 |
| `/api/auth/signin` | POST | 用户登录 |
| `/api/auth/signout` | POST | 退出登录 |
| `/api/auth/user` | GET | 获取当前用户信息 |

### 10.3 数据库 API（PostgREST）

通过 PostgREST 自动为每个表生成 REST API：
- `GET /api/rest/<table>` - 查询
- `POST /api/rest/<table>` - 插入
- `PATCH /api/rest/<table>` - 更新
- `DELETE /api/rest/<table>` - 删除

### 10.4 存储 API

| 端点 | 用途 |
|------|------|
| `/api/storage/buckets` | 存储桶管理 |
| `/api/storage/objects` | 文件对象管理 |

---

## 11. 故障排查

### 11.1 后端无法启动

```bash
# 检查端口是否被占用
lsof -i:7130

# 强制释放端口
kill -9 $(lsof -ti:7130)
```

### 11.2 数据库连接失败

```bash
# 测试数据库连接（从服务器本地或远程均可）
psql -h 172.16.100.211 -U postgres -d insforge -c "SELECT 1;"

# 常见问题
# - 密码错误：ALTER USER postgres WITH PASSWORD 'xqxatcdj';
# - 数据库不存在：CREATE DATABASE insforge;
# - 远程连接需确保 PostgreSQL 配置允许远程访问（listen_addresses = '*'）
```

### 11.3 迁移失败

```bash
# 查看迁移错误详情
cd /home/zhengxueen/github-project/InsForge/backend
npm run migrate:up:local 2>&1 | tail -50

# 回滚后重试
npm run migrate:down:local
npm run migrate:up:local
```

### 11.4 依赖问题

```bash
# 重新安装所有依赖
cd /home/zhengxueen/github-project/InsForge
rm -rf node_modules
npm install

# 重新构建共享包
npm run build:shared
```

### 11.5 配置文件

关键配置文件路径：
- **环境变量**: `/home/zhengxueen/github-project/InsForge/.env`
- **PostgreSQL 配置**: `/etc/postgresql/18/main/postgresql.conf`
- **迁移文件**: `/home/zhengxueen/github-project/InsForge/backend/src/infra/database/migrations/`
- **数据库初始化**: `/home/zhengxueen/github-project/InsForge/deploy/docker-init/db/db-init.sql`