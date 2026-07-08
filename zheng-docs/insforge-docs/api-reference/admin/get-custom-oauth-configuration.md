Get custom OAuth configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>'
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
  "updatedAt": "2023-11-07T05:31:56Z",
  "clientSecret": "<string>"
}
```

Admin

# Get custom OAuth configuration

Copy page

Get a custom OAuth configuration including client secret (admin only)

Copy page

GET

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

Get custom OAuth configuration

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>'
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

[​](#parameter-key)

key

string

required

#### Response

200

application/json

Custom OAuth configuration

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

[​](#response-client-secret)

clientSecret

string

[Create custom OAuth configuration](/api-reference/admin/create-custom-oauth-configuration)[Update custom OAuth configuration](/api-reference/admin/update-custom-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)