Initiate custom OAuth flow (PKCE)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}
```

200

```
{
  "authUrl": "<string>"
}
```

Client

# Initiate custom OAuth flow (PKCE)

Copy page

Generate OAuth authorization URL for a configured custom OAuth provider using PKCE flow

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

Try it

Initiate custom OAuth flow (PKCE)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}
```

200

```
{
  "authUrl": "<string>"
}
```

#### Path Parameters

[​](#parameter-key)

key

string

required

#### Query Parameters

[​](#parameter-redirect-uri)

redirect\_uri

string<uri>

required

URL to redirect after authentication (receives insforge\_code parameter)

[​](#parameter-code-challenge)

code\_challenge

string

PKCE code challenge for mobile/desktop/server clients

#### Response

200

application/json

OAuth authorization URL

[​](#response-auth-url)

authUrl

string<uri>

[Provider-specific OAuth callback (POST)](/api-reference/client/provider-specific-oauth-callback-post)[Custom OAuth callback (GET)](/api-reference/client/custom-oauth-callback-get)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)