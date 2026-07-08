Get S3 Gateway Config

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/s3/config \
  --header 'x-api-key: <api-key>'
```

200

401

```
{
  "data": {
    "endpoint": "https://proj.insforge.app/storage/v1/s3",
    "region": "us-east-2"
  }
}
```

S3 Access Keys

# Get S3 Gateway Config

Copy page

Return the externally-reachable endpoint URL and the SigV4 signing
region for the S3 protocol gateway. The endpoint is assembled from
the server’s `VITE_API_BASE_URL` env var plus `/storage/v1/s3`, and
the region is `AWS_REGION` (default `us-east-2`).

Intended for Dashboard display so the UI doesn’t make any
backend-topology assumptions client-side.

Copy page

GET

/

api

/

storage

/

s3

/

config

Try it

Get S3 Gateway Config

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/s3/config \
  --header 'x-api-key: <api-key>'
```

200

401

```
{
  "data": {
    "endpoint": "https://proj.insforge.app/storage/v1/s3",
    "region": "us-east-2"
  }
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

Gateway config

[​](#response-data)

data

object

Read-only config of the S3 protocol gateway.

Show child attributes

[Get Download Strategy (Deprecated — use GET on the canonical path)](/api-reference/client/get-download-strategy-deprecated-—-use-get-on-the-canonical-path)[List S3 Access Keys](/api-reference/s3-access-keys/list-s3-access-keys)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)