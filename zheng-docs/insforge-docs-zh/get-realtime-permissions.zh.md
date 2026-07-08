获取实时权限

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/permissions \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "subscribe": {
    "policies": [
      {
        "policyName": "allow_authenticated_subscribe",
        "tableName": "channels",
        "command": "SELECT",
        "roles": [
          "authenticated"
        ],
        "using": "enabled = true",
        "withCheck": null
      }
    ]
  },
  "publish": {
    "policies": [
      {
        "policyName": "allow_authenticated_publish",
        "tableName": "messages",
        "command": "INSERT",
        "roles": [
          "authenticated"
        ],
        "using": null,
        "withCheck": "true"
      }
    ]
  }
}
```

权限

# 获取实时权限

复制页面

获取订阅（频道）和发布（消息）操作的 RLS 策略


复制页面

GET

/

api

/

realtime

/

permissions

尝试

获取实时权限

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/permissions \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "subscribe": {
    "policies": [
      {
        "policyName": "allow_authenticated_subscribe",
        "tableName": "channels",
        "command": "SELECT",
        "roles": [
          "authenticated"
        ],
        "using": "enabled = true",
        "withCheck": null
      }
    ]
  },
  "publish": {
    "policies": [
      {
        "policyName": "allow_authenticated_publish",
        "tableName": "messages",
        "command": "INSERT",
        "roles": [
          "authenticated"
        ],
        "using": null,
        "withCheck": "true"
      }
    ]
  }
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

实时 RLS 权限


[​](#response-subscribe)

subscribe

object

必需

显示子属性

[​](#response-publish)

publish

object

必需

显示子属性

[Get Message Statistics](/api-reference/messages/get-message-statistics)[Get Realtime Config](/api-reference/configuration/get-realtime-config)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)