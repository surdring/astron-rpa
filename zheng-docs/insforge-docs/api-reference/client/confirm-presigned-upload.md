Confirm Presigned Upload

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey}/confirm-upload \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "size": 102400,
  "contentType": "image/jpeg",
  "etag": "9bb58f26192e4ba00f01e2e7b136bbd8"
}
'
```

201

404

409

```
{
  "bucket": "avatars",
  "key": "user123.jpg",
  "size": 102400,
  "uploadedAt": "2024-01-15T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/user123.jpg",
  "mimeType": "image/jpeg"
}
```

Client

# Confirm Presigned Upload

Copy page

Confirms that a file was successfully uploaded to S3 using presigned URL

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

objects

/

{objectKey}

/

confirm-upload

Try it

Confirm Presigned Upload

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey}/confirm-upload \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "size": 102400,
  "contentType": "image/jpeg",
  "etag": "9bb58f26192e4ba00f01e2e7b136bbd8"
}
'
```

201

404

409

```
{
  "bucket": "avatars",
  "key": "user123.jpg",
  "size": 102400,
  "uploadedAt": "2024-01-15T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/user123.jpg",
  "mimeType": "image/jpeg"
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

[​](#parameter-object-key)

objectKey

string

required

#### Body

application/json

[​](#body-size)

size

integer

required

File size in bytes

Example:

`102400`

[​](#body-content-type)

contentType

string

MIME type of the file

Example:

`"image/jpeg"`

[​](#body-etag)

etag

string

S3 ETag of the uploaded object (optional)

Example:

`"9bb58f26192e4ba00f01e2e7b136bbd8"`

#### Response

201

application/json

Upload confirmed successfully

[​](#response-bucket)

bucket

string

required

Name of the bucket containing the object

Example:

`"avatars"`

[​](#response-key)

key

string

required

Unique key identifying the object within the bucket

Example:

`"user123.jpg"`

[​](#response-size)

size

integer

required

Size of the file in bytes

Example:

`102400`

[​](#response-uploaded-at)

uploadedAt

string<date-time>

required

ISO timestamp when the file was uploaded

Example:

`"2024-01-15T10:30:00Z"`

[​](#response-url)

url

string

required

URL to download the file

Example:

`"/api/storage/buckets/avatars/objects/user123.jpg"`

[​](#response-mime-type)

mimeType

string

MIME type of the file

Example:

`"image/jpeg"`

[Delete Object](/api-reference/client/delete-object)[Get Download Strategy (Direct or Presigned URL)](/api-reference/client/get-download-strategy-direct-or-presigned-url)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)