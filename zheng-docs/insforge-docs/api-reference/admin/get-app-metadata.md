Get app metadata

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "auth": {
    "oAuthProviders": [
      "google",
      "github"
    ],
    "requireEmailVerification": true,
    "disableSignup": false
  },
  "database": {
    "tables": [
      {
        "tableName": "users",
        "recordCount": 150
      },
      {
        "tableName": "posts",
        "recordCount": 1200
      }
    ],
    "totalSizeInGB": 0.3
  },
  "storage": {
    "buckets": [
      {
        "name": "avatars",
        "public": true,
        "objectCount": 42
      }
    ],
    "totalSizeInGB": 0.5
  },
  "functions": [
    {
      "slug": "hello-world",
      "name": "hello-world",
      "status": "active",
      "description": "Test function"
    }
  ],
  "version": "2.0.0"
}
```

Admin

# Get app metadata

Copy page

Returns aggregated application metadata (auth, database, storage, functions, realtime, deployments). Use the `format` query parameter to choose between JSON and Markdown output.

Copy page

GET

/

api

/

metadata

Try it

Get app metadata

cURL

```
curl --request GET \
  --url https://api.example.com/api/metadata \
  --header 'Authorization: Bearer <token>'
```

200

400

401

403

```
{
  "auth": {
    "oAuthProviders": [
      "google",
      "github"
    ],
    "requireEmailVerification": true,
    "disableSignup": false
  },
  "database": {
    "tables": [
      {
        "tableName": "users",
        "recordCount": 150
      },
      {
        "tableName": "posts",
        "recordCount": 1200
      }
    ],
    "totalSizeInGB": 0.3
  },
  "storage": {
    "buckets": [
      {
        "name": "avatars",
        "public": true,
        "objectCount": 42
      }
    ],
    "totalSizeInGB": 0.5
  },
  "functions": [
    {
      "slug": "hello-world",
      "name": "hello-world",
      "status": "active",
      "description": "Test function"
    }
  ],
  "version": "2.0.0"
}
```

#### Authorizations

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Query Parameters

[​](#parameter-format)

format

enum<string>

default:json

Response format. `json` returns structured JSON (default). `markdown` returns a human-readable Markdown document suitable for AI coding tools and developer onboarding.

Available options:

`json`,

`markdown`

#### Response

200

application/json

Application metadata

[​](#response-auth)

auth

object

Show child attributes

[​](#response-database)

database

object

Show child attributes

[​](#response-storage)

storage

object

Show child attributes

[​](#response-functions)

functions

object[]

Show child attributes

[​](#response-realtime)

realtime

object

Optional; present when realtime is configured

Show child attributes

[​](#response-deployments)

deployments

object

Optional; present on cloud-hosted projects only

Show child attributes

[​](#response-version)

version

string

[Get logs statistics](/api-reference/admin/get-logs-statistics)[Get database metadata](/api-reference/admin/get-database-metadata)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)