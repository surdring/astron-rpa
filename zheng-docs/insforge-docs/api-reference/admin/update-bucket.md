Update Bucket

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/storage/buckets/{bucketName} \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "isPublic": true
}
'
```

200

404

```
{
  "message": "Bucket visibility updated",
  "bucket": "avatars",
  "isPublic": true
}
```

Admin

# Update Bucket

Copy page

Copy page

PATCH

/

api

/

storage

/

buckets

/

{bucketName}

Try it

Update Bucket

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/storage/buckets/{bucketName} \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "isPublic": true
}
'
```

200

404

```
{
  "message": "Bucket visibility updated",
  "bucket": "avatars",
  "isPublic": true
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

[​](#body-is-public)

isPublic

boolean

Whether the bucket should be publicly accessible

Example:

`true`

#### Response

200

application/json

Bucket visibility updated successfully

[​](#response-message)

message

string

Example:

`"Bucket visibility updated"`

[​](#response-bucket)

bucket

string

Example:

`"avatars"`

[​](#response-is-public)

isPublic

boolean

Example:

`true`

[Delete Bucket](/api-reference/admin/delete-bucket)[List Objects in Bucket](/api-reference/admin/list-objects-in-bucket)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)