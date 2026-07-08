清除消息

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/realtime/messages \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "deleted": 42
}
```

消息

# 清除消息

复制页面

永久删除所有存储的实时消息


复制页面

DELETE

/

api

/

realtime

/

messages

尝试

清除消息

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/realtime/messages \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "deleted": 42
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

#### 响应

200 - application/json

消息已清除


[​](#response-deleted)

deleted

integer

必需

已删除的实时消息数量


所需范围: `x >= 0`

Example:

`42`

[List Messages](/api-reference/messages/list-messages)[Get Message Statistics](/api-reference/messages/get-message-statistics)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)