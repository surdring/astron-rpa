## 本页内容

* [📖 将 InsForge 部署到 Azure 虚拟机（扩展指南）](#-将-insforge-部署到-azure-虚拟机扩展指南)
* [前提条件](#前提条件)
* [步骤 1：🖥️ 创建 Azure 虚拟机](#步骤-1-创建-azure-虚拟机)
* [步骤 2：⚙️ 连接并设置服务器](#步骤-2-连接并设置服务器)
* [步骤 3：🚀 部署 InsForge](#步骤-3-部署-insforge)
* [步骤 4：🔑 访问你的 InsForge 实例](#步骤-4-访问你的-insforge-实例)
* [步骤 5：🌐 配置域名（可选但推荐）](#步骤-5-配置域名可选但推荐)
* [🔧 管理与维护](#-管理与维护)
* [🐛 故障排除](#-故障排除)
* [📊 成本估算](#-成本估算)
  + [免费层（用于测试）](#免费层用于测试)
  + [入门级设置（用于开发和小型项目）](#入门级设置用于开发和小型项目)
  + [生产级设置（用于可伸缩性和可靠性）](#生产级设置用于可伸缩性和可靠性)
* [🔒 安全最佳实践](#-安全最佳实践)

自托管

# 部署到 Azure 虚拟机

复制页面

复制页面

# [​](#-将-insforge-部署到-azure-虚拟机扩展指南) 📖 将 InsForge 部署到 Azure 虚拟机（扩展指南）

本指南提供了在 Azure 虚拟机（VM）上使用 Docker Compose 部署、管理和保护 InsForge 的全面分步说明。

本云平台指南由社区维护，可能落后于最新的 InsForge 版本。始终最新的规范配置位于 [InsForge 仓库](https://github.com/InsForge/InsForge) 的 `deploy/docker-compose/` 目录中。

## [​](#前提条件) 前提条件

* 一个活跃的 **Azure 账户**。
* 一个 **SSH 客户端**，用于连接到虚拟机。
* 基本熟悉 **Linux 命令行**。

---

## [​](#步骤-1-创建-azure-虚拟机) 步骤 1：🖥️ 创建 Azure 虚拟机

1. **登录 [Azure Portal](https://portal.azure.com/)** 并导航到 **Virtual machines**。
2. 点击 **+ Create** > **Azure virtual machine**。
3. **基本信息选项卡：**
   * **资源组：** 创建一个新的（例如 `insforge-rg`）。
   * **虚拟机名称：** `insforge-vm`。
   * **映像：** **Ubuntu Server 22.04 LTS** 或更高版本。
   * **大小：** `Standard_B2s`（2 vCPU，4 GiB 内存）是一个好的起点。对于生产环境，考虑 `Standard_B4ms`（4 vCPU，16 GiB 内存）。
   * **身份验证类型：** **SSH public key**。
   * **SSH 公钥来源：** **Generate new key pair**。命名为 `insforge-key`。
4. **网络选项卡：**
   * 在 **Network security group** 部分，点击 **Create new**。
   * 添加以下**入站端口规则**以允许流量：
     + `22`（SSH）
     + `80`（Nginx HTTP）
     + `443`（Nginx/SSL HTTPS）
     + `7130`（InsForge API 和控制面板）
5. **查看并创建：**
   * 点击 **Review + create**，然后 **Create**。
   * 出现提示时，**下载私钥并创建资源**。安全保存 `.pem` 文件。
   * 部署完成后，找到并复制你的 VM 的**公共 IP 地址**。

---

## [​](#步骤-2-连接并设置服务器) 步骤 2：⚙️ 连接并设置服务器

1. **通过 SSH 连接：**
   打开终端，为你的密钥设置正确权限，然后连接到 VM。

   ```
   chmod 400 /path/to/your/insforge-key.pem
   ssh -i /path/to/your/insforge-key.pem azureuser@<your-vm-public-ip>
   ```
2. **更新系统包：**

   ```
   sudo apt update && sudo apt upgrade -y
   ```
3. **安装 Docker：**
   按照 Docker 官方网站上最新、最准确的说明在 Ubuntu 上安装 Docker Engine：
   **<https://docs.docker.com/engine/install/ubuntu/>**
4. **将用户添加到 Docker 组：**
   此步骤允许你无需 `sudo` 即可运行 Docker 命令。

   ```
   # 将用户添加到 docker 组
   sudo usermod -aG docker $USER

   # 应用组更改
   newgrp docker
   ```

   验证是否生效。现在应该可以在没有 `sudo` 的情况下运行此命令：

   ```
   docker ps
   ```

   > 💡 **注意：** 如果 `docker ps` 不生效，请注销 SSH 会话后重新登录，然后重试。
   > ⚠️ **安全提示：** 将用户添加到 `docker` 组相当于授予 root 级别权限。对于单用户 VM 是可以接受的，但在共享系统上需谨慎。
5. **安装 Git：**

   ```
   sudo apt install git -y
   ```

---

## [​](#步骤-3-部署-insforge) 步骤 3：🚀 部署 InsForge

1. **克隆仓库：**
   导航到你的主目录并克隆 InsForge 项目。

   ```
   cd ~
   git clone https://github.com/InsForge/InsForge.git
   cd InsForge/deploy/docker-compose
   ```
2. **创建环境配置：**
   从示例创建你的 `.env` 文件并打开编辑。

   ```
   cp .env.example .env
   nano .env
   ```

   `.env.example` 列出了每个支持的变量并附有注释。对于基本部署，你只需要设置几个变量。设置这些值并将 API URL 更新为你的 VM 公共 IP：

   ```
   # 必需
   JWT_SECRET=your-secret-key-here-must-be-32-char-or-above
   ROOT_ADMIN_USERNAME=admin
   ROOT_ADMIN_PASSWORD=change-this-password
   POSTGRES_PASSWORD=change-this-password

   # API URL（替换为你的 VM 公共 IP 或域名）
   API_BASE_URL=http://<your-vm-public-ip>:7130
   VITE_API_BASE_URL=http://<your-vm-public-ip>:7130

   # 可选
   # ENCRYPTION_KEY 留空则回退到 JWT_SECRET
   ENCRYPTION_KEY=
   # OPENROUTER_API_KEY=
   # VERCEL_TOKEN=
   # GOOGLE_CLIENT_ID=
   ```

   `.env.example` 的其余部分涵盖可选功能（OpenRouter、Vercel 部署、OAuth 提供商）。除非需要，否则留空。
   > **生成安全的 JWT 密钥：** 在 VM 上运行此命令并将结果粘贴到 `JWT_SECRET`：
   >
   > ```
   > openssl rand -base64 32
   > ```
3. **启动 InsForge 服务：**
   拉取 Docker 镜像并在后台启动所有服务。

   ```
   docker compose up -d
   ```
4. **验证服务：**
   检查所有四个容器是否正在运行。

   ```
   docker compose ps
   ```

   你应该看到 `postgres`、`postgrest`、`insforge` 和 `deno` 服务正在运行。

---

## [​](#步骤-4-访问你的-insforge-实例) 步骤 4：🔑 访问你的 InsForge 实例

1. **测试后端 API：**
   使用 `curl` 检查健康端点。

   ```
   curl http://<your-vm-public-ip>:7130/api/health
   ```

   你应该看到类似 `{"status":"ok", ...}` 的响应。
2. **访问控制面板：**
   打开浏览器并导航到：`http://<your-vm-public-ip>:7130`
   使用你在 `.env` 文件中设置的 `ROOT_ADMIN_USERNAME` 和 `ROOT_ADMIN_PASSWORD` 登录。

---

## [​](#步骤-5-配置域名可选但推荐) 步骤 5：🌐 配置域名（可选但推荐）

1. **更新 DNS 记录：**
   在你的域名提供商 DNS 设置中，添加两条指向你 VM 公共 IP 地址的 **A 记录**：
   * `api.yourdomain.com` → `<your-vm-public-ip>`
   * `app.yourdomain.com` → `<your-vm-public-ip>`
2. **安装并配置 Nginx 作为反向代理：**

   ```
   sudo apt install nginx -y
   sudo nano /etc/nginx/sites-available/insforge
   ```

   粘贴以下配置：

   ```
   # 后端 API
   server {
       listen 80;
       server_name api.yourdomain.com;
       location / {
           proxy_pass http://localhost:7130;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   # 前端控制面板（由与 API 相同的端口提供）
   server {
       listen 80;
       server_name app.yourdomain.com;
       location / {
           proxy_pass http://localhost:7130;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
       }
   }
   ```

   启用配置并重新加载 Nginx：

   ```
   sudo ln -s /etc/nginx/sites-available/insforge /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
3. **使用 Certbot 安装 SSL 证书：**

   ```
   # 安装 Nginx 的 Certbot
   sudo apt install certbot python3-certbot-nginx -y
   # 获取 SSL 证书并自动配置 Nginx
   sudo certbot --nginx -d api.yourdomain.com -d app.yourdomain.com
   ```

   按照提示操作。Certbot 会处理其余部分。
4. **使用 HTTPS URL 更新 `.env`：**
   编辑你的 `.env` 文件并更新 URL。

   ```
   cd ~/InsForge
   nano .env
   ```

   将 URL 改为 `https`：

   ```
   API_BASE_URL=https://api.yourdomain.com
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

   重启服务以使更改生效：

   ```
   docker compose down && docker compose up -d
   ```

---

## [​](#-管理与维护) 🔧 管理与维护

* **查看日志：** `docker compose logs -f`（所有服务）或 `docker compose logs -f insforge`（特定服务）。
* **停止服务：** `docker compose down`
* **重启服务：** `docker compose restart`
* **更新 InsForge：** 从 `~/InsForge/deploy/docker-compose` 运行。镜像已预构建，因此拉取最新标签而不是重新构建。

  ```
  cd ~/InsForge/deploy/docker-compose
  git -C ~/InsForge pull origin main
  docker compose pull && docker compose up -d
  ```
* **备份数据库：** 从 `~/InsForge/deploy/docker-compose` 运行。

  ```
  docker compose exec postgres pg_dump -U postgres insforge > backup_$(date +%Y%m%d_%H%M%S).sql
  ```

## [​](#-故障排除) 🐛 故障排除

* **服务无法启动：** 检查 `docker compose logs` 中的错误。确保有足够的磁盘空间（`df -h`）和内存（`free -h`）。
* **端口已被占用：** 使用 `sudo netstat -tulpn | grep :7130` 检查哪个进程在使用该端口。
* **内存不足：** 考虑将 Azure VM 升级到具有更多 RAM 的大小。

## [​](#-成本估算) 📊 成本估算

> **免责声明：** 价格基于即用即付费率在常见区域（如美国东部）的估算，可能有所不同。请始终查看官方 [Azure 定价计算器](https://azure.microsoft.com/en-us/pricing/calculator/) 获取最准确的信息。在 Azure 上，你为 VM 的资源（CPU、RAM、存储）付费，这些资源由你运行的所有 Docker 服务共享。

### [​](#免费层用于测试) 免费层（用于测试）

* **成本：** **~$0/月**，首 12 个月。
* **资源：** Azure 提供免费层，包括每月 750 小时的 `B1s` 可突增 VM。
* **限制：** 此 VM 资源非常有限（1 vCPU，1 GiB RAM），可能运行缓慢。仅适用于基本测试和熟悉，不适用于活跃开发或生产。

### [​](#入门级设置用于开发和小型项目) 入门级设置（用于开发和小型项目）

* **成本：** **~30−30 - 30−40/月**
* **资源：** 此估算针对运行所有 InsForge Docker 容器的 `Standard_B2s` VM（2 vCPU，4 GiB RAM）。
* **细分：** 成本主要由 VM 计算小时数组成。还包括 OS 磁盘存储和静态公共 IP 地址。此单一 VM 运行你的数据库、后端、Deno 和所有其他服务。

### [​](#生产级设置用于可伸缩性和可靠性) 生产级设置（用于可伸缩性和可靠性）

对于生产环境，你可以选择一体化的更大 VM，或使用托管服务的更健壮的设置。

* **选项 A：一体化更大 VM**
  + **成本：** **~150−150 - 150−170/月**
  + **资源：** 更强大的 `Standard_B4ms` VM（4 vCPU，16 GiB RAM），以处理更高的流量和所有服务。
  + **优点：** 管理简单，成本集中。
  + **缺点：** 数据库和应用程序共享资源，可能造成性能瓶颈。扩展需要升级整个 VM。
* **选项 B：托管服务（推荐用于生产）**
  + **成本：** **~$120+/月**（差异很大）
  + **资源：**
    - **应用程序 VM：** 用于应用程序服务（InsForge、PostgREST、Deno）的 `Standard_B2s` VM。（~$30/月）
    - **托管数据库：** 使用 **Azure Database for PostgreSQL** 以获得可靠性、自动备份和可伸缩性。（入门级 ~$40+/月）
  + **优点：** 高度可靠和可伸缩。数据库性能隔离且有保障。托管备份和安全。
  + **缺点：** 设置更复杂，成本分布在多个服务上。

## [​](#-安全最佳实践) 🔒 安全最佳实践

* **更改默认密码：** 始终更新管理员和数据库密码。
* **启用防火墙：** 使用 Azure **网络安全组（NSG）** 将访问限制为必要的端口和 IP 地址。
* **定期更新：** 定期运行 `sudo apt update && sudo apt upgrade -y` 并更新 InsForge。
* **定期备份：** 自动化数据库和配置备份。

[将 InsForge 部署到 AWS EC2](/deployment/deploy-to-aws-ec2)[将 InsForge 部署到 Containarium](/deployment/deploy-to-containarium)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)