List Objects in Bucket

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects \
  --header 'x-api-key: <api-key>'
```

200

```
{
  "data": [
    {
      "bucket": "avatars",
      "key": "users/user123.jpg",
      "size": 102400,
      "mimeType": "image/jpeg",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "url": "/api/storage/buckets/avatars/objects/users/user123.jpg"
    },
    {
      "bucket": "avatars",
      "key": "users/user456.png",
      "size": 204800,
      "mimeType": "image/png",
      "uploadedAt": "2024-01-16T11:00:00Z",
      "url": "/api/storage/buckets/avatars/objects/users/user456.png"
    }
  ],
  "pagination": {
    "offset": 0,
    "limit": 100,
    "total": 2
  },
  "nextActions": "You can use PUT /api/storage/buckets/:bucketName/objects/:objectKey to upload with a specific key, or POST /api/storage/buckets/:bucketName/objects to upload with auto-generated key, and GET /api/storage/buckets/:bucketName/objects/:objectKey to download an object."
}
```

Admin

# List Objects in Bucket

Copy page

Copy page

GET

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

List Objects in Bucket

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects \
  --header 'x-api-key: <api-key>'
```

200

```
{
  "data": [
    {
      "bucket": "avatars",
      "key": "users/user123.jpg",
      "size": 102400,
      "mimeType": "image/jpeg",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "url": "/api/storage/buckets/avatars/objects/users/user123.jpg"
    },
    {
      "bucket": "avatars",
      "key": "users/user456.png",
      "size": 204800,
      "mimeType": "image/png",
      "uploadedAt": "2024-01-16T11:00:00Z",
      "url": "/api/storage/buckets/avatars/objects/users/user456.png"
    }
  ],
  "pagination": {
    "offset": 0,
    "limit": 100,
    "total": 2
  },
  "nextActions": "You can use PUT /api/storage/buckets/:bucketName/objects/:objectKey to upload with a specific key, or POST /api/storage/buckets/:bucketName/objects to upload with auto-generated key, and GET /api/storage/buckets/:bucketName/objects/:objectKey to download an object."
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

#### Query Parameters

[​](#parameter-prefix)

prefix

string

Filter objects by key prefix

[​](#parameter-limit)

limit

integer

default:100

Required range: `1 <= x <= 1000`

[​](#parameter-offset)

offset

integer

default:0

Required range: `x >= 0`

[​](#parameter-search)

search

string

Search objects by key (partial match)

#### Response

200 - application/json

List of objects in bucket

[​](#response-data)

data

object[]

Show child attributes

[​](#response-pagination)

pagination

object

Show child attributes

[​](#response-next-actions)

nextActions

string

Example:

`"You can use PUT /api/storage/buckets/:bucketName/objects/:objectKey to upload with a specific key, or POST /api/storage/buckets/:bucketName/objects to upload with auto-generated key, and GET /api/storage/buckets/:bucketName/objects/:objectKey to download an object."`

[Update Bucket](/api-reference/admin/update-bucket)[Upload Object with Auto-Generated Key](/api-reference/client/upload-object-with-auto-generated-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)