## On this page

* [Deploy InsForge to Google Cloud Compute Engine](#deploy-insforge-to-google-cloud-compute-engine)
* [📋 Prerequisites](#-prerequisites)
* [🚀 Deployment Steps](#-deployment-steps)
  + [1. Create and Configure Compute Engine Instance](#1-create-and-configure-compute-engine-instance)
  + [1.1 Create Google Cloud Project](#1-1-create-google-cloud-project)
  + [1.2 Enable Required APIs](#1-2-enable-required-apis)
  + [1.3 Create Compute Engine Instance](#1-3-create-compute-engine-instance)
  + [1.4 Configure Firewall Rules](#1-4-configure-firewall-rules)
  + [2. Connect to Your Compute Engine Instance](#2-connect-to-your-compute-engine-instance)
  + [3. Install Dependencies](#3-install-dependencies)
  + [3.1 Update System Packages](#3-1-update-system-packages)
  + [3.2 Install Docker](#3-2-install-docker)
  + [3.3 Add Your User to Docker Group](#3-3-add-your-user-to-docker-group)
  + [3.4 Install Git](#3-4-install-git)
  + [4. Deploy InsForge](#4-deploy-insforge)
  + [4.1 Clone Repository](#4-1-clone-repository)
  + [4.2 Create Environment Configuration](#4-2-create-environment-configuration)
  + [4.3 Start InsForge Services](#4-3-start-insforge-services)
  + [4.4 Verify Services](#4-4-verify-services)
  + [5. Access Your InsForge Instance](#5-access-your-insforge-instance)
  + [5.1 Test Backend API](#5-1-test-backend-api)
  + [5.2 Access Dashboard](#5-2-access-dashboard)
  + [6. Configure Domain (Optional but Recommended)](#6-configure-domain-optional-but-recommended)
  + [6.1 Reserve a Static External IP](#6-1-reserve-a-static-external-ip)
  + [6.2 Update DNS Records](#6-2-update-dns-records)
  + [6.3 Install Nginx Reverse Proxy](#6-3-install-nginx-reverse-proxy)
  + [6.4 Install SSL Certificate (Recommended)](#6-4-install-ssl-certificate-recommended)
* [🔧 Management & Maintenance](#-management-%26-maintenance)
  + [View Logs](#view-logs)
  + [Stop Services](#stop-services)
  + [Restart Services](#restart-services)
  + [Update InsForge](#update-insforge)
  + [Backup Database](#backup-database)
  + [Monitor Resources](#monitor-resources)
* [🐛 Troubleshooting](#-troubleshooting)
  + [Services Won’t Start](#services-won%E2%80%99t-start)
  + [Cannot Connect to Database](#cannot-connect-to-database)
  + [Port Already in Use](#port-already-in-use)
  + [Out of Memory](#out-of-memory)
  + [SSL Certificate Issues](#ssl-certificate-issues)
* [📊 Performance Optimization](#-performance-optimization)
  + [For Production Workloads](#for-production-workloads)
  + [Database Optimization](#database-optimization)
* [🔒 Security Best Practices](#-security-best-practices)
* [🆘 Support & Resources](#-support-%26-resources)
* [📝 Cost Estimation](#-cost-estimation)

Self-Hosting

# Deploy InsForge to Google Cloud Compute Engine

Copy page

Deploy InsForge on a Google Cloud Compute Engine VM with Docker Compose, covering firewall rules, SSH access, custom domains, and HTTPS setup.

Copy page

# [​](#deploy-insforge-to-google-cloud-compute-engine) Deploy InsForge to Google Cloud Compute Engine

This guide will walk you through deploying InsForge on Google Cloud Compute Engine using Docker Compose.

This cloud walkthrough is community-maintained and can lag the latest InsForge release. The canonical, always-current setup is the `deploy/docker-compose/` directory in the [InsForge repo](https://github.com/InsForge/InsForge).

## [​](#-prerequisites) 📋 Prerequisites

* Google Cloud Account with billing enabled
* Basic knowledge of SSH and command-line operations
* Domain name (optional, for custom domain setup)

## [​](#-deployment-steps) 🚀 Deployment Steps

### [​](#1-create-and-configure-compute-engine-instance) 1. Create and Configure Compute Engine Instance

#### [​](#1-1-create-google-cloud-project) 1.1 Create Google Cloud Project

1. **Log into Google Cloud Console** at [console.cloud.google.com](https://console.cloud.google.com)
2. **Click “Select a project”** in the top navigation bar
3. **Click “New Project”**
4. **Enter project name** (e.g., `insforge-deployment`)
5. **Click “Create”**
6. **Wait for project creation to complete**

#### [​](#1-2-enable-required-apis) 1.2 Enable Required APIs

1. In your project, navigate to **APIs & Services** → **Library**
2. Search for and enable these APIs:
   * **Compute Engine API**
   * **Cloud Storage API** (if using for backups)
   * **Cloud SQL Admin API** (if using Cloud SQL)

#### [​](#1-3-create-compute-engine-instance) 1.3 Create Compute Engine Instance

1. Navigate to **Compute Engine** → **VM instances**
2. Click **“Create Instance”**
3. Configure your instance:
   * **Name**: `insforge-server` (or your preferred name)
   * **Region**: Choose a region close to your users
   * **Zone**: Select an availability zone (e.g., us-central1-a)
   * **Machine configuration**:
     + **Series**: N2 or E2
     + **Machine type**: `e2-medium` or larger (minimum 2 vCPU, 4 GB RAM)
       - For production: `e2-standard-2` (2 vCPU, 8 GB RAM) recommended
       - For testing: `e2-small` (2 vCPU, 2 GB RAM) minimum
   * **Boot disk**:
     + **Operating system**: Ubuntu LTS (Ubuntu 22.04 LTS or newer)
     + **Boot disk type**: Balanced persistent disk
     + **Size**: 30 GB (minimum 20 GB recommended)
   * **Firewall**:
     + Allow HTTP traffic: **Checked**
     + Allow HTTPS traffic: **Checked**

#### [​](#1-4-configure-firewall-rules) 1.4 Configure Firewall Rules

1. Navigate to **VPC network** → **Firewall**
2. Create or modify firewall rules to allow the following ports:

| Name | Direction | Targets | Protocols/ports | Source filters |
| --- | --- | --- | --- | --- |
| insforge-ssh | Ingress | insforge-server | tcp:22 | Your IP address |
| insforge-http | Ingress | insforge-server | tcp:80 | 0.0.0.0/0 |
| insforge-https | Ingress | insforge-server | tcp:443 | 0.0.0.0/0 |
| insforge-app | Ingress | insforge-server | tcp:7130 | 0.0.0.0/0 |
| insforge-deno | Ingress | insforge-server | tcp:7133 | 0.0.0.0/0 |
| insforge-postgrest | Ingress | insforge-server | tcp:5430 | 0.0.0.0/0 |
| insforge-postgres | Ingress | insforge-server | tcp:5432 | 0.0.0.0/0 (only if needed externally) |

> ⚠️ **Security Note**: For production, restrict PostgreSQL (5432) to specific IP addresses or remove external access entirely. Consider using a reverse proxy (nginx) and exposing only ports 80/443.

### [​](#2-connect-to-your-compute-engine-instance) 2. Connect to Your Compute Engine Instance

1. In the Google Cloud Console, go to **Compute Engine** → **VM instances**
2. Find your instance and click the **SSH** button in the same row, or:

```
# Use gcloud CLI to SSH (if you have gcloud SDK installed locally)
gcloud compute ssh insforge-server --zone=your-zone
```

### [​](#3-install-dependencies) 3. Install Dependencies

#### [​](#3-1-update-system-packages) 3.1 Update System Packages

```
sudo apt update && sudo apt upgrade -y
```

#### [​](#3-2-install-docker) 3.2 Install Docker

```
# Add Docker's official GPG key
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### [​](#3-3-add-your-user-to-docker-group) 3.3 Add Your User to Docker Group

After installing Docker, you need to add your user to the `docker` group to run Docker commands without `sudo`:

```
# Add your user to the docker group
sudo usermod -aG docker $USER

# Apply the group changes
newgrp docker
```

**Verify it works:**

```
# This should now work without sudo
docker ps
```

> 💡 **Note**: If `docker ps` doesn’t work immediately, log out and log back in via SSH, then try again.

> ⚠️ **Security Note**: Adding a user to the `docker` group grants them root-equivalent privileges on the system. This is acceptable for single-user environments like your Compute Engine instance, but be cautious on shared systems.

#### [​](#3-4-install-git) 3.4 Install Git

```
sudo apt install git -y
```

### [​](#4-deploy-insforge) 4. Deploy InsForge

#### [​](#4-1-clone-repository) 4.1 Clone Repository

```
cd ~
git clone https://github.com/insforge/insforge.git
cd insforge/deploy/docker-compose
```

#### [​](#4-2-create-environment-configuration) 4.2 Create Environment Configuration

Create your `.env` file with production settings:

```
nano .env
```

The repo ships a template at `deploy/docker-compose/.env.example`. Copy it and edit the values:

```
cp .env.example .env
nano .env
```

At a minimum, set these values:

```
# Authentication (required)
# IMPORTANT: Generate a strong random secret for production (32+ characters)
JWT_SECRET=your-secret-key-here-must-be-32-char-or-above

# Admin account (used for initial setup)
ROOT_ADMIN_USERNAME=admin
ROOT_ADMIN_PASSWORD=change-this-password

# Database (required)
POSTGRES_PASSWORD=your-secure-postgres-password
```

Optional values you may want to set:

```
# Encryption key for secrets and database encryption.
# Falls back to JWT_SECRET if left empty.
ENCRYPTION_KEY=

# AI/LLM (get a key from https://openrouter.ai/keys)
OPENROUTER_API_KEY=

# Site deployments and custom domains
VERCEL_TOKEN=
VERCEL_TEAM_ID=
VERCEL_PROJECT_ID=

# OAuth providers (Google, GitHub, etc.)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

See `deploy/docker-compose/.env.example` for the full list of supported variables.
**Generate Secure Secrets:**

```
# Generate JWT_SECRET (32+ characters)
openssl rand -base64 32

# Generate ENCRYPTION_KEY (32 characters)
openssl rand -base64 24
```

> 💡 **Important**: Save these secrets securely. You’ll need them if you ever migrate or restore your instance.

#### [​](#4-3-start-insforge-services) 4.3 Start InsForge Services

```
# Pull Docker images and start services
docker compose up -d

# View logs to ensure everything started correctly
docker compose logs -f
```

Press `Ctrl+C` to exit log view.

#### [​](#4-4-verify-services) 4.4 Verify Services

```
# Check running containers
docker compose ps

# You should see 4 running services:
# - postgres
# - postgrest
# - insforge
# - deno
```

### [​](#5-access-your-insforge-instance) 5. Access Your InsForge Instance

#### [​](#5-1-test-backend-api) 5.1 Test Backend API

```
curl http://your-external-ip:7130/api/health
```

Expected response:

```
{
  "status": "ok",
  "version": "2.1.7",
  "service": "Insforge OSS Backend",
  "timestamp": "2025-10-17T..."
}
```

#### [​](#5-2-access-dashboard) 5.2 Access Dashboard

Open your browser and navigate to:

```
http://your-external-ip:7130
```

### [​](#6-configure-domain-optional-but-recommended) 6. Configure Domain (Optional but Recommended)

#### [​](#6-1-reserve-a-static-external-ip) 6.1 Reserve a Static External IP

1. In Google Cloud Console, go to **VPC network** → **External IP addresses**
2. Click **Reserve Static Address**
3. **Name**: `insforge-ip`
4. **Type**: Regional or Global (Regional for VM instances)
5. **Region**: Same as your VM instance
6. **Click Reserve**

#### [​](#6-2-update-dns-records) 6.2 Update DNS Records

Point your domain’s DNS records to the reserved static IP:

```
api.yourdomain.com    → your-static-external-ip
app.yourdomain.com    → your-static-external-ip
```

#### [​](#6-3-install-nginx-reverse-proxy) 6.3 Install Nginx Reverse Proxy

```
sudo apt install nginx -y
```

Create Nginx configuration:

```
sudo nano /etc/nginx/sites-available/insforge
```

Add the following configuration:

```
# Backend API
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

# Dashboard
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

Enable the configuration:

```
sudo ln -s /etc/nginx/sites-available/insforge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### [​](#6-4-install-ssl-certificate-recommended) 6.4 Install SSL Certificate (Recommended)

```
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificates
sudo certbot --nginx -d api.yourdomain.com -d app.yourdomain.com

# Follow the prompts to complete setup
```

Update your `.env` file with HTTPS URLs:

```
cd ~/insforge/deploy/docker-compose
nano .env
```

Change:

```
API_BASE_URL=https://api.yourdomain.com
VITE_API_BASE_URL=https://api.yourdomain.com
```

Restart services:

```
docker compose down
docker compose up -d
```

## [​](#-management-&-maintenance) 🔧 Management & Maintenance

### [​](#view-logs) View Logs

```
# All services
docker compose logs -f

# Specific service
docker compose logs -f insforge
docker compose logs -f postgres
docker compose logs -f deno
```

### [​](#stop-services) Stop Services

```
docker compose down
```

### [​](#restart-services) Restart Services

```
docker compose restart
```

### [​](#update-insforge) Update InsForge

```
cd ~/insforge/deploy/docker-compose
git pull origin main
docker compose pull && docker compose up -d
```

### [​](#backup-database) Backup Database

```
# Create backup (run from deploy/docker-compose/)
docker compose exec postgres pg_dump -U postgres insforge > backup_$(date +%Y%m%d_%H%M%S).sql

# Store backup in Google Cloud Storage (optional)
# First, install Google Cloud CLI and authenticate
# Then:
gsutil cp backup_$(date +%Y%m%d_%H%M%S).sql gs://your-backup-bucket/
```

### [​](#monitor-resources) Monitor Resources

```
# Check disk usage
df -h

# Check memory usage
free -h

# Check Docker stats
docker stats
```

## [​](#-troubleshooting) 🐛 Troubleshooting

### [​](#services-won’t-start) Services Won’t Start

```
# Check logs for errors
docker compose logs

# Check disk space
df -h

# Check memory
free -h

# Restart Docker daemon
sudo systemctl restart docker
docker compose up -d
```

### [​](#cannot-connect-to-database) Cannot Connect to Database

```
# Check if PostgreSQL is running
docker compose ps postgres

# Check PostgreSQL logs
docker compose logs postgres

# Verify credentials in .env file
cat .env | grep POSTGRES
```

### [​](#port-already-in-use) Port Already in Use

```
# Check what's using the port
sudo netstat -tulpn | grep :7130

# Kill the process or change port in docker-compose.yml
```

### [​](#out-of-memory) Out of Memory

Consider upgrading to a larger instance type:

```
- Current: e2-small (2 vCPU, 2 GB RAM)
- Upgrade to: e2-standard-2 (2 vCPU, 8 GB RAM)
```

### [​](#ssl-certificate-issues) SSL Certificate Issues

```
# Renew certificates
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

## [​](#-performance-optimization) 📊 Performance Optimization

### [​](#for-production-workloads) For Production Workloads

1. **Upgrade Instance Type**: Use `e2-standard-2` or `e2-standard-4`
2. **Use Cloud SQL**: Migrate from containerized PostgreSQL to Google Cloud SQL for better reliability
3. **Enable Cloud Monitoring**: Monitor metrics and set up alerts
4. **Configure Backups**: Set up automated daily backups
5. **Use Cloud Storage**: Configure Google Cloud Storage for file uploads instead of local storage

### [​](#database-optimization) Database Optimization

```
# Increase PostgreSQL shared_buffers (edit postgresql.conf in deploy/docker-init/db/)
# Recommended: 25% of available RAM
shared_buffers = 1GB
effective_cache_size = 3GB
```

## [​](#-security-best-practices) 🔒 Security Best Practices

1. **Change Default Passwords**: Update admin and database passwords
2. **Enable Firewall**: Use Google Cloud Firewall rules effectively
3. **Regular Updates**: Keep system and Docker images updated
4. **SSL/TLS**: Always use HTTPS in production
5. **Backup Regularly**: Automate database backups
6. **Monitor Logs**: Set up log monitoring and alerts
7. **Limit SSH Access**: Restrict SSH to specific IP addresses
8. **Use Service Accounts**: Instead of API keys where possible

## [​](#-support-&-resources) 🆘 Support & Resources

* **Documentation**: <https://docs.insforge.dev>
* **GitHub Issues**: <https://github.com/insforge/insforge/issues>
* **Discord Community**: <https://discord.com/invite/MPxwj5xVvW>

## [​](#-cost-estimation) 📝 Cost Estimation

**Monthly Google Cloud Costs (approximate):**

| Component | Type | Monthly Cost |
| --- | --- | --- |
| Compute Engine | e2-medium (2 vCPU, 4 GB RAM) | ~$29 |
| Persistent Disk (30 GB) | Standard | ~$3 |
| Network Egress | First 1GB free | Variable |
| **Total** |  | **~$32/month** |

> 💡 **Cost Optimization**: Use sustained use discounts for 24/7 running instances to save up to 30%. Consider preemptible instances for development/testing environments.

---

**Congratulations! 🎉** Your InsForge instance is now running on Google Cloud Compute Engine. You can start building applications by connecting AI agents to your backend platform.
For other production deployment strategies, check out our [deployment guides](/deployment/deployment-security-guide).

[Deploy InsForge to Containarium](/deployment/deploy-to-containarium)[Showcase](/showcase)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)