Create and Execute Database Migration

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/migrations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "version": "20260416170500",
  "name": "create_posts_table",
  "sql": "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
}
'
```

201

Example

```
{
  "version": "20260416170500",
  "name": "create_posts_table",
  "statements": [
    "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
  ],
  "createdAt": "2026-04-16T17:05:00.000Z",
  "message": "Migration executed successfully"
}
```

Admin

# Create and Execute Database Migration

Copy page

Copy page

POST

/

api

/

database

/

migrations

Try it

Create and Execute Database Migration

cURL

```
curl --request POST \
  --url https://api.example.com/api/database/migrations \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "version": "20260416170500",
  "name": "create_posts_table",
  "sql": "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
}
'
```

201

Example

```
{
  "version": "20260416170500",
  "name": "create_posts_table",
  "statements": [
    "CREATE TABLE posts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL);"
  ],
  "createdAt": "2026-04-16T17:05:00.000Z",
  "message": "Migration executed successfully"
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

#### Body

application/json

[​](#body-version)

version

string

required

Numeric migration version. Accepts Drizzle-style sequential prefixes (e.g. `0001`) or a `YYYYMMDDHHmmss` timestamp. Versions are compared numerically.

Maximum string length: `64`

Pattern: `^\d{1,64}$`

[​](#body-name)

name

string

required

Migration name

Minimum string length: `1`

[​](#body-sql)

sql

string

required

SQL text to parse and execute immediately

Minimum string length: `1`

#### Response

201

application/json

Migration executed and recorded successfully

[​](#response-version)

version

string

required

Pattern: `^\d{1,64}$`

[​](#response-name)

name

string

required

[​](#response-statements)

statements

string[]

required

[​](#response-created-at)

createdAt

string<date-time>

required

[​](#response-message)

message

string

required

[List Database Migrations](/api-reference/admin/list-database-migrations)[Get public authentication configuration](/api-reference/client/get-public-authentication-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)