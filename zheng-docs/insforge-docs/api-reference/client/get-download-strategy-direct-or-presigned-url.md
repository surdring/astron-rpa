Get Download Strategy (Direct or Presigned URL)

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/download-strategy/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

s3-public

```
{
  "method": "direct",
  "url": "https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/public-assets/logo.png"
}
```

Client

# Get Download Strategy (Direct or Presigned URL)

Copy page

Returns download strategy based on storage backend and bucket visibility.

* S3 with public bucket: Direct URLs (no presigning, better performance)
* S3 with private bucket: Presigned URLs with expiration
* Local storage: Always direct endpoints

Expiry (when presigned) is auto-calculated server-side from bucket
visibility; no request body is accepted.

Object keys may contain `/` (pseudo-folders); the path is matched
with a wildcard, so callers should NOT percent-encode `/` inside
`objectKey`.

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

download-strategy

/

objects

/

{objectKey}

Try it

Get Download Strategy (Direct or Presigned URL)

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets/{bucketName}/download-strategy/objects/{objectKey} \
  --header 'x-api-key: <api-key>'
```

200

s3-public

```
{
  "method": "direct",
  "url": "https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/public-assets/logo.png"
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

#### Response

200

application/json

Download strategy details

[​](#response-method)

method

enum<string>

required

Download method:

* `direct`: Direct URL access (S3 public buckets or local storage)
* `presigned`: Secure URL with signature and expiration (S3 private buckets)

Available options:

`presigned`,

`direct`

Example:

`"direct"`

[​](#response-url)

url

string

required

URL to download the file from

Example:

`"https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/public-assets/logo.png"`

[​](#response-expires-at)

expiresAt

string<date-time>

Expiration time for presigned URLs (only present when method is 'presigned')

Example:

`"2025-09-05T01:00:00Z"`

[​](#response-headers)

headers

object

Optional headers to include in the download request

[Confirm Presigned Upload](/api-reference/client/confirm-presigned-upload)[Get Download Strategy (Deprecated — use GET on the canonical path)](/api-reference/client/get-download-strategy-deprecated-—-use-get-on-the-canonical-path)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)