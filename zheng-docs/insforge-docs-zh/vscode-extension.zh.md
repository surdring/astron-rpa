## 本页内容

* [概述](#概述)
* [链接](#链接)
* [安装](#安装)
* [使用扩展](#使用扩展)
* [支持的 AI 客户端](#支持的-ai-客户端)
* [备注](#备注)

Agent-Native 计划

# VS Code 扩展

复制页面

从 VS Code 登录 InsForge，选择组织和项目，一键将 InsForge MCP 服务器安装到你的 AI 编码助手中。

复制页面

## [​](#概述) 概述

InsForge VS Code 扩展：

* 让你登录 InsForge（OAuth + PKCE）
* 让你选择组织/项目
* 为你的 AI 客户端安装 InsForge MCP

它使用你的项目的 API 密钥和 API 基础 URL 启动 MCP 安装程序（`npx @insforge/install`）。

## [​](#链接) 链接

* [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=InsForge.insforge)
* [Open VSX](https://open-vsx.org/extension/InsForge/insforge)

## [​](#安装) 安装

1. 打开 VS Code
2. 转到**扩展**
3. 搜索 **InsForge**
4. 安装由 **insforge** 发布的扩展

## [​](#使用扩展) 使用扩展

1

打开 InsForge 面板

点击活动栏（左侧边栏）中的 **InsForge** 图标。

2

登录

点击 **Login with InsForge** 并在浏览器中完成登录流程。

回调地址为 `http://127.0.0.1:54321/callback`。

3

选择项目

从 InsForge 树视图中选择一个组织和项目，或者从命令面板运行 `InsForge: Select Project`。

4

安装 MCP

运行 `InsForge: Install MCP`（或右键点击项目并选择 **Install MCP**），然后选择要配置的 AI 客户端。安装程序在 VS Code 终端中运行。

## [​](#支持的-ai-客户端) 支持的 AI 客户端

该扩展支持以下 MCP "客户端"（传递给 `@insforge/install` 的值）：

| 客户端 | 典型配置位置 |
| --- | --- |
| `cursor` | `~/.cursor/mcp.json` |
| `claude-code` | 工作区中的 `.mcp.json`（项目本地） |
| `copilot` | 工作区中的 `.vscode/mcp.json`（项目本地） |
| `windsurf` | `~/.codeium/windsurf/` |
| `cline` | Cline VS Code 扩展配置 |
| `roocode` | Roo Code VS Code 扩展配置 |
| `codex` | OpenAI Codex CLI 配置 |
| `trae` | Trae IDE 配置 |
| `qoder` | Qoder IDE 配置 |

如果你的客户端未列出，请手动运行安装程序（参见[快速开始](/quickstart)）。

## [​](#备注) 备注

* **项目本地安装**：`claude-code` 和 `copilot` 需要打开的工作区文件夹。
* **端口已被占用**：释放 `54321` 并重试登录。

[概述](/agent-native/overview)[CLI 工具集](/agent-native/cli-harness)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)