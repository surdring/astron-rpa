Update secret

cURL

```
curl --request PUT \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "value": "<string>",
  "isActive": true,
  "isReserved": true,
  "expiresAt": "2023-11-07T05:31:56Z"
}
'
```

200

404

500

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been updated successfully"
}
```

Admin

# Update secret

Copy page

Update an existing secret’s value or metadata

Copy page

PUT

/

api

/

secrets

/

{key}

Try it

Update secret

cURL

```
curl --request PUT \
  --url https://api.example.com/api/secrets/{key} \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "value": "<string>",
  "isActive": true,
  "isReserved": true,
  "expiresAt": "2023-11-07T05:31:56Z"
}
'
```

200

404

500

```
{
  "success": true,
  "message": "Secret STRIPE_API_KEY has been updated successfully"
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

#### Body

application/json

[​](#body-value)

value

string

New secret value (will be encrypted)

[​](#body-is-active)

isActive

boolean

Whether the secret is active

[​](#body-is-reserved)

isReserved

boolean

Whether the secret is protected from deletion

[​](#body-expires-at-one-of-0)

expiresAt

string<date-time> | null

Expiration date (null to remove expiration)

#### Response

200

application/json

Secret updated successfully

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[Get secret value](/api-reference/admin/get-secret-value)[Delete secret](/api-reference/admin/delete-secret)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)