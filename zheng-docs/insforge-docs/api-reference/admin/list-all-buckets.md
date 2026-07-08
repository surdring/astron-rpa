List All Buckets

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets \
  --header 'x-api-key: <api-key>'
```

200

```
{
  "buckets": [
    "avatars",
    "documents",
    "uploads",
    "public",
    "private"
  ]
}
```

Admin

# List All Buckets

Copy page

Copy page

GET

/

api

/

storage

/

buckets

Try it

List All Buckets

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/buckets \
  --header 'x-api-key: <api-key>'
```

200

```
{
  "buckets": [
    "avatars",
    "documents",
    "uploads",
    "public",
    "private"
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

200 - application/json

List of bucket names

[​](#response-buckets)

buckets

string[]

Example:

```
["avatars", "documents", "uploads"]
```

[Update Records](/api-reference/client/update-records)[Create New Bucket](/api-reference/admin/create-new-bucket)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)