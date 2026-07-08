Delete secret

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>'
```

200

403

404

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been deleted successfully"
}
```

Admin

# Delete secret

Copy page

Mark a secret as inactive (soft delete). Cannot delete reserved secrets.

Copy page

DELETE

/

api

/

secrets

/

{key}

Try it

Delete secret

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>'
```

200

403

404

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been deleted successfully"
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

Secret key identifier

Pattern: `^[A-Z0-9_]+$`

#### Response

200

application/json

Secret deleted successfully

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[Update secret](/api-reference/admin/update-secret)[Rotate anon key](/api-reference/admin/rotate-anon-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)