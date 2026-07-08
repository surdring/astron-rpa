S3 协议 (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 协议

# S3 协议 (GET)

复制页面

根据路径形状和查询分发到 ListBuckets / ListObjectsV2 / GetObject / HeadObject / ListParts / GetBucketLocation / GetBucketVersioning。


复制页面

GET

/

storage

/

v1

/

s3

/

{path}

尝试

S3 协议 (GET)

cURL

```
curl --request GET \
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


[Revoke S3 Access Key](/api-reference/s3-access-keys/revoke-s3-access-key)[S3 protocol (PUT)](/api-reference/s3-protocol/s3-protocol-put)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)