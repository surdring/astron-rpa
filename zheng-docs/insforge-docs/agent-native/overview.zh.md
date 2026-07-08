## 本页内容

* [基础原语](#基础原语)
* [为何重要](#为何重要)
* [工作循环](#工作循环)
* [后续步骤](#后续步骤)

Agent-Native 计划

# Agent-Native 计划

复制页面

让编码 AI 代理（而非人类）操作你的后端的原语。

复制页面

大多数后端都假设是人类在操作控制面板。而 InsForge 假设的是编码 AI 代理在终端中操作。产品（数据库、认证、存储等）是构建模块；而本页所述的原语则是 AI 代理操作它们的方式：作为可编辑的文件、可测试的分支、以及可自行诊断和修复的后端。

刚接触？从[通过 CLI 连接](/quickstart)开始，将你的项目与 InsForge 关联。本节介绍的是 AI 代理在连接后如何与后端*协作*。

## [​](#基础原语) 基础原语

## CLI 工具集

AI 代理的双手。统一的终端接口，用于登录、schema、部署、配置和诊断。

## 诊断与顾问

拉取 AI 顾问的发现结果、数据库健康状态、指标和错误日志，供 AI 代理读取和修复。

## 配置即代码

认证、SMTP、存储、保留策略和部署设置都位于 `insforge.toml` 中。像基础设施一样规划和应用。

## 分支功能

将整个后端克隆到隔离的分支中，用于测试有风险的变更，然后合并或重置。

## [​](#为何重要) 为何重要

人类和 AI 代理对后端的需求不同。人类需要一个可点击的 UI。AI 代理需要一个稳定的文本接口，它可以驱动、读取返回结果并进行推理。这在 InsForge 中处处可见。
Schema 变更就是仓库中的[迁移文件](/core-concepts/database/migrations)，项目配置就是一个 [`insforge.toml`](/agent-native/config-as-code) 文件，因此 AI 代理可以编辑文本、提交并在 PR 中审查，而不是通过填写表单来操作。当它想尝试有风险的操作时，会启动一个[后端分支](/agent-native/branching)，在副本上运行变更，如果出错则直接丢弃分支。当发现异常时，它直接通过 `npx @insforge/cli diagnose` 获取[诊断和顾问发现结果](/agent-native/diagnostics)，无需经过控制面板，并自行应用修复。最后这一点也是后端变得更安全的关键：AI 代理读取到安全发现（如过于宽松的 RLS 策略）后会自动修复，而不是等待人类记得去检查。它还能直接从后端读取当前 schema、日志和元数据（通过 `npx @insforge/cli metadata`），因此它基于真实状态而不是猜测来工作。

## [​](#工作循环) 工作循环

这些原语可以串联起来。一次典型的会话通常是：

1. 使用 `npx @insforge/cli metadata` 读取当前状态。
2. 分支后端，编写[迁移文件](/core-concepts/database/migrations)，使用 `npx @insforge/cli db migrations list` 检查待处理的变更，或者编辑 `insforge.toml` 并使用 `npx @insforge/cli config plan` 预览配置差异。
3. 使用 `npx @insforge/cli db migrations up --all` 或 `config apply` 应用变更，先在分支上应用，然后再应用到父分支。
4. 运行 `npx @insforge/cli diagnose` 检查顾问发现结果和错误日志，并使用 `diagnose --ai` 让 AI 解释它们。
5. 应用修复，重新运行诊断，然后合并分支。

## [​](#后续步骤) 后续步骤

* 阅读 [CLI 工具集](/agent-native/cli-harness)，了解 AI 代理驱动的完整命令面。
* 设置[配置即代码](/agent-native/config-as-code)，将项目设置纳入版本控制。
* 使用[诊断](/agent-native/diagnostics)让 AI 代理发现并修复后端问题。

[概述](/core-concepts/analytics/overview)[VS Code 扩展](/agent-native/vscode-extension)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)