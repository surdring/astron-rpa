S3 协议 (HEAD)

cURL

```
curl --request HEAD \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 协议

# S3 协议 (HEAD)

复制页面

根据路径形状分发到 HeadBucket / HeadObject。


复制页面

HEAD

/

storage

/

v1

/

s3

/

{path}

尝试

S3 协议 (HEAD)

cURL

```
curl --request HEAD \
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


[S3 protocol (DELETE)](/api-reference/s3-protocol/s3-protocol-delete)[Get all available AI models](/api-reference/admin/get-all-available-ai-models)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)