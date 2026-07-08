Delete Bucket

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/buckets/{bucketName} \
  --header 'x-api-key: <api-key>'
```

200

404

```
{
  "message": "Bucket deleted successfully",
  "nextActions": "You can use POST /api/storage/buckets to create a new bucket, and GET /api/storage/buckets/:bucketName/objects to list the objects in the bucket."
}
```

Admin

# Delete Bucket

Copy page

Delete an entire bucket and all its objects

Copy page

DELETE

/

api

/

storage

/

buckets

/

{bucketName}

Try it

Delete Bucket

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/buckets/{bucketName} \
  --header 'x-api-key: <api-key>'
```

200

404

```
{
  "message": "Bucket deleted successfully",
  "nextActions": "You can use POST /api/storage/buckets to create a new bucket, and GET /api/storage/buckets/:bucketName/objects to list the objects in the bucket."
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

#### Response

200

application/json

Bucket deleted successfully

[​](#response-message)

message

string

[​](#response-next-actions)

nextActions

string

[Create New Bucket](/api-reference/admin/create-new-bucket)[Update Bucket](/api-reference/admin/update-bucket)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)