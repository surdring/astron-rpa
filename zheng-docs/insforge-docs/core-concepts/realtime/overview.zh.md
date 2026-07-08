## 本页内容

* [功能特性](#features)
  + [通道](#channels)
  + [数据库变更](#database-changes)
  + [客户端广播](#client-broadcasts)
  + [Webhook](#webhooks)
  + [在线状态](#presence)
  + [行级安全](#row-level-security)
  + [消息历史](#message-history)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

实时

# 实时

复制页面

通过实时通道发送数据库变更、广播、在线状态和 Webhook 分发。

复制页面

当你的应用需要无需刷新页面即可更新时，使用 InsForge Realtime。客户端订阅诸如 `order:123` 或 `chat:room-1` 之类的通道，然后通过 WebSocket 接收数据库变更、广播和在线状态更新。当另一个服务需要接收事件时，通道还可以将相同的消息分发到 Webhook URL。

![InsForge 实时仪表盘](https://mintcdn.com/insforge-468ccf39/B2-0BTl6L1SxX8Wr/images/dashboard-realtime.png?fit=max&auto=format&n=B2-0BTl6L1SxX8Wr&q=85&s=48de385c63b84b07273433e8ff4f3b38)

**需要在数据库变更后运行服务端代码？** 将该业务逻辑放在 [Edge Function](/core-concepts/functions/overview) 中，并通过数据库触发器调用它。当变更应投递给已连接的客户端或已配置的 Webhook 端点时，使用 Realtime。

## [​](#features) 功能特性

### [​](#channels) 通道

通道是客户端可以加入的命名主题。对共享房间使用精确名称，或当每条记录需要自己的实时流时使用 `order:%` 之类的模式。

### [​](#database-changes) 数据库变更

当表写入应成为实时应用事件时，使用数据库变更。在你想要监听的表上创建触发器。在触发器函数中，调用预定义的 `realtime.publish(channel, event, payload)` 函数，决定哪个通道接收消息、客户端处理哪个事件名称以及它们接收什么负载。
对于 `order:%` 这样的通道模式，触发器可以为每个订单发布一个事件：

```
CREATE OR REPLACE FUNCTION public.notify_order_status()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM realtime.publish(
    'order:' || NEW.id::text,
    'status_changed',
    jsonb_build_object(
      'id', NEW.id,
      'status', NEW.status,
      'updatedAt', NEW.updated_at
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER order_status_realtime
  AFTER UPDATE OF status ON public.orders
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION public.notify_order_status();
```

然后通过 SDK 从应用订阅：

```
const channel = `order:${orderId}`;

await insforge.realtime.connect();

const subscription = await insforge.realtime.subscribe(channel);
if (!subscription.ok) {
  throw new Error(subscription.error.message);
}

insforge.realtime.on('status_changed', (message) => {
  renderOrderStatus(message.status);
});
```

### [​](#client-broadcasts) 客户端广播

客户端可以向他们已经加入的通道发布消息。用于聊天、输入指示器、光标、协作编辑信号以及其他不需要从数据库写入开始的用户间更新。

```
await insforge.realtime.publish(`chat:${roomId}`, 'typing', {
  userId,
  isTyping: true
});
```

### [​](#webhooks) Webhook

当另一个服务需要接收每条消息时，将 Webhook URL 附加到通道。InsForge 将事件负载发布到每个已配置的 URL，包含事件名称、通道和消息 ID 的头部，重试瞬时网络故障，并在消息历史中记录 Webhook 投递计数。

### [​](#online-presence) 在线状态

在线状态追踪通道中谁在线。客户端在订阅时接收当前成员快照，然后随着成员的加入和离开接收 `presence:join` 和 `presence:leave` 事件。将持久的房间成员、角色和权限存储在你自己的表中；在线状态仅表示在线状态。

```
const response = await insforge.realtime.subscribe(`chat:${roomId}`);

if (response.ok) {
  renderOnlineMembers(response.presence.members);
}

insforge.realtime.on('presence:join', (message) => {
  addOnlineMember(message.member);
});

insforge.realtime.on('presence:leave', (message) => {
  removeOnlineMember(message.member.presenceId);
});
```

### [​](#row-level-security) 行级安全

原型阶段可以开放 Realtime，然后通过 Postgres RLS 锁定。使用 `realtime.channels` 上的 `SELECT` 策略控制谁可以订阅，使用 `realtime.messages` 上的 `INSERT` 策略控制谁可以从客户端发布。
此策略允许已认证用户仅在他们拥有订单时订阅 `order:<id>` 通道：

```
ALTER TABLE realtime.channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_subscribe_own_orders"
ON realtime.channels
FOR SELECT
TO authenticated
USING (
  pattern = 'order:%'
  AND EXISTS (
    SELECT 1
    FROM public.orders
    WHERE id = NULLIF(split_part(realtime.channel_name(), ':', 2), '')::uuid
      AND user_id = auth.uid()
  )
);
```

在订阅策略中使用 `realtime.channel_name()`，因为客户端订阅的是已解析的通道（如 `order:123`），而 `realtime.channels` 存储的是模式（如 `order:%`）。

### [​](#message-history) 消息历史

每条已投递的事件都记录了 WebSocket 和 Webhook 投递计数。当需要调试实时行为时，仪表盘可以检查最近的消息、投递统计和保留设置。

## [​](#build-with-it) 构建应用

## TypeScript SDK

从 Node、浏览器和边缘运行时订阅通道、发布事件和追踪在线状态。

## Swift SDK

适用于 iOS 和 macOS 的原生 Swift 实时客户端。

## Kotlin SDK

适用于 Android 和 JVM 的协程优先实时客户端。

## REST 和 WebSocket API

从任何语言使用原始的 Socket.IO 协议。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 以关联你的项目。
* 在 Realtime 仪表盘中创建通道。
* 使用 [TypeScript SDK 参考](/sdks/typescript/realtime) 了解客户端订阅。
* 当另一个服务需要相同的事件流时，将 Webhook URL 添加到通道。

[S3 兼容网关](/core-concepts/storage/s3-compatibility)[概览](/core-concepts/functions/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)