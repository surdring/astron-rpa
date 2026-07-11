# ai-service 部署文档

> AstronRPA AI 推理服务，基于 Python FastAPI，提供 AI 对话、OCR、验证码识别、CUA 视觉等能力。

---

## 一、技术栈

| 项目 | 版本/说明 |
|------|-----------|
| 语言 | Python >= 3.13 |
| 框架 | FastAPI（uvicorn 运行） |
| 包管理 | uv |
| 数据库 | MySQL（通过 aiomysql + SQLAlchemy） |
| 缓存 | Redis（通过 redis-py + hiredis） |
| JWT 验证 | 支持远程验证 InsForge JWT（`AUTH_VERIFY_MODE=remote`） |

---

## 二、目录结构

```
backend/ai-service/
├── Dockerfile              # 容器化部署
├── pyproject.toml          # 依赖与项目配置
├── uv.lock
└── app/
    ├── __init__.py
    ├── main.py             # 启动入口
    ├── config.py           # 配置项
    ├── dependencies/
    │   └── auth.py         # JWT 认证依赖
    ├── routers/
    │   ├── admin.py        # 管理后台
    │   ├── router.py       # 路由注册
    │   ├── chat.py         # AI 对话（v1/chat）
    │   ├── models.py       # 模型列表（v1/models）
    │   ├── ocr.py          # 通用 OCR
    │   ├── jfbym.py        # 云码验证码
    │   ├── smart.py        # 智能组件
    │   └── cua.py          # Computer Use Agent
    ├── services/
    │   ├── chat.py         # 对话服务
    │   ├── ocr.py          # OCR 服务
    │   └── ...
    ├── models/
    │   └── ...             # 数据库模型
    └── utils/
        └── ...             # 工具函数
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
| `AUTH_VERIFY_MODE` | 否 | `local` | 设为 `remote` 启用 InsForge 远程 JWT 验证 |
| `LOG_LEVEL` | 否 | `INFO` | 日志级别 |
| `OCR_API_URL` | 否 | — | OCR 第三方 API 地址 |
| `OCR_API_KEY` | 否 | — | OCR API 密钥 |
| `JFBYM_API_TOKEN` | 否 | — | 云码验证码 API Token |
| `AI_API_KEY` | 否 | — | AI 对话 API 密钥 |
| `AI_API_URL` | 否 | — | AI 对话 API 地址 |

---

## 四、启动方式

### 4.1 源码启动（推荐开发调试）

```bash
# 安装依赖
cd backend/ai-service
uv sync

# 启动服务
uv run uvicorn app.main:app --host 0.0.0.0 --port 8010 --proxy-headers
```

### 4.2 Docker 启动

```bash
docker build -t astron-rpa/ai-service:latest -f backend/ai-service/Dockerfile backend/ai-service

docker run -d \
  --name ai-service \
  --restart unless-stopped \
  -p 8010:8010 \
  -e DATABASE_URL=172.16.100.211:3306 \
  -e DATABASE_USERNAME=root \
  -e DATABASE_PASSWORD=your_password \
  -e REDIS_URL=172.16.100.211:6379 \
  -e JWT_SECRET=your_jwt_secret \
  -e INSFORGE_API_URL=http://172.16.100.211:7130 \
  -e AUTH_VERIFY_MODE=remote \
  astron-rpa/ai-service:latest
```

### 4.3 systemd 部署（推荐生产环境）

创建 `/etc/systemd/system/ai-service.service`：

```ini
[Unit]
Description=AstronRPA AI Service
After=network.target

[Service]
Type=simple
User=astron
WorkingDirectory=/opt/astron-rpa/backend/ai-service
ExecStart=/usr/local/bin/uv run uvicorn app.main:app --host 0.0.0.0 --port 8010 --proxy-headers --workers 4
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
sudo systemctl enable ai-service
sudo systemctl start ai-service
sudo systemctl status ai-service
```

---

## 五、API 端点

| 路由前缀 | 端点 | 说明 |
|----------|------|------|
| `/admin` | 管理后台 | 系统管理接口 |
| `/ocr/general` | `POST /ocr/general` | 通用 OCR 识别 |
| `/v1/chat/completions` | `POST /v1/chat/completions` | AI 对话（OpenAI 兼容格式） |
| `/v1/models` | `GET /v1/models` | 获取可用模型列表 |
| `/jfbym/customApi` | `POST /jfbym/customApi` | 云码验证码识别 |
| `/smart` | 智能组件 | 智能 RPA 组件 |
| `/cua/chat` | `POST /cua/chat` | Computer Use Agent 对话 |

---

## 六、当前部署状态

`172.16.100.211` 上的实际部署情况（来自已确认的服务端执行结果）：

| 项目 | 值 |
|------|-----|
| 端口 | 8001（与源码默认 8010 不同，以环境变量为准） |
| 状态 | ✅ 运行中 |
| 启动方式 | systemd 管理 |
| JWT 验证 | 远程验证（`AUTH_VERIFY_MODE=remote`） |
| 数据库 | MySQL（`172.16.100.211:3306`） |
| Redis | `172.16.100.211:6379` |

---

## 七、日志

- 日志默认输出到 stdout
- 可通过 `LOG_LEVEL` 环境变量控制级别（DEBUG/INFO/WARNING/ERROR）
- 建议用 systemd journal 查看：`journalctl -u ai-service -f`

---

## 八、健康检查

```bash
# 服务是否存活
curl http://172.16.100.211:8001/health

# AI 对话接口是否正常
curl -X POST http://172.16.100.211:8001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"hello"}]}'
```