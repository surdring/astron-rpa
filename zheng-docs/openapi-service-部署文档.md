# openapi-service 部署文档

> AstronRPA OpenAPI 服务，基于 Python FastAPI，提供 Workflow API、WebSocket 实时通信、MCP 协议、API Key 管理等能力。

---

## 一、技术栈

| 项目 | 版本/说明 |
|------|-----------|
| 语言 | Python >= 3.13 |
| 框架 | FastAPI（uvicorn 运行） |
| 包管理 | uv |
| 数据库 | MySQL（通过 aiomysql + SQLAlchemy） |
| 缓存 | Redis（通过 redis-py + hiredis） |
| WebSocket | 自研 `rpawebsocket` 库（本地 wheel，v1.0.6） |
| MCP | 内置 Model Context Protocol streamable HTTP 支持 |
| JWT 验证 | 支持远程验证 InsForge JWT（`AUTH_VERIFY_MODE=remote`） |

---

## 二、目录结构

```
backend/openapi-service/
├── Dockerfile                 # 容器化部署
├── pyproject.toml             # 依赖与项目配置
├── uv.lock
└── app/
    ├── __init__.py
    ├── main.py                # 启动入口
    ├── config.py              # 配置项
    ├── logger.py              # 日志配置
    ├── dependencies/
    │   ├── __init__.py        # 依赖注入（ws_service 等）
    │   └── auth.py            # JWT 认证依赖
    ├── middlewares/
    │   └── ...                # 中间件
    ├── routers/
    │   ├── admin.py           # 管理后台
    │   ├── workflows.py       # Workflow CRUD + 执行
    │   ├── executions.py      # 执行记录查询
    │   ├── api_keys.py        # API Key 管理（含 Astron Agent 密钥）
    │   ├── healthcheck.py     # 健康检查
    │   ├── user.py            # 用户注册/密钥
    │   └── websocket.py       # WebSocket 实时通信
    ├── services/
    │   ├── websocket.py       # WebSocket 服务（rpawebsocket）
    │   ├── execution.py       # 执行记录服务
    │   └── ...
    ├── models/
    │   └── ...                # 数据库模型
    └── utils/
        ├── rpawebsocket-1.0.6-py3-none-any.whl   # 本地 wheel 依赖
        └── ...
```

---

## 三、环境变量

| 变量名 | 必填 | 默认值 | 说明 |
|--------|------|--------|------|
| `DATABASE_URL` | 是 | — | MySQL 连接地址，如 `172.16.100.211:3306` |
| `DATABASE_USERNAME` | 是 | — | 数据库用户名 |
| `DATABASE_PASSWORD` | 是 | — | 数据库密码 |
| `REDIS_URL` | 是 | — | Redis 连接地址，如 `172.16.100.211:6379` |
| `JWT_SECRET` | 是 | — | JWT 密钥（需与 InsForge 一致） |
| `INSFORGE_API_URL` | 否 | `http://172.16.100.211:7130` | InsForge API 地址，用于远程 JWT 验证 |
| `AUTH_VERIFY_MODE` | 否 | `remote` | 设为 `remote` 启用 InsForge 远程 JWT 验证 |
| `LOG_LEVEL` | 否 | `INFO` | 日志级别 |
| `LOG_DIR` | 否 | `/var/log/rpa-openapi` | 日志目录 |

---

## 四、依赖说明

openapi-service 依赖一个本地 wheel 包 `rpawebsocket`（v1.0.6），提供 WebSocket 连接管理能力。

**安装方式：**
- uv 会自动从 `pyproject.toml` 中配置的本地路径安装：

```toml
[tool.uv.sources]
rpawebsocket = {path = "./app/utils/rpawebsocket-1.0.6-py3-none-any.whl"}
```

- Docker 构建时也会复制并安装此 wheel：

```dockerfile
COPY backend/openapi-service/app/utils/rpawebsocket-1.0.7-py3-none-any.whl ./
RUN pip install --no-cache-dir rpawebsocket-1.0.7-py3-none-any.whl
```

> **注意**：`pyproject.toml` 中引用的是 v1.0.6，`Dockerfile` 中是 v1.0.7，部署时需确保版本一致。

---

## 五、启动方式

### 5.1 源码启动（推荐开发调试）

```bash
# 安装依赖
cd backend/openapi-service
uv sync

# 启动服务
uv run uvicorn app.main:app --host 0.0.0.0 --port 8020 --proxy-headers
```

### 5.2 Docker 启动

