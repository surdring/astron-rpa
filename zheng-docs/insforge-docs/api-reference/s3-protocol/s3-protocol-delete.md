S3 protocol (DELETE)

cURL

```
curl --request DELETE \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 Protocol

# S3 protocol (DELETE)

Copy page

Dispatched to DeleteObject / DeleteBucket / AbortMultipartUpload based on path and query.

Copy page

DELETE

/

storage

/

v1

/

s3

/

{path}

Try it

S3 protocol (DELETE)

cURL

```
curl --request DELETE \
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

204

Success

[S3 protocol (POST)](/api-reference/s3-protocol/s3-protocol-post)[S3 protocol (HEAD)](/api-reference/s3-protocol/s3-protocol-head)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)