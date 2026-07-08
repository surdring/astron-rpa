Get Upload Strategy (Direct or Presigned URL)

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/upload-strategy \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "filename": "profile-photo.jpg",
  "contentType": "image/jpeg",
  "size": 102400
}
'
```

200

s3

```
{
  "method": "presigned",
  "uploadUrl": "https://s3-bucket.amazonaws.com/",
  "fields": {
    "bucket": "my-s3-bucket",
    "key": "app-key/avatars/profile-photo-1234567890-abc123.jpg",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": "AKIA.../20250905/us-east-2/s3/aws4_request",
    "X-Amz-Date": "20250905T000000Z",
    "Policy": "eyJ...",
    "X-Amz-Signature": "abc123..."
  },
  "key": "profile-photo-1234567890-abc123.jpg",
  "confirmRequired": true,
  "confirmUrl": "/api/storage/buckets/avatars/objects/profile-photo-1234567890-abc123.jpg/confirm-upload",
  "expiresAt": "2025-09-05T01:00:00Z"
}
```

Client

# Get Upload Strategy (Direct or Presigned URL)

Copy page

Returns upload strategy based on storage backend (S3 returns presigned URLs, local returns direct upload endpoints)

Copy page

POST

/

api

/

storage

/

buckets

/

{bucketName}

/

upload-strategy

Try it

Get Upload Strategy (Direct or Presigned URL)

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/upload-strategy \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "filename": "profile-photo.jpg",
  "contentType": "image/jpeg",
  "size": 102400
}
'
```

200

s3

```
{
  "method": "presigned",
  "uploadUrl": "https://s3-bucket.amazonaws.com/",
  "fields": {
    "bucket": "my-s3-bucket",
    "key": "app-key/avatars/profile-photo-1234567890-abc123.jpg",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": "AKIA.../20250905/us-east-2/s3/aws4_request",
    "X-Amz-Date": "20250905T000000Z",
    "Policy": "eyJ...",
    "X-Amz-Signature": "abc123..."
  },
  "key": "profile-photo-1234567890-abc123.jpg",
  "confirmRequired": true,
  "confirmUrl": "/api/storage/buckets/avatars/objects/profile-photo-1234567890-abc123.jpg/confirm-upload",
  "expiresAt": "2025-09-05T01:00:00Z"
}
```

#### Authorizations

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### Path Parameters

[​](#parameter-bucket-name)

bucketName

string

required

Pattern: `^[a-zA-Z0-9_-]+$`

#### Body

application/json

[​](#body-filename)

filename

string

required

Original filename for generating unique key

Example:

`"profile-photo.jpg"`

[​](#body-content-type)

contentType

string

MIME type of the file

Example:

`"image/jpeg"`

[​](#body-size)

size

integer

File size in bytes

Example:

`102400`

#### Response

200

application/json

Upload strategy details

[​](#response-method)

method

enum<string>

required

Upload method - presigned for S3, direct for local storage

Available options:

`presigned`,

`direct`

Example:

`"presigned"`

[​](#response-upload-url)

uploadUrl

string

required

URL to upload the file to

Example:

`"https://s3-bucket.amazonaws.com/"`

[​](#response-key)

key

string

required

Generated unique key for the file

Example:

`"profile-photo-1234567890-abc123.jpg"`

[​](#response-confirm-required)

confirmRequired

boolean

required

Whether upload confirmation is required

Example:

`true`

[​](#response-fields)

fields

object

Form fields for presigned POST (S3 only)

Example:

```
{  
  "bucket": "my-s3-bucket",  
  "key": "app-key/avatars/profile.jpg",  
  "X-Amz-Algorithm": "AWS4-HMAC-SHA256"  
}
```

[​](#response-confirm-url)

confirmUrl

string

URL to confirm the upload (if confirmRequired is true)

Example:

`"/api/storage/buckets/avatars/objects/profile.jpg/confirm-upload"`

[​](#response-expires-at)

expiresAt

string<date-time>

Expiration time for presigned URL (S3 only)

Example:

`"2025-09-05T01:00:00Z"`

[Upload Object with Auto-Generated Key](/api-reference/client/upload-object-with-auto-generated-key)[Download Object](/api-reference/client/download-object)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)