## On this page

* [安装](#installation)
* [心智模型](#mental-model)
* [快速开始](#quick-start)
* [connect()](#connect)
* [subscribe()](#subscribe)
* [publish()](#publish)
* [on()](#on)
* [once()](#once)
* [off()](#off)
* [unsubscribe()](#unsubscribe)
* [disconnect()](#disconnect)
* [消息结构](#message-shape)
* [在线状态](#presence)
* [属性](#properties)
* [错误处理](#error-handling)
* [完整示例](#complete-example)

TypeScript

# Realtime SDK 参考

Copy page

使用 InsForge TypeScript SDK 订阅频道、发布事件和跟踪在线状态

Copy page

## [​](#installation) 安装

npm

yarn

pnpm

```
npm install @insforge/sdk@latest
```

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'  // 可选：用于公共/未认证请求
});
```

## [​](#mental-model) 心智模型

TypeScript SDK 会打开一个 Socket.IO 连接到您的 InsForge 后端。您可以订阅命名的频道，监听事件名称，并可选地向已加入的频道发布事件。
事件可以来自两个地方：

* 调用 `realtime.publish(channel, event, payload)` 的数据库触发器。
* 调用 `insforge.realtime.publish(channel, event, payload)` 的客户端。

关于后端频道和 RLS 模型，请参阅 [Realtime 概述](/core-concepts/realtime/overview)。

## [​](#quick-start) 快速开始

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'
});

insforge.realtime.on('connect', () => {
  console.log('已连接:', insforge.realtime.socketId);
});

insforge.realtime.on('error', (error) => {
  console.error(error.code, error.message);
});

await insforge.realtime.connect();

const subscription = await insforge.realtime.subscribe('order:123');

if (!subscription.ok) {
  throw new Error(subscription.error.message);
}

insforge.realtime.on('status_changed', (message) => {
  console.log(message.status);
  console.log(message.meta.messageId);
});
```

在调用 `connect()` 之前注册 `connect`、`disconnect`、`connect_error` 和 `error` 处理器，以便早期连接失败可见。

## [​](#connect) connect()

建立 WebSocket 连接。

```
await insforge.realtime.connect();
```

返回：

```
Promise<void>
```

注意：

* SDK 会在存在时包含当前认证令牌。如果没有已登录用户，则可以使用配置的 anon key。
* 当连接已在进行中时，多次调用 `connect()` 会复用同一个连接 Promise。
* 连接尝试会在 10 秒后超时。

## [​](#subscribe) subscribe()

订阅一个频道并接收当前在线状态快照。

```
const response = await insforge.realtime.subscribe('chat:room-1');

if (response.ok) {
  console.log(response.channel);
  console.log(response.presence.members);
} else {
  console.error(response.error.code, response.error.message);
}
```

参数：

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `channel` | `string` | 解析后的频道名称，例如 `orders`、`order:123` 或 `chat:room-1`。 |

返回：

```
type SubscribeResponse =
  | {
      ok: true;
      channel: string;
      presence: {
        members: PresenceMember[];
      };
    }
  | {
      ok: false;
      channel: string;
      error: {
        code: string;
        message: string;
      };
    };
```

`subscribe()` 会在需要时自动连接。仍然建议显式调用 `connect()`，以便连接事件处理器已经附加。

## [​](#publish) publish()

向频道发布事件。

```
await insforge.realtime.publish('chat:room-1', 'new_message', {
  text: 'Hello',
  sentAt: new Date().toISOString()
});
```

参数：

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `channel` | `string` | 要发布到的频道。客户端必须已经订阅。 |
| `event` | `string` | 订阅者监听的事件名称。 |
| `payload` | `Record<string, unknown>` | JSON 可序列化的消息负载。 |

发布需要事先成功订阅同一频道。如果在 `realtime.messages` 上启用了 RLS，发布也会根据 `INSERT` 策略进行检查。

发布失败会通过 `error` 事件发出。

## [​](#on) on()

监听自定义事件、连接事件、在线状态事件和实时错误。

```
insforge.realtime.on('new_message', (message) => {
  console.log(message.text);
  console.log(message.meta.senderType);
});
```

保留事件：

| 事件 | 负载 | 描述 |
| --- | --- | --- |
| `connect` | 无 | WebSocket 已连接。 |
| `connect_error` | `Error` | 初始连接或重新连接失败。 |
| `disconnect` | `string` | WebSocket 已断开。 |
| `error` | `RealtimeErrorPayload` | 订阅或发布失败。 |
| `presence:join` | `PresenceJoinMessage` | 一个逻辑成员在频道中变为在线状态。 |
| `presence:leave` | `PresenceLeaveMessage` | 一个逻辑成员不再在频道中在线。 |

## [​](#once) once()

监听事件一次，然后自动移除监听器。

```
insforge.realtime.once('checkout_completed', (message) => {
  console.log('已完成:', message.orderId);
});
```

## [​](#off) off()

移除事件监听器。

```
function handleStatus(message: OrderStatusMessage) {
  console.log(message.status);
}

insforge.realtime.on('status_changed', handleStatus);
insforge.realtime.off('status_changed', handleStatus);
```

## [​](#unsubscribe) unsubscribe()

离开一个频道。

```
insforge.realtime.unsubscribe('chat:room-1');
```

`unsubscribe()` 是即发即弃的。如果这是逻辑成员的最后一个 socket，其他订阅者会收到 `presence:leave`。

## [​](#disconnect) disconnect()

关闭 WebSocket 并清除本地订阅。

```
insforge.realtime.disconnect();
```

## [​](#message-shape) 消息结构

传递的消息包含您的负载字段以及服务器元数据。

```
import type { SocketMessage } from '@insforge/sdk';

interface OrderStatusMessage extends SocketMessage {
  id: string;
  status: string;
}

insforge.realtime.on<OrderStatusMessage>('status_changed', (message) => {
  console.log(message.id);
  console.log(message.status);
  console.log(message.meta.messageId);
  console.log(message.meta.senderType);
  console.log(message.meta.senderId);
  console.log(message.meta.timestamp);
});
```

元数据：

```
interface SocketMessageMeta {
  channel?: string;
  messageId: string;
  senderType: 'system' | 'user';
  senderId?: string;
  timestamp: string;
}
```

`senderType` 为 `system` 表示数据库触发的消息，为 `user` 表示客户端发布的消息。

## [​](#presence) 在线状态

成功的订阅会返回当前的在线状态快照。

```
const response = await insforge.realtime.subscribe('chat:room-1');

if (response.ok) {
  for (const member of response.presence.members) {
    console.log(member.type, member.presenceId, member.joinedAt);
  }
}
```

在线状态成员：

```
type PresenceMember =
  | {
      type: 'user';
      presenceId: string;
      joinedAt: string;
    }
  | {
      type: 'anonymous';
      presenceId: string;
      joinedAt: string;
    };
```

监听变化：

```
insforge.realtime.on('presence:join', (message) => {
  console.log('已加入:', message.member.presenceId);
});

insforge.realtime.on('presence:leave', (message) => {
  console.log('已离开:', message.member.presenceId);
});
```

## [​](#properties) 属性

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| `isConnected` | `boolean` | socket 当前是否已连接。 |
| `connectionState` | `'disconnected' | 'connecting' | 'connected'` | 当前 SDK 连接状态。 |
| `socketId` | `string | undefined` | 连接时的 Socket.IO ID。 |
| `getSubscribedChannels()` | `() => string[]` | 已订阅频道的本地列表。 |

## [​](#error-handling) 错误处理

```
insforge.realtime.on('connect_error', (error) => {
  console.error('连接失败:', error.message);
});

insforge.realtime.on('disconnect', (reason) => {
  console.log('已断开:', reason);
});

insforge.realtime.on('error', (error) => {
  console.error(error.channel, error.code, error.message);
});
```

常见实时错误代码：

| 代码 | 含义 |
| --- | --- |
| `REALTIME_UNAUTHORIZED` | RLS 或频道匹配拒绝了订阅或发布。 |
| `REALTIME_NOT_SUBSCRIBED` | 客户端在订阅频道之前尝试发布。 |
| `INTERNAL_ERROR` | 后端无法完成实时操作。 |

## [​](#complete-example) 完整示例

```
const channel = `order:${orderId}`;

insforge.realtime.on('error', (error) => {
  console.error(error.code, error.message);
});

await insforge.realtime.connect();

const response = await insforge.realtime.subscribe(channel);

if (!response.ok) {
  throw new Error(response.error.message);
}

insforge.realtime.on('status_changed', (message) => {
  renderOrderStatus(message.status);
});

await insforge.realtime.publish(channel, 'customer_viewed', {
  orderId,
  viewedAt: new Date().toISOString()
});

function cleanup() {
  insforge.realtime.unsubscribe(channel);
  insforge.realtime.disconnect();
}
```

[模型网关](/sdks/typescript/ai)[邮件 SDK 参考](/sdks/typescript/email)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)