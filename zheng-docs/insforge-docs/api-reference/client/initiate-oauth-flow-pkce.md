Initiate OAuth flow (PKCE)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}
```

200

```
{
  "authUrl": "<string>"
}
```

Client

# Initiate OAuth flow (PKCE)

Copy page

Generate OAuth authorization URL for any supported provider using PKCE flow.

For mobile/desktop/server clients using PKCE:

1. Generate code\_verifier (random string, 43-128 chars)
2. Generate code\_challenge = Base64URL(SHA256(code\_verifier))
3. Call this endpoint with code\_challenge
4. After OAuth callback, use /api/auth/oauth/exchange with code\_verifier

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

Try it

Initiate OAuth flow (PKCE)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}
```

200

```
{
  "authUrl": "<string>"
}
```

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

#### Query Parameters

[​](#parameter-redirect-uri)

redirect\_uri

string<uri>

required

URL to redirect after authentication (receives insforge\_code parameter)

[​](#parameter-code-challenge)

code\_challenge

string

PKCE code challenge for mobile/desktop/server clients.
Generate using: Base64URL(SHA256(code\_verifier))
Required for secure token exchange in native apps or trusted server-side clients.

#### Response

200

application/json

OAuth authorization URL

[​](#response-auth-url)

authUrl

string<uri>

URL to redirect user for OAuth provider login

[Reset password with token](/api-reference/client/reset-password-with-token)[Exchange OAuth code for tokens (PKCE)](/api-reference/client/exchange-oauth-code-for-tokens-pkce)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)