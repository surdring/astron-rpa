下载对象

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

404

```
"<string>"
```

Client

# 下载对象

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

/

{objectKey}

尝试

下载对象

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

404

```
"<string>"
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

\*/\*

文件内容

响应类型为 `file`。

[获取上传策略（直传或预签名 URL）](/api-reference/client/get-upload-strategy-direct-or-presigned-url)[上传对象](/api-reference/client/upload-object)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)