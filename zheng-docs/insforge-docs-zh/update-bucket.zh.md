更新存储桶

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/storage/buckets/{bucketName} \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "isPublic": true
}
'
```

200

404

```
{
  "message": "Bucket visibility updated",
  "bucket": "avatars",
  "isPublic": true
}
```

Admin

# 更新存储桶

复制页面

复制页面

PATCH

/

api

/

storage

/

buckets

/

{bucketName}

尝试

更新存储桶

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/storage/buckets/{bucketName} \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "isPublic": true
}
'
```

200

404

```
{
  "message": "Bucket visibility updated",
  "bucket": "avatars",
  "isPublic": true
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

#### 请求体

application/json

[​](#body-is-public)

isPublic

boolean

存储桶是否应公开访问

示例：

`true`

#### 响应

200

application/json

存储桶可见性更新成功

[​](#response-message)

message

string

示例：

`"Bucket visibility updated"`

[​](#response-bucket)

bucket

string

示例：

`"avatars"`

[​](#response-is-public)

isPublic

boolean

示例：

`true`

[删除存储桶](/api-reference/admin/delete-bucket)[列出存储桶中的对象](/api-reference/admin/list-objects-in-bucket)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)