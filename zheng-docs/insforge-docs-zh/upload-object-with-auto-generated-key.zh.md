使用自动生成的键上传对象

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects \
  --header 'Content-Type: multipart/form-data' \
  --header 'x-api-key: <api-key>' \
  --form file='@example-file'
```

201

400

404

```
{
  "bucket": "avatars",
  "key": "image-1737546841234-a3f2b1.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/image-1737546841234-a3f2b1.jpg"
}
```

Client

# 使用自动生成的键上传对象

复制页面

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

尝试

使用自动生成的键上传对象

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects \
  --header 'Content-Type: multipart/form-data' \
  --header 'x-api-key: <api-key>' \
  --form file='@example-file'
```

201

400

404

```
{
  "bucket": "avatars",
  "key": "image-1737546841234-a3f2b1.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/image-1737546841234-a3f2b1.jpg"
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

multipart/form-data

[​](#body-file)

file

file

必需

要上传的文件

#### 响应

201

application/json

使用自动生成的键上传对象成功

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

[列出存储桶中的对象](/api-reference/admin/list-objects-in-bucket)[获取上传策略（直传或预签名 URL）](/api-reference/client/get-upload-strategy-direct-or-presigned-url)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)