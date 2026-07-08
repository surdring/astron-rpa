## 本页内容

* [将 InsForge 部署到 AWS EC2](#将-insforge-部署到-aws-ec2)
* [📋 前提条件](#-前提条件)
* [🚀 部署步骤](#-部署步骤)
  + [1. 创建并配置 EC2 实例](#1-创建并配置-ec2-实例)
  + [1.1 启动 EC2 实例](#11-启动-ec2-实例)
  + [1.2 配置安全组](#12-配置安全组)
  + [1.3 分配弹性 IP（推荐）](#13-分配弹性-ip推荐)
  + [2. 连接到你的 EC2 实例](#2-连接到你的-ec2-实例)
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
  + [6.1 更新 DNS 记录](#61-更新-dns-记录)
  + [6.2 安装 Nginx 反向代理](#62-安装-nginx-反向代理)
  + [6.3 安装 SSL 证书（推荐）](#63-安装-ssl-证书推荐)
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

# 将 InsForge 部署到 AWS EC2

复制页面

使用 Docker Compose 在 AWS EC2 实例上部署 InsForge 的分步指南，包括 SSH 设置、域名配置和 TLS 终止。

复制页面

# [​](#将-insforge-部署到-aws-ec2) 将 InsForge 部署到 AWS EC2

本指南将引导你使用 Docker Compose 在 AWS EC2 实例上部署 InsForge。

本云平台指南由社区维护，可能落后于最新的 InsForge 版本。始终最新的规范配置位于 [InsForge 仓库](https://github.com/InsForge/InsForge) 的 `deploy/docker-compose/` 目录中。

## [​](#-前提条件) 📋 前提条件

* 具有 EC2 访问权限的 AWS 账户
* SSH 和命令行操作的基本知识
* 域名（可选，用于自定义域名设置）

## [​](#-部署步骤) 🚀 部署步骤

### [​](#1-创建并配置-ec2-实例) 1. 创建并配置 EC2 实例

#### [​](#11-启动-ec2-实例) 1.1 启动 EC2 实例

1. **登录 AWS 控制台**并导航到 EC2 Dashboard
2. **点击"Launch Instance"**
3. **配置实例：**
   * **名称**：`insforge-server`（或你偏好的名称）
   * **AMI**：Ubuntu Server 24.04 LTS (HVM)，SSD Volume Type
   * **实例类型**：`t3.medium` 或更大（最低 2 vCPU，4 GB RAM）
     + 生产环境：推荐 `t3.large`（2 vCPU，8 GB RAM）
     + 测试环境：最低 `t3.small`（2 vCPU，2 GB RAM）
   * **密钥对**：创建新密钥对或选择现有密钥对（下载并保存 `.pem` 文件）
   * **存储**：30 GB gp3（推荐最低 20 GB）

#### [​](#12-配置安全组) 1.2 配置安全组

创建或配置安全组，添加以下入站规则：

| 类型 | 协议 | 端口范围 | 来源 | 描述 |
| --- | --- | --- | --- | --- |
| SSH | TCP | 22 | 我的 IP | SSH 访问 |
| HTTP | TCP | 80 | 0.0.0.0/0 | HTTP 访问 |
| HTTPS | TCP | 443 | 0.0.0.0/0 | HTTPS 访问 |
| 自定义 TCP | TCP | 7130 | 0.0.0.0/0 | 控制面板 + API |
| 自定义 TCP | TCP | 5432 | 0.0.0.0/0 | PostgreSQL（可选） |

> ⚠️ **安全提示**：对于生产环境，将 PostgreSQL（5432）限制为特定 IP 地址或完全移除外部访问。考虑使用反向代理（nginx）并仅暴露端口 80/443。

#### [​](#13-分配弹性-ip推荐) 1.3 分配弹性 IP（推荐）

1. 在 EC2 Dashboard 中导航到 **Elastic IPs**
2. 点击 **Allocate Elastic IP address**
3. 将弹性 IP 关联到你的实例

这样可以确保即使重启后，你的实例也保持相同的 IP 地址。

### [​](#2-连接到你的-ec2-实例) 2. 连接到你的 EC2 实例

```
# 为密钥文件设置正确权限
chmod 400 your-key-pair.pem

# 通过 SSH 连接
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip
```

### [​](#3-安装依赖项) 3. 安装依赖项

#### [​](#31-更新系统包) 3.1 更新系统包

```
sudo apt update && sudo apt upgrade -y
```

#### [​](#32-安装-docker) 3.2 安装 Docker

```
按照以下链接的说明在新的 Ubuntu EC2 实例上安装并验证 Docker：
https://docs.docker.com/engine/install/ubuntu/
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

> ⚠️ **安全提示**：将用户添加到 `docker` 组相当于授予其 root 级别的系统权限。这对于像 EC2 实例这样的单用户环境是可以接受的，但在共享系统上需谨慎。

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

复制示例模板来创建你的 `.env` 文件：

```
cp .env.example .env
nano .env
```

完整模板位于 `deploy/docker-compose/.env.example`。以下是必须设置的变量：

```
# 必需
JWT_SECRET=your-secret-key-here-must-be-32-char-or-above
ROOT_ADMIN_USERNAME=admin
ROOT_ADMIN_PASSWORD=change-this-password
POSTGRES_PASSWORD=change-this-password

# 可选：留空则回退到 JWT_SECRET
ENCRYPTION_KEY=

# 可选：启用 AI 功能
OPENROUTER_API_KEY=

# 可选：启用站点部署
VERCEL_TOKEN=
VERCEL_TEAM_ID=
VERCEL_PROJECT_ID=

# 可选：OAuth 提供商
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

`.env.example` 模板包含其余变量及其默认值，因此编辑复制的文件即可。
**生成安全密钥：**

```
# 生成 JWT_SECRET（32+ 字符）
openssl rand -base64 32

# 生成 ENCRYPTION_KEY（必须正好 32 个字符）
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
curl http://your-ec2-ip:7130/api/health
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
http://your-ec2-ip:7130
```

使用你在 `.env` 中设置的 `ROOT_ADMIN_USERNAME` 和 `ROOT_ADMIN_PASSWORD` 登录。

### [​](#6-配置域名可选但推荐) 6. 配置域名（可选但推荐）

#### [​](#61-更新-dns-记录) 6.1 更新 DNS 记录

添加指向你 EC2 弹性 IP 的 DNS A 记录：

```
api.yourdomain.com    → your-ec2-ip
app.yourdomain.com    → your-ec2-ip
```

#### [​](#62-安装-nginx-反向代理) 6.2 安装 Nginx 反向代理

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

# 控制面板（由后端在 API 同一端口上提供）
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

#### [​](#63-安装-ssl-证书推荐) 6.3 安装 SSL 证书（推荐）

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

InsForge 提供预构建镜像，因此更新只需拉取并重启。从 `~/insforge/deploy/docker-compose` 运行：

```
cd ~/insforge/deploy/docker-compose
git pull origin main
docker compose pull && docker compose up -d
```

### [​](#备份数据库) 备份数据库

从 `~/insforge/deploy/docker-compose` 运行：

```
# 创建备份
docker compose exec postgres pg_dump -U postgres insforge > backup_$(date +%Y%m%d_%H%M%S).sql

# 从备份恢复
cat backup_file.sql | docker compose exec -T postgres psql -U postgres -d insforge
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
- 当前：t3.medium (4 GB RAM)
- 升级到：t3.large (8 GB RAM)
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

1. **升级实例类型**：使用 `t3.large` 或 `t3.xlarge`
2. **启用自动伸缩**：设置 Application Load Balancer 和自动伸缩组
3. **使用 RDS**：从容器化 PostgreSQL 迁移到 AWS RDS 以获得更好的可靠性
4. **启用 CloudWatch**：监控指标并设置告警
5. **配置备份**：设置自动每日备份
6. **使用 S3 存储**：配置 S3 存储桶用于文件上传，替代本地存储

### [​](#数据库优化) 数据库优化

```
# 增加 PostgreSQL shared_buffers（编辑 deploy/docker-init/db/ 中的 postgresql.conf）
# 推荐：可用 RAM 的 25%
shared_buffers = 1GB
effective_cache_size = 3GB
```

## [​](#-安全最佳实践) 🔒 安全最佳实践

1. **更改默认密码**：更新管理员和数据库密码
2. **启用防火墙**：有效使用 AWS Security Groups
3. **定期更新**：保持系统和 Docker 镜像更新
4. **SSL/TLS**：在生产环境中始终使用 HTTPS
5. **定期备份**：自动化数据库备份
6. **监控日志**：设置日志监控和告警
7. **限制 SSH 访问**：将 SSH 限制为特定 IP 地址
8. **使用 IAM 角色**：尽可能替代 AWS 访问密钥

## [​](#-支持与资源) 🆘 支持与资源

* **文档**：<https://docs.insforge.dev>
* **GitHub Issues**：<https://github.com/insforge/insforge/issues>
* **Discord 社区**：<https://discord.com/invite/MPxwj5xVvW>

## [​](#-成本估算) 📝 成本估算

**每月 AWS 成本（近似）：**

| 组件 | 类型 | 月成本 |
| --- | --- | --- |
| EC2 实例 | t3.medium | ~$30 |
| 存储（30 GB） | EBS gp3 | ~$3 |
| 弹性 IP |（如果 24/7 运行） | $0 |
| 数据传输 | 前 100GB 免费 | 可变 |
| **总计** |  | **~$33/月** |

> 💡 **成本优化**：对于长期部署，使用 AWS Savings Plans 或 Reserved Instances 可节省高达 70% 的费用。

---

**恭喜！🎉** 你的 InsForge 实例现在已在 AWS EC2 上运行。你可以通过将 AI 代理连接到后端平台来开始构建应用程序。
如需其他生产部署策略，请查看我们的[部署指南](/deployment/deployment-security-guide)。

[VPS 部署与安全指南](/deployment/deployment-security-guide)[部署到 Azure 虚拟机](/deployment/deploy-to-azure-virtual-machines)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)