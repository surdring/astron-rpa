S3 协议 (PUT)

cURL

```
curl --request PUT \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 协议

# S3 协议 (PUT)

复制页面

根据路径形状、查询和头部信息分发到 PutObject / UploadPart / CopyObject / CreateBucket。


复制页面

PUT

/

storage

/

v1

/

s3

/

{path}

尝试

S3 协议 (PUT)

cURL

```
curl --request PUT \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

#### 路径参数

[​](#parameter-path)

path

string

必需

Standard path-style S3 path, e.g. `my-bucket/object-key`,
`my-bucket` (bucket-level ops), or empty for ListBuckets.

#### 响应

200

成功


[S3 protocol (GET)](/api-reference/s3-protocol/s3-protocol-get)[S3 protocol (POST)](/api-reference/s3-protocol/s3-protocol-post)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)