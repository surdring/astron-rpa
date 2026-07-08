Create New Bucket

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "bucketName": "avatars",
  "isPublic": true
}
'
```

201

400

409

```
{
  "message": "Bucket created successfully",
  "bucket": "avatars"
}
```

Admin

# Create New Bucket

Copy page

Copy page

POST

/

api

/

storage

/

buckets

Try it

Create New Bucket

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/buckets \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "bucketName": "avatars",
  "isPublic": true
}
'
```

201

400

409

```
{
  "message": "Bucket created successfully",
  "bucket": "avatars"
}
```

#### Authorizations

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### Body

application/json

[​](#body-bucket-name)

bucketName

string

required

Bucket name (alphanumeric, underscore, and hyphen only)

Pattern: `^[a-zA-Z0-9_-]+$`

Example:

`"avatars"`

[​](#body-is-public)

isPublic

boolean

default:true

Whether the bucket is publicly accessible

Example:

`true`

#### Response

201

application/json

Bucket created successfully

[​](#response-message)

message

string

Example:

`"Bucket created successfully"`

[​](#response-bucket-name)

bucketName

string

Example:

`"avatars"`

[List All Buckets](/api-reference/admin/list-all-buckets)[Delete Bucket](/api-reference/admin/delete-bucket)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)