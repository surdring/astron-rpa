Provider-specific OAuth callback (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}/callback
```

Client

# Provider-specific OAuth callback (GET)

Copy page

OAuth callback endpoint for provider-specific flows (most providers use GET).

Response varies based on the original OAuth initiation:

* With code\_challenge (PKCE): Redirects with `insforge_code` for exchange endpoint
* Without code\_challenge (web): Redirects with `access_token` and sets httpOnly cookie

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

/

callback

Try it

Provider-specific OAuth callback (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}/callback
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

[​](#parameter-code)

code

string

Authorization code from OAuth provider

[​](#parameter-state)

state

string

required

JWT state with redirect URI and optional code\_challenge

[​](#parameter-token)

token

string

Direct ID token (for some providers)

#### Response

302

Redirect to application.

* PKCE flow: redirect\_uri?insforge\_code={code}&user\_id={id}&email={email}&name={name}
* Web flow: redirect\_uri?access\_token={token}&user\_id={id}&email={email}&name={name}&csrf\_token={csrf}

[Shared OAuth callback handler](/api-reference/client/shared-oauth-callback-handler)[Provider-specific OAuth callback (POST)](/api-reference/client/provider-specific-oauth-callback-post)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)