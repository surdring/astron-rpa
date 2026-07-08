删除对象

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

404

```
{
  "message": "Object deleted successfully"
}
```

Client

# 删除对象

复制页面

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

/

objects

/

{objectKey}

尝试

删除对象

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

404

```
{
  "message": "Object deleted successfully"
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

[​](#parameter-key)

key

string

必需

#### 响应

200

application/json

对象删除成功

[​](#response-message)

message

string

[上传对象](/api-reference/client/upload-object)[确认预签名上传](/api-reference/client/confirm-presigned-upload)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)