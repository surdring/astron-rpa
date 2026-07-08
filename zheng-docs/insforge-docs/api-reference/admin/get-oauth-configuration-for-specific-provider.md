Get OAuth configuration for specific provider

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
  --header 'Authorization: Bearer <token>'
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
  "updatedAt": "2023-11-07T05:31:56Z",
  "clientSecret": "<string>"
}
```

Admin

# Get OAuth configuration for specific provider

Copy page

Get OAuth configuration including client secret (admin only)

Copy page

GET

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

Get OAuth configuration for specific provider

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
  --header 'Authorization: Bearer <token>'
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
  "updatedAt": "2023-11-07T05:31:56Z",
  "clientSecret": "<string>"
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

#### Response

200

application/json

OAuth configuration

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

[​](#response-client-secret)

clientSecret

string

[Create OAuth configuration](/api-reference/admin/create-oauth-configuration)[Update OAuth configuration](/api-reference/admin/update-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)