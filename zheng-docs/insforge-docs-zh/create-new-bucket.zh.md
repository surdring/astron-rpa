创建新存储桶

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "bucketName": "avatars",
  "isPublic": true
}
'
```

201

400

409

```
{
  "message": "Bucket created successfully",
  "bucket": "avatars"
}
```

Admin

# 创建新存储桶

复制页面

复制页面

POST

/

api

/

storage

/

buckets

尝试

创建新存储桶

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "bucketName": "avatars",
  "isPublic": true
}
'
```

201

400

409

```
{
  "message": "Bucket created successfully",
  "bucket": "avatars"
}
```

#### 授权

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### 请求体

application/json

[​](#body-bucket-name)

bucketName

string

required

存储桶名称（仅限字母数字、下划线和连字符）

模式：`^[a-zA-Z0-9_-]+$`

示例：

`"avatars"`

[​](#body-is-public)

isPublic

boolean

默认值:true

存储桶是否可公开访问

示例：

`true`

#### 响应

201

application/json

存储桶创建成功

[​](#response-message)

message

string

示例：

`"Bucket created successfully"`

[​](#response-bucket-name)

bucketName

string

示例：

`"avatars"`

[列出所有存储桶](/api-reference/admin/list-all-buckets)[删除存储桶](/api-reference/admin/delete-bucket)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)