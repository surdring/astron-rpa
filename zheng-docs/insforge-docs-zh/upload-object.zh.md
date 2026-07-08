上传对象

cURL

```
curl --request PUT \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
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
  "key": "user123.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/user123.jpg"
}
```

Client

# 上传对象

复制页面

复制页面

PUT

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

尝试

上传对象

cURL

```
curl --request PUT \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
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
  "key": "user123.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/user123.jpg"
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

对象键（可包含正斜杠用于伪文件夹）

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

对象上传成功

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

[下载对象](/api-reference/client/download-object)[删除对象](/api-reference/client/delete-object)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)