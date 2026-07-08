## 本页内容

* [概述](#概述)
* [合作模式](#合作模式)
* [合作优势](#合作优势)
* [开始使用](#开始使用)
* [按合作类型的特性](#按合作类型的特性)
  + [联合品牌特性](#联合品牌特性)
  + [白标特性](#白标特性)
* [API 参考](#api-参考)
* [集成示例](#集成示例)
  + [联合品牌集成流程](#联合品牌集成流程)
  + [白标集成流程](#白标集成流程)
* [参数与响应参考](#参数与响应参考)
  + [项目区域值](#项目区域值)
  + [项目实例类型值](#项目实例类型值)
  + [项目状态值](#项目状态值)
* [错误处理](#错误处理)
* [后续步骤](#后续步骤)

合作伙伴

# 合作伙伴集成

复制页面

了解如何通过联合品牌或白标合作将 InsForge 集成为合作伙伴平台

复制页面

## [​](#概述) 概述

InsForge 提供两种合作模式，使您能够将我们的后端即服务平台无缝集成到您的应用中。无论您需要的是联合品牌解决方案还是完全白标体验，我们都有适合您的合作模式。

## [​](#合作模式) 合作模式

## 联合品牌合作

适合希望在其服务旁提供 InsForge 的平台。
集成过程非常简便——开发者只需一键即可连接到 InsForge 平台，无需复杂的 OAuth 流程。

## 白标合作

适合希望完全控制用户体验的平台。
提供完整的项目生命周期管理，包括项目仪表板集成。开发者无需离开您的合作伙伴平台即可完成所有操作。

## [​](#合作优势) 合作优势

## 可扩展的基础设施

利用我们强大的后端基础设施，无需承担维护和扩展的负担

## 灵活的集成

从多种集成选项中选择最适合您应用需求的方案

## 收益分成

享受我们具有竞争力的合作伙伴应用收益分成模式

## 技术支持

获得专业的技术支持和资源，确保集成顺利进行

## [​](#开始使用) 开始使用

1

申请合作

通过我们的[合作邮箱](mailto:partnerships@insforge.dev)提交合作申请。
请说明您对联合品牌还是白标合作感兴趣。

2

接收合作伙伴凭证

批准后，您将获得：

* **合作伙伴 ID**：您的唯一合作伙伴标识符
* **密钥**：用于 API 访问的身份验证密钥
* 集成文档和支持

3

配置身份验证

所有 API 请求必须包含您的密钥以进行身份验证：

```
curl -X POST https://api.insforge.dev/partnership/v1/YOUR_PARTNER_ID/endpoint \
  -H "Content-Type: application/json" \
  -H "X-Partnership-Secret: YOUR_SECRET_KEY"
```

4

开始集成

根据您的合作模式，使用我们的 API 端点开始集成。

## [​](#按合作类型的特性) 按合作类型的特性

### [​](#联合品牌特性) 联合品牌特性

在联合品牌模式下，开发者明确知道他们是 InsForge 平台的用户（通过相同的电子邮件地址关联）。登录 InsForge 平台后，开发者对通过合作伙伴创建的项目拥有完整的管理权限，并需要根据 InsForge 的计费方案进行支付。
合作伙伴平台可以：

* 将用户账户（姓名、邮箱）与 InsForge 同步
* 将项目同步到 InsForge
* 查询项目连接信息以利用已完成的后端能力

### [​](#白标特性) 白标特性

在白标模式下，开发者不知道 InsForge 的存在，也无法在 InsForge 平台上看到合作伙伴创建的项目。
合作伙伴平台可以：

* 创建嵌入式项目
* 查询项目元数据以利用已完成的后端能力
* 暂停项目
* 恢复项目
* 删除项目
* 获取项目的授权令牌以进行访问
* 获取项目使用量
* 获取所有合作项目的聚合使用量（用于计费）

## [​](#api-参考) API 参考

* 联合品牌 API
* 白标 API

### [​](#连接用户账户) 连接用户账户

将用户账户信息与 InsForge 同步。

```
POST /partnership/v1/:partnerId/connect-user
```

**请求体：**

```
{
  "name": "John Doe",      // 必填
  "email": "john@example.com" // 必填
}
```

**响应：**

```
{
  "account": {
    "id": "uuid-string"
  }
}
```

### [​](#同步项目) 同步项目

为特定用户创建或同步项目。

```
POST /partnership/v1/:partnerId/:userId/sync-project
```

**请求体：**

```
{
  "project_name": "my-project",  // 必填
  "region": "us-east",         // 可选, "us-east", "us-west", "ap-southeast", "eu-central", 默认: "us-east"
  "instance_type": "nano"      // 可选, "nano", "micro", "small", "medium", "large", "xl", "2xl", "4xl", "8xl", "16xl", 默认: "nano"
}
```

**响应：**

```
{
  "success": true,
  "project": {
    "id": "uuid-string",
    "access_host": "https://project.us-east.insforge.app",
    "api_key": "project-api-key",
    "status": "active"
  }
}
```

#### [​](#处理项目限制) 处理项目限制

注意：由于 InsForge 免费计划的项目限制，从合作伙伴平台同步项目可能失败。在这种情况下，响应将为：

```
{
  "success": false,
  "message": "免费计划最多允许 2 个活跃项目。请升级您的计划以创建更多项目。",
  "candidate_projects": [
    {
      "id": "uuid-string",
      "access_host": "https://project2.us-east.insforge.app",
      "api_key": "project-api-key",
      "status": "active"
    }
  ]
}
```

合作伙伴可以引导用户选择现有项目进行连接，而不是总是创建新项目。

### [​](#获取项目元数据) 获取项目元数据

检索特定项目的连接信息。

```
GET /partnership/v1/:partnerId/:userId/:projectId/metadata
```

**响应：**

```
{
  "project": {
    "id": "uuid-string",
    "access_host": "https://project.us-east.insforge.app",
    "api_key": "project-api-key",
    "status": "active"
  }
}
```

### [​](#同步嵌入式项目) 同步嵌入式项目

为白标合作伙伴创建嵌入式项目。

```
POST /partnership/v1/:partnerId/sync-embedded-project
```

**请求体：**

```
{
  "project_name": "embedded-project",  // 必填
  "region": "us-east",               // 可选, "us-east", "us-west", "ap-southeast", "eu-central", 默认: "us-east"
  "instance_type": "nano"            // 可选, "nano", "micro", "small", "medium", "large", "xl", "2xl", "4xl", "8xl", "16xl", 默认: "nano"
}
```

**响应：**

```
{
  "success": true,
  "project": {
    "id": "uuid-string",
    "access_host": "https://project.us-east.insforge.app",
    "api_key": "project-api-key",
    "status": "active"
  }
}
```

### [​](#获取项目元数据-2) 获取项目元数据

检索特定项目的元数据。

```
GET /partnership/v1/:partnerId/:projectId/metadata
```

**响应：**

```
{
  "project": {
    "id": "uuid-string",
    "access_host": "https://project.us-east.insforge.app",
    "api_key": "project-api-key",
    "region": "us-east",
    "instance_type": "nano",
    "last_activity_at": "2025-01-21T10:30:00Z",
    "status": "active"
  }
}
```

### [​](#暂停项目) 暂停项目

暂停活跃项目以节省资源。

```
POST /partnership/v1/:partnerId/:projectId/pause
```

**请求体：**

```
{
  "wait_for_completion": true  // 可选
}
```

**响应：**

```
{
  "project": {
    "id": "uuid-string",
    "status": "paused"
  }
}
```

### [​](#恢复项目) 恢复项目

将暂停的项目恢复为活跃状态。

```
POST /partnership/v1/:partnerId/:projectId/restore
```

**请求体：**

```
{
  "wait_for_completion": true  // 可选
}
```

**响应：**

```
{
  "project": {
    "id": "uuid-string",
    "status": "active"
  }
}
```

### [​](#删除项目) 删除项目

永久删除项目。此操作无法撤销。

```
DELETE /partnership/v1/:partnerId/:projectId
```

**响应（200 OK）：**

```
{
  "message": "项目已成功删除",
  "requestId": "xhiahif-fehfe-feae"
}
```

### [​](#生成项目授权) 生成项目授权

生成一个短期有效的非对称 JWT 令牌用于项目访问。令牌使用 RSA 私钥签名，可通过公共 JWKS 端点验证。令牌在 10 分钟后过期。

```
POST /partnership/v1/:partnerId/:projectId/authorization
```

**响应：**

```
{
  "code": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imluc2ZvcmdlLWtleS0yMDI1LTA4LTEzIn0...",
  "expires_in": 600,
  "type": "Bearer"
}
```

### [​](#获取项目使用量) 获取项目使用量

检索特定项目在日期范围内的使用指标。返回汇总统计和每日使用量明细。如果未指定日期，则返回最近 7 天的数据。

```
GET /partnership/v1/:partnerId/:projectId/usage?start_date=2025-11-10&end_date=2025-11-18
```

**查询参数：**

* `start_date`（可选）：开始日期，格式为 YYYY-MM-DD（默认为 7 天前）
* `end_date`（可选）：结束日期，格式为 YYYY-MM-DD（默认为今天）

**响应：**

```
{
  "project": {
    "id": "uuid-string",
    "name": "project-name",
    "status": "active",
    "last_activity_at": "2025-11-18T10:30:00Z"
  },
  "period": {
    "start": "2025-11-10T00:00:00Z",
    "end": "2025-11-18T23:59:59Z"
  },
  "summary": {
    "max_database_size_bytes": 1048576,
    "max_file_storage_bytes": 5242880,
    "total_ai_tokens": 15000,
    "total_mcp_calls": 120,
    "total_egress_bytes": 2097152,
    "total_ai_credits": 1.5,
    "total_email_requests": 50,
    "total_function_calls": 300,
    "total_ec2_compute": 3600
  },
  "daily_usage": [
    {
      "usage_date": "2025-11-10",
      "database_size_bytes": 1048576,
      "file_storage_bytes": 5242880,
      "ai_tokens": 1500,
      "mcp_calls": 12,
      "egress_bytes": 204800,
      "ai_credits": 0.15,
      "email_requests": 5,
      "function_calls": 30,
      "ec2_compute": 3600
    }
  ]
}
```

### [​](#获取合作总使用量) 获取合作总使用量

检索您的合作伙伴关系下所有项目在日期范围内的聚合使用量指标。此端点专为计费和报告目的而设计，提供资源消耗的汇总视图。

```
GET /partnership/v1/:partnerId/usage?start_date=2025-11-01&end_date=2025-11-30
```

**查询参数：**

* `start_date`（可选）：开始日期，格式为 YYYY-MM-DD（默认为 7 天前）
* `end_date`（可选）：结束日期，格式为 YYYY-MM-DD（默认为今天）

**响应：**

```
{
  "partnership": {
    "id": "ps_abc123xyz",
    "name": "合作伙伴名称"
  },
  "period": {
    "start": "2025-11-01T00:00:00Z",
    "end": "2025-11-30T23:59:59Z"
  },
  "summary": {
    "database_bytes": 10485760,
    "storage_bytes": 52428800,
    "ai_tokens": 150000,
    "mcp_calls": 1200,
    "egress_bytes": 20971520,
    "ai_credits": 15.5,
    "email_requests": 500,
    "function_calls": 3000,
    "ec2_compute": 36000
  }
}
```

**使用量指标类型：**

| 指标 | 类型 | 描述 |
| --- | --- | --- |
| `database_bytes` | 峰值 | 数据库总占用峰值（每日总和，取跨日最大值） |
| `storage_bytes` | 峰值 | 存储总占用峰值（每日总和，取跨日最大值） |
| `ai_tokens` | 累计 | 消耗的 AI 令牌总数 |
| `mcp_calls` | 累计 | 发起的 MCP/工具调用总数 |
| `egress_bytes` | 累计 | 数据传输总量（源站 + CDN） |
| `ai_credits` | 累计 | 消耗的 AI 积分总数 |
| `email_requests` | 累计 | 发送的邮件总数 |
| `function_calls` | 累计 | 无服务器函数调用总数 |
| `ec2_compute` | 累计 | 使用的计算总秒数 |

此端点包含指定日期范围内已删除项目的使用量，确保计费准确性。

## [​](#集成示例) 集成示例

### [​](#联合品牌集成流程) 联合品牌集成流程

以下时序图说明了联合品牌合作的集成流程：

```
// 1. 连接用户账户
const connectUser = async (name: string, email: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/connect-user`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    }
  );

  const { account } = await response.json();
  return account.id;
};

// 2. 为用户创建项目
const createProject = async (userId: string, projectName: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/${userId}/sync-project`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project_name: projectName,
        region: 'us-east',
        instance_type: 'nano'
      })
    }
  );

  const data = await response.json();
  if (data.success) {
    return data.project;
  }
  throw new Error(data.message);
};

// 3. 使用项目凭证
console.log(project.access_host);
console.log(project.api_key);
```

### [​](#白标集成流程) 白标集成流程

以下时序图说明了白标合作的集成流程：

```
// 1. 创建嵌入式项目
const createEmbeddedProject = async (projectName: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/sync-embedded-project`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project_name: projectName,
        region: 'eu-west',
        instance_type: 'small'
      })
    }
  );

  const data = await response.json();
  if (data.success) {
    return data.project;
  }
  throw new Error(data.message);
};

// 2. 管理项目生命周期
const pauseProject = async (projectId: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/${projectId}/pause`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wait_for_completion: true
      })
    }
  );

  const { project } = await response.json();
  console.log(`项目 ${project.id} 状态: ${project.status}`);
};

const restoreProject = async (projectId: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/${projectId}/restore`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wait_for_completion: true
      })
    }
  );

  const { project } = await response.json();
  console.log(`项目 ${project.id} 状态: ${project.status}`);
};

// 3. 删除项目
const deleteProject = async (projectId: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/${projectId}`,
    {
      method: 'DELETE',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`
      }
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(data.message); // "项目已成功删除"
    console.log(`请求 ID: ${data.requestId}`);
  } else {
    throw new Error(`删除项目失败: ${response.status}`);
  }
};

// 4. 获取合作总使用量（用于计费）
const getPartnershipUsage = async (startDate: string, endDate: string) => {
  const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/usage?${params}`,
    {
      method: 'GET',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`
      }
    }
  );

  const data = await response.json();
  console.log(`周期: ${data.period.start} 至 ${data.period.end}`);
  console.log(`数据库: ${data.summary.database_bytes} 字节 (峰值)`);
  console.log(`存储: ${data.summary.storage_bytes} 字节 (峰值)`);
  console.log(`AI 积分: ${data.summary.ai_credits}`);
  console.log(`出站流量: ${data.summary.egress_bytes} 字节`);
  return data;
};
```

## [​](#参数与响应参考) 参数与响应参考

### [​](#项目区域值) 项目区域值

InsForge 提供全球部署能力。每个项目可以部署到不同区域：

* `us-east` - 美国东海岸
* `us-west` - 美国西海岸
* `ap-southeast` - 亚太东南
* `eu-central` - 欧洲中部

更多区域将根据需要陆续添加。

### [​](#项目实例类型值) 项目实例类型值

根据您项目的业务需求，InsForge 提供以下资源类型：

* `nano` - 开发用最小资源
* `micro` - 测试和开发用基础资源
* `small` - 轻量工作负载
* `medium` - 标准应用
* `large` - 生产工作负载
* `xl` - 高性能应用
* `2xl` - 企业级应用
* `4xl` - 大规模运营
* `8xl` - 关键任务系统
* `16xl` - 最大性能

### [​](#项目状态值) 项目状态值

项目可以具有以下状态值：

* **active**：项目正在运行且可访问
* **paused**：项目已暂停（仅白标模式）

## [​](#错误处理) 错误处理

所有 API 端点返回一致的错误响应：

```
{
  "success": false,
  "message": "详细的错误信息描述出了什么问题"
}
```

常见错误场景：

* 无效的身份验证凭证
* 项目未找到
* 对请求的操作权限不足
* 无效的请求参数

## [​](#后续步骤) 后续步骤

* 与我们的团队安排[技术评审](https://calendly.com/tony-chang-insforge/45min)

[分支](/agent-native/branching)[OAuth 服务器](/oauth-server)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)