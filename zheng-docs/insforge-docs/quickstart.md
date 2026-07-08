## On this page

* [Step 1: Create your project](#step-1-create-your-project)
* [Step 2: Link the CLI](#step-2-link-the-cli)
* [Step 3: Verify Installation](#step-3-verify-installation)
* [Learn More](#learn-more)

Quickstart

# CLI setup

Copy page

Connect your project from the terminal in 5 minutes.

Copy page

## [​](#step-1-create-your-project) Step 1: Create your project

## Go to InsForge Cloud

Visit [insforge.dev](https://insforge.dev) and create a free account

Once logged in:

1

Create Project

Click **“Create New Project”**

2

Wait for Backend

Your backend will be ready in ~3 seconds

3

Copy Project ID

You’ll be redirected to the project console — copy the **Project ID** from the browser URL:

```
https://insforge.dev/dashboard/project/<your-project-id>
```

You’ll need this Project ID in Step 2.

## [​](#step-2-link-the-cli) Step 2: Link the CLI

From your project directory, link your local code to your InsForge project. Replace `<your-project-id>` with the ID from Step 1.

```
npx @insforge/cli link --project-id <your-project-id>
```

Running through `npx` keeps the CLI out of your global install path. The link file ends up in the current directory and tells subsequent commands which project they belong to.

## [​](#step-3-verify-installation) Step 3: Verify Installation

Send the following prompt to your AI coding agent to verify the setup:
`I'm using InsForge as my backend platform. Read the current directory, make sure InsForge skills are installed, and use InsForge CLI for backend tasks.`

## [​](#learn-more) Learn More

To explore the full capabilities of the InsForge CLI:

* Check the [npm package documentation](https://www.npmjs.com/package/@insforge/cli)
* Run the built-in help command:

```
npx @insforge/cli --help
```

[Products](/products)[MCP setup](/mcp-setup)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)