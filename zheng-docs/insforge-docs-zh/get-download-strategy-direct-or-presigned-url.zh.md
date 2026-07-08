获取下载策略（直传或预签名 URL）

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/download-strategy/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

s3-public

```
{
  "method": "direct",
  "url": "https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/public-assets/logo.png"
}
```

Client

# 获取下载策略（直传或预签名 URL）

复制页面

根据存储后端和存储桶可见性返回下载策略。

* S3 公共存储桶：直传 URL（无需预签名，性能更佳）
* S3 私有存储桶：带过期时间的预签名 URL
* 本地存储：始终使用直传端点

过期时间（使用预签名时）由服务端根据存储桶可见性自动计算；不接受请求体。

对象键可能包含 `/`（伪文件夹）；路径使用通配符匹配，因此调用方不应在 `objectKey` 中对 `/` 进行百分号编码。

复制页面

GET

/

api

/

storage

/

buckets

/

{bucketName}

/

download-strategy

/

objects

/

{objectKey}

尝试

获取下载策略（直传或预签名 URL）

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/download-strategy/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

s3-public

```
{
  "method": "direct",
  "url": "https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/public-assets/logo.png"
}
```

#### 认证

[​](#authorization-x-api-key)

x-api-key

string

header

必需

#### 路径参数

[​](#parameter-bucket-name)

bucketName

string

必需

格式：`^[a-zA-Z0-9_-]+$`

[​](#parameter-object-key)

objectKey

string

必需

#### 响应

200

application/json

下载策略详情

[​](#response-method)

method

enum<string>

必需

下载方法：

* `direct`：直传 URL 访问（S3 公共存储桶或本地存储）
* `presigned`：带签名和过期时间的安全 URL（S3 私有存储桶）

可用选项：

`presigned`,

`direct`

示例：

`"direct"`

[​](#response-url)

url

string

必需

用于下载文件的 URL

示例：

`"https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/public-assets/logo.png"`

[​](#response-expires-at)

expiresAt

string<date-time>

预签名 URL 的过期时间（仅当方法为 'presigned' 时出现）

示例：

`"2025-09-05T01:00:00Z"`

[​](#response-headers)

headers

object

下载请求中需要包含的可选请求头

[确认预签名上传](/api-reference/client/confirm-presigned-upload)[获取下载策略（已弃用 — 使用规范路径上的 GET）](/api-reference/client/get-download-strategy-deprecated-—-use-get-on-the-canonical-path)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)