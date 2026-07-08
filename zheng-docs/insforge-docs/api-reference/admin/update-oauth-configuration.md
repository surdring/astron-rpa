Update OAuth configuration

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "clientId": "<string>",
  "clientSecret": "<string>",
  "redirectUri": "<string>",
  "scopes": [
    "<string>"
  ],
  "useSharedKey": true
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "clientId": "<string>",
  "redirectUri": "<string>",
  "scopes": [
    "<string>"
  ],
  "useSharedKey": true,
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

Admin

# Update OAuth configuration

Copy page

Update OAuth provider configuration (admin only)

Copy page

PUT

/

api

/

auth

/

oauth

/

{provider}

/

config

Try it

Update OAuth configuration

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "clientId": "<string>",
  "clientSecret": "<string>",
  "redirectUri": "<string>",
  "scopes": [
    "<string>"
  ],
  "useSharedKey": true
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "clientId": "<string>",
  "redirectUri": "<string>",
  "scopes": [
    "<string>"
  ],
  "useSharedKey": true,
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

[​](#parameter-provider)

provider

enum<string>

required

Available options:

`google`,

`github`,

`discord`,

`linkedin`,

`facebook`,

`instagram`,

`tiktok`,

`apple`,

`x`,

`spotify`,

`microsoft`

#### Body

application/json

[​](#body-client-id)

clientId

string

[​](#body-client-secret)

clientSecret

string

[​](#body-redirect-uri)

redirectUri

string

[​](#body-scopes)

scopes

string[]

[​](#body-use-shared-key)

useSharedKey

boolean

#### Response

200

application/json

Configuration updated

[​](#response-id)

id

string<uuid>

[​](#response-provider)

provider

enum<string>

Available options:

`google`,

`github`,

`discord`,

`linkedin`,

`facebook`,

`instagram`,

`tiktok`,

`apple`,

`x`,

`spotify`,

`microsoft`

[​](#response-client-id-one-of-0)

clientId

string | null

[​](#response-redirect-uri-one-of-0)

redirectUri

string | null

[​](#response-scopes-one-of-0)

scopes

string[] | null

[​](#response-use-shared-key)

useSharedKey

boolean

[​](#response-created-at)

createdAt

string<date-time>

[​](#response-updated-at)

updatedAt

string<date-time>

[Get OAuth configuration for specific provider](/api-reference/admin/get-oauth-configuration-for-specific-provider)[Delete OAuth configuration](/api-reference/admin/delete-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)