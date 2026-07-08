## 本页内容

* [概述](#概述)
* [命令汇总](#命令汇总)
* [推荐工作流程](#推荐工作流程)
* [insforge.toml 覆盖的内容](#insforgetoml-覆盖的内容)
* [config plan](#config-plan)
* [config apply](#config-apply)
* [config export](#config-export)
* [密钥引用](#密钥引用)
* [何时使用](#何时使用)
* [故障排除](#故障排除)
* [相关文档](#相关文档)

Agent-Native 计划

# 配置即代码

复制页面

通过 CLI 的 plan、apply 和 export 工作流程，从单个 insforge.toml 文件以声明方式管理 InsForge 的认证、SMTP、存储、保留策略和部署设置。

复制页面

## [​](#概述) 概述

`insforge.toml` 是一个声明式的、受版本控制的项目配置子集快照：认证策略、允许的重定向 URL、密码规则、SMTP、存储上传大小、实时和调度保留策略以及部署子域名。CLI 提供了三个针对此文件工作的命令：

* **`config plan`**：将 `insforge.toml` 与已链接的项目进行对比。显示将要变更的内容。
* **`config apply`**：将差异推送到在线项目。支持按变更的能力门控、环境解析的密钥、dry-run 模式。
* **`config export`**：拉取当前项目状态并写入一个新的 `insforge.toml`。适用于从现有项目引导配置。

你在仓库中保留**一个** `insforge.toml`。要将其应用到不同的环境（staging、prod、团队成员的本地后端或自托管实例），只需将 CLI 指向不同的项目（重新链接或使用 `--project-id`）。密钥通过 `env(...)` 引用从环境变量中读取，因此文件本身不包含凭据，可以安全地提交。
这在 InsForge Cloud 项目和自托管的 OSS 部署上工作方式相同。

所有示例均使用 `npx @insforge/cli`。不要全局安装 CLI。

## [​](#命令汇总) 命令汇总

| 命令 | 用途 |
| --- | --- |
| `config plan` | 显示 `insforge.toml` 与线上项目状态之间的差异 |
| `config apply` | 将 `insforge.toml` 应用到线上项目 |
| `config apply --dry-run` | 打印计划但不应用 |
| `config apply --auto-approve` | 跳过交互式确认提示（`--json` 模式下必需） |
| `config export` | 拉取线上配置并写入 `insforge.toml` |
| `config export --force` | 覆盖已有的 `insforge.toml` 而不确认 |

`config plan` 和 `config apply` 读取 `insforge.toml`；如果文件不在 `./insforge.toml` 路径，则传递 `--file <path>`。`config export` 写入文件；传递 `--out <path>` 写入自定义位置。

## [​](#推荐工作流程) 推荐工作流程

1

从现有项目引导

如果你已经通过控制面板配置过项目，导出一份以获取可用的文件：

```
npx @insforge/cli config export
```

这将写入反映当前后端状态的 `insforge.toml`。

2

提交到版本控制

将 `insforge.toml` 检入版本控制系统。密钥通过 `env(...)` 引用，因此文件可以安全提交。

3

编辑并计划

更改 TOML 文件，然后在应用前预览差异：

```
npx @insforge/cli config plan
```

4

应用

```
npx @insforge/cli config apply
```

查看渲染的计划并确认。在 CI 中，传递 `--auto-approve` 和 `--json`。

5

在其他地方应用同一文件

要将相同的配置推送到 staging 或自托管后端，将 CLI 指向另一个项目并重新运行 apply：

```
npx @insforge/cli --project-id <staging-project-id> config apply
```

不同环境间不同的密钥（如 SMTP 密码等）会根据本地 shell 按环境解析，因此 TOML 不需要更改。

## [​](#insforgetoml-覆盖的内容) 什么 `insforge.toml` 覆盖

该文件镜像了项目配置的一个精选子集，即那些适合以声明方式管理的部分。未在此列表中的内容仍保留在控制面板和 API 中。

| 部分 | 键名 |
| --- | --- |
| `[auth]` | `allowed_redirect_urls`, `require_email_verification`, `verify_email_method`, `reset_password_method`, `disable_signup` |
| `[auth.password]` | `min_length`, `require_number`, `require_lowercase`, `require_uppercase`, `require_special_char` |
| `[auth.smtp]` | `enabled`, `host`, `port`, `username`, `password`, `sender_email`, `sender_name`, `min_interval_seconds` |
| `[storage]` | `max_file_size_mb` |
| `[realtime]` | `retention_days` |
| `[schedules]` | `retention_days` |
| `[deployments]` | `subdomain` |

由于 TOML 没有 `null` 字面量，使用 `retention_days = 0` 来禁用实时消息或调度执行日志的保留清理；`config apply` 会将该值作为 `null` 发送到后端。邮件模板、OAuth 提供商应用凭据、存储桶、实时通道、函数、部署环境变量和密钥不通过此文件管理。
完整示例：

```
[auth]
require_email_verification = true
verify_email_method = "code"
reset_password_method = "code"
disable_signup = false
allowed_redirect_urls = [
  "https://app.example.com/auth/callback",
  "http://localhost:3000/auth/callback",
]

[auth.password]
min_length = 12
require_number = true
require_lowercase = true
require_uppercase = true
require_special_char = false

[auth.smtp]
enabled = true
host = "smtp.sendgrid.net"
port = 587
username = "apikey"
password = "env(SENDGRID_API_KEY)"
sender_email = "noreply@example.com"
sender_name = "Acme"

[storage]
max_file_size_mb = 100

[realtime]
retention_days = 7

[schedules]
retention_days = 0

[deployments]
subdomain = "acme-prod"
```

## [​](#config-plan) `config plan`

```
npx @insforge/cli config plan
npx @insforge/cli config plan --file ./config/insforge.toml
npx @insforge/cli --json config plan
```

`plan` 读取 `insforge.toml`，通过 `/api/metadata` 和存储、实时、调度的可选配置端点获取线上状态，然后打印渲染后的差异。它还会标记线上后端尚未公开的任何部分（如较早的自托管版本等）。`apply` 将跳过这些部分而不是导致整个运行失败。
在交互式会话中每次 `apply` 之前使用 `plan`，并作为 CI 门控来捕获意外漂移。

## [​](#config-apply) `config apply`

```
npx @insforge/cli config apply
npx @insforge/cli config apply --dry-run
npx @insforge/cli config apply --auto-approve
npx @insforge/cli --json config apply --auto-approve
```

`apply` 运行与 `plan` 相同的差异分析，然后遍历变更集：

1. **按变更的能力门控。** 每个变更都根据后端的元数据或该部分的配置端点进行检查。如果后端不支持某个部分（例如较旧的自托管实例未公开 SMTP），则跳过该部分并给出命名警告，其余变更仍然应用。
2. **密钥解析。** TOML 中的 `env(...)` 引用在 apply 时从本地环境解析。如果引用的变量缺失，命令会在发送任何更新之前中止，因此后端不会处于半配置状态。
3. **按部分分发。** 每个变更发送到相应的后端端点（`/api/auth/config`、`/api/auth/smtp-config`、`/api/storage/config`、`/api/realtime/config`、`/api/schedules/config`、`/api/deployments/slug` 等）。变更是独立的，因此一个部分的失败不会回滚之前成功的部分。

标志位：

* `--dry-run` 打印计划并退出，不应用。
* `--auto-approve` 跳过交互式确认。当设置了 `--json` 时必须使用，因为没有 TTY 用于提示。
* `--file <path>` 覆盖默认的 `./insforge.toml` 位置。

## [​](#config-export) `config export`

```
npx @insforge/cli config export
npx @insforge/cli config export --out ./config/insforge.toml
npx @insforge/cli config export --force
```

`export` 拉取线上项目的可配置面并写入 TOML 文件。使用它来：

* 从一直在通过控制面板配置的项目引导 `insforge.toml`。
* 通过导出到临时文件并比较来对比手动编辑与当前后端状态。
* 在有风险的变更前快照配置，以便需要回滚时可以重新应用快照。

`export` 写入的文件形状与 `apply` 期望的相同，因此支持往返操作。
没有 `--force` 时，`export` 在交互模式下拒绝覆盖已有文件，并在 `--json` 模式下返回 `OUTPUT_EXISTS` 错误。

## [​](#密钥引用) 密钥引用

`auth.smtp.password` 和任何其他敏感字段可以表示为 `env(VAR_NAME)` 而不是字面值：

```
[auth.smtp]
password = "env(SENDGRID_API_KEY)"
```

在 apply 时，CLI 从本地环境读取 `SENDGRID_API_KEY`，验证其存在，并将解析后的值发送到后端。TOML 本身从不包含密钥，因此可以提交。
这就是一个 `insforge.toml` 可以干净地应用到多个环境的原因：开发和生产后端的区别仅在于运行 `apply` 时作用域内的*哪个* `SENDGRID_API_KEY`。
作为 `apply` 目标的 TOML 中的 `env(...)` 引用会在每次运行时重新发送解析后的密码。这是 CLI 告诉后端"密钥可能已经轮换，请更新"的唯一方式。没有 `env(...)` 引用的字段被视为保留现有值。

## [​](#何时使用) 何时使用

* **项目配置的版本控制。** 重定向 URL、注册策略、密码策略、邮件验证模式、SMTP、存储上传大小和保留时间窗口都保存在团队通过 PR 审查的文件中。
* **多环境一致性。** 一个 TOML 应用于开发、staging 和生产环境，使支持的项目设置在所有环境中保持一致。环境特定的值（子域名、SMTP 凭据）通过 `--project-id` 覆盖和 `env(...)` 引用传递。
* **CI 驱动的配置变更。** 从部署管道运行 `config apply --auto-approve --json`。结合 `config plan` 作为 PR 检查，让审查者看到合并会在生产中改变什么。
* **灾难恢复。** 已提交的 `insforge.toml` 是一个已知良好的配置快照。在恢复项目后重新应用它，可在数秒内将认证、SMTP、存储、保留策略和部署设置恢复到预期状态。
* **自托管和本地 OSS 开发。** 对 docker-compose 栈运行 `npx @insforge/cli link --api-base-url http://localhost:7130 --api-key <local-key>`，然后像指向云环境一样将 CLI 的配置命令指向本地 OSS 实例。

## [​](#故障排除) 故障排除

**`在没有 --auto-approve 或 --yes 的情况下拒绝在 --json 模式下应用`**。CLI 从不在非交互式运行时静默应用更改。显式传递 `--auto-approve`（或 `-y`）。
**`你的后端不公开 <section>`**。链接的后端版本尚没有相关的 API。你的其他更改仍然已应用。升级后端（或等待下一个版本）以应用该部分。
**`env(...) 引用解析为空`**。当引用的环境变量缺失时，CLI 在任何 API 调用之前中止。在你的 shell 或 CI 的密钥存储中设置该变量，然后重新运行。
**`Slug 已被占用`**。`deployments.subdomain` 与同一后端上另一个项目的子域名冲突。选择一个不同的值。

## [​](#相关文档) 相关文档

* [CLI 工具集](/agent-native/cli-harness)：AI 代理驱动的完整命令面
* [部署安全指南](/deployment/deployment-security-guide)：部署后加固自托管后端

[诊断与顾问](/agent-native/diagnostics)[分支](/agent-native/branching)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)