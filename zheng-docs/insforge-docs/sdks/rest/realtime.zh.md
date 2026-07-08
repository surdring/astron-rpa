## On this page

* [概述](#overview)
* [认证](#authentication)
* [Socket.IO 发布/订阅](#socket-io-pub%2Fsub)
  + [连接并订阅](#connect-and-subscribe)
  + [监听事件](#listen-for-events)
  + [发布](#publish)
  + [取消订阅](#unsubscribe)
  + [Socket 事件](#socket-events)
* [频道模式](#channel-patterns)
* [频道](#channels)
  + [列出频道](#list-channels)
  + [创建频道](#create-channel)
  + [获取频道](#get-channel)
  + [更新频道](#update-channel)
  + [删除频道](#delete-channel)
* [消息](#messages)
  + [列出消息](#list-messages)
  + [消息统计](#message-stats)
* [权限](#permissions)
* [配置](#configuration)
  + [获取 Realtime 配置](#get-realtime-config)
  + [更新 Realtime 配置](#update-realtime-config)
* [Webhooks](#webhooks)

REST API

# Realtime API 参考

Copy page

管理实时频道、查看消息历史和使用原始 Socket.IO 发布/订阅

Copy page

## [​](#overview) 概述

Realtime 有两个层面：

* **REST API** 用于频道管理、消息历史、投递统计、权限和保留设置。
* **Socket.IO** 用于实时订阅、发布、在线状态和已投递事件。

REST API 不流式传输消息。请使用 Socket.IO 连接或 [TypeScript SDK](/sdks/typescript/realtime) 获取实时事件。

## [​](#authentication) 认证

管理 REST 端点需要项目管理员令牌或 API 密钥。

```
Authorization: Bearer <project-admin-jwt-or-ik_api_key>
Content-Type: application/json
```

您也可以通过以下方式传递 API 密钥：

```
X-API-Key: <ik_api_key>
```

Socket.IO 连接通过 Socket.IO 的 `auth` 对象进行认证：

```
const socket = io('https://your-app.insforge.app', {
  auth: {
    token: '<user-jwt-or-anon-token>'
  }
});
```

服务端/管理员客户端可以传递 API 密钥：

```
const socket = io('https://your-app.insforge.app', {
  auth: {
    apiKey: '<ik_api_key>'
  }
});
```

## [​](#socket-io-pub/sub) Socket.IO 发布/订阅

当您不使用 InsForge SDK 时，安装 Socket.IO 客户端：

```
npm install socket.io-client
```

### [​](#connect-and-subscribe) 连接并订阅

```
import { io } from 'socket.io-client';

const socket = io('https://your-app.insforge.app', {
  auth: {
    token: '<user-jwt-or-anon-token>'
  }
});

socket.emit('realtime:subscribe', { channel: 'order:123' }, (response) => {
  if (response.ok) {
    console.log('已订阅:', response.channel);
    console.log('在线状态:', response.presence.members);
  } else {
    console.error(response.error.code, response.error.message);
  }
});
```

### [​](#listen-for-events) 监听事件

```
socket.on('status_changed', (message) => {
  console.log(message.status);
  console.log(message.meta.messageId);
  console.log(message.meta.senderType);
});

socket.on('presence:join', (message) => {
  console.log('已加入:', message.member);
});

socket.on('presence:leave', (message) => {
  console.log('已离开:', message.member);
});

socket.on('realtime:error', (error) => {
  console.error(error.channel, error.code, error.message);
});
```

### [​](#publish) 发布

```
socket.emit('realtime:publish', {
  channel: 'order:123',
  event: 'customer_viewed',
  payload: {
    viewedAt: new Date().toISOString()
  }
});
```

socket 必须先成功订阅频道，然后才能向该频道发布消息。

### [​](#unsubscribe) 取消订阅

```
socket.emit('realtime:unsubscribe', { channel: 'order:123' });
socket.disconnect();
```

### [​](#socket-events) Socket 事件

| 事件 | 方向 | 描述 |
| --- | --- | --- |
| `realtime:subscribe` | 客户端到服务器 | 订阅频道。确认返回成功/错误和在线状态快照。 |
| `realtime:unsubscribe` | 客户端到服务器 | 离开频道。 |
| `realtime:publish` | 客户端到服务器 | 将用户消息插入实时管道。 |
| 自定义事件名称 | 服务器到客户端 | 已投递的消息，在消息的 `eventName` 下发出。 |
| `presence:join` | 服务器到客户端 | 一个逻辑成员在频道中变为在线状态。 |
| `presence:leave` | 服务器到客户端 | 一个逻辑成员不再在频道中在线。 |
| `realtime:error` | 服务器到客户端 | 订阅或发布失败。 |

## [​](#channel-patterns) 频道模式

在客户端订阅之前创建频道定义。

| 模式 | 匹配 |
| --- | --- |
| `orders` | `orders` |
| `order:%` | `order:123`、`order:456` |
| `chat:%:messages` | `chat:room-1:messages` |

模式匹配使用 SQL `LIKE`，因此 `%` 是通配符。`_` 在频道模式中不被接受，因为它也是 SQL 通配符。

## [​](#channels) 频道

### [​](#list-channels) 列出频道

```
GET /api/realtime/channels
```

```
curl "https://your-app.insforge.app/api/realtime/channels" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>"
```

响应：

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "pattern": "order:%",
    "description": "订单更新",
    "webhookUrls": ["https://example.com/webhook"],
    "enabled": true,
    "createdAt": "2026-04-25T17:00:00.000Z",
    "updatedAt": "2026-04-25T17:00:00.000Z"
  }
]
```

### [​](#create-channel) 创建频道

```
POST /api/realtime/channels
```

请求体：

| 字段 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `pattern` | `string` | 是 | 频道模式。 |
| `description` | `string` | 否 | 人类可读的描述。 |
| `webhookUrls` | `string[]` | 否 | 每条已投递消息的 Webhook URL。 |
| `enabled` | `boolean` | 否 | 默认为 `true`。禁用的频道无法加入或投递消息。 |

```
curl -X POST "https://your-app.insforge.app/api/realtime/channels" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "pattern": "chat:%",
    "description": "聊天室",
    "webhookUrls": ["https://example.com/realtime-webhook"],
    "enabled": true
  }'
```

### [​](#get-channel) 获取频道

```
GET /api/realtime/channels/{id}
```

### [​](#update-channel) 更新频道

```
PUT /api/realtime/channels/{id}
```

```
curl -X PUT "https://your-app.insforge.app/api/realtime/channels/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "活跃订单更新",
    "enabled": true
  }'
```

### [​](#delete-channel) 删除频道

```
DELETE /api/realtime/channels/{id}
```

```
{
  "message": "频道已删除"
}
```

消息历史会被保留。已删除的频道会将现有消息的 `channelId` 值设置为 `null`。

## [​](#messages) 消息

### [​](#list-messages) 列出消息

```
GET /api/realtime/messages
```

查询参数：

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `channelId` | `uuid` | 按频道 ID 过滤。 |
| `eventName` | `string` | 按事件名称过滤。 |
| `limit` | `integer` | 1 到 1000。默认为 100。 |
| `offset` | `integer` | 默认为 0。 |

```
curl "https://your-app.insforge.app/api/realtime/messages?eventName=status_changed&limit=50" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>"
```

响应：

```
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "eventName": "status_changed",
    "channelId": "550e8400-e29b-41d4-a716-446655440000",
    "channelName": "order:123",
    "payload": {
      "id": "123",
      "status": "shipped"
    },
    "senderType": "system",
    "senderId": null,
    "wsAudienceCount": 5,
    "whAudienceCount": 1,
    "whDeliveredCount": 1,
    "createdAt": "2026-04-25T17:00:00.000Z"
  }
]
```

### [​](#message-stats) 消息统计

```
GET /api/realtime/messages/stats
```

查询参数：

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `channelId` | `uuid` | 按频道 ID 过滤统计。 |
| `since` | `date-time` | 仅包含此时间戳之后创建的消息。 |

```
{
  "totalMessages": 1250,
  "whDeliveryRate": 0.98,
  "topEvents": [
    {
      "eventName": "status_changed",
      "count": 450
    }
  ],
  "retentionDays": null
}
```

`retentionDays: null` 表示消息无限期保留。

## [​](#permissions) 权限

```
GET /api/realtime/permissions
```

返回用户定义的 RLS 策略：

* 对 `realtime.channels` 的订阅检查。
* 对 `realtime.messages` 的发布检查。

```
{
  "subscribe": {
    "policies": [
      {
        "policyName": "users_subscribe_own_orders",
        "tableName": "channels",
        "command": "SELECT",
        "roles": ["authenticated"],
        "using": "pattern = 'order:%'",
        "withCheck": null
      }
    ]
  },
  "publish": {
    "policies": []
  }
}
```

## [​](#configuration) 配置

### [​](#get-realtime-config) 获取 Realtime 配置

```
GET /api/realtime/config
```

```
{
  "retentionDays": null
}
```

### [​](#update-realtime-config) 更新 Realtime 配置

```
PATCH /api/realtime/config
```

```
curl -X PATCH "https://your-app.insforge.app/api/realtime/config" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "retentionDays": 90
  }'
```

使用 `null` 可无限期保留消息。正整数表示保留天数。

## [​](#webhooks) Webhooks

当频道具有 `webhookUrls` 时，通过该频道投递的每条消息都会发布到每个 URL。
请求体是原始消息负载。请求头标识投递信息：

| 请求头 | 值 |
| --- | --- |
| `X-InsForge-Event` | 事件名称 |
| `X-InsForge-Channel` | 解析后的频道名称 |
| `X-InsForge-Message-Id` | 消息 UUID |

投递尝试反映在消息历史中的 `whAudienceCount` 和 `whDeliveredCount` 中。

[AI REST 参考](/sdks/rest/ai)[InsForge 食谱](/examples/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)