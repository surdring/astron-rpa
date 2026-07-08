Delete Channel

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/realtime/channels/{id} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "message": "Channel deleted"
}
```

Channels

# Delete Channel

Copy page

Delete a channel definition. Existing message history is preserved with null channelId values.

Copy page

DELETE

/

api

/

realtime

/

channels

/

{id}

Try it

Delete Channel

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/realtime/channels/{id} \
  --header 'Authorization: Bearer <token>'
```

200

404

```
{
  "message": "Channel deleted"
}
```

#### Authorizations

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Path Parameters

[​](#parameter-id)

id

string<uuid>

required

#### Response

200

application/json

Channel deleted successfully

[​](#response-message)

message

string

[Update Channel](/api-reference/channels/update-channel)[List Messages](/api-reference/messages/list-messages)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)