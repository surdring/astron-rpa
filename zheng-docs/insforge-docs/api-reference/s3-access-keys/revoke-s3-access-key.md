Revoke S3 Access Key

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

S3 Access Keys

# Revoke S3 Access Key

Copy page

Revoke an S3 access key by its id. The in-memory LRU cache is
invalidated synchronously so subsequent S3 protocol requests with
this credential return `403 InvalidAccessKeyId`.

Copy page

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

Try it

Revoke S3 Access Key

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

#### Authorizations

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### Path Parameters

[​](#parameter-id)

id

string<uuid>

required

UUID of the access key to revoke (from the create/list response)

#### Response

204

Access key revoked

[Create S3 Access Key](/api-reference/s3-access-keys/create-s3-access-key)[S3 protocol (GET)](/api-reference/s3-protocol/s3-protocol-get)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)