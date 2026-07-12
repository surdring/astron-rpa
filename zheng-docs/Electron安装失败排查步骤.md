# Electron 安装失败排查步骤

## 问题现象

执行 `pnpm install` 时，在 `electron` 包下载阶段失败，典型错误信息：

```
❌ Error: Cannot download "https://github.com/electron/electron/releases/download/v25.9.8/electron-v25.9.8-win32-x64.zip"
```

或

```
❌ Error: read ECONNRESET / request timeout
```

---

## 快速解决（5 分钟）

```bash
# 1. 设置 Electron 镜像源（推荐使用 npmmirror）
pnpm config set electron_mirror https://npmmirror.com/mirrors/electron/

# 2. 清除缓存并重新安装
cd frontend
rm -rf node_modules packages/*/node_modules
pnpm install
```

> 如果以上步骤未能解决，请按下面的分层排查步骤逐一排查。

---

## 分层排查步骤

### 第一层：基础网络连通性（2 分钟）

```bash
# 1.1 测试 GitHub 连通性
curl -I https://github.com

# 1.2 测试 Electron 官方下载地址
curl -I https://github.com/electron/electron/releases/download/v25.9.8/electron-v25.9.8-win32-x64.zip

# 1.3 测试 npmmirror 镜像源
curl -I https://npmmirror.com/mirrors/electron/v25.9.8/electron-v25.9.8-win32-x64.zip
```

**预期结果**：以上 URL 返回 `200` 或 `302`。

**排查方向**：
- 如果 `github.com` 不通 → 全局代理或 VPN 问题
- 如果 GitHub 通但 npmmirror 不通 → 镜像源配置问题
- 如果两者都通 → 进入第二层

---

### 第二层：pnpm 配置检查（3 分钟）

```bash
# 2.1 查看当前 pnpm 配置
pnpm config list

# 2.2 确认 electron_mirror 已设置
pnpm config get electron_mirror
```

**预期结果**：`electron_mirror` 应指向一个可用的镜像源：
- 国内推荐：`https://npmmirror.com/mirrors/electron/`
- 其他源：`https://mirrors.huaweicloud.com/electron/`、`https://repo.huaweicloud.com/electron/`

**排查方向**：
- 如果 `electron_mirror` 为空 → 执行 `pnpm config set electron_mirror https://npmmirror.com/mirrors/electron/`
- 如果 `electron_mirror` 已设置但仍有问题 → 检查拼写错误，确认末尾的 `/` 是否缺失

---

### 第三层：npmrc 配置文件检查（3 分钟）

Electron 的下载行为受 `~/.npmrc` 或项目 `.npmrc` 中的 `electron_mirror` 配置影响。

```bash
# 3.1 检查全局 npmrc
type ~\.npmrc

# 3.2 检查项目 npmrc
type frontend\.npmrc
```

**预期结果**：确认 `.npmrc` 中是否存在 `electron_mirror` 配置，是否有冲突。

**排查方向**：
- 如果全局和项目 npmrc 中都有 `electron_mirror` → 项目级配置会覆盖全局级
- 如果存在 `registry` 配置但 `electron_mirror` 未设置 → electron 下载仍走官方地址
- 如果存在 `electron_mirror` 但末尾无 `/` → 可能导致路径拼接错误

---

### 第四层：缓存与重试（3 分钟）

pnpm 会缓存已下载的 electron 二进制文件，如果缓存损坏也可能导致安装失败。

```bash
# 4.1 查看 electron 缓存目录
pnpm store path

# 4.2 清除 electron 相关缓存
pnpm store prune

# 4.3 手动删除 node_modules 后重试
rm -rf node_modules packages/*/node_modules
pnpm install
```

**排查方向**：
- 如果清除缓存后仍失败 → 进入第五层
- 如果清除缓存后成功 → 原缓存文件损坏

---

### 第五层：手动下载验证（5 分钟）

如果自动下载持续失败，可以手动下载 electron 二进制文件并放置到缓存目录。

