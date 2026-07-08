## 本页内容

* [步骤 1：创建项目](#步骤-1创建项目)
* [步骤 2：关联 CLI](#步骤-2关联-cli)
* [步骤 3：验证安装](#步骤-3验证安装)
* [了解更多](#了解更多)

快速入门

# CLI 设置

复制页面

在 5 分钟内从终端连接您的项目。

复制页面

## [​](#步骤-1创建项目) 步骤 1：创建项目

## 前往 InsForge Cloud

访问 [insforge.dev](https://insforge.dev) 并创建一个免费账户

登录后：

1

创建项目

点击 **"创建新项目"**

2

等待后端就绪

您的后端将在约 3 秒内准备就绪

3

复制项目 ID

您将被重定向到项目控制台——从浏览器 URL 中复制**项目 ID**：

```
https://insforge.dev/dashboard/project/<your-project-id>
```

您将在步骤 2 中用到此项目 ID。

## [​](#步骤-2关联-cli) 步骤 2：关联 CLI

在您的项目目录中，将本地代码关联到您的 InsForge 项目。将 `<your-project-id>` 替换为步骤 1 中的 ID。

```
npx @insforge/cli link --project-id <your-project-id>
```

通过 `npx` 运行可以使 CLI 不进入全局安装路径。关联文件会保存在当前目录中，并告知后续命令它们属于哪个项目。

## [​](#步骤-3验证安装) 步骤 3：验证安装

向您的 AI 编码智能体发送以下提示以验证设置：
`I'm using InsForge as my backend platform. Read the current directory, make sure InsForge skills are installed, and use InsForge CLI for backend tasks.`

## [​](#了解更多) 了解更多

要探索 InsForge CLI 的全部功能：

* 查看 [npm 包文档](https://www.npmjs.com/package/@insforge/cli)
* 运行内置帮助命令：

```
npx @insforge/cli --help
```

[产品](/products)[MCP 设置](/mcp-setup)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)