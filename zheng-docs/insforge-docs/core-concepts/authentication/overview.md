## On this page

* [Features](#features)
  + [Email and password](#email-and-password)
  + [Magic link and OTP](#magic-link-and-otp)
  + [OAuth providers](#oauth-providers)
  + [OAuth server mode](#oauth-server-mode)
  + [Row-level security](#row-level-security)
  + [auth.users in your database](#auth-users-in-your-database)
* [Build with it](#build-with-it)
* [Next steps](#next-steps)

Authentication

# Authentication

Copy page

Use InsForge to authenticate and authorize your users.

Copy page

Use InsForge Authentication to handle sign-up, login, sessions, and identity for your app. Users can sign in with email and password, magic link, one-time code, OAuth providers (Google, GitHub, Apple, and others), or any OIDC-compliant identity provider you bring. InsForge issues JSON Web Tokens on login, and every other product on the platform consumes the same token.

![InsForge dashboard Auth Methods showing email and password, Google OAuth, and GitHub OAuth](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/authentication-methods.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=3f9085f058df55cb99514d5367b33de8)

**Authentication** is checking that a user is who they say they are. **Authorization** is checking what they can do. InsForge handles the first directly and powers the second through [row-level security](/core-concepts/database/overview) policies that read the auth JWT.

## [​](#features) Features

### [​](#email-and-password) Email and password

The default. New users sign up with an email and password, get a confirmation email, and receive a session JWT on login. Password reset, email verification, and brute-force throttling are built in.

### [​](#magic-link-and-otp) Magic link and OTP

Send a one-time link or six-digit code to the user’s email. Passwordless sign-in, account recovery, and step-up auth all use the same primitive.

### [​](#oauth-providers) OAuth providers

First-class support for Google, GitHub, Apple, Microsoft, GitLab, Discord, and more. Add custom OAuth 2.0 / OIDC providers (Keycloak, Okta, Auth0, your own IdP) by URL without writing provider-specific code.

### [​](#oauth-server-mode) OAuth server mode

Run InsForge itself as an OAuth 2.0 / OIDC identity provider for your own downstream apps. See the [OAuth Server guide](/oauth-server) for the full setup.

### [​](#row-level-security) Row-level security

The auth JWT flows through every InsForge SDK call automatically. Postgres RLS policies read claims from the token and decide, row by row, what the user can read and write. The same identity and the same policies apply whether the request hits the database, storage, or a realtime channel.

### [​](#auth-users-in-your-database) `auth.users` in your database

User state lives in your project’s Postgres database in the `auth` schema. Join `auth.users` to your application tables via foreign keys, react to identity changes with triggers, and back the whole thing up the same way you back up everything else.

## [​](#build-with-it) Build with it

## TypeScript SDK

Sign up, log in, and manage sessions from Node, browser, and edge.

## Swift SDK

Native Swift auth client for iOS and macOS.

## Kotlin SDK

Coroutines-first auth client for Android and JVM.

## REST API

Plain HTTP auth endpoints, callable from any language.

## [​](#next-steps) Next steps

* Set up the [CLI](/quickstart) to link your project (the recommended path).
* Browse the [TypeScript SDK reference](/sdks/typescript/auth) for sign-in patterns.

[pgvector](/core-concepts/database/pgvector)[Overview](/core-concepts/storage/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)