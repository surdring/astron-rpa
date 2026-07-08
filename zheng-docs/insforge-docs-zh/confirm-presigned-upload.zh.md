确认预签名上传

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey}/confirm-upload \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "size": 102400,
  "contentType": "image/jpeg",
  "etag": "9bb58f26192e4ba00f01e2e7b136bbd8"
}
'
```

201

404

409

```
{
  "bucket": "avatars",
  "key": "user123.jpg",
  "size": 102400,
  "uploadedAt": "2024-01-15T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/user123.jpg",
  "mimeType": "image/jpeg"
}
```

Client

# 确认预签名上传

复制页面

确认文件已使用预签名 URL 成功上传到 S3

复制页面

POST

/

api

/

storage

/

buckets

/

{bucketName}

/

objects

/

{objectKey}

/

confirm-upload

尝试

确认预签名上传

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey}/confirm-upload \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "size": 102400,
  "contentType": "image/jpeg",
  "etag": "9bb58f26192e4ba00f01e2e7b136bbd8"
}
'
```

201

404

409

```
{
  "bucket": "avatars",
  "key": "user123.jpg",
  "size": 102400,
  "uploadedAt": "2024-01-15T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/user123.jpg",
  "mimeType": "image/jpeg"
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

#### 请求体

application/json

[​](#body-size)

size

integer

必需

文件大小（字节）

示例：

`102400`

[​](#body-content-type)

contentType

string

文件的 MIME 类型

示例：

`"image/jpeg"`

[​](#body-etag)

etag

string

已上传对象的 S3 ETag（可选）

示例：

`"9bb58f26192e4ba00f01e2e7b136bbd8"`

#### 响应

201

application/json

上传确认成功

[​](#response-bucket)

bucket

string

必需

包含对象的存储桶名称

示例：

`"avatars"`

[​](#response-key)

key

string

必需

在存储桶中标识对象的唯一键

示例：

`"user123.jpg"`

[​](#response-size)

size

integer

必需

文件大小（字节）

示例：

`102400`

[​](#response-uploaded-at)

uploadedAt

string<date-time>

必需

文件上传的 ISO 时间戳

示例：

`"2024-01-15T10:30:00Z"`

[​](#response-url)

url

string

必需

下载文件的 URL

示例：

`"/api/storage/buckets/avatars/objects/user123.jpg"`

[​](#response-mime-type)

mimeType

string

文件的 MIME 类型

示例：

`"image/jpeg"`

[删除对象](/api-reference/client/delete-object)[获取下载策略（直传或预签名 URL）](/api-reference/client/get-download-strategy-direct-or-presigned-url)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)