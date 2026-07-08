获取消息统计

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/messages/stats \
  --header 'Authorization: Bearer <token>'
```

200

400

```
{
  "totalMessages": 1250,
  "whDeliveryRate": 0.98,
  "topEvents": [
    {
      "eventName": "order.created",
      "count": 450
    },
    {
      "eventName": "order.updated",
      "count": 380
    },
    {
      "eventName": "order.completed",
      "count": 220
    }
  ],
  "retentionDays": null
}
```

消息

# 获取消息统计

复制页面

获取消息的聚合统计信息


复制页面

GET

/

api

/

realtime

/

messages

/

stats

尝试

获取消息统计

cURL

```
curl --request GET \
  --url https://api.example.com/api/realtime/messages/stats \
  --header 'Authorization: Bearer <token>'
```

200

400

```
{
  "totalMessages": 1250,
  "whDeliveryRate": 0.98,
  "topEvents": [
    {
      "eventName": "order.created",
      "count": 450
    },
    {
      "eventName": "order.updated",
      "count": 380
    },
    {
      "eventName": "order.completed",
      "count": 220
    }
  ],
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

#### 查询参数

[​](#parameter-channel-id)

channelId

string<uuid>

按频道 ID 筛选统计


[​](#parameter-since)

since

string<date-time>

筛选自此时间戳以来的统计


#### 响应

200

application/json

消息统计


[​](#response-total-messages)

totalMessages

integer

必需

消息总数


所需范围: `x >= 0`

Example:

`1250`

[​](#response-wh-delivery-rate)

whDeliveryRate

number

必需

Webhook 投递成功率 (0-1)


所需范围: `0 <= x <= 1`

Example:

`0.98`

[​](#response-top-events)

topEvents

object[]

必需

最频繁的事件类型


显示子属性

[​](#response-retention-days-one-of-0)

retentionDays

integer | null

必需

消息保留的天数。Null 表示消息无限期保留。


所需范围: `x >= 1`

Example:

`null`

[Clear Messages](/api-reference/messages/clear-messages)[Get Realtime Permissions](/api-reference/permissions/get-realtime-permissions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)