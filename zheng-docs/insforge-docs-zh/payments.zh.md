## On this page

* [共享设置](#shared-setup)
* [履约](#fulfillment)
* [下一步](#next-steps)

Payments

# 支付

Copy page

为 TypeScript 应用选择 Stripe 或 Razorpay 支付助手

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

InsForge 支付是特定于提供商的。Stripe 使用托管的 Checkout 和 Billing Portal。Razorpay 使用提供商原生的 Orders 和 Subscriptions 以及 Razorpay Checkout。TypeScript SDK 为两者分别暴露了独立的提供商模块。

## Stripe 支付

使用 `insforge.payments.stripe` 创建 Checkout 和 Billing Portal 会话。

## Razorpay 支付

使用 `insforge.payments.razorpay` 创建 Orders 或 Subscriptions，然后打开 Razorpay Checkout。

## [​](#shared-setup) 共享设置

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-project.insforge.app',
  anonKey: 'your-anon-key'
});
```

支付运行时调用需要 InsForge 用户令牌。访客一次性结账可以使用匿名 InsForge 令牌。提供商密钥必须保持在服务端，并应通过 Dashboard -> Payments -> Settings、CLI 或管理 API 进行配置。

## [​](#fulfillment) 履约

对于两个提供商，创建应用拥有的表，例如 `public.orders`、`public.credit_ledger` 或 `public.team_entitlements`，然后从 `payments.webhook_events` 中已验证的提供商 webhook 事件填充它们。
`payments.transactions` 是一个仪表板/报告投影。不要将其用作主要业务工作流。

## [​](#next-steps) 下一步

* 使用 [Stripe 支付](/sdks/typescript/payments-stripe) 进行 `insforge.payments.stripe.createCheckoutSession(...)` 和 `insforge.payments.stripe.createCustomerPortalSession(...)`。
* 使用 [Razorpay 支付](/sdks/typescript/payments-razorpay) 进行 `insforge.payments.razorpay.createOrder(...)`、`createSubscription(...)`、验证和订阅管理。
* 阅读 [支付概述](/core-concepts/payments/overview) 了解共享数据库架构和履约模型。

[邮件 SDK 参考](/sdks/typescript/email)[Stripe 支付 SDK](/sdks/typescript/payments-stripe)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)