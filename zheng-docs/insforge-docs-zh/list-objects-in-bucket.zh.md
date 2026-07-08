列出存储桶中的对象

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects \
  --header 'x-api-key: <api-key>'
```

200

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
  },
  "nextActions": "You can use PUT /api/storage/buckets/:bucketName/objects/:objectKey to upload with a specific key, or POST /api/storage/buckets/:bucketName/objects to upload with auto-generated key, and GET /api/storage/buckets/:bucketName/objects/:objectKey to download an object."
}
```

Admin

# 列出存储桶中的对象

复制页面

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

objects

尝试

列出存储桶中的对象

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects \
  --header 'x-api-key: <api-key>'
```

200

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
  },
  "nextActions": "You can use PUT /api/storage/buckets/:bucketName/objects/:objectKey to upload with a specific key, or POST /api/storage/buckets/:bucketName/objects to upload with auto-generated key, and GET /api/storage/buckets/:bucketName/objects/:objectKey to download an object."
}
```

#### 授权

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### 路径参数

[​](#parameter-bucket-name)

bucketName

string

required

模式：`^[a-zA-Z0-9_-]+$`

#### 查询参数

[​](#parameter-prefix)

prefix

string

按键前缀筛选对象

[​](#parameter-limit)

limit

integer

默认值:100

允许范围：`1 <= x <= 1000`

[​](#parameter-offset)

offset

integer

默认值:0

允许范围：`x >= 0`

[​](#parameter-search)

search

string

按键搜索对象（部分匹配）

#### 响应

200 - application/json

存储桶中的对象列表

[​](#response-data)

data

object[]

显示子属性

[​](#response-pagination)

pagination

object

显示子属性

[​](#response-next-actions)

nextActions

string

示例：

`"You can use PUT /api/storage/buckets/:bucketName/objects/:objectKey to upload with a specific key, or POST /api/storage/buckets/:bucketName/objects to upload with auto-generated key, and GET /api/storage/buckets/:bucketName/objects/:objectKey to download an object."`

[更新存储桶](/api-reference/admin/update-bucket)[使用自动生成键上传对象](/api-reference/client/upload-object-with-auto-generated-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)