Download Object

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

404

```
"<string>"
```

Client

# Download Object

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

/

{objectKey}

Try it

Download Object

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

404

```
"<string>"
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

\*/\*

File content

The response is of type `file`.

[Get Upload Strategy (Direct or Presigned URL)](/api-reference/client/get-upload-strategy-direct-or-presigned-url)[Upload Object](/api-reference/client/upload-object)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)