列出所有存储桶

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets \
  --header 'x-api-key: <api-key>'
```

200

```
{
  "buckets": [
    "avatars",
    "documents",
    "uploads",
    "public",
    "private"
  ]
}
```

Admin

# 列出所有存储桶

复制页面

复制页面

GET

/

api

/

storage

/

buckets

尝试

列出所有存储桶

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets \
  --header 'x-api-key: <api-key>'
```

200

```
{
  "buckets": [
    "avatars",
    "documents",
    "uploads",
    "public",
    "private"
  ]
}
```

#### 授权

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### 响应

200 - application/json

存储桶名称列表

[​](#response-buckets)

buckets

string[]

示例：

```
["avatars", "documents", "uploads"]
```

[更新记录](/api-reference/client/update-records)[创建新存储桶](/api-reference/admin/create-new-bucket)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)