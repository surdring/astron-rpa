## On this page

* [Concepts](#concepts)
* [Usage](#usage)
* [Specific usage cases](#specific-usage-cases)
* [More resources](#more-resources)

Agent-Native Initiatives

# Backend branching

Copy page

Spin up an isolated copy of your project to test schema and config changes

Copy page

A branch is a child project with its own Postgres, auth config, storage, edge functions, email templates, realtime channels, and schedules. Merge back when ready or reset and retry. Available on InsForge OSS 2.1.0+.

## [​](#concepts) Concepts

Each branch runs on its own EC2 instance, restored from the parent at create time. `merge` runs a three-way diff against the parent’s create-time state. The branch shares the parent’s `JWT_SECRET` but gets its own `API_KEY`. Compute services and frontend deployments do not branch.

## [​](#usage) Usage

Create a branch with `full` (schema + data) or `schema-only` (faster, empty user tables).

```
npx @insforge/cli branch create feat-billing --mode full
npx @insforge/cli branch list
```

Preview the merge SQL before applying.

```
npx @insforge/cli branch merge feat-billing --dry-run --save-sql ./preview.sql
npx @insforge/cli branch merge feat-billing
```

Roll back to the create-time snapshot, or delete the branch.

```
npx @insforge/cli branch reset feat-billing
npx @insforge/cli branch delete feat-billing
```

## [​](#specific-usage-cases) Specific usage cases

Use a branch for risky schema migrations, RLS rewrites, OAuth provider swaps, and edge function refactors. Skip it for trivial changes and data backfills (user-data rows are not auto-merged).
Merges block on conflicts. Resolve on the branch or reset and retry. Quotas: 3 parent projects per org, 2 active branches per parent, no nesting. A successful merge does not auto-delete the branch.

## [​](#more-resources) More resources

* [Database migrations](/core-concepts/database/migrations) for forward-only SQL files.
* [Database overview](/core-concepts/database/overview) for what runs under each branch.
* [CLI reference](https://github.com/InsForge/InsForge) for the full `branch` flag set.

[Config as code](/agent-native/config-as-code)[Partner Integration](/partnership)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)