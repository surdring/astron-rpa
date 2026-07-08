Update custom OAuth configuration

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
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

# Update custom OAuth configuration

Copy page

Update a custom OAuth provider configuration (admin only)

Copy page

PUT

/

api

/

auth

/

oauth

/

custom

/

{key}

/

config

Try it

Update custom OAuth configuration

cURL

```
curl --request PUT \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
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

#### Path Parameters

[​](#parameter-key)

key

string

required

#### Body

application/json

[​](#body-name)

name

string

[​](#body-discovery-endpoint)

discoveryEndpoint

string<uri>

[​](#body-client-id)

clientId

string

[​](#body-client-secret)

clientSecret

string

#### Response

200

application/json

Custom OAuth configuration updated

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

[Get custom OAuth configuration](/api-reference/admin/get-custom-oauth-configuration)[Delete custom OAuth configuration](/api-reference/admin/delete-custom-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)