## 本页内容

* [Stripe 模型](#stripe-model)
* [设置](#setup)
* [Checkout](#checkout)
* [计费门户](#billing-portal)
* [Webhook 和履约](#webhooks-and-fulfillment)
  + [事件顺序](#event-ordering)
* [同步和仪表盘状态](#sync-and-dashboard-state)
* [参考](#references)

支付

# Stripe 支付

复制页面

将 Stripe Checkout、计费门户、目录同步和 Webhook 履约与 InsForge 集成。

复制页面

当你需要使用 Stripe 托管的 Checkout、Stripe 产品和价格、Stripe 订阅以及托管的计费门户时，可使用 Stripe 集成。
InsForge 在服务端存储 Stripe 密钥，从你的应用创建 Checkout 和计费门户会话，当你的后端可访问时自动管理 Stripe Webhook 端点，将 Stripe 状态镜像到 `payments` 模式，并记录已验证的 Webhook 事件。

## [​](#stripe-model) Stripe 模型

| Stripe 概念 | InsForge 表或 API |
| --- | --- |
| 产品 | `payments.stripe_products` |
| 价格 | `payments.stripe_prices` |
| Checkout 会话 | `POST /api/payments/stripe/{environment}/checkout-sessions` 和 `payments.stripe_checkout_sessions` |
| 计费门户会话 | `POST /api/payments/stripe/{environment}/customer-portal-sessions` 和 `payments.stripe_customer_portal_sessions` |
| 订阅 | `payments.stripe_subscriptions` 和 `payments.stripe_subscription_items` |
| 客户映射 | `payments.customer_mappings`，`provider = 'stripe'` |
| Webhook 事件 | `payments.webhook_events`，`provider = 'stripe'` |
| 仪表盘交易行 | `payments.transactions`，`provider = 'stripe'` |

## [​](#setup) 设置

在仪表盘 -> 支付 -> 设置、CLI 或管理 API 中配置 `test` 和 `live` 环境的 Stripe 密钥。

```
npx @insforge/cli payments stripe status
npx @insforge/cli payments stripe config set --environment test sk_test_xxx
npx @insforge/cli payments stripe sync --environment test
npx @insforge/cli payments stripe webhooks configure --environment test
```

密钥连接后，InsForge 会验证账户，将密钥存储在密钥存储中，尝试创建托管的 Stripe Webhook 端点，并运行产品、价格、客户和订阅的同步。

## [​](#checkout) Checkout

使用当前 InsForge 用户 token 从前端代码创建 Checkout 会话。

```
const { data, error } = await insforge.payments.stripe.createCheckoutSession('test', {
  mode: 'payment',
  lineItems: [{ priceId: 'price_123', quantity: 1 }],
  successUrl: `${window.location.origin}/checkout/success`,
  cancelUrl: `${window.location.origin}/pricing`,
  customerEmail: user?.email ?? null,
  metadata: { order_id: orderId },
  idempotencyKey: `order:${orderId}`
});

if (error) throw error;
if (data?.checkoutSession.url) {
  window.location.assign(data.checkoutSession.url);
}
```

对于订阅 Checkout，传递计费主体。计费主体是你应用拥有的计费所有者，如用户、团队、工作空间、组织、租户或群组。

```
const { data, error } = await insforge.payments.stripe.createCheckoutSession('test', {
  mode: 'subscription',
  subject: { type: 'team', id: teamId },
  lineItems: [{ priceId: 'price_monthly_123', quantity: 1 }],
  successUrl: `${window.location.origin}/billing/success`,
  cancelUrl: `${window.location.origin}/billing`,
  customerEmail: user.email,
  idempotencyKey: `team:${teamId}:pro-monthly`
});

if (error) throw error;
if (data?.checkoutSession.url) {
  window.location.assign(data.checkoutSession.url);
}
```

Checkout 使用调用者的 InsForge token 在 `payments.stripe_checkout_sessions` 中插入一行。添加 RLS 策略，使用户只能为他们有权计费的主体创建会话。PostgreSQL 对 `INSERT ... RETURNING` 返回的行和幂等查找应用 `SELECT` 策略，因此重试也需要为相同的主体和幂等键匹配的 `SELECT` 策略。

## [​](#billing-portal) 计费门户

为现有的 Stripe 客户映射使用托管的计费门户。

```
const { data, error } = await insforge.payments.stripe.createCustomerPortalSession('test', {
  subject: { type: 'team', id: teamId },
  returnUrl: `${window.location.origin}/billing`
});

if (error) {
  if ('statusCode' in error && error.statusCode === 404) {
    return;
  }

  throw error;
}

if (data?.customerPortalSession.url) {
  window.location.assign(data.customerPortalSession.url);
}
```

创建门户需要已认证的用户和主体对应的现有 `payments.customer_mappings` 行。使用 RLS 或服务端成员资格检查保护门户创建，使用户无法打开他们不管理的团队或组织的计费设置。

## [​](#webhooks-and-fulfillment) Webhook 和履约

当后端具有公共 URL 时，Stripe Webhook 会自动管理。InsForge 监听所需的事件，以保持结账尝试、客户、订阅、退款和交易投影的最新状态。
Stripe 还建议从 Webhook 而不是成功 URL 履约 Checkout 订单。在 InsForge 中，将履约触发器附加到 `payments.webhook_events`。

```
CREATE OR REPLACE FUNCTION public.fulfill_stripe_order()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.provider = 'stripe'
     AND NEW.event_type = 'checkout.session.completed'
     AND NEW.processing_status = 'processed'
     AND (NEW.payload -> 'data' -> 'object' -> 'metadata' ->> 'order_id') IS NOT NULL THEN
    UPDATE public.orders
    SET status = 'paid',
        paid_at = COALESCE(NEW.processed_at, NOW())
    WHERE id::text = NEW.payload -> 'data' -> 'object' -> 'metadata' ->> 'order_id'
      AND status = 'pending';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER fulfill_stripe_order_from_webhook
  AFTER INSERT OR UPDATE ON payments.webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION public.fulfill_stripe_order();
```

### [​](#event-ordering) 事件顺序

Webhook 事件是独立验证和处理的。InsForge 在将事件标记为 `processed` 之前提交从事件派生的所有行，但 Stripe 不保证事件之间的顺序：`invoice.paid` 可能在 `checkout.session.completed` 之前处理，因此另一个事件（如 `payments.customer_mappings`）创建的行在你的触发器触发时可能还不存在。
对于订阅事件，首先从事件负载中解析计费主体——InsForge 在结账时将 `insforge_subject_type` 和 `insforge_subject_id` 写入订阅元数据，Stripe 将其快照到订阅生成的发票上，作为 `parent.subscription_details.metadata`。接下来检查 `invoice.metadata`，然后回退到 `payments.customer_mappings`（与 InsForge 内部使用的顺序相同）：

```
CREATE OR REPLACE FUNCTION public.grant_subscription_access()
RETURNS TRIGGER AS $$
DECLARE
  v_subject_type TEXT;
  v_subject_id TEXT;
BEGIN
  IF NEW.provider = 'stripe'
     AND NEW.event_type = 'invoice.paid'
     AND NEW.processing_status = 'processed' THEN
    v_subject_type := COALESCE(
      NEW.payload -> 'data' -> 'object' -> 'parent'
        -> 'subscription_details' -> 'metadata' ->> 'insforge_subject_type',
      NEW.payload -> 'data' -> 'object' -> 'metadata' ->> 'insforge_subject_type'
    );
    v_subject_id := COALESCE(
      NEW.payload -> 'data' -> 'object' -> 'parent'
        -> 'subscription_details' -> 'metadata' ->> 'insforge_subject_id',
      NEW.payload -> 'data' -> 'object' -> 'metadata' ->> 'insforge_subject_id'
    );

    IF v_subject_id IS NULL THEN
      SELECT m.subject_type, m.subject_id
      INTO v_subject_type, v_subject_id
      FROM payments.customer_mappings m
      WHERE m.provider = NEW.provider
        AND m.environment = NEW.environment
        AND m.provider_customer_id = NEW.payload -> 'data' -> 'object' ->> 'customer';
    END IF;

    IF v_subject_id IS NULL THEN
      RAISE WARNING 'Stripe 事件 % 没有可解析的计费主体', NEW.provider_event_id;
      RETURN NEW;
    END IF;

    -- 根据结账时发送的主体类型进行分支；此处的 team_id 是 UUID，
    -- 因此类型检查也保护了类型转换。
    IF v_subject_type = 'team' THEN
      INSERT INTO public.team_entitlements (team_id, plan, active, updated_at)
      VALUES (v_subject_id::uuid, 'pro', true, NOW())
      ON CONFLICT (team_id) DO UPDATE SET
        plan = EXCLUDED.plan,
        active = true,
        updated_at = NOW();
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER grant_subscription_access_from_stripe_webhook
  AFTER INSERT OR UPDATE ON payments.webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION public.grant_subscription_access();
```

切勿让履约静默跳过——记录或死信你无法解析的事件，以便它们可以重放。

## [​](#sync-and-dashboard-state) 同步和仪表盘状态

Stripe 同步镜像产品、价格、客户和订阅。Webhook 在 Stripe 发出事件时维护会话、订阅、客户、退款和交易状态。
`payments.transactions` 是用于仪表盘的报表投影。它提供提供商参考 ID，如支付意图、费用、发票、Checkout 会话和退款 ID，以便你可以在 Stripe 仪表盘中查找详细信息。将面向用户的订单、信用或授权状态保留在你自己的表中。

## [​](#references) 参考

* [Stripe Checkout 履约](https://docs.stripe.com/checkout/fulfillment)
* [Stripe 计费门户会话 API](https://docs.stripe.com/api/customer_portal/sessions/create)
* [TypeScript Stripe 支付指南](/sdks/typescript/payments-stripe)

[概览](/core-concepts/payments/overview)[Razorpay](/core-concepts/payments/razorpay)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)