## On this page

* [Overview](#overview)
* [Authentication](#authentication)
* [Socket.IO Pub/Sub](#socket-io-pub%2Fsub)
  + [Connect And Subscribe](#connect-and-subscribe)
  + [Listen For Events](#listen-for-events)
  + [Publish](#publish)
  + [Unsubscribe](#unsubscribe)
  + [Socket Events](#socket-events)
* [Channel Patterns](#channel-patterns)
* [Channels](#channels)
  + [List Channels](#list-channels)
  + [Create Channel](#create-channel)
  + [Get Channel](#get-channel)
  + [Update Channel](#update-channel)
  + [Delete Channel](#delete-channel)
* [Messages](#messages)
  + [List Messages](#list-messages)
  + [Message Stats](#message-stats)
* [Permissions](#permissions)
* [Configuration](#configuration)
  + [Get Realtime Config](#get-realtime-config)
  + [Update Realtime Config](#update-realtime-config)
* [Webhooks](#webhooks)

REST API

# Realtime API Reference

Copy page

Manage realtime channels, inspect message history, and use raw Socket.IO pub/sub.

Copy page

## [​](#overview) Overview

Realtime has two surfaces:

* **REST API** for channel management, message history, delivery stats, permissions, and retention settings.
* **Socket.IO** for live subscribe, publish, presence, and delivered events.

The REST API does not stream messages. Use the Socket.IO connection, or the [TypeScript SDK](/sdks/typescript/realtime), for live events.

## [​](#authentication) Authentication

Admin REST endpoints require a project-admin token or API key.

```
Authorization: Bearer <project-admin-jwt-or-ik_api_key>
Content-Type: application/json
```

You can also pass API keys with:

```
X-API-Key: <ik_api_key>
```

Socket.IO connections authenticate through the Socket.IO `auth` object:

```
const socket = io('https://your-app.insforge.app', {
  auth: {
    token: '<user-jwt-or-anon-token>'
  }
});
```

Server/admin clients may pass an API key:

```
const socket = io('https://your-app.insforge.app', {
  auth: {
    apiKey: '<ik_api_key>'
  }
});
```

## [​](#socket-io-pub/sub) Socket.IO Pub/Sub

Install the Socket.IO client when you are not using the InsForge SDK:

```
npm install socket.io-client
```

### [​](#connect-and-subscribe) Connect And Subscribe

```
import { io } from 'socket.io-client';

const socket = io('https://your-app.insforge.app', {
  auth: {
    token: '<user-jwt-or-anon-token>'
  }
});

socket.emit('realtime:subscribe', { channel: 'order:123' }, (response) => {
  if (response.ok) {
    console.log('Subscribed:', response.channel);
    console.log('Presence:', response.presence.members);
  } else {
    console.error(response.error.code, response.error.message);
  }
});
```

### [​](#listen-for-events) Listen For Events

```
socket.on('status_changed', (message) => {
  console.log(message.status);
  console.log(message.meta.messageId);
  console.log(message.meta.senderType);
});

socket.on('presence:join', (message) => {
  console.log('Joined:', message.member);
});

socket.on('presence:leave', (message) => {
  console.log('Left:', message.member);
});

socket.on('realtime:error', (error) => {
  console.error(error.channel, error.code, error.message);
});
```

### [​](#publish) Publish

```
socket.emit('realtime:publish', {
  channel: 'order:123',
  event: 'customer_viewed',
  payload: {
    viewedAt: new Date().toISOString()
  }
});
```

The socket must successfully subscribe to a channel before it can publish to that channel.

### [​](#unsubscribe) Unsubscribe

```
socket.emit('realtime:unsubscribe', { channel: 'order:123' });
socket.disconnect();
```

### [​](#socket-events) Socket Events

| Event | Direction | Description |
| --- | --- | --- |
| `realtime:subscribe` | Client to server | Subscribe to a channel. The acknowledgement returns success/error and a presence snapshot. |
| `realtime:unsubscribe` | Client to server | Leave a channel. |
| `realtime:publish` | Client to server | Insert a user message into the realtime pipeline. |
| Custom event name | Server to client | Delivered message, emitted under the message `eventName`. |
| `presence:join` | Server to client | A logical member became present in the channel. |
| `presence:leave` | Server to client | A logical member is no longer present in the channel. |
| `realtime:error` | Server to client | Subscribe or publish failed. |

## [​](#channel-patterns) Channel Patterns

Create channel definitions before clients subscribe.

| Pattern | Matches |
| --- | --- |
| `orders` | `orders` |
| `order:%` | `order:123`, `order:456` |
| `chat:%:messages` | `chat:room-1:messages` |

Pattern matching uses SQL `LIKE`, so `%` is the wildcard. `_` is not accepted in channel patterns because it is also a SQL wildcard.

## [​](#channels) Channels

### [​](#list-channels) List Channels

```
GET /api/realtime/channels
```

```
curl "https://your-app.insforge.app/api/realtime/channels" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>"
```

Response:

```
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "pattern": "order:%",
    "description": "Order updates",
    "webhookUrls": ["https://example.com/webhook"],
    "enabled": true,
    "createdAt": "2026-04-25T17:00:00.000Z",
    "updatedAt": "2026-04-25T17:00:00.000Z"
  }
]
```

### [​](#create-channel) Create Channel

```
POST /api/realtime/channels
```

Request body:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pattern` | `string` | Yes | Channel pattern. |
| `description` | `string` | No | Human-readable description. |
| `webhookUrls` | `string[]` | No | Webhook URLs for every delivered message. |
| `enabled` | `boolean` | No | Defaults to `true`. Disabled channels cannot be joined or delivered to. |

```
curl -X POST "https://your-app.insforge.app/api/realtime/channels" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "pattern": "chat:%",
    "description": "Chat rooms",
    "webhookUrls": ["https://example.com/realtime-webhook"],
    "enabled": true
  }'
```

### [​](#get-channel) Get Channel

```
GET /api/realtime/channels/{id}
```

### [​](#update-channel) Update Channel

```
PUT /api/realtime/channels/{id}
```

```
curl -X PUT "https://your-app.insforge.app/api/realtime/channels/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Active order updates",
    "enabled": true
  }'
```

### [​](#delete-channel) Delete Channel

```
DELETE /api/realtime/channels/{id}
```

```
{
  "message": "Channel deleted"
}
```

Message history is preserved. Deleted channels set existing message `channelId` values to `null`.

## [​](#messages) Messages

### [​](#list-messages) List Messages

```
GET /api/realtime/messages
```

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `channelId` | `uuid` | Filter by channel ID. |
| `eventName` | `string` | Filter by event name. |
| `limit` | `integer` | 1 to 1000. Defaults to 100. |
| `offset` | `integer` | Defaults to 0. |

```
curl "https://your-app.insforge.app/api/realtime/messages?eventName=status_changed&limit=50" \
  -H "Authorization: Bearer <project-admin-jwt-or-ik_api_key>"
```

Response:

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

### [​](#message-stats) Message Stats

```
GET /api/realtime/messages/stats
```

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `channelId` | `uuid` | Filter stats by channel ID. |
| `since` | `date-time` | Include only messages created after this timestamp. |

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

`retentionDays: null` means messages are retained indefinitely.

## [​](#permissions) Permissions

```
GET /api/realtime/permissions
```

Returns user-defined RLS policies for:

* Subscribe checks on `realtime.channels`.
* Publish checks on `realtime.messages`.

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

## [​](#configuration) Configuration

### [​](#get-realtime-config) Get Realtime Config

```
GET /api/realtime/config
```

```
{
  "retentionDays": null
}
```

### [​](#update-realtime-config) Update Realtime Config

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

Use `null` to keep messages indefinitely. Positive integers retain messages for that many days.

## [​](#webhooks) Webhooks

When a channel has `webhookUrls`, each message delivered through that channel is posted to each URL.
The request body is the original message payload. Headers identify the delivery:

| Header | Value |
| --- | --- |
| `X-InsForge-Event` | Event name |
| `X-InsForge-Channel` | Resolved channel name |
| `X-InsForge-Message-Id` | Message UUID |

Delivery attempts are reflected in `whAudienceCount` and `whDeliveredCount` on message history.

[AI REST Reference](/sdks/rest/ai)[InsForge Cookbook](/examples/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)