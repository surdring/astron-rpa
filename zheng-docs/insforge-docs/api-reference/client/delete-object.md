Delete Object

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

404

```
{
  "message": "Object deleted successfully"
}
```

Client

# Delete Object

Copy page

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

/

objects

/

{objectKey}

Try it

Delete Object

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

404

```
{
  "message": "Object deleted successfully"
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

[​](#parameter-key)

key

string

required

#### Response

200

application/json

Object deleted successfully

[​](#response-message)

message

string

[Upload Object](/api-reference/client/upload-object)[Confirm Presigned Upload](/api-reference/client/confirm-presigned-upload)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)