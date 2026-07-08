## On this page

* [The primitives](#the-primitives)
* [Why it matters](#why-it-matters)
* [The loop](#the-loop)
* [Next steps](#next-steps)

Agent-Native Initiatives

# Agent-Native Initiatives

Copy page

The primitives that let a coding agent operate your backend, not just a human clicking a dashboard.

Copy page

Most backends assume a human in a dashboard. InsForge assumes a coding agent at a terminal. The products (Database, Auth, Storage, and the rest) are the building blocks; the primitives on this page are how an agent operates them: as files it can edit, branches it can test on, and a backend it can diagnose and fix on its own.

New here? Start with [Connect via CLI](/quickstart) to link your project. This section is about how an agent *works* with the backend once it is connected.

## [​](#the-primitives) The primitives

## CLI harness

The agent’s hands. One terminal interface for login, schema, deploys, config, and diagnostics.

## Diagnostics & advisor

Pull advisor findings, DB health, metrics, and error logs the agent can read and fix.

## Config as code

Auth, SMTP, storage, retention, and deployment settings live in `insforge.toml`. Plan and apply like infrastructure.

## Branching

Clone the whole backend into an isolated branch to test risky changes, then merge or reset.

## [​](#why-it-matters) Why it matters

A person and an agent want different things from a backend. A person wants a UI to click. An agent wants a stable text interface it can drive, read back, and reason about. That shows up everywhere in InsForge.
Schema changes are [migrations](/core-concepts/database/migrations) in your repo, and project config is an [`insforge.toml`](/agent-native/config-as-code) file, so the agent edits text, commits it, and reviews it in a PR instead of clicking through forms. When it wants to try something risky, it spins up a [backend branch](/agent-native/branching), runs the change against a copy, and throws the branch away if it goes wrong. When something looks off, it fetches [diagnostics and advisor findings](/agent-native/diagnostics) directly with `npx @insforge/cli diagnose`, no dashboard in the loop, and applies the fix itself. That last part is also how the backend gets more secure: the agent reads a security finding like a permissive RLS policy and remediates it on its own, instead of waiting for a human to remember to check. And it reads current schemas, logs, and metadata straight from the backend with `npx @insforge/cli metadata`, so it works from real state rather than guessing.

## [​](#the-loop) The loop

These chain together. A session usually goes:

1. Read the current state with `npx @insforge/cli metadata`.
2. Branch the backend, write a [migration](/core-concepts/database/migrations) and check what is pending with `npx @insforge/cli db migrations list`, or edit `insforge.toml` and preview the config diff with `npx @insforge/cli config plan`.
3. Apply it with `npx @insforge/cli db migrations up --all` or `config apply`, against the branch first, then the parent.
4. Run `npx @insforge/cli diagnose` to check advisor findings and error logs, and ask `diagnose --ai` to interpret them.
5. Apply the remediation, re-run diagnose, and merge the branch.

## [​](#next-steps) Next steps

* Read the [CLI harness](/agent-native/cli-harness) to see the full command surface an agent drives.
* Set up [config as code](/agent-native/config-as-code) so project settings live in version control.
* Use [diagnostics](/agent-native/diagnostics) to let the agent find and fix backend issues.

[Overview](/core-concepts/analytics/overview)[VS Code extension](/agent-native/vscode-extension)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)