```bash
docker build -t astron-rpa/openapi-service:latest -f backend/openapi-service/Dockerfile .

docker run -d \
  --name openapi-service \
  --restart unless-stopped \
  -p 8020:8020 \
  -e DATABASE_URL=172.16.100.211:3306 \
  -e DATABASE_USERNAME=root \
  -e DATABASE_PASSWORD=your_password \
  -e REDIS_URL=172.16.100.211:6379 \
  -e JWT_SECRET=your_jwt_secret \
  -e INSFORGE_API_URL=http://172.16.100.211:7130 \
  -e AUTH_VERIFY_MODE=remote \
  astron-rpa/openapi-service:latest
```

### 5.3 systemd 部署（推荐生产环境）

创建 `/etc/systemd/system/openapi-service.service`：

```ini
[Unit]
Description=AstronRPA OpenAPI Service
After=network.target

[Service]
Type=simple
User=astron
WorkingDirectory=/opt/astron-rpa/backend/openapi-service
ExecStart=/usr/local/bin/uv run uvicorn app.main:app --host 0.0.0.0 --port 8020 --proxy-headers
Restart=always
RestartSec=5
Environment=DATABASE_URL=172.16.100.211:3306
Environment=DATABASE_USERNAME=root
Environment=DATABASE_PASSWORD=your_password
Environment=REDIS_URL=172.16.100.211:6379
Environment=JWT_SECRET=your_jwt_secret
Environment=INSFORGE_API_URL=http://172.16.100.211:7130
Environment=AUTH_VERIFY_MODE=remote

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable openapi-service
sudo systemctl start openapi-service
sudo systemctl status openapi-service
```

---

## 六、API 端点

| 路由 | 方法 | 说明 |
|------|------|------|
| `/admin` | — | 管理后台接口 |
| `/workflows` | GET/POST/PUT/DELETE | Workflow CRUD |
| `/workflows/{id}/run` | POST | 执行 Workflow |
| `/executions/get` | GET | 分页获取执行记录 |
| `/executions/{execution_id}` | GET | 获取单条执行记录 |
| `/api-keys/get` | GET | 获取 API Key 列表 |
| `/api-keys/create` | POST | 创建 API Key |
| `/api-keys/remove` | POST | 删除 API Key |
| `/api-keys/create-astron` | POST | 创建 Astron Agent 密钥 |
| `/api-keys/get-astron` | GET | 获取 Astron Agent 密钥列表 |
| `/api-keys/get-astron-by-id` | GET | 按 ID 获取 Astron Agent 密钥 |
| `/api-keys/update-astron` | POST | 更新 Astron Agent 密钥 |
| `/api-keys/remove-astron` | POST | 删除 Astron Agent 密钥 |
| `/health/local-check` | GET | 本地健康检查 |
| `/health/remote-check` | GET | 远端健康检查（含 WebSocket） |
| `/users/register` | POST | 用户注册 |
| `/users/get-key` | POST | 获取用户密钥 |
| `/ws` | WebSocket | 实时通信（rpawebsocket 协议） |
| `/mcp` | streamable HTTP | MCP 协议端点 |

---

## 七、当前部署状态

| 项目 | 值 |
|------|-----|
| 端口 | 8020 |
| 状态 | ⏸ 未启动（依赖 MySQL，当前 MySQL 未运行） |
| 数据库 | MySQL（`172.16.100.211:3306`） |
| 启动限制 | 需先启动 MySQL 实例 |

---

## 八、与其他服务的依赖关系

| 依赖 | 说明 |
|------|------|
| **MySQL** | 强依赖，存储 Workflow、执行记录、API Key 等数据 |
| **Redis** | 强依赖，WebSocket 连接管理、缓存 |
| **InsForge BaaS** | 弱依赖，仅用于远程 JWT 验证（可降级为本地验证） |
| **rpawebsocket** | 本地 wheel 依赖，版本需与 Dockerfile 一致 |

---

## 九、日志

- 日志默认写入 `LOG_DIR` 指定目录（默认 `/var/log/rpa-openapi`）
- 可通过 `LOG_LEVEL` 环境变量控制级别（DEBUG/INFO/WARNING/ERROR）
- systemd 部署时可用 `journalctl -u openapi-service -f` 查看

---

## 十、健康检查

```bash
# 本地健康检查
curl http://172.16.100.211:8020/health/local-check

# 远端健康检查（含 WebSocket 状态）
curl http://172.16.100.211:8020/health/remote-check?user_id=xxx
```