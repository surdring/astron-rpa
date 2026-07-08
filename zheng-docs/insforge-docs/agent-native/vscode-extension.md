## On this page

* [Overview](#overview)
* [Links](#links)
* [Install](#install)
* [Use the extension](#use-the-extension)
* [Supported AI clients](#supported-ai-clients)
* [Notes](#notes)

Agent-Native Initiatives

# VS Code extension

Copy page

Sign in to InsForge from VS Code, pick an org and project, and install the InsForge MCP server into your AI coding assistant with one click.

Copy page

## [​](#overview) Overview

The InsForge VS Code extension:

* Logs you in to InsForge (OAuth + PKCE)
* Lets you pick an org/project
* Installs InsForge MCP for your AI client

It launches the MCP installer (`npx @insforge/install`) with your project’s API key and API base URL.

## [​](#links) Links

* [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=InsForge.insforge)
* [Open VSX](https://open-vsx.org/extension/InsForge/insforge)

## [​](#install) Install

1. Open VS Code
2. Go to **Extensions**
3. Search for **InsForge**
4. Install the extension published by **insforge**

## [​](#use-the-extension) Use the extension

1

Open the InsForge panel

Click the **InsForge** icon in the Activity Bar (left sidebar).

2

Login

Click **Login with InsForge** and complete the login flow in your browser.

The callback is `http://127.0.0.1:54321/callback`.

3

Select a project

Pick an organization and project from the InsForge tree view, or run `InsForge: Select Project` from the Command Palette.

4

Install MCP

Run `InsForge: Install MCP` (or right-click a project and choose **Install MCP**), then pick the AI client you want to configure.The installer runs in a VS Code terminal.

## [​](#supported-ai-clients) Supported AI clients

The extension supports the following MCP “clients” (the value passed to `@insforge/install`):

| Client | Typical config location |
| --- | --- |
| `cursor` | `~/.cursor/mcp.json` |
| `claude-code` | `.mcp.json` in your workspace (project-local) |
| `copilot` | `.vscode/mcp.json` in your workspace (project-local) |
| `windsurf` | `~/.codeium/windsurf/` |
| `cline` | Cline VS Code extension config |
| `roocode` | Roo Code VS Code extension config |
| `codex` | OpenAI Codex CLI config |
| `trae` | Trae IDE config |
| `qoder` | Qoder IDE config |

If your client isn’t listed, run the installer manually (see [Quickstart](/quickstart)).

## [​](#notes) Notes

* **Project-local installs**: `claude-code` and `copilot` require an open workspace folder.
* **Port in use**: free up `54321` and retry login.

[Overview](/agent-native/overview)[CLI harness](/agent-native/cli-harness)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)