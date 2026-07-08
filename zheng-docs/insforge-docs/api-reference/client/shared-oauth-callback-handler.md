Shared OAuth callback handler

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/shared/callback/{state}
```

Client

# Shared OAuth callback handler

Copy page

Handles OAuth callbacks from InsForge Cloud shared OAuth

Copy page

GET

/

api

/

auth

/

oauth

/

shared

/

callback

/

{state}

Try it

Shared OAuth callback handler

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/shared/callback/{state}
```

#### Path Parameters

[​](#parameter-state)

state

string

required

JWT state parameter

#### Query Parameters

[​](#parameter-success)

success

string

Success flag

[​](#parameter-error)

error

string

Error message

[​](#parameter-payload)

payload

string

Base64 encoded user payload

#### Response

302

Redirect to application with access token or error

[Exchange OAuth code for tokens (PKCE)](/api-reference/client/exchange-oauth-code-for-tokens-pkce)[Provider-specific OAuth callback (GET)](/api-reference/client/provider-specific-oauth-callback-get)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)