删除存储桶

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/buckets/{bucketName} \
  --header 'x-api-key: <api-key>'
```

200

404

```
{
  "message": "Bucket deleted successfully",
  "nextActions": "You can use POST /api/storage/buckets to create a new bucket, and GET /api/storage/buckets/:bucketName/objects to list the objects in the bucket."
}
```

Admin

# 删除存储桶

复制页面

删除整个存储桶及其所有对象

复制页面

DELETE

/

api

/

storage

/

buckets

/

{bucketName}

尝试

删除存储桶

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/buckets/{bucketName} \
  --header 'x-api-key: <api-key>'
```

200

404

```
{
  "message": "Bucket deleted successfully",
  "nextActions": "You can use POST /api/storage/buckets to create a new bucket, and GET /api/storage/buckets/:bucketName/objects to list the objects in the bucket."
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

#### 响应

200

application/json

存储桶删除成功

[​](#response-message)

message

string

[​](#response-next-actions)

nextActions

string

[创建新存储桶](/api-reference/admin/create-new-bucket)[更新存储桶](/api-reference/admin/update-bucket)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)