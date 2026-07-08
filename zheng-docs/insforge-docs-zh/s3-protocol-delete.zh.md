S3 协议 (DELETE)

cURL

```
curl --request DELETE \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 协议

# S3 协议 (DELETE)

复制页面

根据路径和查询分发到 DeleteObject / DeleteBucket / AbortMultipartUpload。


复制页面

DELETE

/

storage

/

v1

/

s3

/

{path}

尝试

S3 协议 (DELETE)

cURL

```
curl --request DELETE \
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

204

成功


[S3 protocol (POST)](/api-reference/s3-protocol/s3-protocol-post)[S3 protocol (HEAD)](/api-reference/s3-protocol/s3-protocol-head)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)