## 本页内容

* [概念](#concepts)
* [使用方法](#usage)
* [限制](#limits)
* [更多资源](#more-resources)

边缘函数

# 定时任务：cron 触发的函数

复制页面

使用 pg\_cron 按 cron 定时计划运行函数

复制页面

定时任务按重复的 cron 表达式调用函数。[pg\_cron](https://github.com/citusdata/pg_cron) 在每次触发时向函数 URL 发送 HTTP 请求并记录结果。

## [​](#concepts) 概念

一个定时任务由 cron 表达式、目标 URL 和请求头组成。创建时，请求头中的 `${{secrets.KEY}}` 占位符会被解析并使用 `pgcrypto` 加密。每次触发时，`execute_job()` 解密请求头，调用函数，并将状态和持续时间写入 `schedules.job_logs`。

## [​](#usage) 使用方法

标准的 5 字段 cron（不含秒）。在请求头中引用密钥，而不是硬编码密钥。

```
*/5 * * * *   每 5 分钟
0 * * * *     每小时
0 0 * * *     每天午夜
0 9 * * 1     每周一上午 9 点
0 0 1 * *     每月第一天
```

通过仪表盘或 SQL 创建：

```
select schedules.create_job(
  name       => 'daily-cleanup',
  schedule   => '0 0 * * *',
  url        => 'https://myapp.functions.insforge.app/cleanup',
  headers    => jsonb_build_object('Authorization', 'Bearer ${{secrets.CRON_TOKEN}}')
);
```

## [​](#limits) 限制

最小间隔为 1 分钟（pg\_cron 的限制）。失败运行会被记录但不会重试，因此函数必须是幂等的。删除被引用的密钥会破坏所有使用该密钥的作业，直到你更新或禁用该定时任务。

## [​](#more-resources) 更多资源

* [pg\_cron 文档](https://github.com/citusdata/pg_cron) 了解 cron 语法。
* [函数概览](/core-concepts/functions/overview) 了解运行时。
* [crontab.guru](https://crontab.guru) 检查表达式。

[概览](/core-concepts/functions/overview)[概览](/core-concepts/ai/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)