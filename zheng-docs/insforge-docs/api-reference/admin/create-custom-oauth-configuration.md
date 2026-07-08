Create custom OAuth configuration

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/custom/configs \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "key": "<string>",
  "name": "<string>",
  "discoveryEndpoint": "<string>",
  "clientId": "<string>",
  "clientSecret": "<string>"
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "key": "<string>",
  "name": "<string>",
  "discoveryEndpoint": "<string>",
  "clientId": "<string>",
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

Admin

# Create custom OAuth configuration

Copy page

Create a new custom OAuth provider configuration (admin only)

Copy page

POST

/

api

/

auth

/

oauth

/

custom

/

configs

Try it

Create custom OAuth configuration

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/custom/configs \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "key": "<string>",
  "name": "<string>",
  "discoveryEndpoint": "<string>",
  "clientId": "<string>",
  "clientSecret": "<string>"
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "key": "<string>",
  "name": "<string>",
  "discoveryEndpoint": "<string>",
  "clientId": "<string>",
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

#### Body

application/json

[​](#body-key)

key

string

required

[​](#body-name)

name

string

required

[​](#body-discovery-endpoint)

discoveryEndpoint

string<uri>

required

[​](#body-client-id)

clientId

string

required

[​](#body-client-secret)

clientSecret

string

required

#### Response

200

application/json

Custom OAuth configuration created

[​](#response-id)

id

string<uuid>

[​](#response-key)

key

string

[​](#response-name)

name

string

[​](#response-discovery-endpoint)

discoveryEndpoint

string<uri>

[​](#response-client-id)

clientId

string

[​](#response-created-at)

createdAt

string<date-time>

[​](#response-updated-at)

updatedAt

string<date-time>

[List all custom OAuth configurations](/api-reference/admin/list-all-custom-oauth-configurations)[Get custom OAuth configuration](/api-reference/admin/get-custom-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)