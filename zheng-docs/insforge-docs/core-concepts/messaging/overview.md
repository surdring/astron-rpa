## On this page

* [Channels](#channels)
* [Features](#features)
  + [One API, every channel](#one-api-every-channel)
  + [Managed delivery or bring your own](#managed-delivery-or-bring-your-own)
  + [Templates](#templates)
  + [Delivery tracking](#delivery-tracking)
  + [Rate limits](#rate-limits)
* [Concepts](#concepts)
* [Build with it](#build-with-it)
* [Next steps](#next-steps)

Messaging

# Messaging

Copy page

Send transactional messages from your project. Email today, SMS and push on the roadmap.

Copy page

InsForge Messaging sends transactional notifications from your project: receipts, digests, password-reset codes, notification roll-ups, anything you would otherwise wire SendGrid, Postmark, or Twilio in for. Email is the first channel; SMS and push are on the roadmap and will share the same API surface.

**Just sending auth emails?** Magic links, verification codes, and password resets are wired into [Authentication](/core-concepts/authentication/overview) out of the box. You only need this product for transactional messages beyond auth.

## [​](#channels) Channels

## Email

Managed SMTP or bring your own provider. Templates, delivery tracking, and webhook events.

## SMS

Coming soon. Same API, Twilio or Sinch on the back.

## Push

Coming soon. APNs and FCM via a single endpoint.

## [​](#features) Features

### [​](#one-api-every-channel) One API, every channel

Same `emails.send()` shape for email today, with SMS and push to follow when they land. Switching channels is a field change, not a rewrite.

### [​](#managed-delivery-or-bring-your-own) Managed delivery or bring your own

Send through InsForge Cloud (AWS SES for email today) for zero setup, or plug in your own provider when you need to control deliverability and sender reputation. See [Custom SMTP](/core-concepts/messaging/custom-smtp).

### [​](#templates) Templates

Pick a template by name, pass the variables, and InsForge renders and sends. Templates are editable per project; the four auth templates (`email-verification-*`, `reset-password-*`) ship with sensible defaults.

### [​](#delivery-tracking) Delivery tracking

Send events (`accepted`, `delivered`, `bounced`, `complained`) are recorded per message. Query the audit table in Postgres, subscribe over webhooks, or watch the dashboard.

### [​](#rate-limits) Rate limits

Per-project and per-plan limits keep stray loops from melting deliverability. Configurable from the dashboard, enforced at the gateway.

## [​](#concepts) Concepts

## Custom SMTP

Bring your own SMTP provider (SendGrid, Postmark, AWS SES, etc.).

## [​](#build-with-it) Build with it

## TypeScript SDK

Send mail from Node, browser, and edge runtimes.

## REST API

Plain HTTP messaging endpoints, callable from any language.

## [​](#next-steps) Next steps

* Set up the [CLI](/quickstart) to link your project (the recommended path).
* Browse the [TypeScript SDK reference](/sdks/typescript/email) for send patterns.

[Overview](/core-concepts/sites/overview)[Custom SMTP](/core-concepts/messaging/custom-smtp)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)