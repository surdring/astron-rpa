## On this page

* [概述](#overview)
* [createCheckoutSession()](#createcheckoutsession)
  + [参数](#parameters)
  + [返回值](#returns)
  + [一次性结账](#one-time-checkout)
  + [订阅结账](#subscription-checkout)
* [createCustomerPortalSession()](#createcustomerportalsession)
  + [参数](#parameters-2)
  + [返回值](#returns-2)
  + [示例](#example)
* [授权和 RLS](#authorization-and-rls)
* [读取支付状态](#reading-payment-state)
* [生产/测试环境](#live%2Ftest-environment)

Payments

# Stripe 支付 SDK

Copy page

使用 InsForge TypeScript SDK 创建 Stripe Checkout 和 Billing Portal 会话

Copy page

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

## [​](#overview) 概述

TypeScript SDK 为生成的应用程序前端暴露了 Stripe 运行时助手：

* `insforge.payments.stripe.createCheckoutSession(...)`
* `insforge.payments.stripe.createCustomerPortalSession(...)`

Stripe 密钥、目录管理、webhook 设置和支付监控是管理操作。在使用 SDK 之前，请通过仪表板或 CLI 进行配置。

```
npx @insforge/cli payments stripe status
npx @insforge/cli payments stripe catalog --environment test
```

有关设置、数据库表、webhook 投影和履约模式，请参阅 [Stripe 支付](/core-concepts/payments/stripe)。

SDK 方法需要当前的 InsForge 用户令牌。匿名 InsForge 令牌可用于访客一次性结账，但 InsForge API 密钥不能替代，因为后端需要用户上下文来创建本地会话行。

## [​](#createcheckoutsession) createCheckoutSession()

通过 InsForge 后端创建 Stripe Checkout 会话。

### [​](#parameters) 参数

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| 第一个参数 | `'test' | 'live'` | 是 | 目标 Stripe 环境 |
| `mode` | `'payment' | 'subscription'` | 是 | Checkout 模式 |
| `lineItems` | `{ priceId: string; quantity?: number }[]` | 是 | Stripe Price ID 和数量。数量默认为 `1` |
| `successUrl` | `string` | 是 | Checkout 完成后 Stripe 重定向的 URL |
| `cancelUrl` | `string` | 是 | 客户取消时 Stripe 重定向的 URL |
| `subject` | `{ type: string; id: string }` | 订阅必填 | 应用定义的账单所有者 |
| `customerEmail` | `string | null` | 否 | Checkout 客户创建的邮箱提示 |
| `metadata` | `Record<string, string>` | 否 | 复制到 Stripe Checkout 的应用元数据 |
| `idempotencyKey` | `string` | 否 | 用于重试安全的 Checkout 创建的稳定键 |

以 `insforge_` 开头的元数据键是保留的。

### [​](#returns) 返回值

```
{
  data: {
    checkoutSession: {
      id: string
      environment: 'test' | 'live'
      mode: 'payment' | 'subscription'
      status: 'initialized' | 'open' | 'completed' | 'expired' | 'failed'
      paymentStatus: 'paid' | 'unpaid' | 'no_payment_required' | null
      subjectType: string | null
      subjectId: string | null
      customerEmail: string | null
      checkoutSessionId: string | null
      customerId: string | null
      paymentIntentId: string | null
      subscriptionId: string | null
      url: string | null
      lastError: string | null
      createdAt: string
      updatedAt: string
    }
  } | null,
  error: Error | null
}
```

### [​](#one-time-checkout) 一次性结账

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

if (error) {
  console.error('结账失败:', error.message);
  return;
}

if (data?.checkoutSession.url) {
  window.location.assign(data.checkoutSession.url);
}
```

对于匿名一次性购买，省略 `subject` 并在可用时传递 `customerEmail`。
如果一次性结账包含 `subject` 且尚不存在 Stripe 客户映射，InsForge 会让 Stripe 在 Checkout 期间创建客户，并从完成 webhook 回填 subject 映射。

### [​](#subscription-checkout) 订阅结账

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

订阅结账需要 `subject`，因为重复访问属于应用定义的账单所有者，例如用户、团队、组织、工作空间、租户或组。

不要将成功 URL 视为付款证明。请使用已验证的 webhook 事件来履行订单和授予订阅访问权限。

## [​](#createcustomerportalsession) createCustomerPortalSession()

为映射的账单主体创建 Stripe Billing Portal 会话。

### [​](#parameters-2) 参数

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| 第一个参数 | `'test' | 'live'` | 是 | 目标 Stripe 环境 |
| `subject` | `{ type: string; id: string }` | 是 | 应用定义的账单所有者 |
| `returnUrl` | `string` | 否 | 客户离开门户时 Stripe 重定向的 URL |
| `configuration` | `string` | 否 | Stripe Billing Portal 配置 ID |

### [​](#returns-2) 返回值

```
{
  data: {
    customerPortalSession: {
      id: string
      environment: 'test' | 'live'
      status: 'initialized' | 'created' | 'failed'
      subjectType: string
      subjectId: string
      customerId: string | null
      returnUrl: string | null
      configuration: string | null
      url: string | null
      lastError: string | null
      createdAt: string
      updatedAt: string
    }
  } | null,
  error: Error | null
}
```

### [​](#example) 示例

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

客户门户会话需要已认证的用户和该主体的现有客户映射。该映射通常在 Checkout 会话完成且 Stripe 返回客户后创建。

## [​](#authorization-and-rls) 授权和 RLS

SDK 方法使用当前的 InsForge 令牌调用运行时路由。后端使用调用者上下文插入本地会话行：

* `payments.stripe_checkout_sessions` 用于 Checkout 尝试
* `payments.stripe_customer_portal_sessions` 用于 Billing Portal 尝试

如果用户可以传递共享主体（如团队或组织），请在暴露结账、订阅或客户门户 UI 之前添加授权边界。例如，在 Stripe 运行时表上启用 RLS，并设置检查团队成员身份的策略，或者通过您自己的服务器端点调用支付，该端点首先检查成员身份。
PostgreSQL 将 `SELECT` 策略应用于 `INSERT ... RETURNING` 返回的行以及幂等重试查找。如果 RLS 错误出现，即使存在 `INSERT` 策略，也要为相同的账单主体和幂等键添加匹配的 `SELECT` 策略。

不要让用户提交任意的 `subject.type` 和 `subject.id` 值，除非您的应用检查他们可以管理该账单主体。

## [​](#reading-payment-state) 读取支付状态

支付 SDK 不暴露对 `payments.customers`、`payments.stripe_subscriptions` 或 `payments.transactions` 的通用最终用户读取。这些表是用于仪表板可见性和报告的操作记录。
对于面向用户的账单状态，创建应用拥有的表并启用 RLS，然后从提供商 webhook 事件触发器填充它们：

* `public.orders`
* `public.credit_ledger`
* `public.user_entitlements`
* `public.team_billing_status`

有关履约示例，请参阅 [Stripe 支付](/core-concepts/payments/stripe)。

## [​](#live/test-environment) 生产/测试环境

在开发时传递 `'test'` 作为第一个 SDK 参数。只有在开发者明确批准生产 Stripe 更改且已配置生产 Prices 后，才切换到 `'live'`。

切勿将 Stripe 密钥放在前端代码或公共部署环境变量中。通过 InsForge 仪表板或 CLI 配置 Stripe 密钥。

[支付](/sdks/typescript/payments)[Razorpay 支付 SDK](/sdks/typescript/payments-razorpay)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)