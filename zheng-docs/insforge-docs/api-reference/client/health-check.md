Health check

cURL

```
curl --request GET \
  --url https://api.example.com/api/health
```

200

```
{
  "status": "ok",
  "service": "Insforge Backend",
  "timestamp": "2025-01-21T03:45:22.194Z"
}
```

Client

# Health check

Copy page

Check if the API is running and healthy

Copy page

GET

/

api

/

health

Try it

Health check

cURL

```
curl --request GET \
  --url https://api.example.com/api/health
```

200

```
{
  "status": "ok",
  "service": "Insforge Backend",
  "timestamp": "2025-01-21T03:45:22.194Z"
}
```

#### Response

200 - application/json

API is healthy

[​](#response-status)

status

string

Example:

`"ok"`

[​](#response-service)

service

string

Example:

`"Insforge Backend"`

[​](#response-timestamp)

timestamp

string<date-time>

Example:

`"2025-01-21T03:45:22.194Z"`

[Get anon key](/api-reference/admin/get-anon-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)