## 本页内容

* [概述](#概述)
* [前提条件](#前提条件)
* [本地 MCP 配置（推荐）](#本地-mcp-配置推荐)
* [远程 MCP](#远程-mcp)
  + [连接并绑定项目](#连接并绑定项目)
  + [验证安装](#验证安装-14)
* [故障排除](#故障排除)

快速入门

# MCP 设置

复制页面

将您编辑器的 MCP 客户端连接到 InsForge。

复制页面

## [​](#概述) 概述

InsForge MCP 服务器让您的 AI 编码助手直接访问后端：数据库查询、模式管理、存储等。
请根据您的 AI 客户端按照以下说明操作。没有看到您的工具？浏览[智能体目录](https://insforge.dev/agents)获取完整的经过测试的集成列表。

## [​](#前提条件) 前提条件

* 一个 **AI 编码助手**（Cursor、Claude Code、GitHub Copilot 等）
* 一个 **InsForge 项目**——如果您还没有，请[在此创建一个](https://insforge.dev)

## [​](#本地-mcp-配置推荐) 本地 MCP 配置（推荐）

如果您希望本地配置 MCP，请在下方选择您的 AI 编码助手：

Cursor

### [​](#安装) 安装

您可以在 Cursor 中一键安装 MCP 服务器，只需点击下方截图中"Add to Cursor"按钮即可：![连接项目](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/connect-project.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=4ef0e69172a5b685170cea8adec6b0c3)或者，您可以手动安装 InsForge MCP 服务器：

1. 打开 **Cursor 设置**
2. 进入 **工具与 MCP**
3. 点击 **新建 MCP 服务器（添加自定义 MCP 服务器）**

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Cursor-MCP-1.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=ec15b20e709d8536d3d09666e89364e7)

4. 从 InsForge 项目粘贴 MCP JSON
5. 保存配置文件
6. 您应该会看到一个绿色圆点，表示 InsForge 已成功安装

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Cursor-MCP-2.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=177e1e5dbdc0cdfbd8248f8d442722e5)

### [​](#验证安装) 验证安装

要验证连接，请在 **Cursor** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **已连接** 状态指示器（右上角）。[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Cursor-MCP-3.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=bf99a7adcb00c864413df17464d9794b)

Claude Code

### [​](#安装-2) 安装

将 InsForge MCP 服务器添加到您的 **Claude Code**：

1. 在下拉列表中选择 **Claude Code**
2. 复制以下安装命令并在终端中粘贴
   ![Claude Code 连接](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/claude-code-connect.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=f4710fd707714996fd26934458e5b841)
3. 运行该命令

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/CC-MCP-1.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=1ce35e7b4049008f1be4b5a2b069956d)

### [​](#验证安装-2) 验证安装

要验证连接，请在 **Claude Code** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/CC-MCP-2.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=2853f145fde1384ce7b33e031a5916fd)

GitHub Copilot

### [​](#安装-3) 安装

将 InsForge MCP 服务器添加到您的 **GitHub Copilot**：

1. 在下拉列表中选择 **Copilot**
2. 打开终端并在您的 **GitHub Copilot** 终端中粘贴以下安装命令
   ![Copilot 设置](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/copilot-1.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=221c86348072caab475659fb65a2188e)
3. 运行该命令
   ![Copilot 安装](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/copilot-2.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=99a7f3f7e10a96e2605ff8a33014b9a9)

### [​](#验证安装-3) 验证安装

要验证连接，请在 **Copilot** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Google Antigravity

### [​](#安装-4) 安装

将 InsForge MCP 服务器添加到您的 **Antigravity**：

1. 在下拉列表中选择 **Antigravity**
2. 复制并在您的 **Antigravity** 终端中粘贴以下安装命令
   ![Antigravity 设置](https://mintcdn.com/insforge-468ccf39/wwfpEGfpasa8WQ2v/images/mcp-setup/antigravity-1.png?fit=max&auto=format&n=wwfpEGfpasa8WQ2v&q=85&s=4735cea56722391aa50ba551bb069565)
3. 运行该命令

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Antigravity-MCP.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=713f4d34514b5bcbade8d7793d551d3e)

### [​](#验证安装-4) 验证安装

要验证连接，请在 **Antigravity** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Kiro

### [​](#安装-5) 安装

将 InsForge MCP 服务器添加到您的 **Kiro**：

1. 在下拉列表中选择 **Kiro**
2. 复制并在您的 **Kiro** 终端中粘贴以下安装命令
   ![Kiro 设置](https://mintcdn.com/insforge-468ccf39/5PTkTfA4J4SdXhFA/images/mcp-setup/kiro-1.png?fit=max&auto=format&n=5PTkTfA4J4SdXhFA&q=85&s=67abb6d17cddbba5fbca379434d40adb)
3. 运行该命令

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Kiro-MCP.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=edd8a983c31a5d90c50d8b4563604721)

### [​](#验证安装-5) 验证安装

要验证连接，请在 **Kiro** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Codex

### [​](#安装-6) 安装

将 InsForge MCP 服务器添加到您的 **Codex**：

1. 在下拉列表中选择 **Codex**
2. 复制并在您的终端中粘贴以下安装命令
   ![Codex 设置](https://mintcdn.com/insforge-468ccf39/5PTkTfA4J4SdXhFA/images/mcp-setup/codex-1.png?fit=max&auto=format&n=5PTkTfA4J4SdXhFA&q=85&s=2068920d304e6c480f50fdcd2f31bb53)
3. 运行该命令

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Codex-MCP.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=cd10c47b913ef5e4c1315299a91cc44a)

### [​](#验证安装-6) 验证安装

要验证连接，请在 **Codex** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Cline

### [​](#安装-7) 安装

将 InsForge MCP 服务器添加到您的 **Cline**：

1. 在下拉列表中选择 **Cline**
2. 复制并在您的 **Cline** 终端中粘贴以下安装命令
   ![Cline 设置](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/cline-1.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=dab0c00ea8e9fce316e779848106c00d)
3. 运行该命令
   ![Cline 安装](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/cline-2.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=e37c81b5d4aed0ae1b60eba94761d2b5)

### [​](#验证安装-7) 验证安装

要验证连接，请在 **Cline** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Windsurf

### [​](#安装-8) 安装

将 InsForge MCP 服务器添加到您的 **Windsurf**：

1. 在下拉列表中选择 **Windsurf**
2. 复制并在您的 Windsurf 终端中粘贴以下安装命令
   ![Windsurf 设置](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/windsurf-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=91a6056a1e8088b515156f56490c4343)
3. 运行该命令

### [​](#验证安装-8) 验证安装

要验证连接，请在 **Windsurf** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Trae

### [​](#安装-9) 安装

将 InsForge MCP 服务器添加到您的 **Trae**：

1. 在下拉列表中选择 **Trae**
2. 复制并在您的 **Trae** 终端中粘贴以下安装命令
   ![Trae 设置](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/trae-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=a5e5faf52df23ee7f1d3efab722d299d)
3. 运行该命令
   ![Trae 安装](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/trae-2.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=259dd8b31ce81cddd11c01c0b01f92bf)

此外，Trae 提供与 InsForge 的一体化集成，您可以直接从 Trae 的官方 MCP 市场安装 InsForge：

1. 打开 Trae 的 **设置** → 进入 **MCP**
2. 点击 **添加**，然后选择 **从市场添加**
3. 搜索 "InsForge" 并从市场中添加
   ![Trae 市场](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/trae-3.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=6719b557c7caad564b2eb3f3ce642cb1)
4. 所需的凭证 API_KEY 和 API_BASE_URL，您可以在 InsForge 的 **设置** → **连接** 标签页中找到
   ![Trae 凭证](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/trae-4.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=727db2b107ce3a9cfb2180dea3982c25)

### [​](#验证安装-9) 验证安装

要验证连接，请在 **Trae** 中启动一个新的聊天，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Qoder

### [​](#安装-10) 安装

将 InsForge MCP 服务器添加到您的 **Qoder**：

1. 在下拉列表中选择 **Qoder**
2. 复制并在您的 **Qoder** 终端中粘贴以下安装命令
   ![Qoder 设置](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/qoder-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=37c6bc50f023b31739367445da1fd38b)
3. 运行该命令

### [​](#验证安装-10) 验证安装

要验证连接，请在 **Qoder** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Roo Code

### [​](#安装-11) 安装

将 InsForge MCP 服务器添加到您的 **Roo Code**：

1. 在下拉列表中选择 **Roo Code**
2. 复制并在您的 **Roo Code** 终端中粘贴以下安装命令
   ![Roo Code 设置](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/roocode-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=412db91485b669f7b98f532436954648)
3. 运行该命令

### [​](#验证安装-11) 验证安装

要验证连接，请在 **Roo Code** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

OpenCode

### [​](#安装-12) 安装

将 InsForge MCP 服务器添加到您的 **OpenCode**：

1. 在下拉列表中选择 **OpenCode**
2. 复制并在您的终端中粘贴以下安装命令
   ![连接项目](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/connect-project.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=4ef0e69172a5b685170cea8adec6b0c3)
3. 运行该命令

### [​](#验证安装-12) 验证安装

要验证连接，请在 **OpenCode** 中启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

MCP JSON

### [​](#安装-13) 安装

使用 MCP JSON 将 InsForge MCP 服务器添加到您的编码智能体：

1. 在下拉列表中选择 **MCP JSON**
2. 复制并在您的智能体中粘贴以下 **MCP JSON** 配置
   ![MCP JSON 设置](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/mcp-json-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=c9ffc9491236a1cf8fcf637e8c22cca1)

### [​](#验证安装-13) 验证安装

要验证连接，启动一个新的聊天会话，并向您的智能体发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

## [​](#远程-mcp) 远程 MCP

开始使用的最快方式是远程 MCP。一条命令即可尝试安装，并会自动处理身份验证和项目绑定，但如果自动流程无法完成，可能仍会提示您手动进行身份验证或项目绑定步骤。
在终端中运行以下命令：

```
npx add-mcp https://mcp.insforge.dev/mcp
```

`add-mcp` 命令适用于大多数编码智能体，但并非全部。目前支持：
Claude Code、Claude Desktop、Codex、Cursor、Gemini CLI、Goose、GitHub Copilot、OpenCode、VS Code、Zed。

运行该命令后，系统将自动为您的编码智能体生成配置文件。

### [​](#连接并绑定项目) 连接并绑定项目

某些 MCP 客户端会在设置过程中自动提示您登录，而其他客户端可能需要手动身份验证或项目绑定步骤（如果自动流程无法完成）。无论如何，身份验证将打开一个浏览器窗口，您可以在其中登录您的 InsForge 账户，并授予 MCP 客户端组织/项目访问权限。

Cursor

您可以在 `.cursor/mcp.json` 中找到配置文件，内容如下：

```
{
  "mcpServers": {
    "insforge": {
      "url": "https://mcp.insforge.dev/mcp"
    }
  }
}
```

在菜单 **偏好设置 → Cursor 设置 → 工具与 MCP** 中，您应该看到 InsForge MCP 服务器已成功添加。
InsForge MCP 服务器状态为"需要身份验证"，您可以点击 `连接` 按钮进行身份验证。

Claude Code

安装后，您将在 `.mcp.json` 中找到配置文件，内容如下：

```
{
  "mcpServers": {
    "insforge": {
      "type": "http",
      "url": "https://mcp.insforge.dev/mcp"
    }
  }
}
```

然后在常规终端（非 IDE 扩展）中运行：

```
claude /mcp
```

选择"insforge"服务器，然后选择"Authenticate"开始身份验证流程。

GitHub Copilot

安装后，您将在 `.vscode/mcp.json` 中找到配置文件，内容如下：

```
{
  "servers": {
    "insforge": {
      "type": "http",
      "url": "https://mcp.insforge.dev/mcp"
    }
  }
}
```

Google Antigravity

将此配置添加到 `~/.gemini/antigravity/mcp_config.json`：

```
{
  "mcpServers": {
    "insforge": {
      "serverUrl": "https://mcp.insforge.dev/mcp"
    }
  }
}
```

然后重新启动 Antigravity，它将自动进行身份验证。

Gemini

安装后，您将在 `.gemini/settings.json` 中找到配置文件，内容如下：

```
{
  "mcpServers": {
    "insforge": {
      "type": "http",
      "url": "https://mcp.insforge.dev/mcp"
    }
  }
}
```

启动 Gemini CLI 并运行以下命令以验证服务器：

```
/mcp auth insforge
```

Codex

如果您是第一次使用 Codex，可能需要启用 rmcp 功能。为此，请将以下内容添加到您的 `~/.codex/config.toml` 文件中：

```
[beta]
rmcp = true
```

安装后，您将在 `.codex/config.toml` 中找到配置文件，内容如下：

```
[mcp_servers.insforge]
type = "http"
url = "https://mcp.insforge.dev/mcp"
```

然后进行身份验证：

```
codex mcp login insforge
```

最后，在 Codex 中运行 /mcp 以验证身份验证。或者，您可以运行以下命令来安装 MCP 服务器：

```
codex mcp add insforge --url https://mcp.insforge.dev/mcp
```

Cline

您可以通过在终端中运行以下命令，将 InsForge MCP 服务器安装到您的 **Cline**：

```
npx -y @smithery/cli mcp add devel/insforge --client cline
```

或者，您可以按照官方 [Cline 文档](https://docs.cline.bot/mcp/connecting-to-a-remote-server) 添加带有参数的 InsForge MCP 服务器：

* 服务器名称：`insforge`
* 服务器 URL：`https://mcp.insforge.dev/mcp`
* 传输类型：`Streamable HTTP`

添加服务器后，您将看到一条要求身份验证的错误消息。点击出现的"Authenticate"按钮进行身份验证。

Windsurf

将此配置添加到 `~/.codeium/windsurf/mcp_config.json`：

```
{
  "mcpServers": {
    "insforge": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.insforge.dev/mcp"
      ]
    }
  }
}
```

Windsurf 目前不支持通过 HTTP 传输的远程 MCP 服务器。您需要使用 mcp-remote 包作为代理。

Roo Code

您可以通过在终端中运行以下命令，将 InsForge MCP 服务器安装到您的 **Roo Code**：

```
npx -y @smithery/cli mcp add devel/insforge --client roocode
```

OpenCode

安装后，您将在 `./opencode.json` 中找到配置文件，内容如下：

```
{
  "mcp": {
    "insforge": {
      "type": "remote",
      "url": "https://mcp.insforge.dev/mcp",
      "enabled": true
    }
  }
}
```

然后运行以下命令进行身份验证：

```
opencode mcp auth insforge
```

这将打开您的浏览器以完成 OAuth 身份验证流程。

### [​](#验证安装-14) 验证安装

要验证连接，请在您的 AI 编码助手中启动一个新的聊天会话，并发送以下提示：

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

如果连接成功，您将在 InsForge 仪表板上看到 **MCP 已连接** 状态指示器（右上角）。
![MCP 已连接](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

## [​](#故障排除) 故障排除

更改未生效

大多数 AI 客户端在 MCP 配置更改后需要完全重启。请关闭并重新打开应用程序。

[CLI 设置 · 推荐](/quickstart)[概述](/core-concepts/database/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)