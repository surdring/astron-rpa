Upload Object

cURL

```
curl --request PUT \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
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
  "key": "user123.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/user123.jpg"
}
```

Client

# Upload Object

Copy page

Copy page

PUT

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

Try it

Upload Object

cURL

```
curl --request PUT \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
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
  "key": "user123.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/user123.jpg"
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

Object key (can include forward slashes for pseudo-folders)

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

Object uploaded successfully

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

[Download Object](/api-reference/client/download-object)[Delete Object](/api-reference/client/delete-object)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)