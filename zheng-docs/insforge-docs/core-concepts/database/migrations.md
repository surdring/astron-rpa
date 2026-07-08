## On this page

* [Concepts](#concepts)
* [Usage](#usage)
* [Specific usage cases](#specific-usage-cases)
* [More resources](#more-resources)

Database

# Database migrations

Copy page

Track schema changes in git and apply them with the InsForge CLI

Copy page

Migrations are versioned SQL files in `migrations/` applied with `@insforge/cli`. Each successful run is recorded in `system.custom_migrations`. The workflow is forward-only.

## [​](#concepts) Concepts

A migration is one SQL file prefixed with a 14-digit UTC timestamp: `<YYYYMMDDHHmmss>_<name>.sql`. The CLI applies pending files in order inside a transaction, sets `search_path` to `public`, and records history only on success. PostgREST reloads schema metadata automatically. `BEGIN`/`COMMIT`/`ROLLBACK` inside a file are rejected.

## [​](#usage) Usage

Link the backend, then create a file.

```
npx @insforge/cli login
npx @insforge/cli link
npx @insforge/cli db migrations new create-employees-table
```

Write the SQL.

```
create table if not exists public.employees (
  id bigint primary key generated always as identity,
  name text not null,
  email text,
  created_at timestamptz default now()
);
```

Apply pending migrations and check history.

```
npx @insforge/cli db migrations up --all
npx @insforge/cli db migrations list
```

Target a single file with `up <version>`, or apply everything pending up to and including a target with `up --to <version>`.

## [​](#specific-usage-cases) Specific usage cases

Adopting migrations on an existing project: run `db migrations fetch` first to materialize remote history into local files. Once applied remotely, never edit a migration in place. Write a forward migration instead.
Once you opt in, route all schema changes through files. Ad hoc dashboard edits cause drift between git and `system.custom_migrations`.

## [​](#more-resources) More resources

* [Database branching](/agent-native/branching) to rehearse a migration on a copy.
* [Database overview](/core-concepts/database/overview) for how PostgREST picks up schema changes.
* [PostgreSQL DDL docs](https://www.postgresql.org/docs/15/ddl.html) for the SQL you write.

[Overview](/core-concepts/database/overview)[pgvector](/core-concepts/database/pgvector)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)