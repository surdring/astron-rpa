Upload Object with Auto-Generated Key

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects \
  --header 'Content-Type: multipart/form-data' \
  --header 'x-api-key: <api-key>' \
  --form file='@example-file'
```

201

400

404

```
{
  "bucket": "avatars",
  "key": "image-1737546841234-a3f2b1.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/image-1737546841234-a3f2b1.jpg"
}
```

Client

# Upload Object with Auto-Generated Key

Copy page

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

Try it

Upload Object with Auto-Generated Key

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects \
  --header 'Content-Type: multipart/form-data' \
  --header 'x-api-key: <api-key>' \
  --form file='@example-file'
```

201

400

404

```
{
  "bucket": "avatars",
  "key": "image-1737546841234-a3f2b1.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/image-1737546841234-a3f2b1.jpg"
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

multipart/form-data

[​](#body-file)

file

file

required

File to upload

#### Response

201

application/json

Object uploaded successfully with auto-generated key

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

[List Objects in Bucket](/api-reference/admin/list-objects-in-bucket)[Get Upload Strategy (Direct or Presigned URL)](/api-reference/client/get-upload-strategy-direct-or-presigned-url)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)