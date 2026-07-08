Logout user

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/logout
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

Client

# Logout user

Copy page

Logout and clear refresh token cookie

Copy page

POST

/

api

/

auth

/

logout

Try it

Logout user

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/logout
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

#### Response

200 - application/json

Logged out successfully

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[Refresh access token](/api-reference/client/refresh-access-token)[Get current session](/api-reference/client/get-current-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)