## On this page

* [Installation](#installation)
* [Quick Start](#quick-start)
* [Features](#features)
* [SDK Reference](#sdk-reference)

TypeScript

# TypeScript SDK

Copy page

Official TypeScript/JavaScript SDK for InsForge

Copy page

The InsForge TypeScript SDK provides a type-safe client for interacting with InsForge services from JavaScript and TypeScript applications.

## [​](#installation) Installation

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

## [​](#quick-start) Quick Start

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'  // Optional: for public/unauthenticated requests
});
```

## [​](#features) Features

* **Database** - Type-safe CRUD operations with PostgREST
* **Authentication** - Email/password and OAuth authentication
* **Storage** - File upload, download, and management
* **Functions** - Invoke serverless edge functions
* **AI** - Chat completions and image generation
* **Realtime** - WebSocket-based pub/sub messaging
* **Payments** - Provider-scoped Stripe and Razorpay payment helpers

## [​](#sdk-reference) SDK Reference

## Database

CRUD operations, filters, and queries

## Authentication

Sign up, sign in, OAuth, and user management

## Storage

File upload, download, and management

## Functions

Invoke serverless edge functions

## AI

Chat completions and image generation

## Realtime

WebSocket pub/sub messaging

## Payments

Provider-scoped Stripe and Razorpay payment helpers

[Database SDK Reference](/sdks/typescript/database)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)