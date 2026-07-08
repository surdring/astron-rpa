Create S3 Access Key

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/s3/access-keys \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "description": "backup-script"
}
'
```

201

400

401

429

```
{
  "data": {
    "id": "11111111-1111-1111-1111-111111111111",
    "accessKeyId": "INSFABC123DEF456GH78",
    "secretAccessKey": "x7K2-a_pL9qRs4N8vYzWcE1fH5gJ3mUtBoD6ViXk",
    "description": "backup-script",
    "createdAt": "2026-04-22T00:00:00Z",
    "lastUsedAt": null
  }
}
```

S3 Access Keys

# Create S3 Access Key

Copy page

Mint a new S3 credential pair usable against the `/storage/v1/s3`
protocol gateway. The plaintext `secretAccessKey` in the response
is returned **exactly once** — it is encrypted at rest and can
never be retrieved again. If you lose it, revoke and re-create.

Limits:

* 50 keys per project (hard cap, enforced transactionally).
* Rate-limited to 20 management requests per 15 min per IP.

Copy page

POST

/

api

/

storage

/

s3

/

access-keys

Try it

Create S3 Access Key

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/s3/access-keys \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "description": "backup-script"
}
'
```

201

400

401

429

```
{
  "data": {
    "id": "11111111-1111-1111-1111-111111111111",
    "accessKeyId": "INSFABC123DEF456GH78",
    "secretAccessKey": "x7K2-a_pL9qRs4N8vYzWcE1fH5gJ3mUtBoD6ViXk",
    "description": "backup-script",
    "createdAt": "2026-04-22T00:00:00Z",
    "lastUsedAt": null
  }
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

[​](#body-description)

description

string

Optional label to help you identify the key later

Maximum string length: `200`

Example:

`"backup-script"`

#### Response

201

application/json

Access key created

[​](#response-data)

data

object

An S3 access key record (without the plaintext secret).

Show child attributes

[List S3 Access Keys](/api-reference/s3-access-keys/list-s3-access-keys)[Revoke S3 Access Key](/api-reference/s3-access-keys/revoke-s3-access-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)