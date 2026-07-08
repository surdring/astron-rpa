撤销 S3 访问密钥

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/s3/access-keys/{id} \
  --header 'x-api-key: <api-key>'
```

401

404

429

```
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid request",
  "statusCode": 400,
  "nextActions": "Check your request parameters"
}
```

S3 访问密钥

# 撤销 S3 访问密钥

复制页面

Revoke an S3 access key by its id. The in-memory LRU cache is
invalidated synchronously so subsequent S3 protocol requests with
this credential return `403 InvalidAccessKeyId`.

复制页面

DELETE

/

api

/

storage

/

s3

/

access-keys

/

{id}

尝试

撤销 S3 访问密钥

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/s3/access-keys/{id} \
  --header 'x-api-key: <api-key>'
```

401

404

429

```
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid request",
  "statusCode": 400,
  "nextActions": "Check your request parameters"
}
```

#### 授权

[​](#authorization-x-api-key)

x-api-key

string

header

必需

#### 路径参数

[​](#parameter-id)

id

string<uuid>

必需

要撤销的访问密钥的 UUID（来自创建/列表响应）


#### 响应

204

访问密钥已撤销


[Create S3 Access Key](/api-reference/s3-access-keys/create-s3-access-key)[S3 protocol (GET)](/api-reference/s3-protocol/s3-protocol-get)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)