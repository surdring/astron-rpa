获取实时配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "retentionDays": null
}
```

配置

# 获取实时配置

复制页面

获取实时消息保留配置


复制页面

GET

/

api

/

realtime

/

config

尝试

获取实时配置

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "retentionDays": null
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

实时配置


[​](#response-retention-days-one-of-0)

retentionDays

integer | null

必需

消息保留的天数。Null 表示消息无限期保留。


所需范围: `x >= 1`

Example:

`null`

[Get Realtime Permissions](/api-reference/permissions/get-realtime-permissions)[Update Realtime Config](/api-reference/configuration/update-realtime-config)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)