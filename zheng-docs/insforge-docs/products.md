## On this page

* [How they fit together](#how-they-fit-together)

Getting Started

# Products

Copy page

Every InsForge product in one place. Click any card to dive in.

Copy page

InsForge ships ten products, each exposed through the same REST surface, the
same JWT auth, the same MCP server, and the same SDKs.

## Database

Postgres for every project. Migrations, branching, pgvector, S3-backed backups.
Every table becomes a typed REST and SDK surface.

## Authentication

Email and password, passwordless, OAuth, and mobile logins through one
API. JWT sessions, row-level security, OAuth-server mode.

## Storage

S3-compatible object storage with signed URLs and row-level policies.
Works with rclone, the AWS CLI, Terraform.

## Realtime

Database changes, broadcast, and presence over one WebSocket connection.
Subscriptions and client publish use RLS checks.

## Edge Functions

Deno-powered serverless TypeScript with first-class schedules. Invoke
on-demand, chain from DB triggers, or run on cron.

## Model Gateway

OpenRouter-backed chat, streaming, and embeddings through one
InsForge-managed key. Per-project quotas and usage tracking.

## Sites

Deploy frontends to InsForge-managed hosting and link them to your project
backend automatically.

## Messaging

Transactional email today; SMS and push on the roadmap. One API.

## Payments

Stripe checkout, subscriptions, and customer portal flows.

## Compute

Long-running services beyond the edge-function model.

## [​](#how-they-fit-together) How they fit together

Every product shares the same auth identity, the same row-level security
policies, and the same MCP surface for AI agents. A user signed in through
**Auth** gets a JWT that the **Database**, **Storage**, **Realtime**, and
**Edge Functions** layers all use to enforce the same access rules.

## MCP server

Connect agents to read schemas, run queries, and deploy code.

## SDKs

TypeScript, Swift, Kotlin, and a plain REST API.

## Self-hosting

Run the whole stack on your own infrastructure.

[Overview](/introduction)[CLI setup · Recommended](/quickstart)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)