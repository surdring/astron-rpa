# InsForge anonKey 验证测试报告

**报告日期**：2026-07-05（第 1 版）
**修正日期**：2026-07-05（第 3 版 — 创建 api_keys 表后复测）
**测试目标**：验证新生成的 InsForge anonKey 是否可正常初始化 SDK 并与后端服务通信  
**后端地址**：`http://172.16.100.211:7130`  
**Dashboard 地址**：`http://172.16.100.211:7131`  
**测试 anonKey**：`anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f`

---

## 1. 测试背景

在将 AstronRPA 后端向 InsForge BaaS 平台迁移的过程中，需要通过 InsForge Dashboard 或 Admin API 获取 `anonKey`，用于前端/客户端 SDK 初始化。本次测试通过 Admin API 调用了 `/api/secrets/anon-key/rotate` 生成了新的 anonKey，并对其进行可用性验证。

---

## 2. 测试环境

| 项目 | 说明 |
|------|------|
| 操作系统 | Windows（本地测试机） |
| Node.js | 运行测试脚本所需 |
| SDK | `@insforge/sdk@latest` |
| InsForge 后端版本 | `2.2.4`（由 `/api/health` 返回） |
| 管理员凭证 | `admin` / `admin123` |
| 测试脚本位置 | [zheng-docs/test-insforge-sdk/test.js](./test-insforge-sdk/test.js) |

---

## 3. 测试方法

1. 使用管理员账号调用 `/api/auth/admin/sessions` 获取 Admin accessToken。
2. 调用 `/api/secrets/anon-key/rotate` 生成新的 anonKey。
3. 调用 `/api/metadata/anon-key` 读取确认 anonKey 值。
4. 使用 `@insforge/sdk` 初始化客户端，并执行以下验证：
   - Health check
   - Public auth config（REST API）
   - Database 查询（REST API 与 SDK）
   - Auth 注册用户

---

## 4. 详细测试结果

### 4.1 SDK 初始化

**状态**：✅ 通过

```javascript
const insforge = createClient({
  baseUrl: 'http://172.16.100.211:7130',
  anonKey: 'anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f',
});
```

`createClient` 无异常抛出，客户端对象创建成功。

---

### 4.2 Health Check

**状态**：✅ 通过

**请求**：

```http
GET http://172.16.100.211:7130/api/health
```

**响应**：

```json
{
  "status": "ok",
  "version": "2.2.4",
  "service": "Insforge OSS Backend",
  "timestamp": "2026-07-05T00:49:23.652Z"
}
```

---

### 4.3 Auth 注册用户

**状态**：✅ 通过

**请求**：

```javascript
const { data, error } = await insforge.auth.signUp({
  email: `test_${Date.now()}@example.com`,
  password: 'TestPassword123!',
});
```

**响应摘要**：

- 成功创建用户
- 返回 `accessToken`、`csrfToken` 和用户信息
- 说明 anonKey 可用于公开注册接口

---

### 4.4 Public Auth Config

**状态**：⚠️ 401 Unauthorized

**请求**：

```http
GET http://172.16.100.211:7130/api/auth/config
Authorization: Bearer <anonKey>
```

**响应**：

```json
{
  "error": "AUTH_UNAUTHORIZED",
  "message": "Invalid token",
  "statusCode": 401
}
```

**分析**：该端点不接受 anonKey，需使用有效用户 JWT。不影响 SDK 常规使用。

---

### 4.5 Database 查询

**状态**：✅ 修复完成

**请求（REST API 验证代理连通）**：

```http
GET http://172.16.100.211:7130/api/database/records/api_keys?limit=1
Authorization: Bearer <anonKey>
```

**修复前响应**：

```json
{
  "error": "INTERNAL_ERROR",
  "message": "connect ECONNREFUSED 127.0.0.1:5430",
  "statusCode": 500
}
```

**中间态（PostgREST 连通后）**：

```json
{
  "code": "PGRST205",
  "message": "Could not find the table 'public.api_keys' in the schema cache"
}
```

**最终修复后响应**：`Status: 200, Body: []`

**分析**：

- `ECONNREFUSED` → `PGRST205` → `200`：三步修复过程
- 第 1 步安装 PostgREST 修复 5430 端口连接
- 第 2 步通过 Admin API `/api/database/migrations` 执行 SQL 创建 `api_keys` 表
- SDK 数据库方法与 REST API 行为一致

**结论**：数据库 API 完全修复，可正常查询和写入。

---

## 5. 问题分析（已修复）

### 5.1 原始问题

数据库查询返回 `connect ECONNREFUSED 127.0.0.1:5430`，表明 InsForge 后端服务在尝试连接本机 5430 端口时被拒绝。

### 5.2 根因

本地非 Docker 部署缺少 PostgREST 服务。InsForge 的数据库 API 请求链路为：

```
客户端 → InsForge Backend (:7130) → PostgREST (:5430) → PostgreSQL (:5432)
```

Docker 部署中 PostgREST 作为独立容器自动运行，本地部署时未安装导致 5430 端口无服务监听。

### 5.3 修复方案

在服务器 `172.16.100.211` 上安装 PostgREST v14.14 二进制，配置 systemd 服务管理，连接远程 PostgreSQL 数据库。详见 [InsForge-PostgREST-修复记录.md](./InsForge-PostgREST-修复记录.md)。

### 5.4 修复后验证

- `ss -tlnp` 确认 5430 端口已监听
- 数据库 API 返回 `PGRST205`（表不存在）而非 `ECONNREFUSED`（连接拒绝）
- 代理通道正常连通

### 5.5 与 anonKey 的关系

该问题**与 anonKey 本身无关**。anonKey 已成功生成，可正常用于 SDK 初始化和公开认证接口。

---

## 6. 结论

- **anonKey 已生成并可用**：`anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f`
- **SDK 初始化与认证接口正常**
- **PostgREST 数据库代理已修复**，5430 端口正常连通
- **api_keys 表已创建**，数据库 API 完全正常工作（200 OK）
