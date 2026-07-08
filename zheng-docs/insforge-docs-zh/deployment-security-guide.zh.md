## 本页内容

* [VPS 部署与安全指南](#vps-部署与安全指南)
* [📋 目录](#-目录)
* [前提条件](#前提条件)
* [第一部分 — 部署](#第一部分-—-部署)
  + [1. 服务器要求](#1-服务器要求)
  + [2. 初始服务器设置](#2-初始服务器设置)
  + [2.1 连接到你的 VPS](#21-连接到你的-vps)
  + [2.2 更新系统包](#22-更新系统包)
  + [2.3 创建部署用户（非 root）](#23-创建部署用户非-root)
  + [2.4 设置时区](#24-设置时区)
  + [2.5 启用自动安全更新](#25-启用自动安全更新)
  + [3. 安装 Docker 与 Docker Compose](#3-安装-docker-与-docker-compose)
  + [3.1 安装 Docker Engine](#31-安装-docker-engine)
  + [3.2 将部署用户添加到 Docker 组](#32-将部署用户添加到-docker-组)
  + [3.3 验证 Docker 安装](#33-验证-docker-安装)
  + [4. 使用 Docker Compose 部署 InsForge](#4-使用-docker-compose-部署-insforge)
  + [4.1 下载生产版 Docker Compose 文件](#41-下载生产版-docker-compose-文件)
  + [4.2 启动 InsForge](#42-启动-insforge)
  + [4.3 验证所有服务正在运行](#43-验证所有服务正在运行)
  + [4.4 测试健康端点](#44-测试健康端点)
  + [5. 环境变量配置](#5-环境变量配置)
  + [5.1 必需变量](#51-必需变量)
  + [5.2 数据库变量](#52-数据库变量)
  + [5.3 端口变量](#53-端口变量)
  + [5.4 部署所需变量](#54-部署所需变量)
  + [5.5 可选变量](#55-可选变量)
  + [6. 反向代理设置](#6-反向代理设置)
  + [选项 A：Nginx（推荐）](#选项-a-nginx推荐)
  + [选项 B：Caddy（自动 HTTPS）](#选项-b-caddy自动-https)
  + [7. HTTPS / TLS 设置](#7-https--tls-设置)
  + [7.1 安装 Certbot（用于 Nginx）](#71-安装-certbot用于-nginx)
  + [7.2 获取 SSL 证书](#72-获取-ssl-证书)
  + [7.3 验证自动续期](#73-验证自动续期)
  + [7.4 为 HTTPS 更新 InsForge 环境](#74-为-https-更新-insforge-环境)
* [第二部分 — 安全](#第二部分-—-安全)
  + [8. 端口管理](#8-端口管理)
  + [应通过反向代理开放的端口](#应通过反向代理开放的端口)
  + [应对公众关闭的端口](#应对公众关闭的端口)
  + [9. 防火墙设置（UFW）](#9-防火墙设置ufw)
  + [9.1 安装并配置 UFW](#91-安装并配置-ufw)
  + [9.2 Docker 与 UFW 注意事项](#92-docker-与-ufw-注意事项)
  + [9.3 将 SSH 限制为你的 IP（可选）](#93-将-ssh-限制为你的-ip可选)
  + [10. 以非 root 用户运行服务](#10-以非-root-用户运行服务)
  + [11. SSH 加固](#11-ssh-加固)
  + [11.1 使用 SSH 密钥认证](#111-使用-ssh-密钥认证)
  + [11.2 禁用密码认证](#112-禁用密码认证)
  + [11.3 安装 Fail2Ban](#113-安装-fail2ban)
  + [12. Docker 安全](#12-docker-安全)
  + [12.1 保持 Docker 更新](#121-保持-docker-更新)
  + [12.2 限制容器资源（可选）](#122-限制容器资源可选)
  + [12.3 只读根文件系统（高级）](#123-只读根文件系统高级)
  + [12.4 限制 CORS 来源](#124-限制-cors-来源)
  + [13. 密钥管理](#13-密钥管理)
  + [应该做 ✅](#应该做-)
  + [不应该做 ❌](#不应该做-)
* [第三部分 — 更新与维护](#第三部分-—-更新与维护)
  + [14. 更新前备份](#14-更新前备份)
  + [14.1 备份数据库](#141-备份数据库)
  + [14.2 备份环境和卷](#142-备份环境和卷)
  + [14.3 记录当前版本](#143-记录当前版本)
  + [15. 更新 InsForge](#15-更新-insforge)
  + [15.1 拉取最新镜像](#151-拉取最新镜像)
  + [15.2 应用更新](#152-应用更新)
  + [15.3 验证更新](#153-验证更新)
  + [15.4 更新 Docker Compose 文件（如果需要）](#154-更新-docker-compose-文件如果需要)
  + [16. 回滚流程](#16-回滚流程)
  + [16.1 停止有问题的服务](#161-停止有问题的服务)
  + [16.2 恢复之前的 Docker Compose 文件](#162-恢复之前的-docker-compose-文件)
  + [16.3 固定到特定镜像版本](#163-固定到特定镜像版本)
  + [16.4 恢复数据库（如果需要）](#164-恢复数据库如果需要)
  + [16.5 恢复环境文件（如果已更改）](#165-恢复环境文件如果已更改)
  + [17. 自动备份](#17-自动备份)
  + [17.1 创建备份脚本](#171-创建备份脚本)
  + [17.2 使用 Cron 调度](#172-使用-cron-调度)
  + [17.3 异地备份（推荐）](#173-异地备份推荐)
  + [18. 监控与健康检查](#18-监控与健康检查)
  + [18.1 检查服务状态](#181-检查服务状态)
  + [18.2 查看日志](#182-查看日志)
  + [18.3 健康检查端点](#183-健康检查端点)
* [快速参考](#快速参考)
  + [基本命令](#基本命令)
  + [安全检查清单](#安全检查清单)
* [故障排除](#故障排除)
  + [启用 UFW 后无法连接](#启用-ufw-后无法连接)
  + [Docker 绕过 UFW](#docker-绕过-ufw)
  + [服务启动失败](#服务启动失败)
  + [SSL 证书无法续期](#ssl-证书无法续期)
  + [端口冲突](#端口冲突)
  + [数据库连接问题](#数据库连接问题)
* [🆘 需要帮助？](#-需要帮助)

自托管

# VPS 部署与安全指南

复制页面

在通用 Linux VPS 上部署 InsForge，使用防火墙、SSH 和 TLS 最佳实践进行加固，并通过安全的更新和回滚进行维护。

复制页面

# [​](#vps-部署与安全指南) VPS 部署与安全指南

这份综合指南涵盖了在生产环境中在通用 VPS（虚拟专用服务器）上部署 InsForge、使用安全最佳实践加固你的实例，以及通过安全更新和回滚流程进行长期维护。
> **范围**：本指南与提供商无关。适用于任何 Linux VPS——推荐 Ubuntu/Debian——来自 DigitalOcean、Hetzner、Linode、Vultr、OVH 或裸金属服务器等提供商。如需特定云平台指南（AWS EC2、GCP、Azure、Render），请参阅本节中的其他指南。

---

## [​](#-目录) 📋 目录

* [前提条件](#前提条件)
* [第一部分 — 部署](#第一部分--部署)
  + [服务器要求](#1-服务器要求)
  + [初始服务器设置](#2-初始服务器设置)
  + [安装 Docker 与 Docker Compose](#3-安装-docker--docker-compose)
  + [使用 Docker Compose 部署 InsForge](#4-使用-docker-compose-部署-insforge)
  + [环境变量配置](#5-环境变量配置)
  + [反向代理设置](#6-反向代理设置)
  + [HTTPS / TLS 设置](#7-https--tls-设置)
* [第二部分 — 安全](#第二部分--安全)
  + [端口管理](#8-端口管理)
  + [防火墙设置（UFW）](#9-防火墙设置ufw)
  + [以非 root 用户运行服务](#10-以非-root-用户运行服务)
  + [SSH 加固](#11-ssh-加固)
  + [Docker 安全](#12-docker-安全)
  + [密钥管理](#13-密钥管理)
* [第三部分 — 更新与维护](#第三部分--更新与维护)
  + [更新前备份](#14-更新前备份)
  + [更新 InsForge](#15-更新-insforge)
  + [回滚流程](#16-回滚流程)
  + [自动备份](#17-自动备份)
  + [监控与健康检查](#18-监控与健康检查)
* [快速参考](#快速参考)
* [故障排除](#故障排除)

---

## [​](#前提条件) 前提条件

开始之前，请确保你拥有：

* 一台运行 **Ubuntu 22.04 LTS** 或 **Ubuntu 24.04 LTS** 的 VPS（Debian 12 也可用）
* 服务器的 **root 或 sudo 访问权限**
* 一个已注册的**域名**（推荐用于生产环境）
* 基本熟悉 Linux 命令和 SSH

---

## [​](#第一部分-—-部署) 第一部分 — 部署

### [​](#1-服务器要求) 1. 服务器要求

| 资源 | 最低要求 | 推荐配置 |
| --- | --- | --- |
| **CPU** | 2 vCPU | 4 vCPU |
| **RAM** | 2 GB | 4 GB+ |
| **存储** | 20 GB SSD | 40 GB+ SSD |
| **操作系统** | Ubuntu 22.04+ | Ubuntu 24.04 LTS |
| **网络** | 公网 IPv4 | 公网 IPv4 + IPv6 |

> 💡 **提示**：对于有多用户的生产工作负载，从 4 GB RAM 开始。使用 `docker stats` 监控使用情况，并根据需要垂直扩展。

InsForge 由 **4 个服务**组成，它们一起运行：

| 服务 | 描述 | 内部端口 |
| --- | --- | --- |
| **PostgreSQL** | 主数据库 | 5432 |
| **PostgREST** | 自动生成的 REST API 层 | 3000（映射到 5430） |
| **InsForge** | Node.js 后端 + 控制面板 | 7130 |
| **Deno** | 无服务器函数运行时 | 7133 |

---

### [​](#2-初始服务器设置) 2. 初始服务器设置

#### [​](#21-连接到你的-vps) 2.1 连接到你的 VPS

```
ssh root@your-server-ip
```

#### [​](#22-更新系统包) 2.2 更新系统包

```
apt update && apt upgrade -y
```

#### [​](#23-创建部署用户非-root) 2.3 创建部署用户（非 root）

永远不要以 root 身份运行生产服务。创建一个专用用户：

```
# 创建部署用户并添加到 sudo 组
adduser deploy
usermod -aG sudo deploy

# 切换到部署用户
su - deploy
```

#### [​](#24-设置时区) 2.4 设置时区

```
sudo timedatectl set-timezone UTC
```

#### [​](#25-启用自动安全更新) 2.5 启用自动安全更新

```
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

### [​](#3-安装-docker-与-docker-compose) 3. 安装 Docker 与 Docker Compose

#### [​](#31-安装-docker-engine) 3.1 安装 Docker Engine

```
# 添加 Docker 的官方 GPG 密钥
sudo apt install ca-certificates curl gnupg -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 添加 Docker 仓库
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

#### [​](#32-将部署用户添加到-docker-组) 3.2 将部署用户添加到 Docker 组

```
sudo usermod -aG docker deploy
newgrp docker
```

#### [​](#33-验证-docker-安装) 3.3 验证 Docker 安装

```
docker --version
docker compose version
docker run hello-world
```

> ⚠️ **安全提示**：将用户添加到 `docker` 组相当于授予主机 root 级别权限。对于专用部署用户是可以接受的，但不应用于共享服务器上的通用账户。

---

### [​](#4-使用-docker-compose-部署-insforge) 4. 使用 Docker Compose 部署 InsForge

#### [​](#41-下载生产版-docker-compose-文件) 4.1 下载生产版 Docker Compose 文件

```
mkdir -p ~/insforge && cd ~/insforge

# 下载生产就绪的 Docker Compose 文件和环境模板
wget https://raw.githubusercontent.com/insforge/insforge/main/deploy/docker-compose/docker-compose.yml
wget https://raw.githubusercontent.com/insforge/insforge/main/deploy/docker-compose/.env.example

# 创建你的环境文件
cp .env.example .env
```

#### [​](#42-启动-insforge) 4.2 启动 InsForge

```
docker compose up -d
```

#### [​](#43-验证所有服务正在运行) 4.3 验证所有服务正在运行

```
docker compose ps
```

你应该看到 4 个容器处于 `running` 或 `healthy` 状态：

```
NAME            SERVICE     STATUS
insforge        insforge    running
postgres        postgres    healthy
postgrest       postgrest   healthy
deno            deno        running
```

#### [​](#44-测试健康端点) 4.4 测试健康端点

```
curl http://localhost:7130/api/health
```

预期响应：

```
{
  "status": "ok",
  "version": "1.x.x",
  "service": "Insforge OSS Backend",
  "timestamp": "2026-..."
}
```

---

### [​](#5-环境变量配置) 5. 环境变量配置

编辑你的 `.env` 文件以配置生产环境的 InsForge：

```
nano ~/insforge/.env
```

#### [​](#51-必需变量) 5.1 必需变量

以下**必须**在进入生产环境前从默认值更改：

```
# ── 安全（关键——生成唯一值）──────────────
JWT_SECRET=<输出自：openssl rand -base64 32>
ENCRYPTION_KEY=<输出自：openssl rand -base64 24>
ROOT_ADMIN_USERNAME=admin
ROOT_ADMIN_PASSWORD=<强唯一密码>

# ── 公共 URL（必须与你的域名/IP 匹配）────────────
API_BASE_URL=https://insforge.yourdomain.com
VITE_API_BASE_URL=https://insforge.yourdomain.com
```

直接从终端生成安全密钥：

```
# JWT 密钥（32+ 字符）
openssl rand -base64 32

# 加密密钥（与 JWT_SECRET 分开）
openssl rand -base64 24

# 管理员密码
openssl rand -base64 18
```

> ⚠️ **重要**：`JWT_SECRET` 和 `ENCRYPTION_KEY` 应该是**不同的**值。如果未设置 `ENCRYPTION_KEY`，InsForge 会回退到 `JWT_SECRET`——但之后轮换 `JWT_SECRET` 将永久破坏所有存储的密钥（API 密钥、OAuth 令牌等）。

#### [​](#52-数据库变量) 5.2 数据库变量

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<强唯一密码>
POSTGRES_DB=insforge
```

#### [​](#53-端口变量) 5.3 端口变量

InsForge 使用的默认端口：

```
POSTGRES_PORT=5432
POSTGREST_PORT=5430
APP_PORT=7130
AUTH_PORT=7131
DENO_PORT=7133
```

> 💡 如果这些端口与你 VPS 上的其他服务冲突，你可以更改它们。

#### [​](#54-部署所需变量) 5.4 部署所需变量

这些变量仅在计划使用 InsForge 的**部署功能**（通过控制面板部署项目）时才有必要。如果你不需要部署功能，请跳过本节。
> ⚠️ **注意**：这些变量（`AWS_S3_BUCKET`、`AWS_REGION`、`AWS_ACCESS_KEY_ID`、`AWS_SECRET_ACCESS_KEY`、`PROJECT_ID`、`MAX_FILE_SIZE`）来自根目录的 `.env.example` 设置。它们**不**存在于 `deploy/docker-compose/.env.example` 中，且 `deploy/docker-compose/docker-compose.yml` **不**将它们传入 `insforge` 容器，因此在你的 `.env` 中设置它们对该生产用 compose 文件没有效果。要使用它们，请将每个添加到你的 `docker-compose.yml` 中 `insforge` 服务的 `environment` 块。

```
# ── 部署 ──────────────────────────────────────────────
# 用于传统 zip 部署上传的 S3 存储桶。
# 直接上传使用后端代理，但 POST /api/deployments 仍然需要 S3。
AWS_S3_BUCKET=your-deployment-bucket
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# 由 OpenRouter AI 令牌续期和 Vercel 部署使用的项目 ID
PROJECT_ID=your-project-id
```

#### [​](#55-可选变量) 5.5 可选变量

```
# ── OAuth 提供商 ───────────────────────────────────────────
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
X_CLIENT_ID=
X_CLIENT_SECRET=
APPLE_CLIENT_ID=
APPLE_CLIENT_SECRET=

# ── AI / LLM ─────────────────────────────────────────────────
OPENROUTER_API_KEY=

# ── 存储（S3 兼容——留空则使用本地存储）────
# 仅用于通用文件存储（非部署）。如果省略，自动使用本地文件系统存储。
AWS_S3_BUCKET=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# ── Deno 函数 ────────────────────────────────────────────
WORKER_TIMEOUT_MS=60000
```

编辑后，重启服务以应用更改：

```
cd ~/insforge
docker compose down
docker compose up -d
```

---

### [​](#6-反向代理设置) 6. 反向代理设置

反向代理位于 InsForge 之前，提供 TLS 终止、HTTP/2 和无端口号的干净 URL。

#### [​](#选项-a-nginx推荐) 选项 A：Nginx（推荐）

##### 6.1 安装 Nginx

```
sudo apt install nginx -y
```

##### 6.2 创建站点配置

```
sudo nano /etc/nginx/sites-available/insforge
```

粘贴以下配置——将 `insforge.yourdomain.com` 替换为你的实际域名：

```
# ── InsForge 后端 + 控制面板 ──────────────────────────────
server {
    listen 80;
    listen [::]:80;
    server_name insforge.yourdomain.com;

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # 最大上传大小（匹配 .env 中的 MAX_FILE_SIZE，默认 50 MB）
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:7130;
        proxy_http_version 1.1;

        # WebSocket 支持（Realtime 功能需要）
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 长时间运行请求的超时（例如 AI 补全）
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }
}
```

##### 6.3 启用站点

```
sudo ln -s /etc/nginx/sites-available/insforge /etc/nginx/sites-enabled/

# 删除默认站点（可选）
sudo rm -f /etc/nginx/sites-enabled/default

# 测试并重新加载
sudo nginx -t
sudo systemctl reload nginx
```

#### [​](#选项-b-caddy自动-https) 选项 B：Caddy（自动 HTTPS）

Caddy 是更简单的替代方案，可自动处理 TLS 证书。

##### 安装 Caddy

```
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy -y
```

##### 配置 Caddy

```
sudo nano /etc/caddy/Caddyfile
```

```
insforge.yourdomain.com {
    reverse_proxy localhost:7130

    header {
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    request_body {
        max_size 50MB
    }
}
```

```
sudo systemctl reload caddy
```

Caddy 会自动获取和续期 Let's Encrypt 证书——无需额外步骤。

---

### [​](#7-https--tls-设置) 7. HTTPS / TLS 设置

> 如果你在第 6 步选择了 **Caddy**，TLS 已自动处理。跳转到[第二部分](#第二部分--安全)。

#### [​](#71-安装-certbot用于-nginx) 7.1 安装 Certbot（用于 Nginx）

```
sudo apt install certbot python3-certbot-nginx -y
```

#### [​](#72-获取-ssl-证书) 7.2 获取 SSL 证书

```
sudo certbot --nginx -d insforge.yourdomain.com
```

按照交互提示操作。Certbot 将：

1. 通过 HTTP 挑战验证域名所有权
2. 从 Let's Encrypt 获取签名证书
3. 自动更新你的 Nginx 配置以提供 HTTPS
4. 设置 HTTP → HTTPS 重定向

#### [​](#73-验证自动续期) 7.3 验证自动续期

Let's Encrypt 证书每 90 天过期。Certbot 安装了一个 systemd 定时器用于自动续期：

```
# 测试续期（dry run——不会实际续期）
sudo certbot renew --dry-run

# 检查定时器是否激活
sudo systemctl status certbot.timer
```

#### [​](#74-为-https-更新-insforge-环境) 7.4 为 HTTPS 更新 InsForge 环境

获取证书后，更新你的 `.env` 以使用 HTTPS URL：

```
cd ~/insforge
nano .env
```

```
API_BASE_URL=https://insforge.yourdomain.com
VITE_API_BASE_URL=https://insforge.yourdomain.com
```

重启 InsForge 以应用：

```
docker compose down
docker compose up -d
```

---

## [​](#第二部分-—-安全) 第二部分 — 安全

### [​](#8-端口管理) 8. 端口管理

#### [​](#应通过反向代理开放的端口) 应通过反向代理开放的端口

| 端口 | 协议 | 用途 |
| --- | --- | --- |
| 22 | TCP | SSH（限制来源 IP） |
| 80 | TCP | HTTP → HTTPS 重定向 |
| 443 | TCP | HTTPS（反向代理） |

#### [​](#应对公众关闭的端口) 应对公众关闭的端口

这些端口**仅**用于内部 Docker 服务间通信。它们**绝不应**暴露到互联网：

| 端口 | 服务 | 为何关闭 |
| --- | --- | --- |
| 5432 | PostgreSQL | 直接数据库访问——使用 `docker exec` 替代 |
| 5430 | PostgREST | 内部 REST 层——通过 InsForge 代理 |
| 7130 | InsForge | API + 控制面板，通过 443 的反向代理访问，而非直接访问 |
| 7131 |（未使用）| 由 compose 发布（`AUTH_PORT`），但无进程监听 |
| 7133 | Deno | 内部无服务器运行时 |

> ⚠️ **关键**：默认的 `docker-compose.yml` 将端口绑定到 `0.0.0.0`（所有接口），而**不是** `127.0.0.1`。这意味着 Docker 会直接将服务暴露到互联网，**完全绕过 UFW**（Docker 直接操作 iptables）。你**必须**在每个已发布端口前添加 `127.0.0.1:` 前缀：
>
> ```
> ports:
>   - "127.0.0.1:${POSTGRES_PORT:-5432}:5432"     # PostgreSQL
>   - "127.0.0.1:${POSTGREST_PORT:-5430}:3000"     # PostgREST
>   - "127.0.0.1:${APP_PORT:-7130}:7130"            # InsForge（API + 控制面板）
>   - "127.0.0.1:${AUTH_PORT:-7131}:7131"           # AUTH_PORT（由 compose 发布，未使用）
>   - "127.0.0.1:${DENO_PORT:-7133}:7133"           # Deno
> ```
>
> 没有此前缀，互联网上的任何人都可以直接访问这些服务——包括使用默认凭据的 PostgreSQL。参见[第 9.2 节](#92-docker-与-ufw-注意事项)了解详情。

---

### [​](#9-防火墙设置ufw) 9. 防火墙设置（UFW）

UFW（Uncomplicated Firewall）是在 Ubuntu 上管理 iptables 的最简单方式。

#### [​](#91-安装并配置-ufw) 9.1 安装并配置 UFW

```
# 安装 UFW（通常在 Ubuntu 上已预装）
sudo apt install ufw -y

# 默认策略：拒绝所有入站，允许所有出站
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许 SSH（关键——在启用 UFW 之前执行！）
sudo ufw allow OpenSSH

# 允许 HTTP 和 HTTPS（用于反向代理）
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 验证规则
sudo ufw status verbose
```

预期输出：

```
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
```

> ⚠️ **关键**：始终在启用 UFW **之前**允许 SSH，否则你会将自己锁在服务器外。

#### [​](#92-docker-与-ufw-注意事项) 9.2 Docker 与 UFW 注意事项

Docker 直接操作 iptables，这可以**绕过 UFW 规则**。要防止这种情况：
**选项 1 — 将端口绑定到 localhost**（推荐）：
在你的 `docker-compose.yml` 中，在端口前加上 `127.0.0.1:`：

```
ports:
  - "127.0.0.1:7130:7130"
  - "127.0.0.1:7131:7131"
```

**选项 2 — 禁用 Docker 的 iptables 管理**：

```
sudo nano /etc/docker/daemon.json
```

```
{
  "iptables": false
}
```

```
sudo systemctl restart docker
```

> ⚠️ 禁用 Docker iptables 需要手动网络配置。**对于大多数设置，选项 1 是首选**。

#### [​](#93-将-ssh-限制为你的-ip可选) 9.3 将 SSH 限制为你的 IP（可选）

为了最大安全性，将 SSH 访问限制为已知的 IP 地址：

```
# 移除宽泛的 SSH 规则
sudo ufw delete allow OpenSSH

# 仅允许从你的 IP 进行 SSH
sudo ufw allow from YOUR_IP_ADDRESS to any port 22 proto tcp

# 验证
sudo ufw status
```

---

### [​](#10-以非-root-用户运行服务) 10. 以非 root 用户运行服务

InsForge 的 Docker 镜像已经遵循非 root 最佳实践：

* 生产 Dockerfile 设置 `USER node`（UID 1000），因此容器内的应用程序进程以非 root 用户运行。
* 系统级 Docker 操作由 `deploy` 用户管理（在[第 2.3 节](#23-创建部署用户非-root)中创建），该用户通过 `docker` 组拥有 Docker 套接字的访问权限。

**验证容器用户：**

```
docker compose exec insforge whoami
# 预期输出：node
```

**额外加固：**
在每个服务的 `docker-compose.yml` 中添加 `security_opt` 以防止权限提升：

```
# 添加到 docker-compose.yml 中的每个服务
security_opt:
  - no-new-privileges:true
```

---

### [​](#11-ssh-加固) 11. SSH 加固

#### [​](#111-使用-ssh-密钥认证) 11.1 使用 SSH 密钥认证

```
# 在你的本地机器上——如果没有密钥对则生成一个
ssh-keygen -t ed25519 -C "deploy@insforge"

# 将公钥复制到你的服务器
ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@your-server-ip
```

#### [​](#112-禁用密码认证) 11.2 禁用密码认证

确认基于密钥的认证工作正常后：

```
sudo nano /etc/ssh/sshd_config
```

设置以下内容：

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
```

重启 SSH：

```
sudo systemctl restart sshd
```

#### [​](#113-安装-fail2ban) 11.3 安装 Fail2Ban

Fail2Ban 自动禁止显示恶意活动（例如 SSH 暴力破解）的 IP：

```
sudo apt install fail2ban -y

# 创建本地配置（在更新后仍然保留）
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

添加或确保存在以下设置：

```
[sshd]
enabled = true
port = ssh
filter = sshd
maxretry = 5
bantime = 3600
findtime = 600
```

```
sudo systemctl enable fail2ban
sudo systemctl restart fail2ban

# 检查被禁止的 IP
sudo fail2ban-client status sshd
```

---

### [​](#12-docker-安全) 12. Docker 安全

#### [​](#121-保持-docker-更新) 12.1 保持 Docker 更新

```
sudo apt update
sudo apt upgrade docker-ce docker-ce-cli containerd.io -y
```

#### [​](#122-限制容器资源可选) 12.2 限制容器资源（可选）

防止单个容器消耗所有资源：

```
# 添加到 docker-compose.yml 中的任何服务
deploy:
  resources:
    limits:
      memory: 2G
      cpus: '1.0'
    reservations:
      memory: 512M
```

#### [​](#123-只读根文件系统高级) 12.3 只读根文件系统（高级）

为了额外加固，尽可能将容器文件系统挂载为只读：

```
read_only: true
tmpfs:
  - /tmp
```

> ⚠️ 这需要测试——某些服务可能需要可写目录来存储缓存或临时文件。

#### [​](#124-限制-cors-来源) 12.4 限制 CORS 来源

默认情况下，后端允许所有来源。它会将请求的 `Origin` 头部反映回响应中，并且对于函数代理响应，设置 `Access-Control-Allow-Origin: *`。这对于本地开发很方便，但对于生产环境来说过于宽松。对于生产部署，将允许的来源限制为你实际服务的域名（例如你的控制面板和应用域名），这样其他网站就无法向你的 API 发送带有凭据的跨域请求。

---

### [​](#13-密钥管理) 13. 密钥管理

#### [​](#应该做) 应该做 ✅

* 使用 `chmod 600 ~/insforge/.env` 将密钥存储在 `.env` 文件中
* 对 `JWT_SECRET` 和 `ENCRYPTION_KEY` 使用不同的值
* 使用 `openssl rand -base64 32` 生成密钥
* 将你的 `.env` 文件备份到安全、离线的位置

#### [​](#不应该做) 不应该做 ❌

* 将 `.env` 提交到版本控制系统
* 对多个变量重复使用相同的密钥
* 在生产环境中使用默认密码（`change-this-password`、`postgres`）
* 通过未加密的渠道分享密钥

---

## [​](#第三部分-—-更新与维护) 第三部分 — 更新与维护

### [​](#14-更新前备份) 14. 更新前备份

**始终在更新前备份。** 这为你提供了出现任何问题时的恢复路径。

#### [​](#141-备份数据库) 14.1 备份数据库

```
cd ~/insforge
source .env

# 创建带时间戳的数据库备份
docker compose exec -T postgres pg_dump \
  -U "${POSTGRES_USER:-postgres}" "${POSTGRES_DB:-insforge}" \
  > backup_$(date +%Y%m%d_%H%M%S).sql

# 验证大小是否合理
ls -lh backup_*.sql
```

#### [​](#142-备份环境和卷) 14.2 备份环境和卷

```
# 备份 .env 文件
cp .env .env.backup_$(date +%Y%m%d)

# 备份 Docker 卷（可选但推荐）
docker run --rm \
  -v insforge_postgres-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/volumes_postgres_$(date +%Y%m%d_%H%M%S).tar.gz /data
```

#### [​](#143-记录当前版本) 14.3 记录当前版本

```
# 在更新前记下当前的镜像版本
docker compose images
```

---

### [​](#15-更新-insforge) 15. 更新 InsForge

#### [​](#151-拉取最新镜像) 15.1 拉取最新镜像

```
cd ~/insforge

# 拉取最新版本
docker compose pull
```

#### [​](#152-应用更新) 15.2 应用更新

```
# 停止当前服务，使用新镜像启动
docker compose down
docker compose up -d

# 查看启动期间的日志以检查错误
docker compose logs -f --tail=50
```

按 `Ctrl+C` 停止跟踪日志。

#### [​](#153-验证更新) 15.3 验证更新

```
# 检查所有服务是否健康
docker compose ps

# 测试健康端点
curl http://localhost:7130/api/health

# 检查响应中的版本
```

#### [​](#154-更新-docker-compose-文件如果需要) 15.4 更新 Docker Compose 文件（如果需要）

偶尔，新版本可能包含对 `docker-compose.yml` 的更改。要获取这些更改：

```
cd ~/insforge

# 下载更新后的 compose 文件
wget -O docker-compose.yml.new \
  https://raw.githubusercontent.com/insforge/insforge/main/deploy/docker-compose/docker-compose.yml

# 与当前文件比较
diff docker-compose.yml docker-compose.yml.new

# 如果更改看起来安全，应用它们
mv docker-compose.yml docker-compose.yml.old
mv docker-compose.yml.new docker-compose.yml

# 使用新配置重启
docker compose down
docker compose up -d
```

---

### [​](#16-回滚流程) 16. 回滚流程

如果更新导致问题，请按以下步骤回退：

#### [​](#161-停止有问题的服务) 16.1 停止有问题的服务

```
cd ~/insforge
docker compose down
```

#### [​](#162-恢复之前的-docker-compose-文件) 16.2 恢复之前的 Docker Compose 文件

```
# 如果你保存了旧文件
mv docker-compose.yml.old docker-compose.yml
```

#### [​](#163-固定到特定镜像版本) 16.3 固定到特定镜像版本

编辑 `docker-compose.yml` 并将 `latest` 标签替换为之前的版本：

```
# 示例：固定到已知良好的版本（替换为之前的标签）
image: ghcr.io/insforge/insforge-oss:v1.5.0
```

> 注意：当前的 `deploy/docker-compose` 固定为 `v1.5.0`，项目现在在 2.x 线上。固定到你在更新前运行的任何版本。

#### [​](#164-恢复数据库如果需要) 16.4 恢复数据库（如果需要）

仅当更新包含导致问题的数据库迁移时才恢复数据库：

```
cd ~/insforge
source .env

# 仅启动 PostgreSQL
docker compose up -d postgres

# 等待它健康
docker compose exec postgres pg_isready -U "${POSTGRES_USER:-postgres}"

# 从备份恢复
cat backup_YYYYMMDD_HHMMSS.sql | \
  docker compose exec -T postgres psql \
  -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-insforge}"

# 启动其余服务
docker compose up -d
```

#### [​](#165-恢复环境文件如果已更改) 16.5 恢复环境文件（如果已更改）

```
cp .env.backup_YYYYMMDD .env
docker compose down
docker compose up -d
```

---

### [​](#17-自动备份) 17. 自动备份

设置 cron 作业以进行每日自动备份：

#### [​](#171-创建备份脚本) 17.1 创建备份脚本

```
nano ~/insforge/backup.sh
```

```
#!/bin/bash
set -euo pipefail

# InsForge 自动备份脚本
# 加载 .env 使 POSTGRES_USER / POSTGRES_DB 在 Docker Compose 外部可用
set -a
source "$HOME/insforge/.env"
set +a

BACKUP_DIR="$HOME/insforge/backups"
RETENTION_DAYS=14
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

trap 'echo "[$(date)] ERROR: Backup failed at line $LINENO" >&2; exit 1' ERR

mkdir -p "$BACKUP_DIR"

# 转储数据库
docker compose -f "$HOME/insforge/docker-compose.yml" exec -T postgres \
  pg_dump -U "${POSTGRES_USER:-postgres}" "${POSTGRES_DB:-insforge}" \
  > "$BACKUP_DIR/db_$TIMESTAMP.sql"

# 复制环境文件
cp "$HOME/insforge/.env" "$BACKUP_DIR/env_$TIMESTAMP.bak"

# 删除超过保留期的备份
find "$BACKUP_DIR" -name "db_*.sql" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "env_*.bak" -mtime +$RETENTION_DAYS -delete

echo "[$(date)] Backup completed successfully: db_$TIMESTAMP.sql"
```

```
chmod +x ~/insforge/backup.sh
```

#### [​](#172-使用-cron-调度) 17.2 使用 Cron 调度

```
crontab -e
```

添加以下行以每天凌晨 3:00 执行备份：

```
0 3 * * * /home/deploy/insforge/backup.sh >> /home/deploy/insforge/backups/cron.log 2>&1
```

#### [​](#173-异地备份推荐) 17.3 异地备份（推荐）

为了灾难恢复，将备份复制到外部位置：

```
# 示例：同步备份到 S3 兼容存储
aws s3 sync ~/insforge/backups s3://your-backup-bucket/insforge/

# 示例：同步到远程服务器
rsync -avz ~/insforge/backups/ user@backup-server:/backups/insforge/
```

---

### [​](#18-监控与健康检查) 18. 监控与健康检查

#### [​](#181-检查服务状态) 18.1 检查服务状态

```
# 容器状态
docker compose ps

# 每个容器的资源使用情况
docker stats --no-stream

# 磁盘使用情况
df -h

# 内存使用情况
free -h
```

#### [​](#182-查看日志) 18.2 查看日志

```
# 所有服务
docker compose logs -f --tail=100

# 特定服务
docker compose logs -f insforge
docker compose logs -f postgres
docker compose logs -f deno
```

#### [​](#183-健康检查端点) 18.3 健康检查端点

在外部监控健康端点。一个简单的基于 cron 的检查：

```
# 添加到 crontab 以进行监控
*/5 * * * * curl -sf https://insforge.yourdomain.com/api/health > /dev/null || echo "InsForge is DOWN" | mail -s "InsForge Alert" you@example.com
```

或者使用免费的在线监控服务，如 [UptimeRobot](https://uptimerobot.com) 或 [Betterstack](https://betterstack.com) 来监控 `https://insforge.yourdomain.com/api/health`。

---

## [​](#快速参考) 快速参考

### [​](#基本命令) 基本命令

```
# ── 生命周期 ─────────────────────────────────
docker compose up -d              # 启动所有服务
docker compose down               # 停止所有服务
docker compose restart            # 重启所有服务
docker compose pull               # 拉取最新镜像

# ── 诊断 ───────────────────────────────────────
docker compose ps                 # 服务状态
docker compose logs -f            # 跟踪所有日志
docker compose logs -f insforge   # 跟踪特定服务
docker stats --no-stream          # 资源使用情况

# ── 数据库（先 source .env 以获取变量）────
source ~/insforge/.env
docker compose exec -T postgres pg_dump -U "${POSTGRES_USER:-postgres}" "${POSTGRES_DB:-insforge}" > backup.sql  # 备份
cat backup.sql | docker compose exec -T postgres psql -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-insforge}"  # 恢复

# ── 更新 ───────────────────────────────────
docker compose pull               # 拉取新镜像
docker compose down && docker compose up -d   # 应用更新
```

### [​](#安全检查清单) 安全检查清单

* 已创建部署用户（非 root）
* 已启用 SSH 密钥认证
* 已禁用 SSH 密码认证
* 已禁用 root 登录
* 已启用 UFW 防火墙（仅端口 22、80、443）
* Docker 端口绑定到 `127.0.0.1`
* 已安装并激活 Fail2Ban
* `JWT_SECRET` 已从默认值更改（32+ 字符）
* `ENCRYPTION_KEY` 已设置（与 `JWT_SECRET` 分开）
* `ROOT_ADMIN_PASSWORD` 已从默认值更改
* `POSTGRES_PASSWORD` 已从默认值更改
* `.env` 文件权限设置为 `600`
* 已通过 Certbot 或 Caddy 启用 HTTPS
* 已配置自动每日备份
* 已启用无人值守安全更新

---

## [​](#故障排除) 故障排除

### [​](#启用-ufw-后无法连接) 启用 UFW 后无法连接

如果你被锁定在外面，使用你的 VPS 提供商的 **Web 控制台**（带外访问）来：

```
sudo ufw allow OpenSSH
sudo ufw enable
```

### [​](#docker-绕过-ufw) Docker 绕过 UFW

Docker 直接操作 iptables。如[第 9.2 节](#92-docker-与-ufw-注意事项)所述，在 `docker-compose.yml` 中将端口绑定到 `127.0.0.1`。

### [​](#服务启动失败) 服务启动失败

```
# 检查失败服务的日志
docker compose logs postgres
docker compose logs insforge

# 验证磁盘空间
df -h

# 验证内存
free -h

# 重启 Docker 守护进程
sudo systemctl restart docker
docker compose up -d
```

### [​](#ssl-证书无法续期) SSL 证书无法续期

```
# 检查 Certbot 定时器
sudo systemctl status certbot.timer

# 手动续期
sudo certbot renew

# 测试续期
sudo certbot renew --dry-run
```

### [​](#端口冲突) 端口冲突

```
# 查找什么在使用端口
sudo ss -tlnp | grep :7130

# 在 .env 中更改端口
APP_PORT=7140
```

### [​](#数据库连接问题) 数据库连接问题

```
# 检查 PostgreSQL 是否健康
docker compose ps postgres

# 查看 PostgreSQL 日志
docker compose logs postgres

# 直接连接到数据库
docker compose exec postgres psql -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-insforge}"
```

---

## [​](#-需要帮助) 🆘 需要帮助？

* **文档**：<https://docs.insforge.dev>
* **Discord 社区**：<https://discord.com/invite/MPxwj5xVvW>
* **GitHub Issues**：<https://github.com/insforge/insforge/issues>

[OAuth 服务器](/oauth-server)[将 InsForge 部署到 AWS EC2](/deployment/deploy-to-aws-ec2)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)