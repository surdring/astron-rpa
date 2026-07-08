## 本页内容

* [功能特性](#features)
  + [一键连接 PostHog](#one-click-posthog-connection)
  + [通过 PostHog 向导配置 SDK](#sdk-setup-via-posthog-wizard)
  + [流量分析](#traffic)
  + [用户留存](#user-retention)
  + [会话回放](#session-replay)
  + [设置和断开连接](#settings-and-disconnect)
* [概念](#concepts)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

分析

# 分析

复制页面

由 PostHog 驱动的产品分析功能。

复制页面

使用 InsForge Analytics 了解用户实际如何使用你的应用：页面流量、留存率和会话回放，所有功能通过将 PostHog 项目连接到你的 InsForge 后端即可实现。连接后，仪表盘会在你的 PostHog 数据之上渲染流量、用户留存和会话回放页面，无需离开 InsForge。
一键连接 PostHog，将设置提示粘贴到你的编码代理中，让它在你的前端上运行 PostHog 向导并安装 PostHog SDK，然后 Analytics 页面就会开始填充数据。

![InsForge Analytics 仪表盘，展示访客 KPI、访客趋势图以及热门页面、国家和设备分类](https://mintcdn.com/insforge-468ccf39/iHW7jg6w-rTgUUpq/images/dashboard-analytics.png?fit=max&auto=format&n=iHW7jg6w-rTgUUpq&q=85&s=9d6946a014fee83449d32d02817d3025)

PostHog 仍然是事件、仪表盘、洞察和录制的真实数据源。InsForge 为日常检查提供精选的子集，然后通过深层链接跳转到 PostHog 以获取更多信息。

## [​](#features) 功能特性

### [​](#one-click-posthog-connection) 一键连接 PostHog

从仪表盘的 Analytics 页面连接 PostHog。InsForge 会为你配置或关联一个 PostHog 项目，在服务端存储凭据，连接成功后即可解锁流量、留存和会话回放页面。

### [​](#sdk-setup-via-posthog-wizard) 通过 PostHog 向导配置 SDK

连接后，空状态页面会提供一个设置提示，你可以将其粘贴到编码代理中：

```
我想为这个项目添加产品分析功能。读取当前目录并使用 InsForge 技能，通过运行 `npx @insforge/cli posthog setup` 来设置 PostHog 分析。
```

`@insforge/cli posthog setup` 将你的 InsForge 项目关联到 PostHog，然后打印出官方的 [PostHog 向导](https://posthog.com/docs/libraries/wizard) 命令（`npx -y @posthog/wizard@latest`）供你（或你的代理）下一步运行。该向导会检测你的框架，安装正确的 PostHog SDK，并插入初始化代码，从而使页面浏览量、自动捕获事件和会话录制开始流动。

### [​](#traffic) 流量分析

在你选择的时间范围内显示 KPI（访客数、页面浏览量、会话数、跳出率和趋势），以及按页面、国家和设备类型的分类。适合在不打开 PostHog 的情况下进行"这周应用运行得怎么样"的快速检查。

### [​](#user-retention) 用户留存

基于 PostHog 事件构建的群组留存图表。选择时间范围，查看有多少用户在接下来的几天或几周内回访。

### [​](#session-replay) 会话回放

最近会话录制的分页列表，包含时长、用户信息以及指向 PostHog 完整回放播放器的深层链接。帮助你在流量或留存数据中发现异常后，直接观察用户的实际操作。

### [​](#settings-and-disconnect) 设置和断开连接

Analytics 配置对话框（侧边栏中的齿轮图标）允许管理员查看已关联的 PostHog 项目，直接跳转到 PostHog，以及在需要时断开连接。断开连接只会切断 InsForge 与 PostHog 之间的链接；你的 PostHog 项目、事件和录制内容保持不变。

## [​](#concepts) 概念

## PostHog 产品分析

Analytics 页面背后的事件、自动捕获、洞察和仪表盘。

## PostHog 会话回放

录制内容如何被捕获、编辑和回放。

## [​](#build-with-it) 构建应用

## PostHog 向导

自动检测你的框架，安装正确的 PostHog SDK，并添加初始化代码。

## PostHog JavaScript SDK

在向导设置的基础上捕获自定义事件。

## InsForge CLI

`npx @insforge/cli posthog setup` 将你的 InsForge 项目关联到 PostHog，然后打印向导命令。

## [​](#next-steps) 后续步骤

* 在仪表盘中打开 Analytics 页面，点击**连接 PostHog**。
* 将设置提示粘贴到你的编码代理中，然后运行它打印的 `@posthog/wizard` 命令，将 SDK 接入你的应用。
* 设置 [CLI](/quickstart)，如果你想从终端管理连接。

[概览](/core-concepts/compute/overview)[概览](/agent-native/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)