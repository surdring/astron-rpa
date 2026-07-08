Custom OAuth callback (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}/callback
```

Client

# Custom OAuth callback (GET)

Copy page

OAuth callback endpoint for custom OAuth providers

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

callback

Try it

Custom OAuth callback (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}/callback
```

#### Path Parameters

[​](#parameter-key)

key

string

required

#### Query Parameters

[​](#parameter-code)

code

string

required

Authorization code from the custom OAuth provider

[​](#parameter-state)

state

string

required

Signed OAuth state payload

#### Response

302

Redirect to application after custom OAuth completion

[Initiate custom OAuth flow (PKCE)](/api-reference/client/initiate-custom-oauth-flow-pkce)[Get authentication configuration](/api-reference/admin/get-authentication-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)