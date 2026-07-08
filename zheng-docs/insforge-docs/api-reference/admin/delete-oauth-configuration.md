Delete OAuth configuration

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
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

# Delete OAuth configuration

Copy page

Delete OAuth provider configuration (admin only)

Copy page

DELETE

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

Delete OAuth configuration

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
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

Configuration deleted

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[Update OAuth configuration](/api-reference/admin/update-oauth-configuration)[List all custom OAuth configurations](/api-reference/admin/list-all-custom-oauth-configurations)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)