## 本页内容

* [为什么 AI 代理需要 CLI](#为什么-ai-代理需要-cli)
* [命令面](#命令面)
* [一次典型的 AI 代理运行](#一次典型的-ai-代理运行)
* [让 AI 代理解释输出](#让-ai-代理解释输出)
* [后续步骤](#后续步骤)

Agent-Native 计划

# CLI 工具集

复制页面

InsForge CLI 是 AI 代理的双手：统一的终端接口，用于 schema、配置、部署和诊断。

复制页面

`@insforge/cli` 是编码 AI 代理用于操作后端的接口。人类会去操作控制面板，而 AI 代理则操作终端：它运行命令、读取输出并决定下一步操作。每个命令都支持 `--json` 输出，因此 AI 代理基于结构化数据工作，而不是抓取屏幕内容。

使用 `npx @insforge/cli` 运行 CLI。不要全局安装它，这样 AI 代理始终使用项目中锁定的版本。

## [​](#为什么-ai-代理需要-cli) 为什么 AI 代理需要 CLI

控制面板是为人类的指针操作设计的；CLI 则是为任何可以编写文本的工具设计的。向任何命令传递 `--json` 参数，AI 代理就能获得可以解析的结构化结果；传递 `--yes` 参数，它就会直接运行而无需等待确认提示。Schema、认证配置、存储、函数、部署、分支和诊断都是同一工具的子命令，因此只有一个命令面需要学习，而不是在控制面板中导航。它可以在任何终端、任何编辑器或 CI 中运行，无需额外集成。变更后，AI 代理可以运行 [`npx @insforge/cli diagnose`](/agent-native/diagnostics) 并准确读取出了什么问题。

## [​](#命令面) 命令面

| 领域 | 命令 |
| --- | --- |
| 认证与上下文 | `login`, `logout`, `whoami`, `current`, `list` |
| 项目 | `create`, `link` |
| Schema | `db migrations new`, `db migrations up`, `db migrations list` |
| 配置即代码 | `config plan`, `config apply`, `config export` |
| 分支 | `branch create`, `branch merge`, `branch reset`, `branch delete` |
| 构建 | `functions`, `storage`, `deployments`, `secrets`, `schedules`, `ai` |
| 诊断 | `diagnose`, `diagnose advisor`, `diagnose db`, `diagnose logs`, `metadata` |

运行 `npx @insforge/cli help <command>` 查看这些命令的标志位。

## [​](#一次典型的-ai-代理运行) 一次典型的 AI 代理运行

```
# 连接
npx @insforge/cli login
npx @insforge/cli link

# 读取当前状态
npx @insforge/cli --json metadata

# 安全地更改 schema
npx @insforge/cli db migrations new add-orders-table
npx @insforge/cli db migrations up --all

# 检查结果
npx @insforge/cli diagnose --json
```

## [​](#让-ai-代理解释输出) 让 AI 代理解释输出

诊断功能附带一个 AI 标志，让 AI 代理可以将自己的后端数据交给模型并获取解释：

```
npx @insforge/cli diagnose --ai "为什么在最后一次迁移后认证请求失败了？"
```

这将原始信号（顾问发现结果、数据库健康状态、错误日志）与通俗易懂的解读结合起来，将"这里有一个堆栈跟踪"变成"这是修复方法"。参见[诊断与顾问](/agent-native/diagnostics)。

## [​](#后续步骤) 后续步骤

* 将认证、SMTP、存储、保留策略和部署设置通过[配置即代码](/agent-native/config-as-code)纳入版本控制。
* 在[后端分支](/agent-native/branching)上测试有风险的变更，然后再触及生产环境。

[VS Code 扩展](/agent-native/vscode-extension)[诊断与顾问](/agent-native/diagnostics)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)