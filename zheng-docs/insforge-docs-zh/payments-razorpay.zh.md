## On this page

* [概述](#overview)
* [SDK 设置](#sdk-setup)
* [加载 Razorpay Checkout](#load-razorpay-checkout)
* [一次性订单](#one-time-order)
* [订阅](#subscription)
* [管理订阅](#manage-subscriptions)
* [履约](#fulfillment)
* [生产/测试环境](#live%2Ftest-environment)

Payments

# Razorpay 支付 SDK

Copy page

从 TypeScript 应用创建 Razorpay Orders 和 Subscriptions

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

TypeScript SDK 为生成的应用程序前端暴露了 Razorpay 运行时助手：

* `insforge.payments.razorpay.createOrder(...)`
* `insforge.payments.razorpay.verifyOrder(...)`
* `insforge.payments.razorpay.createSubscription(...)`
* `insforge.payments.razorpay.verifySubscription(...)`
* `insforge.payments.razorpay.cancelSubscription(...)`
* `insforge.payments.razorpay.pauseSubscription(...)`
* `insforge.payments.razorpay.resumeSubscription(...)`

Razorpay 不返回托管的 Checkout URL。后端创建一个 Razorpay Order 或 Subscription 并返回 `checkoutOptions`。浏览器加载 Razorpay Checkout 并使用这些选项打开它。

有关提供商设置、手动 webhook、数据库表和履约模式，请参阅 [Razorpay 支付](/core-concepts/payments/razorpay)。

## [​](#sdk-setup) SDK 设置

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-project.insforge.app',
  anonKey: 'your-anon-key'
});

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}
```

SDK 使用当前的 InsForge 用户令牌调用 Razorpay 运行时路由。不要使用提供商密钥调用这些路由。

## [​](#load-razorpay-checkout) 加载 Razorpay Checkout

```
function loadRazorpayCheckout(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('加载 Razorpay Checkout 失败'));
    document.body.appendChild(script);
  });
}
```

## [​](#one-time-order) 一次性订单

首先创建应用拥有的待处理订单。然后通过 InsForge 创建 Razorpay Order：
Razorpay Orders 可以只包含金额，但为一次性可销售产品创建 Razorpay Items 是一种良好实践，因为同步的 Items 使目录在 InsForge 和 Razorpay 中可见。将 Orders 视为支付尝试。

```
type CreateRazorpayOrderResponse = {
  order: {
    id: string;
    orderId: string | null;
    status: string;
  };
  checkoutOptions: {
    key: string;
    amount: number;
    currency: string;
    order_id: string;
    name?: string | null;
    description?: string | null;
    callback_url?: string | null;
    prefill: {
      name?: string | null;
      email?: string | null;
      contact?: string | null;
    };
  };
};

const { data: orderResponse, error } =
  await insforge.payments.razorpay.createOrder('test', {
    amount: 50000,
    currency: 'INR',
    receipt: order.id,
    subject: { type: 'team', id: teamId },
    customerEmail: user.email,
    notes: { order_id: order.id }
  });

if (error) throw error;
if (!orderResponse) throw new Error('Razorpay 订单创建未返回数据');
```

如果您的 webhook 触发器读取 `notes.order_id`，请在创建 Order 时传递 `notes: { order_id: ... }`。
打开 Razorpay Checkout 并验证返回的签名：

```
await loadRazorpayCheckout();

const RazorpayCheckout = window.Razorpay;
if (!RazorpayCheckout) {
  throw new Error('Razorpay Checkout 加载失败');
}

const checkout = new RazorpayCheckout({
  ...orderResponse.checkoutOptions,
  handler: async (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const { error } = await insforge.payments.razorpay.verifyOrder('test', {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      signature: response.razorpay_signature
    });

    if (error) throw error;
  }
});

checkout.open();
```

签名验证保护即时的浏览器回调。持久的履约仍应来自已验证的 Razorpay webhook 事件。

## [​](#subscription) 订阅

首先创建或同步 Razorpay Plan。然后通过 InsForge 创建订阅：

```
type CreateRazorpaySubscriptionResponse = {
  subscription: {
    subscriptionId: string;
    status: string;
  };
  checkoutOptions: {
    key: string;
    subscription_id: string;
    name?: string | null;
    description?: string | null;
    callback_url?: string | null;
    prefill: {
      name?: string | null;
      email?: string | null;
      contact?: string | null;
    };
  };
};

const { data: subscriptionResponse, error } =
  await insforge.payments.razorpay.createSubscription('test', {
    planId: 'plan_123',
    totalCount: 12,
    subject: { type: 'team', id: teamId },
    customerEmail: user.email
  });

if (error) throw error;
if (!subscriptionResponse) throw new Error('Razorpay 订阅创建未返回数据');
```

当 webhook 触发器稍后需要应用标识符时，传递 Razorpay 订阅 `notes`。
使用返回的订阅 ID 打开 Razorpay Checkout：

```
await loadRazorpayCheckout();

const RazorpayCheckout = window.Razorpay;
if (!RazorpayCheckout) {
  throw new Error('Razorpay Checkout 加载失败');
}

const checkout = new RazorpayCheckout({
  ...subscriptionResponse.checkoutOptions,
  handler: async (response: {
    razorpay_subscription_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const { error } = await insforge.payments.razorpay.verifySubscription('test', {
      subscriptionId: response.razorpay_subscription_id,
      paymentId: response.razorpay_payment_id,
      signature: response.razorpay_signature
    });

    if (error) throw error;
  }
});

checkout.open();
```

## [​](#manage-subscriptions) 管理订阅

Razorpay 不提供等效的 Stripe Billing Portal。使用后端路由进行订阅管理：

```
await insforge.payments.razorpay.cancelSubscription('test', 'sub_123', {
  cancelAtCycleEnd: false
});

await insforge.payments.razorpay.pauseSubscription('test', 'sub_123');

await insforge.payments.razorpay.resumeSubscription('test', 'sub_123');
```

订阅创建检查 `payments.razorpay_subscriptions` 上的 `INSERT` 策略。取消、暂停和恢复检查同一表上的 `UPDATE` 策略。PostgreSQL 还将 `SELECT` 策略应用于 `INSERT/UPDATE ... RETURNING` 返回的行，因此当策略探测需要返回行时，为相同的账单主体添加匹配的 `SELECT` 可见性。在暴露这些控件给共享主体之前，添加应用特定的 RLS 或服务端成员资格检查。

## [​](#fulfillment) 履约

不要仅从 Checkout 处理器标记订单已付款、授予信用或激活订阅。使用 `payments.webhook_events` 中已验证的 Razorpay webhook 事件。不要将履约触发器附加到提供商镜像表，如 `payments.razorpay_subscriptions`。
创建应用拥有的履约表并启用 RLS，然后从 webhook 触发器更新它们。有关触发器示例，请参阅 [Razorpay 支付](/core-concepts/payments/razorpay)。

## [​](#live/test-environment) 生产/测试环境

在开发时传递 `'test'` 作为第一个 SDK 参数。只有在开发者明确批准生产 Razorpay 更改且已配置生产 Items、Plans 和 webhooks 后，才切换到 `'live'`。

切勿将 Razorpay 密钥或 webhook 密钥放在前端代码中。前端只接收公共 Razorpay Key ID 作为 `checkoutOptions.key`。

[Stripe 支付 SDK](/sdks/typescript/payments-stripe)[Next.js](/examples/framework-guides/nextjs)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)