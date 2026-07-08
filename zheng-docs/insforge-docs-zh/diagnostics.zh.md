## 本页内容

* [完整健康报告](#完整健康报告)
* [后端顾问](#后端顾问)
* [定向检查](#定向检查)
* [让 AI 代理解释它](#让-ai-代理解释它)
* [后续步骤](#后续步骤)

Agent-Native 计划

# 诊断与顾问

复制页面

AI 代理读取后端健康状态、顾问发现结果和错误日志，然后应用修复。

复制页面

当出现问题时，AI 代理不应该需要猜测。`npx @insforge/cli diagnose` 将后端自身的信号转化为 AI 代理可以直接获取并采取行动的信息：带修复建议的顾问发现结果、数据库健康检查、实例指标和聚合的错误日志。每个发现结果都附带修复方法，因此"出了什么问题"和"该怎么做"同时到位。AI 代理自己拉取所有这些信息，无需经过控制面板，这使得它能够在数据泄露之前关闭诸如宽松的 RLS 策略等安全漏洞。

![后端顾问发现：public.messages 上的宽松 RLS 策略，带有"复制修复"按钮](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/backend-advisor.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=83b8c140db1c48ef975c14b2c5caec7a)

## [​](#完整健康报告) 完整健康报告

不带子命令运行 `diagnose` 一次性获取所有内容：

```
npx @insforge/cli diagnose
npx @insforge/cli diagnose --json
```

报告将顾问扫描、数据库健康、实例指标和最近的错误日志捆绑到一个输出中。在 `--json` 模式下，AI 代理可以获得所有这些结构化数据。

## [​](#后端顾问) 后端顾问

该顾问扫描安全、性能和健康问题，并为每个问题编写修复方案。控制面板显示发现结果并附带"复制修复"按钮，但 AI 代理不需要控制面板：它直接通过 `--json` 获取相同的扫描结果并自行应用修复，因此安全问题无需等待人类注意到即可关闭。

```
npx @insforge/cli diagnose advisor
npx @insforge/cli diagnose advisor --json
```

典型的发现结果是宽松的 RLS 策略，导致表暴露给匿名用户。顾问会指出表名、严重程度和修复的 SQL。AI 代理读取发现结果，将修复方案作为[迁移文件](/core-concepts/database/migrations)应用，并重新扫描以确认已清除。

## [​](#定向检查) 定向检查

报告的每个部分也可以单独获取：

| 命令 | 检查内容 |
| --- | --- |
| `diagnose advisor` | 最新顾问扫描：安全、性能和健康问题 |
| `diagnose db` | 数据库健康：连接数、表膨胀、索引使用情况 |
| `diagnose metrics` | 实例指标：CPU、内存、磁盘和网络 |
| `diagnose logs` | 跨所有后端源聚合的错误级别日志 |

如需单个源的原始日志，使用顶层命令：

```
npx @insforge/cli logs function.logs
npx @insforge/cli logs postgres.logs
```

源包括 `insforge.logs`、`postgREST.logs`、`postgres.logs`、`function.logs` 和 `function-deploy.logs`。

## [​](#让-ai-代理解释它) 让 AI 代理解释它

`diagnose --ai` 将收集的诊断数据交给模型并返回通俗易懂的分析：

```
npx @insforge/cli diagnose --ai "为什么上次部署后写入延迟飙升了？"
```

这就是转储堆栈跟踪和解释修复方法之间的区别。AI 代理询问有关线上后端的问题，并得到基于实际信号的答案。

## [​](#后续步骤) 后续步骤

* 将顾问修复方案作为[迁移文件](/core-concepts/database/migrations)应用，使修复得到版本控制。
* 在[后端分支](/agent-native/branching)上演练有风险的修复，然后再触及生产环境。
* 阅读 [CLI 工具集](/agent-native/cli-harness)了解其余的命令面。

[CLI 工具集](/agent-native/cli-harness)[配置即代码](/agent-native/config-as-code)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)