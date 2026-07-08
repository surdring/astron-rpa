S3 protocol (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 Protocol

# S3 protocol (GET)

Copy page

Dispatched to ListBuckets / ListObjectsV2 / GetObject / HeadObject / ListParts / GetBucketLocation / GetBucketVersioning based on path shape and query.

Copy page

GET

/

storage

/

v1

/

s3

/

{path}

Try it

S3 protocol (GET)

cURL

```
curl --request GET \
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

[Revoke S3 Access Key](/api-reference/s3-access-keys/revoke-s3-access-key)[S3 protocol (PUT)](/api-reference/s3-protocol/s3-protocol-put)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)