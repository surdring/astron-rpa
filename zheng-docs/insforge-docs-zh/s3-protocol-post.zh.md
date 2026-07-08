S3 协议 (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 协议

# S3 协议 (POST)

复制页面

根据查询分发到 CreateMultipartUpload / CompleteMultipartUpload / DeleteObjects。


复制页面

POST

/

storage

/

v1

/

s3

/

{path}

尝试

S3 协议 (POST)

cURL

```
curl --request POST \
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


[S3 protocol (PUT)](/api-reference/s3-protocol/s3-protocol-put)[S3 protocol (DELETE)](/api-reference/s3-protocol/s3-protocol-delete)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)