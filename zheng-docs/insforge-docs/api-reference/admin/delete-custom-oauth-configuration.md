Delete custom OAuth configuration

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

Admin

# Delete custom OAuth configuration

Copy page

Delete a custom OAuth provider configuration (admin only)

Copy page

DELETE

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

Delete custom OAuth configuration

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/oauth/custom/{key}/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "success": true,
  "message": "<string>"
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

Configuration deleted

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[Update custom OAuth configuration](/api-reference/admin/update-custom-oauth-configuration)[Query Records](/api-reference/client/query-records)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)