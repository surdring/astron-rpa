## 本页内容

* [将 InsForge 部署到 Google Cloud Compute Engine](#将-insforge-部署到-google-cloud-compute-engine)
* [📋 前提条件](#-前提条件)
* [🚀 部署步骤](#-部署步骤)
  + [1. 创建并配置 Compute Engine 实例](#1-创建并配置-compute-engine-实例)
  + [1.1 创建 Google Cloud 项目](#11-创建-google-cloud-项目)
  + [1.2 启用所需 API](#12-启用所需-api)
  + [1.3 创建 Compute Engine 实例](#13-创建-compute-engine-实例)
  + [1.4 配置防火墙规则](#14-配置防火墙规则)
  + [2. 连接到你的 Compute Engine 实例](#2-连接到你的-compute-engine-实例)
  + [3. 安装依赖项](#3-安装依赖项)
  + [3.1 更新系统包](#31-更新系统包)
  + [3.2 安装 Docker](#32-安装-docker)
  + [3.3 将用户添加到 Docker 组](#33-将用户添加到-docker-组)
  + [3.4 安装 Git](#34-安装-git)
  + [4. 部署 InsForge](#4-部署-insforge)
  + [4.1 克隆仓库](#41-克隆仓库)
  + [4.2 创建环境配置](#42-创建环境配置)
  + [4.3 启动 InsForge 服务](#43-启动-insforge-服务)
  + [4.4 验证服务](#44-验证服务)
  + [5. 访问你的 InsForge 实例](#5-访问你的-insforge-实例)
  + [5.1 测试后端 API](#51-测试后端-api)
  + [5.2 访问控制面板](#52-访问控制面板)
  + [6. 配置域名（可选但推荐）](#6-配置域名可选但推荐)
  + [6.1 预留静态外部 IP](#61-预留静态外部-ip)
  + [6.2 更新 DNS 记录](#62-更新-dns-记录)
  + [6.3 安装 Nginx 反向代理](#63-安装-nginx-反向代理)
  + [6.4 安装 SSL 证书（推荐）](#64-安装-ssl-证书推荐)
* [🔧 管理与维护](#-管理与维护)
  + [查看日志](#查看日志)
  + [停止服务](#停止服务)
  + [重启服务](#重启服务)
  + [更新 InsForge](#更新-insforge)
  + [备份数据库](#备份数据库)
  + [监控资源](#监控资源)
* [🐛 故障排除](#-故障排除)
  + [服务无法启动](#服务无法启动)
  + [无法连接到数据库](#无法连接到数据库)
  + [端口已被占用](#端口已被占用)
  + [内存不足](#内存不足)
  + [SSL 证书问题](#ssl-证书问题)
* [📊 性能优化](#-性能优化)
  + [针对生产工作负载](#针对生产工作负载)
  + [数据库优化](#数据库优化)
* [🔒 安全最佳实践](#-安全最佳实践)
* [🆘 支持与资源](#-支持与资源)
* [📝 成本估算](#-成本估算)

自托管

# 将 InsForge 部署到 Google Cloud Compute Engine

复制页面

在 Google Cloud Compute Engine VM 上使用 Docker Compose 部署 InsForge，涵盖防火墙规则、SSH 访问、自定义域名和 HTTPS 设置。

复制页面

# [​](#将-insforge-部署到-google-cloud-compute-engine) 将 InsForge 部署到 Google Cloud Compute Engine

本指南将引导你使用 Docker Compose 在 Google Cloud Compute Engine 上部署 InsForge。

本云平台指南由社区维护，可能落后于最新的 InsForge 版本。始终最新的规范配置位于 [InsForge 仓库](https://github.com/InsForge/InsForge) 的 `deploy/docker-compose/` 目录中。

## [​](#-前提条件) 📋 前提条件

* 已启用结算功能的 Google Cloud 账户
* SSH 和命令行操作的基本知识
* 域名（可选，用于自定义域名设置）

## [​](#-部署步骤) 🚀 部署步骤

### [​](#1-创建并配置-compute-engine-实例) 1. 创建并配置 Compute Engine 实例

#### [​](#11-创建-google-cloud-项目) 1.1 创建 Google Cloud 项目

1. **登录 Google Cloud Console**，访问 [console.cloud.google.com](https://console.cloud.google.com)
2. **点击顶部导航栏中的"Select a project"**
3. **点击"New Project"**
4. **输入项目名称**（例如 `insforge-deployment`）
5. **点击"Create"**
6. **等待项目创建完成**

#### [​](#12-启用所需-api) 1.2 启用所需 API

1. 在你的项目中，导航到 **APIs & Services** → **Library**
2. 搜索并启用以下 API：
   * **Compute Engine API**
   * **Cloud Storage API**（如果用于备份）
   * **Cloud SQL Admin API**（如果使用 Cloud SQL）

#### [​](#13-创建-compute-engine-实例) 1.3 创建 Compute Engine 实例

1. 导航到 **Compute Engine** → **VM instances**
2. 点击 **"Create Instance"**
3. 配置你的实例：
   * **名称**：`insforge-server`（或你偏好的名称）
   * **区域**：选择靠近用户的区域
   * **可用区**：选择一个可用区（例如 us-central1-a）
   * **机器配置**：
     + **系列**：N2 或 E2
     + **机器类型**：`e2-medium` 或更大（最低 2 vCPU，4 GB RAM）
       - 生产环境：推荐 `e2-standard-2`（2 vCPU，8 GB RAM）
       - 测试环境：最低 `e2-small`（2 vCPU，2 GB RAM）
   * **启动磁盘**：
     + **操作系统**：Ubuntu LTS（Ubuntu 22.04 LTS 或更高版本）
     + **启动磁盘类型**：均衡持久化磁盘
     + **大小**：30 GB（推荐最低 20 GB）
   * **防火墙**：
     + 允许 HTTP 流量：**已勾选**
     + 允许 HTTPS 流量：**已勾选**

#### [​](#14-配置防火墙规则) 1.4 配置防火墙规则

1. 导航到 **VPC network** → **Firewall**
2. 创建或修改防火墙规则以允许以下端口：

| 名称 | 方向 | 目标 | 协议/端口 | 来源过滤 |
| --- | --- | --- | --- | --- |
| insforge-ssh | 入站 | insforge-server | tcp:22 | 你的 IP 地址 |
| insforge-http | 入站 | insforge-server | tcp:80 | 0.0.0.0/0 |
| insforge-https | 入站 | insforge-server | tcp:443 | 0.0.0.0/0 |
| insforge-app | 入站 | insforge-server | tcp:7130 | 0.0.0.0/0 |
| insforge-deno | 入站 | insforge-server | tcp:7133 | 0.0.0.0/0 |
| insforge-postgrest | 入站 | insforge-server | tcp:5430 | 0.0.0.0/0 |
| insforge-postgres | 入站 | insforge-server | tcp:5432 | 0.0.0.0/0（仅当需要外部访问时） |

> ⚠️ **安全提示**：对于生产环境，将 PostgreSQL（5432）限制为特定 IP 地址或完全移除外部访问。考虑使用反向代理（nginx）并仅暴露端口 80/443。

### [​](#2-连接到你的-compute-engine-实例) 2. 连接到你的 Compute Engine 实例

1. 在 Google Cloud Console 中，转到 **Compute Engine** → **VM instances**
2. 找到你的实例并点击同一行的 **SSH** 按钮，或者：

```
# 使用 gcloud CLI 通过 SSH 连接（如果你本地安装了 gcloud SDK）
gcloud compute ssh insforge-server --zone=your-zone
```

### [​](#3-安装依赖项) 3. 安装依赖项

#### [​](#31-更新系统包) 3.1 更新系统包

```
sudo apt update && sudo apt upgrade -y
```

#### [​](#32-安装-docker) 3.2 安装 Docker

```
# 添加 Docker 的官方 GPG 密钥
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 添加 Docker 仓库
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### [​](#33-将用户添加到-docker-组) 3.3 将用户添加到 Docker 组

安装 Docker 后，需要将用户添加到 `docker` 组，以便无需 `sudo` 即可运行 Docker 命令：

```
# 将用户添加到 docker 组
sudo usermod -aG docker $USER

# 应用组更改
newgrp docker
```

**验证是否生效：**

```
# 现在应该可以在没有 sudo 的情况下运行
docker ps
```

> 💡 **注意**：如果 `docker ps` 没有立即生效，请注销 SSH 后重新登录，然后重试。

> ⚠️ **安全提示**：将用户添加到 `docker` 组相当于授予其 root 级别的系统权限。这对于像 Compute Engine 实例这样的单用户环境是可以接受的，但在共享系统上需谨慎。

#### [​](#34-安装-git) 3.4 安装 Git

```
sudo apt install git -y
```

### [​](#4-部署-insforge) 4. 部署 InsForge

#### [​](#41-克隆仓库) 4.1 克隆仓库

```
cd ~
git clone https://github.com/insforge/insforge.git
cd insforge/deploy/docker-compose
```

#### [​](#42-创建环境配置) 4.2 创建环境配置

使用生产设置创建你的 `.env` 文件：

```
nano .env
```

仓库在 `deploy/docker-compose/.env.example` 提供了模板。复制它并编辑值：

```
cp .env.example .env
nano .env
```

至少设置以下值：

```
# 认证（必需）
# 重要：为生产环境生成一个强随机密钥（32+ 字符）
JWT_SECRET=your-secret-key-here-must-be-32-char-or-above

# 管理员账户（用于初始设置）
ROOT_ADMIN_USERNAME=admin
ROOT_ADMIN_PASSWORD=change-this-password

# 数据库（必需）
POSTGRES_PASSWORD=your-secure-postgres-password
```

你可能想要设置的可选值：

```
# 用于密钥和数据库加密的加密密钥。
# 留空则回退到 JWT_SECRET。
ENCRYPTION_KEY=

# AI/LLM（从 https://openrouter.ai/keys 获取密钥）
OPENROUTER_API_KEY=

# 站点部署和自定义域名
VERCEL_TOKEN=
VERCEL_TEAM_ID=
VERCEL_PROJECT_ID=

# OAuth 提供商（Google、GitHub 等）
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

查看 `deploy/docker-compose/.env.example` 获取支持的变量的完整列表。
**生成安全密钥：**

```
# 生成 JWT_SECRET（32+ 字符）
openssl rand -base64 32

# 生成 ENCRYPTION_KEY（32 字符）
openssl rand -base64 24
```

> 💡 **重要**：安全保存这些密钥。如果你需要迁移或恢复实例，会用到它们。

#### [​](#43-启动-insforge-服务) 4.3 启动 InsForge 服务

```
# 拉取 Docker 镜像并启动服务
docker compose up -d

# 查看日志以确保一切正常启动
docker compose logs -f
```

按 `Ctrl+C` 退出日志查看。

#### [​](#44-验证服务) 4.4 验证服务

```
# 检查运行中的容器
docker compose ps

# 你应该看到 4 个运行中的服务：
# - postgres
# - postgrest
# - insforge
# - deno
```

### [​](#5-访问你的-insforge-实例) 5. 访问你的 InsForge 实例

#### [​](#51-测试后端-api) 5.1 测试后端 API

```
curl http://your-external-ip:7130/api/health
```

预期响应：

```
{
  "status": "ok",
  "version": "2.1.7",
  "service": "Insforge OSS Backend",
  "timestamp": "2025-10-17T..."
}
```

#### [​](#52-访问控制面板) 5.2 访问控制面板

打开浏览器并导航到：

```
http://your-external-ip:7130
```

### [​](#6-配置域名可选但推荐) 6. 配置域名（可选但推荐）

#### [​](#61-预留静态外部-ip) 6.1 预留静态外部 IP

1. 在 Google Cloud Console 中，转到 **VPC network** → **External IP addresses**
2. 点击 **Reserve Static Address**
3. **名称**：`insforge-ip`
4. **类型**：Regional 或 Global（VM 实例选择 Regional）
5. **区域**：与你的 VM 实例相同
6. **点击 Reserve**

#### [​](#62-更新-dns-记录) 6.2 更新 DNS 记录

将你域名的 DNS 记录指向预留的静态 IP：

```
api.yourdomain.com    → your-static-external-ip
app.yourdomain.com    → your-static-external-ip
```

#### [​](#63-安装-nginx-反向代理) 6.3 安装 Nginx 反向代理

```
sudo apt install nginx -y
```

创建 Nginx 配置：

```
sudo nano /etc/nginx/sites-available/insforge
```

添加以下配置：

```
# 后端 API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:7130;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# 控制面板
server {
    listen 80;
    server_name app.yourdomain.com;

    location / {
        proxy_pass http://localhost:7130;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```
sudo ln -s /etc/nginx/sites-available/insforge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### [​](#64-安装-ssl-证书推荐) 6.4 安装 SSL 证书（推荐）

```
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取 SSL 证书
sudo certbot --nginx -d api.yourdomain.com -d app.yourdomain.com

# 按照提示完成设置
```

使用 HTTPS URL 更新你的 `.env` 文件：

```
cd ~/insforge/deploy/docker-compose
nano .env
```

更改：

```
API_BASE_URL=https://api.yourdomain.com
VITE_API_BASE_URL=https://api.yourdomain.com
```

重启服务：

```
docker compose down
docker compose up -d
```

## [​](#-管理与维护) 🔧 管理与维护

### [​](#查看日志) 查看日志

```
# 所有服务
docker compose logs -f

# 特定服务
docker compose logs -f insforge
docker compose logs -f postgres
docker compose logs -f deno
```

### [​](#停止服务) 停止服务

```
docker compose down
```

### [​](#重启服务) 重启服务

```
docker compose restart
```

### [​](#更新-insforge) 更新 InsForge

```
cd ~/insforge/deploy/docker-compose
git pull origin main
docker compose pull && docker compose up -d
```

### [​](#备份数据库) 备份数据库

```
# 创建备份（从 deploy/docker-compose/ 运行）
docker compose exec postgres pg_dump -U postgres insforge > backup_$(date +%Y%m%d_%H%M%S).sql

# 将备份存储在 Google Cloud Storage 中（可选）
# 首先，安装 Google Cloud CLI 并进行身份验证
# 然后：
gsutil cp backup_$(date +%Y%m%d_%H%M%S).sql gs://your-backup-bucket/
```

### [​](#监控资源) 监控资源

```
# 检查磁盘使用情况
df -h

# 检查内存使用情况
free -h

# 检查 Docker 统计信息
docker stats
```

## [​](#-故障排除) 🐛 故障排除

### [​](#服务无法启动) 服务无法启动

```
# 检查日志中的错误
docker compose logs

# 检查磁盘空间
df -h

# 检查内存
free -h

# 重启 Docker 守护进程
sudo systemctl restart docker
docker compose up -d
```

### [​](#无法连接到数据库) 无法连接到数据库

```
# 检查 PostgreSQL 是否在运行
docker compose ps postgres

# 检查 PostgreSQL 日志
docker compose logs postgres

# 验证 .env 文件中的凭据
cat .env | grep POSTGRES
```

### [​](#端口已被占用) 端口已被占用

```
# 检查什么在使用该端口
sudo netstat -tulpn | grep :7130

# 终止进程或在 docker-compose.yml 中更改端口
```

### [​](#内存不足) 内存不足

考虑升级到更大的实例类型：

```
- 当前：e2-small (2 vCPU, 2 GB RAM)
- 升级到：e2-standard-2 (2 vCPU, 8 GB RAM)
```

### [​](#ssl-证书问题) SSL 证书问题

```
# 续期证书
sudo certbot renew

# 测试续期
sudo certbot renew --dry-run
```

## [​](#-性能优化) 📊 性能优化

### [​](#针对生产工作负载) 针对生产工作负载

1. **升级实例类型**：使用 `e2-standard-2` 或 `e2-standard-4`
2. **使用 Cloud SQL**：从容器化 PostgreSQL 迁移到 Google Cloud SQL 以获得更好的可靠性
3. **启用 Cloud Monitoring**：监控指标并设置告警
4. **配置备份**：设置自动每日备份
5. **使用 Cloud Storage**：配置 Google Cloud Storage 用于文件上传，替代本地存储

### [​](#数据库优化) 数据库优化

```
# 增加 PostgreSQL shared_buffers（编辑 deploy/docker-init/db/ 中的 postgresql.conf）
# 推荐：可用 RAM 的 25%
shared_buffers = 1GB
effective_cache_size = 3GB
```

## [​](#-安全最佳实践) 🔒 安全最佳实践

1. **更改默认密码**：更新管理员和数据库密码
2. **启用防火墙**：有效使用 Google Cloud Firewall 规则
3. **定期更新**：保持系统和 Docker 镜像更新
4. **SSL/TLS**：在生产环境中始终使用 HTTPS
5. **定期备份**：自动化数据库备份
6. **监控日志**：设置日志监控和告警
7. **限制 SSH 访问**：将 SSH 限制为特定 IP 地址
8. **使用服务账号**：尽可能替代 API 密钥

## [​](#-支持与资源) 🆘 支持与资源

* **文档**：<https://docs.insforge.dev>
* **GitHub Issues**：<https://github.com/insforge/insforge/issues>
* **Discord 社区**：<https://discord.com/invite/MPxwj5xVvW>

## [​](#-成本估算) 📝 成本估算

**每月 Google Cloud 成本（近似）：**

| 组件 | 类型 | 月成本 |
| --- | --- | --- |
| Compute Engine | e2-medium (2 vCPU, 4 GB RAM) | ~$29 |
| 持久化磁盘（30 GB） | 标准 | ~$3 |
| 网络出站 | 前 1GB 免费 | 可变 |
| **总计** |  | **~$32/月** |

> 💡 **成本优化**：对于 24/7 运行的实例，使用持续使用折扣可节省高达 30% 的费用。考虑将抢占式实例用于开发/测试环境。

---

**恭喜！🎉** 你的 InsForge 实例现在已在 Google Cloud Compute Engine 上运行。你可以通过将 AI 代理连接到后端平台来开始构建应用程序。
如需其他生产部署策略，请查看我们的[部署指南](/deployment/deployment-security-guide)。

[将 InsForge 部署到 Containarium](/deployment/deploy-to-containarium)[展示](/showcase)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)