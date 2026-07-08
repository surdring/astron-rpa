## On this page

* [概述](#overview)
* [请求头](#headers)
* [使用上传策略上传对象](#upload-object-with-upload-strategy)
  + [步骤 1：获取上传策略](#step-1-get-upload-strategy)
  + [请求体](#request-body)
  + [示例](#example)
  + [响应（S3 后端）](#response-s3-backend)
  + [响应（本地存储）](#response-local-storage)
  + [步骤 2：上传文件](#step-2-upload-file)
  + [步骤 3：确认预签名上传（仅 S3）](#step-3-confirm-presigned-upload-s3-only)
  + [请求体](#request-body-2)
  + [示例](#example-2)
  + [响应](#response)
* [上传对象（已弃用）](#upload-object-deprecated)
  + [路径参数](#path-parameters)
  + [请求体](#request-body-3)
  + [示例](#example-3)
  + [响应](#response-2)
* [使用自动生成的键上传（已弃用）](#upload-with-auto-generated-key-deprecated)
  + [示例](#example-4)
  + [响应](#response-3)
* [使用下载策略下载对象](#download-object-with-download-strategy)
  + [步骤 1：获取下载策略](#step-1-get-download-strategy)
  + [示例](#example-5)
  + [响应（S3 公共存储桶）](#response-s3-public-bucket)
  + [响应（S3 私有存储桶）](#response-s3-private-bucket)
  + [步骤 2：下载文件](#step-2-download-file)
* [下载对象（已弃用）](#download-object-deprecated)
  + [示例](#example-6)
  + [响应](#response-4)
* [删除对象](#delete-object)
  + [示例](#example-7)
  + [响应](#response-5)
* [列出存储桶中的对象](#list-objects-in-bucket)
  + [查询参数](#query-parameters)
  + [示例](#example-8)
  + [响应](#response-6)
* [存储桶管理（管理员）](#bucket-management-admin)
  + [列出所有存储桶](#list-all-buckets)
  + [示例](#example-9)
  + [响应](#response-7)
  + [创建存储桶](#create-bucket)
  + [请求体](#request-body-4)
  + [示例](#example-10)
  + [响应](#response-8)
  + [更新存储桶](#update-bucket)
  + [请求体](#request-body-5)
  + [示例](#example-11)
  + [响应](#response-9)
  + [删除存储桶](#delete-bucket)
  + [示例](#example-12)
  + [响应](#response-10)
* [错误响应](#error-responses)
  + [存储桶未找到（404）](#bucket-not-found-404)
  + [对象未找到（404）](#object-not-found-404)
  + [无效文件（400）](#invalid-file-400)
  + [存储桶已存在（409）](#bucket-already-exists-409)

REST API

# 存储 API 参考

Copy page

通过 REST API 进行文件存储和存储桶管理

Copy page

## [​](#overview) 概述

存储 API 提供类似 S3 的基于存储桶的文件存储。上传、下载和管理文件，支持本地和兼容 S3 的存储后端。

## [​](#headers) 请求头

用于已认证的函数调用：

```
Authorization: Bearer your-jwt-token-or-anon-key
Content-Type: application/json
```

用于管理端点：

```
Authorization: Bearer admin-jwt-token-Or-API-Key
Content-Type: application/json
```

---

## [​](#upload-object-with-upload-strategy) 使用上传策略上传对象

InsForge 支持两种类型的存储后端：

1. **本地存储**：文件存储在本地文件系统。用于开发或低量生产。
2. **兼容 S3**：文件存储在兼容 S3 的对象存储上。用于高量生产。

上传文件的步骤：

1. 获取上传策略
2. 上传文件
3. 确认上传（仅 S3）

---

### [​](#step-1-get-upload-strategy) 步骤 1：获取上传策略

获取基于存储后端的最优上传策略（直接上传或预签名 URL）。
上传策略 API 返回基于存储后端的最优上传方法：

* **本地存储**：直接上传到 InsForge API
* **兼容 S3**：预签名 URL，用于直接上传到 S3

```
POST /api/storage/buckets/{bucketName}/upload-strategy
```

#### [​](#request-body) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `filename` | string | 是 | 原始文件名 |
| `contentType` | string | 否 | 文件的 MIME 类型 |
| `size` | integer | 否 | 文件大小（字节） |

#### [​](#example) 示例

```
curl -X POST "https://your-app.insforge.app/api/storage/buckets/avatars/upload-strategy" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "profile-photo.jpg",
    "contentType": "image/jpeg",
    "size": 102400
  }'
```

#### [​](#response-s3-backend) 响应（S3 后端）

```
{
  "method": "presigned",
  "uploadUrl": "https://s3-bucket.amazonaws.com/",
  "fields": {
    "bucket": "my-s3-bucket",
    "key": "app-key/avatars/profile-photo-1234567890-abc123.jpg",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": "...",
    "Policy": "...",
    "X-Amz-Signature": "..."
  },
  "key": "profile-photo-1234567890-abc123.jpg",
  "confirmRequired": true,
  "confirmUrl": "/api/storage/buckets/avatars/objects/profile-photo-1234567890-abc123.jpg/confirm-upload",
  "expiresAt": "2025-09-05T01:00:00Z"
}
```

#### [​](#response-local-storage) 响应（本地存储）

```
{
  "method": "direct",
  "uploadUrl": "/api/storage/buckets/avatars/objects/profile-photo-1234567890-abc123.jpg",
  "key": "profile-photo-1234567890-abc123.jpg",
  "confirmRequired": false
}
```

---

### [​](#step-2-upload-file) 步骤 2：上传文件

使用提供的方法将文件上传到指定的 URL。

* **本地存储**：使用 PUT 请求到 `uploadUrl`，使用 `multipart/form-data` 和 `file` 字段。
* **兼容 S3**：使用 POST 请求到 `uploadUrl`，使用 `multipart/form-data` 和 `file` 字段。在请求中包含 `fields` 对象中的所有字段。

### [​](#step-3-confirm-presigned-upload-s3-only) 步骤 3：确认预签名上传（仅 S3）

确认文件已使用预签名 URL 成功上传到 S3。

```
POST /api/storage/buckets/{bucketName}/objects/{objectKey}/confirm-upload
```

#### [​](#request-body-2) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `size` | integer | 是 | 文件大小（字节） |
| `contentType` | string | 否 | 文件的 MIME 类型 |
| `etag` | string | 否 | 上传对象的 S3 ETag |

#### [​](#example-2) 示例

```
curl -X POST "https://your-app.insforge.app/api/storage/buckets/avatars/objects/profile-photo-123.jpg/confirm-upload" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "size": 102400,
    "contentType": "image/jpeg"
  }'
```

#### [​](#response) 响应

```
{
  "bucket": "avatars",
  "key": "profile-photo-123.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/profile-photo-123.jpg"
}
```

---

## [​](#upload-object-deprecated) 上传对象（已弃用）

使用特定键将文件上传到存储桶。

```
PUT /api/storage/buckets/{bucketName}/objects/{objectKey}
```

### [​](#path-parameters) 路径参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `bucketName` | string | 存储桶名称 |
| `objectKey` | string | 对象键（可以包含 `/` 用于伪文件夹） |

### [​](#request-body-3) 请求体

`multipart/form-data` 格式，包含 `file` 字段。

### [​](#example-3) 示例

```
curl -X PUT "https://your-app.insforge.app/api/storage/buckets/avatars/objects/users/profile.jpg" \
  -H "Authorization: Bearer your-jwt-token" \
  -F "file=@/path/to/image.jpg"
```

### [​](#response-2) 响应

```
{
  "bucket": "avatars",
  "key": "users/profile.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-15T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/users/profile.jpg"
}
```

---

## [​](#upload-with-auto-generated-key-deprecated) 使用自动生成的键上传（已弃用）

使用自动生成的唯一键上传文件。

```
POST /api/storage/buckets/{bucketName}/objects
```

### [​](#example-4) 示例

```
curl -X POST "https://your-app.insforge.app/api/storage/buckets/uploads/objects" \
  -H "Authorization: Bearer your-jwt-token" \
  -F "file=@/path/to/document.pdf"
```

### [​](#response-3) 响应

```
{
  "bucket": "uploads",
  "key": "document-1737546841234-a3f2b1.pdf",
  "size": 204800,
  "mimeType": "application/pdf",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/uploads/objects/document-1737546841234-a3f2b1.pdf"
}
```

---

## [​](#download-object-with-download-strategy) 使用下载策略下载对象

InsForge 支持两种类型的存储后端：

1. **本地存储**：文件存储在本地文件系统。用于开发或低量生产。
2. **兼容 S3**：文件存储在兼容 S3 的对象存储上。用于高量生产。

下载文件的步骤：

1. 获取下载策略
2. 从返回的 URL 下载文件

### [​](#step-1-get-download-strategy) 步骤 1：获取下载策略

获取基于存储后端和存储桶可见性的最优下载策略（直接 URL 或预签名 URL）。
下载策略 API 返回基于存储后端和存储桶可见性的最优下载方法：

* **本地存储**：从 InsForge API 直接下载
* **兼容 S3**：S3 的预签名 URL。

```
GET /api/storage/buckets/{bucketName}/download-strategy/objects/{objectKey}
```

过期时间（对于预签名 URL）由服务端根据存储桶可见性自动计算。端点不接受请求体。`objectKey` 可能包含 `/`（伪文件夹）——不要对分隔符进行百分号编码。
`POST /api/storage/buckets/{bucketName}/objects/{objectKey}/download-strategy` 作为旧 SDK 版本的已弃用别名保留在原始路径，将在未来的主版本中移除。迁移到 `GET`。

#### [​](#example-5) 示例

```
curl "https://your-app.insforge.app/api/storage/buckets/avatars/download-strategy/objects/profile.jpg" \
  -H "Authorization: Bearer your-jwt-token"
```

#### [​](#response-s3-public-bucket) 响应（S3 公共存储桶）

```
{
  "method": "direct",
  "url": "https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/avatars/profile.jpg"
}
```

#### [​](#response-s3-private-bucket) 响应（S3 私有存储桶）

```
{
  "method": "presigned",
  "url": "https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/avatars/profile.jpg?X-Amz-Algorithm=...",
  "expiresAt": "2025-09-05T01:00:00Z"
}
```

### [​](#step-2-download-file) 步骤 2：下载文件

从返回的 URL 下载文件，使用适当的方法。

---

## [​](#download-object-deprecated) 下载对象（已弃用）

从存储桶下载文件。

```
GET /api/storage/buckets/{bucketName}/objects/{objectKey}
```

### [​](#example-6) 示例

```
curl "https://your-app.insforge.app/api/storage/buckets/avatars/objects/users/profile.jpg" \
  -H "Authorization: Bearer your-jwt-token" \
  -o profile.jpg
```

### [​](#response-4) 响应

带有适当 `Content-Type` 和 `Content-Length` 请求头的二进制文件内容。

---

## [​](#delete-object) 删除对象

从存储桶中删除文件。

```
DELETE /api/storage/buckets/{bucketName}/objects/{objectKey}
```

### [​](#example-7) 示例

```
curl -X DELETE "https://your-app.insforge.app/api/storage/buckets/avatars/objects/users/profile.jpg" \
  -H "Authorization: Bearer your-jwt-token"
```

### [​](#response-5) 响应

```
{
  "message": "对象已成功删除"
}
```

---

## [​](#list-objects-in-bucket) 列出存储桶中的对象

列出存储桶中的所有对象，支持可选过滤。

```
GET /api/storage/buckets/{bucketName}/objects
```

### [​](#query-parameters) 查询参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `prefix` | string | 按键前缀过滤（例如 `users/`） |
| `search` | string | 按键搜索对象（部分匹配） |
| `limit` | integer | 最大返回对象数（1-1000，默认：100） |
| `offset` | integer | 跳过的对象数 |

### [​](#example-8) 示例

```
# 按前缀过滤
curl "https://your-app.insforge.app/api/storage/buckets/avatars/objects?prefix=users/&limit=50" \
  -H "Authorization: Bearer your-jwt-token"

# 按键搜索
curl "https://your-app.insforge.app/api/storage/buckets/avatars/objects?search=profile" \
  -H "Authorization: Bearer your-jwt-token"
```

### [​](#response-6) 响应

```
{
  "data": [
    {
      "bucket": "avatars",
      "key": "users/user123.jpg",
      "size": 102400,
      "mimeType": "image/jpeg",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "url": "/api/storage/buckets/avatars/objects/users/user123.jpg"
    },
    {
      "bucket": "avatars",
      "key": "users/user456.png",
      "size": 204800,
      "mimeType": "image/png",
      "uploadedAt": "2024-01-16T11:00:00Z",
      "url": "/api/storage/buckets/avatars/objects/users/user456.png"
    }
  ],
  "pagination": {
    "offset": 0,
    "limit": 100,
    "total": 2
  }
}
```

---

## [​](#bucket-management-admin) 存储桶管理（管理员）

### [​](#list-all-buckets) 列出所有存储桶

```
GET /api/storage/buckets
```

### [​](#example-9) 示例

```
curl "https://your-app.insforge.app/api/storage/buckets" \
  -H "Authorization: Bearer admin-jwt-token"
```

### [​](#response-7) 响应

```
{
  "buckets": ["avatars", "documents", "uploads", "public"]
}
```

### [​](#create-bucket) 创建存储桶

```
POST /api/storage/buckets
```

### [​](#request-body-4) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `bucketName` | string | 是 | 存储桶名称（字母数字、下划线、连字符） |
| `isPublic` | boolean | 否 | 存储桶是否可公开访问（默认：true） |

### [​](#example-10) 示例

```
curl -X POST "https://your-app.insforge.app/api/storage/buckets" \
  -H "Authorization: Bearer admin-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "bucketName": "user-uploads",
    "isPublic": false
  }'
```

### [​](#response-8) 响应

```
{
  "message": "存储桶创建成功",
  "bucket": "user-uploads"
}
```

### [​](#update-bucket) 更新存储桶

```
PATCH /api/storage/buckets/{bucketName}
```

### [​](#request-body-5) 请求体

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `isPublic` | boolean | 是 | 存储桶是否可公开访问 |

### [​](#example-11) 示例

```
curl -X PATCH "https://your-app.insforge.app/api/storage/buckets/user-uploads" \
  -H "Authorization: Bearer admin-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"isPublic": true}'
```

### [​](#response-9) 响应

```
{
  "message": "存储桶可见性已更新",
  "bucket": "user-uploads",
  "isPublic": true
}
```

### [​](#delete-bucket) 删除存储桶

```
DELETE /api/storage/buckets/{bucketName}
```

### [​](#example-12) 示例

```
curl -X DELETE "https://your-app.insforge.app/api/storage/buckets/old-uploads" \
  -H "Authorization: Bearer admin-jwt-token"
```

### [​](#response-10) 响应

```
{
  "message": "存储桶已成功删除"
}
```

---

## [​](#error-responses) 错误响应

### [​](#bucket-not-found-404) 存储桶未找到（404）

```
{
  "error": "BUCKET_NOT_FOUND",
  "message": "存储桶 'nonexistent' 不存在",
  "statusCode": 404,
  "nextActions": "请先创建存储桶"
}
```

### [​](#object-not-found-404) 对象未找到（404）

```
{
  "error": "OBJECT_NOT_FOUND",
  "message": "对象 'missing.jpg' 在存储桶 'avatars' 中未找到",
  "statusCode": 404,
  "nextActions": "检查存储桶和键的组合"
}
```

### [​](#invalid-file-400) 无效文件（400）

```
{
  "error": "INVALID_FILE",
  "message": "请求中未提供文件",
  "statusCode": 400,
  "nextActions": "在 multipart form data 中包含文件"
}
```

### [​](#bucket-already-exists-409) 存储桶已存在（409）

```
{
  "error": "BUCKET_EXISTS",
  "message": "存储桶 'avatars' 已存在",
  "statusCode": 409,
  "nextActions": "选择不同的存储桶名称"
}
```

[认证 API 参考](/sdks/rest/auth)[函数 API 参考](/sdks/rest/functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)