## On this page

* [Features](#features)
  + [One-click PostHog connection](#one-click-posthog-connection)
  + [SDK setup via PostHog wizard](#sdk-setup-via-posthog-wizard)
  + [Traffic](#traffic)
  + [User retention](#user-retention)
  + [Session replay](#session-replay)
  + [Settings and disconnect](#settings-and-disconnect)
* [Concepts](#concepts)
* [Build with it](#build-with-it)
* [Next steps](#next-steps)

Analytics

# Analytics

Copy page

Product analytics for your app, powered by PostHog.

Copy page

Use InsForge Analytics to understand how people actually use your app: page traffic, retention, and session replays, all wired up by connecting a PostHog project to your InsForge backend. Once connected, the dashboard renders Traffic, User Retention, and Session Replay pages on top of your PostHog data without leaving InsForge.
Connect PostHog once with one click, drop the setup prompt into your coding agent so it runs the PostHog wizard and installs the PostHog SDK on your frontend, and the Analytics pages start filling in.

![InsForge Analytics dashboard showing visitor KPIs, a visitor trend chart, and top pages, countries, and devices breakdowns](https://mintcdn.com/insforge-468ccf39/iHW7jg6w-rTgUUpq/images/dashboard-analytics.png?fit=max&auto=format&n=iHW7jg6w-rTgUUpq&q=85&s=9d6946a014fee83449d32d02817d3025)

PostHog remains the source of truth for events, dashboards, insights, and recordings. InsForge surfaces a focused subset for everyday checks, then deep-links into PostHog for anything beyond it.

## [​](#features) Features

### [​](#one-click-posthog-connection) One-click PostHog connection

Connect PostHog from the Analytics page in the dashboard. InsForge provisions or links a PostHog project for you, stores credentials server-side, and unlocks the Traffic, Retention, and Session Replay pages once the connection succeeds.

### [​](#sdk-setup-via-posthog-wizard) SDK setup via PostHog wizard

After connecting, the empty state ships a setup prompt you can paste into your coding agent:

```
I want to add product analytics to this project. Read the current directory and use the InsForge skill to set up PostHog analytics by running `npx @insforge/cli posthog setup`.
```

`@insforge/cli posthog setup` links your InsForge project to PostHog, then prints the official [PostHog wizard](https://posthog.com/docs/libraries/wizard) command (`npx -y @posthog/wizard@latest`) for you (or your agent) to run next. The wizard detects your framework, installs the right PostHog SDK, and drops in initialization code so pageviews, autocapture events, and session recordings start flowing.

### [​](#traffic) Traffic

KPIs over your selected time range (visitors, pageviews, sessions, bounce rate, and trend), plus breakdowns by Page, Country, and Device Type. Useful for the first “how is the app doing this week” pass without opening PostHog.

### [​](#user-retention) User retention

Cohort retention chart built from your PostHog events. Pick a time range and see how many users come back over the following days or weeks.

### [​](#session-replay) Session replay

A paginated list of recent session recordings with duration, person, and a deep-link into PostHog’s full replay player. Helps you watch what users actually did right after spotting something odd in Traffic or Retention.

### [​](#settings-and-disconnect) Settings and disconnect

The Analytics Config dialog (the gear icon in the sidebar) lets admins review the linked PostHog project, jump straight into PostHog, and disconnect when needed. Disconnecting only severs the InsForge ↔ PostHog link; your PostHog project, events, and recordings stay intact.

## [​](#concepts) Concepts

## PostHog product analytics

Events, autocapture, insights, and dashboards behind the Analytics pages.

## PostHog session replay

How recordings are captured, redacted, and played back.

## [​](#build-with-it) Build with it

## PostHog wizard

Auto-detects your framework, installs the right PostHog SDK, and adds initialization code.

## PostHog JavaScript SDK

Capture custom events on top of what the wizard sets up.

## InsForge CLI

`npx @insforge/cli posthog setup` links your InsForge project to PostHog, then prints the wizard command.

## [​](#next-steps) Next steps

* Open the Analytics page in the dashboard and click **Connect PostHog**.
* Paste the setup prompt into your coding agent, then run the `@posthog/wizard` command it prints to wire the SDK into your app.
* Set up the [CLI](/quickstart) if you want to manage the connection from the terminal.

[Overview](/core-concepts/compute/overview)[Overview](/agent-native/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)