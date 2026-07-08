## On this page

* [Features](#features)
  + [HTTP triggers](#http-triggers)
  + [Schedules](#schedules)
  + [Database triggers](#database-triggers)
  + [Secrets and environment variables](#secrets-and-environment-variables)
  + [Logs](#logs)
  + [Deno standard library](#deno-standard-library)
* [Concepts](#concepts)
* [Build with it](#build-with-it)
* [Next steps](#next-steps)

Edge Functions

# Edge Functions

Copy page

Deno-powered serverless TypeScript with first-class schedules.

Copy page

Use InsForge edge functions to run TypeScript on [Deno](https://deno.com), deployed close to your users for low latency. Functions can be invoked on-demand from any client, chained from database triggers, or scheduled to run on a cron expression. The runtime ships standard fetch, streaming responses, and ESM imports out of the box.

**Need a process that stays up?** Use [Compute](/core-concepts/compute/overview) for queue workers, AI inference loops, and anything stateful. Edge Functions are for request/response and short-lived jobs.

## [​](#features) Features

### [​](#http-triggers) HTTP triggers

Every function is reachable at `https://<project>.insforge.dev/functions/<name>`. Standard fetch in, standard `Response` out. Streaming, JSON, redirects, and websockets all work.

### [​](#schedules) Schedules

Attach a cron expression to a function and InsForge invokes it on time, with retry on failure. See [Schedules](/core-concepts/functions/schedules) for the cron syntax and execution model.

### [​](#database-triggers) Database triggers

Wire a function to fire on `INSERT`, `UPDATE`, or `DELETE` against a table. The function receives the row payload and runs with a service-role JWT so it can perform privileged follow-up writes.

### [​](#secrets-and-environment-variables) Secrets and environment variables

Set env vars and secrets per function. The dashboard, CLI, and MCP all read and write the same store; secrets never round-trip through your repo.

### [​](#logs) Logs

Structured logs are captured per invocation, queryable by status, duration, and function name. The InsForge MCP `get-function-logs` tool lets your agent diagnose failures without leaving the editor.

### [​](#deno-standard-library) Deno standard library

Use the [Deno standard library](https://jsr.io/@std) and any ESM module from `jsr.io`, `esm.sh`, or `npm:` specifiers. You don’t run a bundler, and there’s no `node_modules` directory to ship.

## [​](#concepts) Concepts

## Schedules

Run a function on a cron expression instead of in response to a request.

## [​](#build-with-it) Build with it

## TypeScript SDK

Invoke and stream functions from Node, browser, and edge.

## Swift SDK

Invoke functions from iOS and macOS apps.

## Kotlin SDK

Invoke functions from Android and JVM apps.

## REST API

Plain HTTP function endpoints, callable from any language.

## [​](#next-steps) Next steps

* Set up the [CLI](/quickstart) to link your project (the recommended path).
* Browse the [TypeScript SDK reference](/sdks/typescript/functions) for invocation patterns.

[Overview](/core-concepts/realtime/overview)[Schedules: cron-triggered functions](/core-concepts/functions/schedules)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)