```bash
# 5.1 查看当前 electron 版本
type frontend\packages\electron-app\package.json
# 查找 "electron": "^25.9.8"

# 5.2 手动下载（使用浏览器或 curl）
# 访问镜像源地址下载：
# https://npmmirror.com/mirrors/electron/v25.9.8/electron-v25.9.8-win32-x64.zip

# 5.3 放置到缓存目录
# 缓存目录通常是：
#   %LOCALAPPDATA%\pnpm\store\v3\files\
# 或通过 pnpm store path 查看

# 5.4 或者在 node_modules 中手动放置
# 下载后解压到 frontend/node_modules/electron/dist/
```

**排查方向**：
- 如果手动下载成功 → 网络自动下载稳定性问题，优先使用镜像源
- 如果手动下载也失败 → 镜像源不可用，尝试其他镜像源

---

### 第六层：代理与防火墙（5 分钟）

企业网络环境中可能需要配置代理。

```bash
# 6.1 检查当前代理设置
npm config get proxy
npm config get https-proxy

# 6.2 设置代理（如有需要）
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# 6.3 设置 pnpm 代理
pnpm config set proxy http://proxy.company.com:8080
pnpm config set https-proxy http://proxy.company.com:8080
```

**排查方向**：
- 如果代理配置存在但已过期/失效 → 更新代理配置
- 如果公司网络需要认证代理 → 配置 `http://user:password@proxy.company.com:8080`
- 如果是个人网络 → 检查防火墙或安全软件是否拦截

---

### 第七层：electron 重安装脚本（5 分钟）

如果以上所有步骤均无效，可以尝试使用 electron 官方提供的重安装脚本。

```bash
# 7.1 安装 electron-re 工具
npx electron-re

# 7.2 或者手动执行 electron 的 postinstall 脚本
cd frontend
node node_modules/.pnpm/electron@25.9.8/node_modules/electron/install.js

# 7.3 如果 install.js 仍失败，可以指定镜像源重试
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ \
  node node_modules/.pnpm/electron@25.9.8/node_modules/electron/install.js
```

---

## 环境信息收集

如需向项目维护者或社区求助，请收集以下信息：

```bash
# 1. pnpm 版本
pnpm -v

# 2. Node.js 版本
node -v

# 3. 操作系统版本
[System.Environment]::OSVersion.VersionString

# 4. pnpm 配置
pnpm config list

# 5. 网络代理状态
npm config get proxy
npm config get https-proxy

# 6. 完整错误日志
pnpm install --loglevel verbose 2>&1 | Select-String -Pattern "electron"
```

---

## 常见错误对照表

| 错误信息 | 原因 | 解决方案 |
|---------|------|---------|
| `Cannot download` + `404` | 版本号不存在或镜像源不同步 | 确认 electron 版本号，切换镜像源 |
| `read ECONNRESET` | 网络连接被重置 | 检查代理/防火墙/VPN |
| `request timeout` | 下载超时 | 设置镜像源或增加超时时间 |
| `Unexpected end of file` | 下载不完整 | 清除缓存后重试 |
| `SSL_ERROR` / `certificate verify failed` | 证书验证失败 | 检查系统时间是否正确，或使用 `strict-ssl=false` |
| `EACCES` / `permission denied` | 权限不足 | 以管理员身份运行终端 |

---

## 快速参考：镜像源地址

| 镜像源 | 地址 |
|--------|------|
| 官方（GitHub） | `https://github.com/electron/electron/releases/download/` |
| 淘宝/NPM Mirror | `https://npmmirror.com/mirrors/electron/` |
| 华为云 | `https://repo.huaweicloud.com/electron/` |
| 腾讯云 | `https://mirrors.cloud.tencent.com/electron/` |

配置方式（三选一）：

```bash
# 方式 A：pnpm 配置
pnpm config set electron_mirror https://npmmirror.com/mirrors/electron/

# 方式 B：环境变量（临时生效）
$env:ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"

# 方式 C：npmrc 文件
echo "electron_mirror=https://npmmirror.com/mirrors/electron/" >> .npmrc
```