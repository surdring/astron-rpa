删除频道

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

频道

# 删除频道

复制页面

删除频道定义。现有消息历史将以 null 的 channelId 值保留。


复制页面

DELETE

/

api

/

realtime

/

channels

/

{id}

尝试

删除频道

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

#### 授权

bearerAuthapiKeybearerAuthapiKey

[​](#authorization-authorization)

授权

string

header

必需

Bearer 认证头部，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 路径参数

[​](#parameter-id)

id

string<uuid>

必需

#### 响应

200

application/json

频道删除成功


[​](#response-message)

message

string

[Update Channel](/api-reference/channels/update-channel)[List Messages](/api-reference/messages/list-messages)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)