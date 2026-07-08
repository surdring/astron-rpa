获取上传策略（直传或预签名 URL）

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/upload-strategy \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "filename": "profile-photo.jpg",
  "contentType": "image/jpeg",
  "size": 102400
}
'
```

200

s3

```
{
  "method": "presigned",
  "uploadUrl": "https://s3-bucket.amazonaws.com/",
  "fields": {
    "bucket": "my-s3-bucket",
    "key": "app-key/avatars/profile-photo-1234567890-abc123.jpg",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": "AKIA.../20250905/us-east-2/s3/aws4_request",
    "X-Amz-Date": "20250905T000000Z",
    "Policy": "eyJ...",
    "X-Amz-Signature": "abc123..."
  },
  "key": "profile-photo-1234567890-abc123.jpg",
  "confirmRequired": true,
  "confirmUrl": "/api/storage/buckets/avatars/objects/profile-photo-1234567890-abc123.jpg/confirm-upload",
  "expiresAt": "2025-09-05T01:00:00Z"
}
```

Client

# 获取上传策略（直传或预签名 URL）

复制页面

根据存储后端返回上传策略（S3 返回预签名 URL，本地返回直传端点）

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

upload-strategy

尝试

获取上传策略（直传或预签名 URL）

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/upload-strategy \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "filename": "profile-photo.jpg",
  "contentType": "image/jpeg",
  "size": 102400
}
'
```

200

s3

```
{
  "method": "presigned",
  "uploadUrl": "https://s3-bucket.amazonaws.com/",
  "fields": {
    "bucket": "my-s3-bucket",
    "key": "app-key/avatars/profile-photo-1234567890-abc123.jpg",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": "AKIA.../20250905/us-east-2/s3/aws4_request",
    "X-Amz-Date": "20250905T000000Z",
    "Policy": "eyJ...",
    "X-Amz-Signature": "abc123..."
  },
  "key": "profile-photo-1234567890-abc123.jpg",
  "confirmRequired": true,
  "confirmUrl": "/api/storage/buckets/avatars/objects/profile-photo-1234567890-abc123.jpg/confirm-upload",
  "expiresAt": "2025-09-05T01:00:00Z"
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

#### 请求体

application/json

[​](#body-filename)

filename

string

必需

用于生成唯一键的原始文件名

示例：

`"profile-photo.jpg"`

[​](#body-content-type)

contentType

string

文件的 MIME 类型

示例：

`"image/jpeg"`

[​](#body-size)

size

integer

文件大小（字节）

示例：

`102400`

#### 响应

200

application/json

上传策略详情

[​](#response-method)

method

enum<string>

必需

上传方法 - presigned 用于 S3，direct 用于本地存储

可用选项：

`presigned`,

`direct`

示例：

`"presigned"`

[​](#response-upload-url)

uploadUrl

string

必需

用于上传文件的 URL

示例：

`"https://s3-bucket.amazonaws.com/"`

[​](#response-key)

key

string

必需

为文件生成的唯一键

示例：

`"profile-photo-1234567890-abc123.jpg"`

[​](#response-confirm-required)

confirmRequired

boolean

必需

是否需要上传确认

示例：

`true`

[​](#response-fields)

fields

object

预签名 POST 的表单字段（仅 S3）

示例：

```
{  
  "bucket": "my-s3-bucket",  
  "key": "app-key/avatars/profile.jpg",  
  "X-Amz-Algorithm": "AWS4-HMAC-SHA256"  
}
```

[​](#response-confirm-url)

confirmUrl

string

确认上传的 URL（如果 confirmRequired 为 true）

示例：

`"/api/storage/buckets/avatars/objects/profile.jpg/confirm-upload"`

[​](#response-expires-at)

expiresAt

string<date-time>

预签名 URL 的过期时间（仅 S3）

示例：

`"2025-09-05T01:00:00Z"`

[使用自动生成的键上传对象](/api-reference/client/upload-object-with-auto-generated-key)[下载对象](/api-reference/client/download-object)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)