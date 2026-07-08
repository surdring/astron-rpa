## 本页内容

* [选择提供商](#choose-a-provider)
* [架构](#architecture)
* [履约](#fulfillment)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

支付

# 支付

复制页面

选择 Stripe 或 Razorpay 的特定提供商支付集成。

复制页面

InsForge Payments 让你的应用使用你自己的 Stripe 或 Razorpay 账户收款。这两个提供商使用不同的支付模型，因此文档按提供商分别编写，而不是描述一个通用的支付流程。

![InsForge 支付仪表盘](https://mintcdn.com/insforge-468ccf39/B2-0BTl6L1SxX8Wr/images/dashboard-payments.png?fit=max&auto=format&n=B2-0BTl6L1SxX8Wr&q=85&s=f05d81ee75d09fd0a317c1b8352a8d7e)

Stripe 或 Razorpay 仍然是费用、发票、退款、争议、税费和账户级财务操作的最终数据源。InsForge 不是支付处理方或商户记录方，也不会取代提供商仪表盘。

## [​](#choose-a-provider) 选择提供商

## Stripe 支付

使用 Stripe Checkout、产品、价格、订阅和计费门户。

## Razorpay 支付

使用 Razorpay 订单、商品、计划、订阅和 Razorpay Checkout。

## [​](#architecture) 架构

提供商原生表保持了提供商的概念完整性：

| 提供商 | 运行时表 | 目录表 | 订阅表 |
| --- | --- | --- | --- |
| Stripe | `payments.stripe_checkout_sessions`、`payments.stripe_customer_portal_sessions` | `payments.stripe_products`、`payments.stripe_prices` | `payments.stripe_subscriptions`、`payments.stripe_subscription_items` |
| Razorpay | `payments.razorpay_orders` | `payments.razorpay_items`、`payments.razorpay_plans` | `payments.razorpay_subscriptions` |

共享表仅在持久化形态对多个提供商都有用时才使用：

| 表 | 用途 |
| --- | --- |
| `payments.provider_connections` | 按 `provider` 和 `environment` 存储提供商密钥、账户、同步和 Webhook 设置状态。 |
| `payments.customer_mappings` | 应用计费主体到提供商客户 ID 的映射。 |
| `payments.customers` | 管理员/客户镜像，用于仪表盘可见性。 |
| `payments.webhook_events` | 已验证的提供商 Webhook 事件账本。用于持久化的履约触发器。 |
| `payments.transactions` | InsForge 仪表盘/报表投影，用于成功、失败和已退款支付活动。 |

`payments.transactions` 不是履约合约。它是从提供商事件和同步构建的投影。对于业务逻辑，创建应用自有表，如 `public.orders`、`public.credit_ledger` 或 `public.team_entitlements`，然后从 `payments.webhook_events` 中的已验证行填充它们。

## [​](#fulfillment) 履约

不要仅依赖 Stripe 的成功 URL 或 Razorpay Checkout 回调来履约。那些是用户体验信号。持久化的履约应来自已验证的提供商 Webhook 事件。

```
CREATE TRIGGER fulfill_from_payment_webhook
  AFTER INSERT OR UPDATE ON payments.webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION public.fulfill_payment_event();
```

如果你的应用接受多个提供商，保持触发器幂等，并按 `NEW.provider` 和 `NEW.event_type` 分支。使用你自己的 RLS 策略保护应用自有的履约表。
Webhook 事件是独立处理的，提供商不保证事件之间的顺序。从事件派生的行会在该事件标记为 `processed` 之前提交，但其他事件拥有的行——例如 `payments.customer_mappings`（结账完成时创建）——在你的触发器触发时可能还不存在。首先从事件负载中解析计费主体，并将对其他表的查找作为后备方案。参见提供商指南中的订阅履约示例。

较旧的仅 Stripe 的 `payments.payment_history` 行已迁移到 `payments.transactions`，用于仪表盘和报表。`payment_history` 上的触发器不会自动重写。将履约逻辑迁移到 `payments.webhook_events`。

## [​](#build-with-it) 构建应用

## TypeScript 支付指南

为应用代码选择 Stripe 或 Razorpay 提供商模块。

## REST 模式

查看提供商特定的支付 API 路由和 Webhook 路由。

## [​](#next-steps) 后续步骤

* 如果你使用 Stripe Checkout 或 Billing Portal，请阅读 [Stripe 支付](/core-concepts/payments/stripe)。
* 如果你使用 Razorpay 订单或订阅，请阅读 [Razorpay 支付](/core-concepts/payments/razorpay)。
* 在仪表盘 -> 支付 -> 设置中配置提供商密钥。
* 为计费主体添加应用特定的 RLS 或服务端成员资格检查。
* 从 `payments.webhook_events` 添加基于触发器的履约。

[自定义 SMTP](/core-concepts/messaging/custom-smtp)[Stripe](/core-concepts/payments/stripe)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)