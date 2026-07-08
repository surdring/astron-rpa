S3 protocol (PUT)

cURL

```
curl --request PUT \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 Protocol

# S3 protocol (PUT)

Copy page

Dispatched to PutObject / UploadPart / CopyObject / CreateBucket based on path shape, query, and headers.

Copy page

PUT

/

storage

/

v1

/

s3

/

{path}

Try it

S3 protocol (PUT)

cURL

```
curl --request PUT \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

#### Path Parameters

[​](#parameter-path)

path

string

required

Standard path-style S3 path, e.g. `my-bucket/object-key`,
`my-bucket` (bucket-level ops), or empty for ListBuckets.

#### Response

200

Success

[S3 protocol (GET)](/api-reference/s3-protocol/s3-protocol-get)[S3 protocol (POST)](/api-reference/s3-protocol/s3-protocol-post)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)