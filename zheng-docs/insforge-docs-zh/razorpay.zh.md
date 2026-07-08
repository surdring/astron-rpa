## 本页内容

* [Razorpay 模型](#razorpay-model)
* [设置](#setup)
* [一次性订单](#one-time-orders)
* [订阅](#subscriptions)
* [Webhook 和履约](#webhooks-and-fulfillment)
* [同步和仪表盘状态](#sync-and-dashboard-state)
* [参考](#references)

支付

# Razorpay 支付

复制页面

将 Razorpay 订单、订阅、手动 Webhook 和 Webhook 履约与 InsForge 集成。

复制页面

当你需要使用 Razorpay 订单、Razorpay Checkout、商品、计划和订阅时，可使用 Razorpay 集成。Razorpay 不像 Stripe Checkout 那样是托管的重定向流程。你的后端创建提供商对象，你的前端打开 Razorpay Checkout 脚本，你的后端验证返回的签名。

## [​](#razorpay-model) Razorpay 模型

| Razorpay 概念 | 在 InsForge 中的含义 |
| --- | --- |
| 商品 | 承载金额的可销售单位。镜像在 `payments.razorpay_items` 中。 |
| 计划 | 围绕商品的定期订阅定义。镜像在 `payments.razorpay_plans` 中。 |
| 订单 | 一次性支付对象。通过 `POST /api/payments/razorpay/{environment}/orders` 创建，镜像在 `payments.razorpay_orders` 中。 |
| 支付 | 提供商支付结果。从 Webhook 和同步投影到 `payments.transactions` 中。 |
| 订阅 | 绑定到计划的 Razorpay 订阅。镜像在 `payments.razorpay_subscriptions` 中。 |
| Webhook 事件 | 已验证的提供商事件，存储在 `payments.webhook_events` 中，`provider = 'razorpay'`。 |

Razorpay 没有 Stripe Billing Portal 的对应功能。InsForge 暴露了后端路由，用于在检查调用者身份与 `payments.razorpay_subscriptions` 的 RLS `UPDATE` 策略后，取消、暂停和恢复订阅。
对于一次性产品，Razorpay 订单只需金额、货币和收据即可创建。不过，建议为可销售产品创建 Razorpay 商品，以便目录在同步后对 InsForge 和 Razorpay 可见。将订单视为支付尝试，而不是你的产品目录。

## [​](#setup) 设置

在仪表盘 -> 支付 -> 设置或通过管理 API 配置 `test` 和 `live` 环境的 Razorpay 密钥 ID 和密钥 Secret。如果不存在，InsForge 会生成一个 Webhook 签名密钥。
Razorpay Webhook 必须在 Razorpay 仪表盘中手动创建。Razorpay 普通商户 API 密钥不支持自动 Webhook 注册。

1. 打开仪表盘 -> 支付 -> 设置 -> Webhook。
2. 复制 Razorpay Webhook URL 和 Webhook Secret。
3. 在 Razorpay 仪表盘中，使用复制的 URL 和 Secret 创建一个 Webhook。
4. 选择 InsForge 处理的事件。
5. 保存 Webhook 并完成一笔测试支付以确认投递。

Razorpay 只能将 Webhook 投递到公共 HTTPS URL。本地主机 URL 需要公共隧道或已部署的后端。
已处理的事件：

* `payment.authorized`
* `payment.captured`
* `payment.failed`
* `order.paid`
* `invoice.paid`
* `invoice.expired`
* `refund.created`
* `refund.processed`
* `refund.failed`
* `subscription.created`
* `subscription.activated`
* `subscription.charged`
* `subscription.updated`
* `subscription.cancelled`
* `subscription.paused`
* `subscription.resumed`
* `subscription.halted`
* `subscription.completed`
* `subscription.expired`

## [​](#one-time-orders) 一次性订单

首先创建应用自有的待处理订单。然后使用当前 InsForge 用户 token 创建 Razorpay 订单。

```
const { data, error } = await insforge.payments.razorpay.createOrder('test', {
  amount: 50000,
  currency: 'INR',
  receipt: 'order_123',
  subject: { type: 'team', id: 'team_123' },
  customerEmail: 'buyer@example.com',
  notes: { order_id: 'order_123' }
});

if (error) throw error;
```

SDK 封装了 `POST /api/payments/razorpay/{environment}/orders`。响应包含 `checkoutOptions`，其中包含 Razorpay Checkout 原生的字段，如 `key` 和 `order_id`。在前端加载 `https://checkout.razorpay.com/v1/checkout.js`，并将这些选项传递给 `new Razorpay(options).open()`。
如果你的履约触发器读取 `notes.order_id`，则在创建订单或订阅时传递 `notes: { order_id: ... }`。
Razorpay Checkout 返回 `razorpay_order_id`、`razorpay_payment_id` 和 `razorpay_signature` 后，在后端验证签名：

```
await insforge.payments.razorpay.verifyOrder('test', {
  orderId: response.razorpay_order_id,
  paymentId: response.razorpay_payment_id,
  signature: response.razorpay_signature
});
```

签名验证证明了即时 Checkout 回调来自 Razorpay。持久化的订单履约仍应通过已验证的 Razorpay Webhook 事件运行。

## [​](#subscriptions) 订阅

在创建订阅之前创建或同步 Razorpay 计划。计划与 Stripe Price 不同。它是围绕 Razorpay 商品的定期定义。

```
const { data, error } = await insforge.payments.razorpay.createSubscription('test', {
  planId: 'plan_123',
  totalCount: 12,
  subject: { type: 'team', id: 'team_123' },
  customerEmail: 'buyer@example.com'
});

if (error) throw error;
```

SDK 封装了 `POST /api/payments/razorpay/{environment}/subscriptions`。响应包含 `checkoutOptions.subscription_id`。使用该订阅 ID 打开 Razorpay Checkout。Checkout 返回 `razorpay_subscription_id`、`razorpay_payment_id` 和 `razorpay_signature` 后，验证授权支付：

```
await insforge.payments.razorpay.verifySubscription('test', {
  subscriptionId: response.razorpay_subscription_id,
  paymentId: response.razorpay_payment_id,
  signature: response.razorpay_signature
});
```

通过后端路由管理订阅：

```
await insforge.payments.razorpay.cancelSubscription('test', 'sub_123', {
  cancelAtCycleEnd: false
});

await insforge.payments.razorpay.pauseSubscription('test', 'sub_123');
await insforge.payments.razorpay.resumeSubscription('test', 'sub_123');
```

订阅创建会评估 `payments.razorpay_subscriptions` 上的 `INSERT` 策略。取消、暂停和恢复会评估同一张表上的 `UPDATE` 策略。PostgreSQL 还会对 `INSERT/UPDATE ... RETURNING` 返回的行应用 `SELECT` 策略，因此当策略探测需要返回行时，确保相同的主题对调用者可见。仅授予用户策略检查所需的表访问权限；提供商变更仍通过后端运行。

## [​](#webhooks-and-fulfillment) Webhook 和履约

Razorpay 的 Checkout 回调和签名验证不能替代 Webhook。使用 `payments.webhook_events` 作为履约触发器。不要将履约触发器附加到提供商镜像表（如 `payments.razorpay_subscriptions`）；同步和 Webhook 投影可能独立于提供商事件投递而更新这些行。

```
CREATE OR REPLACE FUNCTION public.fulfill_razorpay_order()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.provider = 'razorpay'
     AND NEW.event_type IN ('payment.captured', 'order.paid', 'invoice.paid')
     AND NEW.processing_status = 'processed'
     AND COALESCE(
       NEW.payload -> 'payload' -> 'payment' -> 'entity' -> 'notes' ->> 'order_id',
       NEW.payload -> 'payload' -> 'invoice' -> 'entity' -> 'notes' ->> 'order_id'
     ) IS NOT NULL THEN
    UPDATE public.orders
    SET status = 'paid',
        paid_at = COALESCE(NEW.processed_at, NOW())
    WHERE id::text = COALESCE(
      NEW.payload -> 'payload' -> 'payment' -> 'entity' -> 'notes' ->> 'order_id',
      NEW.payload -> 'payload' -> 'invoice' -> 'entity' -> 'notes' ->> 'order_id'
    )
      AND status = 'pending';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER fulfill_razorpay_order_from_webhook
  AFTER INSERT OR UPDATE ON payments.webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION public.fulfill_razorpay_order();
```

## [​](#sync-and-dashboard-state) 同步和仪表盘状态

Razorpay 同步镜像商品、计划、客户、订阅、发票和支付。发票和支付为 `payments.transactions` 仪表盘/报表投影提供数据。交易包含提供商参考 ID，如支付、发票、订单、订阅和退款 ID，以便你可以在 Razorpay 仪表盘中检查源记录。
将面向用户的订单、信用和授权状态保留在你自己的应用表中。将 `payments.transactions` 视为仪表盘/报表状态，而不是主要业务流程。

## [​](#references) 参考

* [Razorpay 标准 Checkout 集成](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/)
* [Razorpay 订阅集成](https://razorpay.com/docs/payments/subscriptions/integration-guide/)
* [Razorpay Webhook 设置](https://razorpay.com/docs/payments/dashboard/account-settings/webhooks/)
* [TypeScript Razorpay 支付指南](/sdks/typescript/payments-razorpay)

[Stripe](/core-concepts/payments/stripe)[概览](/core-concepts/compute/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)