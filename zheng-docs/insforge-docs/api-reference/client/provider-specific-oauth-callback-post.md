Provider-specific OAuth callback (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/{provider}/callback \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'state=<string>' \
  --data 'code=<string>' \
  --data 'id_token=<string>'
```

Client

# Provider-specific OAuth callback (POST)

Copy page

OAuth callback endpoint for providers that use POST (e.g., Apple with form\_post response mode).

Response varies based on the original OAuth initiation:

* With code\_challenge (PKCE): Redirects with `insforge_code` for exchange endpoint
* Without code\_challenge (web): Redirects with `access_token` and sets httpOnly cookie

Copy page

POST

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

Provider-specific OAuth callback (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/{provider}/callback \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'state=<string>' \
  --data 'code=<string>' \
  --data 'id_token=<string>'
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

#### Body

application/x-www-form-urlencoded

[​](#body-state)

state

string

required

JWT state with redirect URI and optional code\_challenge

[​](#body-code)

code

string

Authorization code from OAuth provider

[​](#body-id-token)

id\_token

string

ID token (for Apple Sign In)

#### Response

302

Redirect to application.

* PKCE flow: redirect\_uri?insforge\_code={code}&user\_id={id}&email={email}&name={name}
* Web flow: redirect\_uri?access\_token={token}&user\_id={id}&email={email}&name={name}&csrf\_token={csrf}

[Provider-specific OAuth callback (GET)](/api-reference/client/provider-specific-oauth-callback-get)[Initiate custom OAuth flow (PKCE)](/api-reference/client/initiate-custom-oauth-flow-pkce)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)