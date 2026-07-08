S3 protocol (HEAD)

cURL

```
curl --request HEAD \
  --url https://api.example.com/storage/v1/s3/{path} \
  --header 'Authorization: Bearer <token>'
```

S3 Protocol

# S3 protocol (HEAD)

Copy page

Dispatched to HeadBucket / HeadObject based on path shape.

Copy page

HEAD

/

storage

/

v1

/

s3

/

{path}

Try it

S3 protocol (HEAD)

cURL

```
curl --request HEAD \
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

[S3 protocol (DELETE)](/api-reference/s3-protocol/s3-protocol-delete)[Get all available AI models](/api-reference/admin/get-all-available-ai-models)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)