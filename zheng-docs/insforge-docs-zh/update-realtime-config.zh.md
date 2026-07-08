cURL

retainFor90Days

```
curl --request PATCH \
  --url https://api.example.com/api/realtime/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "retentionDays": 90
}
'
```

200

400

```
{
  "message": "Retention config updated successfully"
}
```

配置

# 更新实时配置

复制页面

更新实时消息保留配置


复制页面

PATCH

/

api

/

realtime

/

config

尝试

cURL

retainFor90Days

```
curl --request PATCH \
  --url https://api.example.com/api/realtime/config \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "retentionDays": 90
}
'
```

200

400

```
{
  "message": "Retention config updated successfully"
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

#### 请求体

application/json

[​](#body-retention-days-one-of-0)

retentionDays

integer | null

必需

消息保留的天数。Null 表示消息无限期保留。


所需范围: `x >= 1`

Example:

`90`

#### 响应

200

application/json

实时配置已更新


[​](#response-message)

message

string

必需

[Get Realtime Config](/api-reference/configuration/get-realtime-config)[Send raw HTML email](/api-reference/client/send-raw-html-email)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)