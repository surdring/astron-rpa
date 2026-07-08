获取应用元数据

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "auth": {
    "oAuthProviders": [
      "google",
      "github"
    ],
    "requireEmailVerification": true,
    "disableSignup": false
  },
  "database": {
    "tables": [
      {
        "tableName": "users",
        "recordCount": 150
      },
      {
        "tableName": "posts",
        "recordCount": 1200
      }
    ],
    "totalSizeInGB": 0.3
  },
  "storage": {
    "buckets": [
      {
        "name": "avatars",
        "public": true,
        "objectCount": 42
      }
    ],
    "totalSizeInGB": 0.5
  },
  "functions": [
    {
      "slug": "hello-world",
      "name": "hello-world",
      "status": "active",
      "description": "Test function"
    }
  ],
  "version": "2.0.0"
}
```

Admin

# 获取应用元数据

复制页面

返回聚合的应用元数据（认证、数据库、存储、函数、实时、部署）。使用 `format` 查询参数在 JSON 和 Markdown 输出之间切换。

复制页面

GET

/

api

/

metadata

尝试

获取应用元数据

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "auth": {
    "oAuthProviders": [
      "google",
      "github"
    ],
    "requireEmailVerification": true,
    "disableSignup": false
  },
  "database": {
    "tables": [
      {
        "tableName": "users",
        "recordCount": 150
      },
      {
        "tableName": "posts",
        "recordCount": 1200
      }
    ],
    "totalSizeInGB": 0.3
  },
  "storage": {
    "buckets": [
      {
        "name": "avatars",
        "public": true,
        "objectCount": 42
      }
    ],
    "totalSizeInGB": 0.5
  },
  "functions": [
    {
      "slug": "hello-world",
      "name": "hello-world",
      "status": "active",
      "description": "Test function"
    }
  ],
  "version": "2.0.0"
}
```

#### 授权

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 查询参数

[​](#parameter-format)

format

enum<string>

默认值:json

响应格式。`json` 返回结构化 JSON（默认）。`markdown` 返回人类可读的 Markdown 文档，适用于 AI 编码工具和开发者入门。

可用选项：

`json`,

`markdown`

#### 响应

200

application/json

应用元数据

[​](#response-auth)

auth

object

显示子属性

[​](#response-database)

database

object

显示子属性

[​](#response-storage)

storage

object

显示子属性

[​](#response-functions)

functions

object[]

显示子属性

[​](#response-realtime)

realtime

object

可选；当配置了实时功能时出现

显示子属性

[​](#response-deployments)

deployments

object

可选；仅云托管项目中出现

显示子属性

[​](#response-version)

version

string

[获取日志统计信息](/api-reference/admin/get-logs-statistics)[获取数据库元数据](/api-reference/admin/get-database-metadata)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)