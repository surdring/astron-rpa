List all OAuth configurations

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/configs \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "data": [
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
  ],
  "count": 123
}
```

Admin

# List all OAuth configurations

Copy page

Get all configured OAuth providers (admin only)

Copy page

GET

/

api

/

auth

/

oauth

/

configs

Try it

List all OAuth configurations

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/configs \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "data": [
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
  ],
  "count": 123
}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Response

200

application/json

List of OAuth configurations

[​](#response-data)

data

object[]

Show child attributes

[​](#response-count)

count

integer

[Get anon key (deprecated)](/api-reference/admin/get-anon-key-deprecated)[Create OAuth configuration](/api-reference/admin/create-oauth-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)