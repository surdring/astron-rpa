# InsForge PostgREST 安装与修复记录

> **日期**：2026-07-05  
> **问题**：数据库 API 查询失败，返回 `ECONNREFUSED 127.0.0.1:5430`  
> **根因**：本地非 Docker 部署缺少 PostgREST 服务

---

## 目录

1. [问题背景](#1-问题背景)
2. [问题分析](#2-问题分析)
3. [解决方案](#3-解决方案)
4. [安装步骤](#4-安装步骤)
5. [验证结果](#5-验证结果)
6. [相关文件](#6-相关文件)

---

## 1. 问题背景

在将 AstronRPA 后端向 InsForge BaaS 平台迁移的过程中，通过 SDK 调用数据库 API 时失败。

### 1.1 错误信息

```
connect ECONNREFUSED 127.0.0.1:5430
```

### 1.2 触发场景

以下调用均失败：

```javascript
// REST API 调用
GET http://localhost:7130/api/database/records/api_keys?limit=1
Authorization: Bearer <anonKey>

// SDK 调用
await insforge.database.from('api_keys').select('*').limit(1);
```

### 1.3 环境信息

| 项目 | 值 |
|------|------|
| 部署方式 | 本地源码（非 Docker） |
| 后端地址 | `http://localhost:7130` |
| 操作系统 | Ubuntu 26.04 LTS x86_64 |
| InsForge 版本 | v2.2.4 |
| PostgreSQL | 18 |

---

## 2. 问题分析

### 2.1 架构分析

InsForge 的数据库 API 请求链路如下：

```
客户端 → InsForge Backend (:7130) → PostgREST (:5430) → PostgreSQL (:5432)
```

- `/api/database/records/*` 路由通过 `PostgrestProxyService` 转发请求到 PostgREST
- 后端配置中 `postgrestBaseUrl` 默认为 `http://localhost:5430`

**关键代码**：

- [backend/src/infra/config/app.config.ts](../../backend/src/infra/config/app.config.ts#L162-L163) — `postgrestBaseUrl` 配置
- [backend/src/services/database/postgrest-proxy.service.ts](../../backend/src/services/database/postgrest-proxy.service.ts#L15-L18) — 代理服务初始化
- [backend/src/api/routes/database/records.routes.ts](../../backend/src/api/routes/database/records.routes.ts#L1-L10) — 数据库记录路由

### 2.2 Docker 与本地部署差异

在 Docker 部署中，PostgREST 作为独立容器运行：

```yaml
# docker-compose.yml
postgrest:
  image: postgrest/postgrest:v12.2.12
  ports:
    - "${POSTGREST_PORT:-5430}:3000"
```

本地源码部署时，PostgREST 未安装也未启动，导致连接被拒。

### 2.3 影响范围

- 所有通过 `/api/database/records/*` 的数据查询/写入操作
- SDK 的 `insforge.database` 方法
- 不影响的管理接口：`/api/database/admin/*`（直接查询数据库，绕过 PostgREST）

---

## 3. 解决方案

安装 PostgREST 并配置为 systemd 服务，与现有 `insforge.service` 协同运行。

### 3.1 方案对比

| 方案 | 优点 | 缺点 |
|------|------|------|
| **安装 PostgREST 二进制**（采用） | 轻量、无依赖、systemd 管理 | 需手动安装 |
| 使用 Docker 运行 PostgREST | 版本管理方便 | 需要 Docker 运行 |
| 修改后端代码绕过 PostgREST | 无需新服务 | 修改侵入性强 |

### 3.2 服务架构（修复后）

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  InsForge    │────▶│  PostgREST   │────▶│  PostgreSQL  │
│  (:7130)     │     │  (:5430)     │     │  (:5432)     │
│  systemd     │     │  systemd     │     │  systemd     │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 4. 安装步骤

### 4.1 下载 PostgREST 二进制

```bash
cd /tmp
wget https://github.com/PostgREST/postgrest/releases/download/v14.14/postgrest-v14.14-linux-static-x86-64.tar.xz
tar xf postgrest-v14.14-linux-static-x86-64.tar.xz
sudo cp postgrest /usr/local/bin/postgrest
sudo chmod +x /usr/local/bin/postgrest
postgrest --version
# 输出: PostgREST 14.14
```

### 4.2 创建配置文件

**文件路径**：[postgrest.conf](../../postgrest.conf)

```ini
# PostgREST Configuration for InsForge local deployment
db-uri = "postgres://postgres:xqxatcdj@172.16.100.211:5432/insforge"
db-schema = "public"
db-anon-role = "anon"
db-channel-enabled = true
db-channel = "pgrst"
jwt-secret = "insforge-local-dev-jwt-secret-key-2024-min-32-chars"
server-port = 5430
server-host = "0.0.0.0"
# 注意：0.0.0.0 监听所有接口，支持 localhost 和 172.16.100.211 两种方式访问
openapi-server-proxy-uri = "http://172.16.100.211:5430"
# 说明：openapi-server-proxy-uri 仅影响 PostgREST 生成的 OpenAPI 文档中的 servers 字段，
#       不参与实际请求路由。后端实际转发目标为 postgrestBaseUrl (http://localhost:5430)。
max-rows = 1000
```

### 4.3 创建 systemd 服务

**文件路径**：`/etc/systemd/system/postgrest.service`

```ini
[Unit]
Description=PostgREST - RESTful API for PostgreSQL
Documentation=https://docs.postgrest.org
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=zhengxueen
Group=zhengxueen
WorkingDirectory=/home/zhengxueen/github-project/InsForge
ExecStart=/usr/local/bin/postgrest /home/zhengxueen/github-project/InsForge/postgrest.conf
Restart=on-failure
RestartSec=5
LimitNOFILE=65536
LimitNPROC=4096
NoNewPrivileges=true
ProtectHome=false
ProtectSystem=full
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

### 4.4 启动服务

```bash
sudo cp /tmp/postgrest.service /etc/systemd/system/postgrest.service
sudo systemctl daemon-reload
sudo systemctl enable postgrest.service
sudo systemctl start postgrest.service
```

### 4.5 重启 InsForge 后端

```bash
sudo systemctl restart insforge.service
```

---

## 5. 验证结果

### 5.1 PostgREST 服务状态

```bash
sudo systemctl status postgrest.service
```

预期输出：

```
● postgrest.service - PostgREST - RESTful API for PostgreSQL
     Active: active (running)
   Main PID: 826577 (postgrest)
```

日志关键行：

```
API server listening on http://172.16.100.211:5430
Connection Pool: 10 connections
Schema cache loaded in 247 ms
```

### 5.2 PostgREST 直接响应

```bash
curl -s http://172.16.100.211:5430/ | head -c 100
# 返回 OpenAPI JSON 规范
```

### 5.3 数据库 API 测试

```bash
# 获取管理员 token
TOKEN=$(curl -s http://localhost:7130/api/auth/admin/sessions \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin).get('accessToken',''))")

# 调用数据库 API
curl -s "http://localhost:7130/api/database/records/api_keys?limit=1" \
  -H "Authorization: Bearer $TOKEN"
```

**修复前**：`ECONNREFUSED 127.0.0.1:5430` ❌

**修复后**：PostgREST 返回有效响应（如 `PGRST205` 表不存在，说明代理已连通）✅

### 5.4 端口监听确认

```bash
ss -tlnp | grep -E "7130|5430|5432"
```

预期输出：

```
LISTEN 0  128  0.0.0.0:5430   0.0.0.0:*   users:(("postgrest",pid=826577))
LISTEN 0  128  127.0.0.1:5432  0.0.0.0:*   users:(("postgres",pid=...))
LISTEN 0  511  0.0.0.0:7130   0.0.0.0:*   users:(("node",pid=...))
```

---

## 6. 相关文件

### 6.1 新增文件

| 文件 | 说明 |
|------|------|
| `/usr/local/bin/postgrest` | PostgREST 二进制 |
| `/home/zhengxueen/github-project/InsForge/postgrest.conf` | PostgREST 配置文件 |
| `/etc/systemd/system/postgrest.service` | systemd 服务单元 |

### 6.2 关联文件

| 文件 | 说明 |
|------|------|
| [InsForge 本地环境使用指南.md](./InsForge本地环境使用指南.md) | 本地环境使用指南 |
| [InsForge-anonKey-测试报告.md](./InsForge-anonKey-测试报告.md) | 触发此问题的测试报告 |
| [backend/src/infra/config/app.config.ts](../backend/src/infra/config/app.config.ts) | postgrestBaseUrl 配置 |
| [backend/src/services/database/postgrest-proxy.service.ts](../backend/src/services/database/postgrest-proxy.service.ts) | PostgREST 代理服务 |
| [docker-compose.yml](../docker-compose.yml) | Docker 部署中 PostgREST 容器配置 |

### 6.3 服务管理命令

```bash
# PostgREST
sudo systemctl status postgrest.service    # 查看状态
sudo systemctl start postgrest.service     # 启动
sudo systemctl stop postgrest.service      # 停止
sudo systemctl restart postgrest.service   # 重启
sudo journalctl -u postgrest.service -f    # 实时日志

# InsForge
sudo systemctl status insforge.service     # 查看状态
sudo systemctl restart insforge.service    # 重启
sudo journalctl -u insforge.service -f     # 实时日志
```

---

> **后续维护**：更新 PostgREST 版本时，只需替换 `/usr/local/bin/postgrest` 二进制并重启服务即可。

- 新的 API Key： ik_71ebd83cad88edeeb2dc7c21d5cdd6772a490066ccc5da7a34b585000ba3edef
- API_BASE_URL： http://172.16.100.211:7130
- 配置已保存到 AGENTS.md