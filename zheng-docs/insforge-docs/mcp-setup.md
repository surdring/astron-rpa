## On this page

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Local MCP Configuration (Recommended)](#local-mcp-configuration-recommended)
* [Remote MCP](#remote-mcp)
  + [Connect and Bind Project](#connect-and-bind-project)
  + [Verify Installation](#verify-installation-14)
* [Troubleshooting](#troubleshooting)

Quickstart

# MCP setup

Copy page

Wire your editor’s MCP client to InsForge.

Copy page

## [​](#overview) Overview

The InsForge MCP server gives your AI coding assistant direct access to your backend: database queries, schema management, storage, and more.
Follow the instructions below for your AI client. Don’t see your tool? Browse the [agent directory](https://insforge.dev/agents) for the full list of tested integrations.

## [​](#prerequisites) Prerequisites

* An **AI coding assistant** (Cursor, Claude Code, GitHub Copilot, etc.)
* An **InsForge project** - [create one here](https://insforge.dev) if you haven’t already

## [​](#local-mcp-configuration-recommended) Local MCP Configuration (Recommended)

If you prefer to configure MCP locally, select your AI coding assistant below:

Cursor

### [​](#installation) Installation

You can one-click install the MCP server in Cursor by clicking the “Add to Cursor” button in the screenshot below:![Connect Project](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/connect-project.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=4ef0e69172a5b685170cea8adec6b0c3)Alternatively, you can install the InsForge MCP server manually:

1. Open **Cursor Settings**
2. Go to **Tools & MCP**
3. Click **New MCP Server (Add a Custom MCP Server)**

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Cursor-MCP-1.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=ec15b20e709d8536d3d09666e89364e7)

4. Paste the MCP JSON from your InsForge project
5. Save the configuration file
6. You should see a green dot, indicating InsForge is installed successfully

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Cursor-MCP-2.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=177e1e5dbdc0cdfbd8248f8d442722e5)

### [​](#verify-installation) Verify Installation

To verify the connection, start a new chat session in **Cursor** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **Connected** status indicator on your InsForge dashboard (top right corner).[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Cursor-MCP-3.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=bf99a7adcb00c864413df17464d9794b)

Claude Code

### [​](#installation-2) Installation

Add the InsForge MCP server to your **Claude Code**:

1. Select **Claude Code** in the dropdown list
2. Copy and paste the following installation command in your terminal
   ![Claude Code Connect](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/claude-code-connect.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=f4710fd707714996fd26934458e5b841)
3. Run the command

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/CC-MCP-1.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=1ce35e7b4049008f1be4b5a2b069956d)

### [​](#verify-installation-2) Verify Installation

To verify the connection, start a new chat session in **Claude Code** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/CC-MCP-2.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=2853f145fde1384ce7b33e031a5916fd)

GitHub Copilot

### [​](#installation-3) Installation

Add the InsForge MCP server to your **GitHub Copilot**:

1. Select **Copilot** in the dropdown list
2. Open the terminal and paste the following installation command in your **GitHub Copilot** terminal
   ![Copilot Setup](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/copilot-1.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=221c86348072caab475659fb65a2188e)
3. Run the command
   ![Copilot Install](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/copilot-2.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=99a7f3f7e10a96e2605ff8a33014b9a9)

### [​](#verify-installation-3) Verify Installation

To verify the connection, start a new chat session in **Copilot** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Google Antigravity

### [​](#installation-4) Installation

Add the InsForge MCP server to your **Antigravity**:

1. Select **Antigravity** in the dropdown list
2. Copy and paste the following installation command in your **Antigravity** terminal
   ![Antigravity Setup](https://mintcdn.com/insforge-468ccf39/wwfpEGfpasa8WQ2v/images/mcp-setup/antigravity-1.png?fit=max&auto=format&n=wwfpEGfpasa8WQ2v&q=85&s=4735cea56722391aa50ba551bb069565)
3. Run the command

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Antigravity-MCP.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=713f4d34514b5bcbade8d7793d551d3e)

### [​](#verify-installation-4) Verify Installation

To verify the connection, start a new chat session in **Antigravity** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Kiro

### [​](#installation-5) Installation

Add the InsForge MCP server to your **Kiro**:

1. Select **Kiro** in the dropdown list
2. Copy and paste the following installation command in your **Kiro** terminal
   ![Kiro Setup](https://mintcdn.com/insforge-468ccf39/5PTkTfA4J4SdXhFA/images/mcp-setup/kiro-1.png?fit=max&auto=format&n=5PTkTfA4J4SdXhFA&q=85&s=67abb6d17cddbba5fbca379434d40adb)
3. Run the command

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Kiro-MCP.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=edd8a983c31a5d90c50d8b4563604721)

### [​](#verify-installation-5) Verify Installation

To verify the connection, start a new chat session in **Kiro** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Codex

### [​](#installation-6) Installation

Add the InsForge MCP server to your **Codex**:

1. Select **Codex** in the dropdown list
2. Copy and paste the following installation command in your terminal
   ![Codex Setup](https://mintcdn.com/insforge-468ccf39/5PTkTfA4J4SdXhFA/images/mcp-setup/codex-1.png?fit=max&auto=format&n=5PTkTfA4J4SdXhFA&q=85&s=2068920d304e6c480f50fdcd2f31bb53)
3. Run the command

[](https://mintcdn.com/insforge-468ccf39/ioq-HbhhvPKTChxw/images/mcp-setup/Codex-MCP.mp4?fit=max&auto=format&n=ioq-HbhhvPKTChxw&q=85&s=cd10c47b913ef5e4c1315299a91cc44a)

### [​](#verify-installation-6) Verify Installation

To verify the connection, start a new chat session in **Codex** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Cline

### [​](#installation-7) Installation

Add the InsForge MCP server to your **Cline**:

1. Select **Cline** in the dropdown list
2. Copy and paste the following installation command in your **Cline** terminal
   ![Cline Setup](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/cline-1.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=dab0c00ea8e9fce316e779848106c00d)
3. Run the command
   ![Cline Install](https://mintcdn.com/insforge-468ccf39/fNI11NfWIUSxQDZ4/images/mcp-setup/cline-2.png?fit=max&auto=format&n=fNI11NfWIUSxQDZ4&q=85&s=e37c81b5d4aed0ae1b60eba94761d2b5)

### [​](#verify-installation-7) Verify Installation

To verify the connection, start a new chat session in **Cline** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Windsurf

### [​](#installation-8) Installation

Add the InsForge MCP server to your **Windsurf**:

1. Select **Windsurf** in the dropdown list
2. Copy and paste the following installation command in your Windsurf terminal
   ![Windsurf Setup](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/windsurf-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=91a6056a1e8088b515156f56490c4343)
3. Run the command

### [​](#verify-installation-8) Verify Installation

To verify the connection, start a new chat session in **Windsurf** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Trae

### [​](#installation-9) Installation

Add the InsForge MCP server to your **Trae**:

1. Select **Trae** in the dropdown list
2. Copy and paste the following installation command in your **Trae** terminal
   ![Trae Setup](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/trae-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=a5e5faf52df23ee7f1d3efab722d299d)
3. Run the command
   ![Trae Install](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/trae-2.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=259dd8b31ce81cddd11c01c0b01f92bf)

Alternatively, Trae offers a first-party integration with InsForge, allowing you to install InsForge directly from Trae’s official MCP marketplace:

1. Open Trae’s **Settings** → navigate to **MCP**
2. Click on **Add** and then select **Add from Marketplace**
3. Search “InsForge” and add it from the marketplace
   ![Trae Marketplace](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/trae-3.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=6719b557c7caad564b2eb3f3ce642cb1)
4. For required credentials API\_KEY and API\_BASE\_URL, you can find it in your InsForge’s **Settings**, under the **Connect** tab
   ![Trae Credentials](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/trae-4.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=727db2b107ce3a9cfb2180dea3982c25)

### [​](#verify-installation-9) Verify Installation

To verify the connection, start a new chat in **Trae** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Qoder

### [​](#installation-10) Installation

Add the InsForge MCP server to your **Qoder**:

1. Select **Qoder** in the dropdown list
2. Copy and paste the following installation command in your **Qoder** terminal
   ![Qoder Setup](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/qoder-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=37c6bc50f023b31739367445da1fd38b)
3. Run the command

### [​](#verify-installation-10) Verify Installation

To verify the connection, start a new chat session in **Qoder** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

Roo Code

### [​](#installation-11) Installation

Add the InsForge MCP server to your **Roo Code**:

1. Select **Roo Code** in the dropdown list
2. Copy and paste the following installation command in your **Roo Code** terminal
   ![Roo Code Setup](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/roocode-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=412db91485b669f7b98f532436954648)
3. Run the command

### [​](#verify-installation-11) Verify Installation

To verify the connection, start a new chat session in **Roo Code** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

OpenCode

### [​](#installation-12) Installation

Add the InsForge MCP server to your **OpenCode**:

1. Select **OpenCode** in the dropdown list
2. Copy and paste the following installation command in your terminal
   ![Connect Project](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/connect-project.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=4ef0e69172a5b685170cea8adec6b0c3)
3. Run the command

### [​](#verify-installation-12) Verify Installation

To verify the connection, start a new chat session in **OpenCode** and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

MCP JSON

### [​](#installation-13) Installation

Add the InsForge MCP server to your coding agent with MCP JSON:

1. Select **MCP JSON** in the dropdown list
2. Copy and paste the following **MCP JSON** configuration in your agent
   ![MCP JSON Setup](https://mintcdn.com/insforge-468ccf39/lHUVwtL3JwYSI6Gh/images/mcp-setup/mcp-json-1.png?fit=max&auto=format&n=lHUVwtL3JwYSI6Gh&q=85&s=c9ffc9491236a1cf8fcf637e8c22cca1)

### [​](#verify-installation-13) Verify Installation

To verify the connection, start a new chat session and send this prompt to your agent:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

## [​](#remote-mcp) Remote MCP

The fastest way to get started is with Remote MCP. A single command attempts installation and will try to handle authentication and project binding, but it may still prompt you for manual authentication or project binding steps if the automatic flow cannot complete.
Run the following command in your terminal:

```
npx add-mcp https://mcp.insforge.dev/mcp
```

The `add-mcp` command works for most coding agents, but not all. Currently it supports:
Claude Code, Claude Desktop, Codex, Cursor, Gemini CLI, Goose, GitHub Copilot, OpenCode, VS Code, Zed.

After running the command, the system will automatically generate a configuration file for your coding agent.

### [​](#connect-and-bind-project) Connect and Bind Project

Some MCP clients will automatically prompt you to login during setup, while others may require manual authentication or project binding steps if the automatic flow cannot complete. Either way, authentication will open a browser window where you can login to your InsForge account and grant organization/project access to the MCP client.

Cursor

You can find the configuration file in `.cursor/mcp.json` as below:

```
{
  "mcpServers": {
    "insforge": {
      "url": "https://mcp.insforge.dev/mcp"
    }
  }
}
```

In menu **Preferences → Cursor Settings → Tools & MCP**, you should see InsForge MCP server is added successfully.
InsForge MCP server is on the status of “Needs authentication”, you can click the `connect` button to authenticate.

Claude Code

After installation, you will find the configuration file in `.mcp.json` as below:

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

Then in a regular terminal (not the IDE extension) run:

```
claude /mcp
```

Select the “insforge” server, then “Authenticate” to begin the authentication flow.

GitHub Copilot

After installation, you will find the configuration file in `.vscode/mcp.json` as below:

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

Add this configuration to `~/.gemini/antigravity/mcp_config.json`:

```
{
  "mcpServers": {
    "insforge": {
      "serverUrl": "https://mcp.insforge.dev/mcp"
    }
  }
}
```

Then restart Antigravity, it will auto authenticate.

Gemini

After installation, you will find the configuration file in `.gemini/settings.json` as below:

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

Start the Gemini CLI and run the following command to authenticate the server:

```
/mcp auth insforge
```

Codex

If you are using Codex for the first time, you may need to enable the rmcp feature. To do so, add the following into your `~/.codex/config.toml` file:

```
[beta]
rmcp = true
```

After installation, you will find the configuration file in `.codex/config.toml` as below:

```
[mcp_servers.insforge]
type = "http"
url = "https://mcp.insforge.dev/mcp"
```

Then authenticate:

```
codex mcp login insforge
```

Finally, run /mcp inside Codex to verify authentication.Alternatively, you can run the following command to install the MCP server:

```
codex mcp add insforge --url https://mcp.insforge.dev/mcp
```

Cline

You can install the InsForge MCP server to your **Cline** by running the following command in your terminal:

```
npx -y @smithery/cli mcp add devel/insforge --client cline
```

Alternatively, you can follow the official [Cline documentation](https://docs.cline.bot/mcp/connecting-to-a-remote-server) to add the InsForge MCP server with parameters:

* Server Name: `insforge`
* Server URL: `https://mcp.insforge.dev/mcp`
* Transport Type: `Streamable HTTP`

After adding the server, you’ll see an error message asking to authenticate. Click the “Authenticate” button that appears to authenticate.

Windsurf

Add this configuration to `~/.codeium/windsurf/mcp_config.json`:

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

Windsurf does not currently support remote MCP servers over HTTP transport. You need to use the mcp-remote package as a proxy.

Roo Code

You can install the InsForge MCP server to your **Roo Code** by running the following command in your terminal:

```
npx -y @smithery/cli mcp add devel/insforge --client roocode
```

OpenCode

After installation, you will find the configuration file in `./opencode.json` as below:

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

Then run the following command to authenticate:

```
opencode mcp auth insforge
```

This will open your browser to complete the OAuth authentication flow.

### [​](#verify-installation-14) Verify Installation

To verify the connection, start a new chat session in your AI coding assistant and send this prompt:

```
I'm using InsForge as my backend platform, call InsForge MCP's fetch-docs tool to
learn about InsForge instructions.
```

If the connection is successful, you will see the **MCP Connected** status indicator on your InsForge dashboard (top right corner).
![MCP Connected](https://mintcdn.com/insforge-468ccf39/-gcWtB6vS2JMKYEI/images/mcp-setup/mcp-connected.png?fit=max&auto=format&n=-gcWtB6vS2JMKYEI&q=85&s=e801673f8bb2f67c08e7cca11595bf14)

## [​](#troubleshooting) Troubleshooting

Changes not taking effect

Most AI clients require a full restart after MCP config changes. Close and reopen the application.

[CLI setup · Recommended](/quickstart)[Overview](/core-concepts/database/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)