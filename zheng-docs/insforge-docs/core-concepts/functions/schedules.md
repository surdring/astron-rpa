## On this page

* [Concepts](#concepts)
* [Usage](#usage)
* [Limits](#limits)
* [More resources](#more-resources)

Edge Functions

# Schedules: cron-triggered functions

Copy page

Run a function on a cron schedule using pg\_cron

Copy page

Schedules invoke functions on a recurring cron expression. [pg\_cron](https://github.com/citusdata/pg_cron) fires an HTTP request to the function URL at each tick and logs the result.

## [​](#concepts) Concepts

A schedule is a cron expression, a target URL, and headers. On creation, `${{secrets.KEY}}` placeholders in headers are resolved and encrypted with `pgcrypto`. At each tick, `execute_job()` decrypts headers, calls the function, and writes status and duration to `schedules.job_logs`.

## [​](#usage) Usage

Standard 5-field cron (no seconds). Reference secrets in headers instead of hardcoding keys.

```
*/5 * * * *   every 5 minutes
0 * * * *     every hour
0 0 * * *     daily at midnight
0 9 * * 1     every Monday at 9am
0 0 1 * *     first of every month
```

Create via dashboard or SQL:

```
select schedules.create_job(
  name       => 'daily-cleanup',
  schedule   => '0 0 * * *',
  url        => 'https://myapp.functions.insforge.app/cleanup',
  headers    => jsonb_build_object('Authorization', 'Bearer ${{secrets.CRON_TOKEN}}')
);
```

## [​](#limits) Limits

Minimum interval is 1 minute (pg\_cron). Failed runs are logged but not retried, so the function must be idempotent. Deleting a referenced secret breaks every job using it until you update or disable the schedule.

## [​](#more-resources) More resources

* [pg\_cron docs](https://github.com/citusdata/pg_cron) for cron syntax.
* [Functions overview](/core-concepts/functions/overview) for the runtime.
* [crontab.guru](https://crontab.guru) to check an expression.

[Overview](/core-concepts/functions/overview)[Overview](/core-concepts/ai/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)