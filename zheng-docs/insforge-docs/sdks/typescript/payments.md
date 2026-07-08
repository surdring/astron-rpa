## On this page

* [Shared setup](#shared-setup)
* [Fulfillment](#fulfillment)
* [Next steps](#next-steps)

Payments

# Payments

Copy page

Choose the Stripe or Razorpay payments helpers for TypeScript apps

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
  anonKey: 'your-anon-key'  // Optional: for public/unauthenticated requests
});
```

InsForge Payments is provider-specific. Stripe uses hosted Checkout and Billing Portal. Razorpay uses provider-native Orders and Subscriptions plus Razorpay Checkout. The TypeScript SDK exposes separate provider modules for both.

## Stripe Payments

Create Checkout and Billing Portal sessions with `insforge.payments.stripe`.

## Razorpay Payments

Create Orders or Subscriptions with `insforge.payments.razorpay`, then open Razorpay Checkout.

## [​](#shared-setup) Shared setup

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-project.insforge.app',
  anonKey: 'your-anon-key'
});
```

Payment runtime calls require an InsForge user token. Guest one-time checkout can use an anonymous InsForge token. Provider secret keys must stay server-side and should be configured through Dashboard -> Payments -> Settings, the CLI, or admin APIs.

## [​](#fulfillment) Fulfillment

For both providers, create app-owned tables such as `public.orders`, `public.credit_ledger`, or `public.team_entitlements`, then populate them from verified provider webhook events in `payments.webhook_events`.
`payments.transactions` is a dashboard/reporting projection. Do not use it as the primary business workflow.

## [​](#next-steps) Next steps

* Use [Stripe Payments](/sdks/typescript/payments-stripe) for `insforge.payments.stripe.createCheckoutSession(...)` and `insforge.payments.stripe.createCustomerPortalSession(...)`.
* Use [Razorpay Payments](/sdks/typescript/payments-razorpay) for `insforge.payments.razorpay.createOrder(...)`, `createSubscription(...)`, verification, and subscription management.
* Read [Payments overview](/core-concepts/payments/overview) for the shared database architecture and fulfillment model.

[Email SDK Reference](/sdks/typescript/email)[Stripe Payments SDK](/sdks/typescript/payments-stripe)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)