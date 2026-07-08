List S3 Access Keys

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/s3/access-keys \
  --header 'x-api-key: <api-key>'
```

200

401

429

```
{
  "data": [
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "accessKeyId": "INSFABC123DEF456GH78",
      "description": "backup-script",
      "createdAt": "2026-04-22T00:00:00Z",
      "lastUsedAt": null
    }
  ]
}
```

S3 Access Keys

# List S3 Access Keys

Copy page

Return every S3 access key configured for this project. Plaintext
secrets are **never** returned here — the secret is only shown once
in the response of `POST /api/storage/s3/access-keys`.

Copy page

GET

/

api

/

storage

/

s3

/

access-keys

Try it

List S3 Access Keys

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/s3/access-keys \
  --header 'x-api-key: <api-key>'
```

200

401

429

```
{
  "data": [
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "accessKeyId": "INSFABC123DEF456GH78",
      "description": "backup-script",
      "createdAt": "2026-04-22T00:00:00Z",
      "lastUsedAt": null
    }
  ]
}
```

#### Authorizations

[​](#authorization-x-api-key)

x-api-key

string

header

required

#### Response

200

application/json

List of access keys (without secrets)

[​](#response-data)

data

object[]

Show child attributes

[Get S3 Gateway Config](/api-reference/s3-access-keys/get-s3-gateway-config)[Create S3 Access Key](/api-reference/s3-access-keys/create-s3-access-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)