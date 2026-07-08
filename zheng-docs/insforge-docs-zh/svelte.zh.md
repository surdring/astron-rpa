## 本页内容

* [1. 创建 InsForge 项目](#1-创建-insforge-项目)
* [2. 连接 InsForge](#2-连接-insforge)
* [3. 用一个提示构建你的应用](#3-用一个提示构建你的应用)
* [4. AI 生成的内容](#4-ai-生成的内容)
* [5. 启动应用](#5-启动应用)
* [下一步：用更多提示扩展你的应用](#下一步用更多提示扩展你的应用)

框架指南

# Svelte

复制页面

了解如何创建 InsForge 项目并使用 AI 构建 Svelte 应用

复制页面

了解如何创建 InsForge 项目并使用 Cursor 等 AI 工具构建 Svelte 应用。

## [​](#1-创建-insforge-项目) 1. 创建 InsForge 项目

在 [insforge.dev](https://insforge.dev) 创建一个新的 InsForge 项目。

## [​](#2-连接-insforge) 2. 连接 InsForge

两个部分：

* **CLI 链接** — 参见[快速开始](/quickstart)，运行 `npx @insforge/cli link --project-id <your-project-id>`，以便 AI 代理可以读取你的项目 ID 和密钥。
* **MCP 设置** — 参见 [MCP 设置](/mcp-setup)，了解每个编辑器的配置（Cursor、Claude Code、Windsurf、Codex、VS Code）。

两者都配置好后，AI 代理可以从你的编辑器读取 schema、运行查询和部署代码。

## [​](#3-用一个提示构建你的应用) 3. 用一个提示构建你的应用

在 Cursor 或你的 AI 助手中，使用以下提示：

```
创建一个新的 Svelte 应用，使用 TypeScript 和 Vite。
添加 Tailwind CSS 3.4 用于样式。
安装 InsForge SDK 并设置客户端配置。

在我的 InsForge 数据库中，创建一个包含 id 和 name 列的 sports 表。
添加示例数据：basketball、soccer 和 tennis。设置为公开可读。

创建一个组件，从数据库获取并显示所有运动项目。
```

你的 AI 将生成完整的应用程序，包括数据库设置和 UI。无需手动编写代码——AI 会为你创建一切。

## [​](#4-ai-生成的内容) 4. AI 生成的内容

你的 AI 助手会自动创建类似这样的文件。你无需手动操作。
**InsForge 客户端**位于 `src/lib/insforge.ts`：

src/lib/insforge.ts

```
import { createClient } from '@insforge/sdk';

export const insforge = createClient({
  baseUrl: 'https://your-project.us-east.insforge.app',
  anonKey: 'your-anon-key'
});
```

**运动项目组件**位于 `src/lib/components/Sports.svelte`：

src/lib/components/Sports.svelte

```
<script lang="ts">
  import { onMount } from 'svelte';
  import { insforge } from '../insforge';

  interface Sport {
    id: string;
    name: string;
  }

  let sports: Sport[] = [];
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const { data, error: fetchError } = await insforge.database
        .from('sports')
        .select();

      if (fetchError) {
        error = fetchError.message;
      } else {
        sports = data || [];
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      loading = false;
    }
  });
</script>

<div class="min-h-screen p-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Sports</h1>

    {#if loading}
      <div class="flex items-center justify-center py-8">
        <p class="text-gray-600">Loading...</p>
      </div>
    {:else if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <h2 class="text-2xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    {:else if sports.length > 0}
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each sports as sport (sport.id)}
          <div
            class="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h2 class="text-xl font-semibold text-gray-800 capitalize">
              {sport.name}
            </h2>
            <p class="text-sm text-gray-500 mt-2">ID: {sport.id}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-gray-600">No sports found.</p>
    {/if}
  </div>
</div>
```

## [​](#5-启动应用) 5. 启动应用

运行开发服务器，在浏览器中打开 <http://localhost:5173>，你应该能看到运动项目列表。

```
npm run dev
```

## [​](#下一步用更多提示扩展你的应用) 下一步：用更多提示扩展你的应用

尝试以下提示，为你的应用添加更多功能：

```
添加一个表单来创建新的运动项目并保存到数据库。
包含验证和错误处理。
```

```
添加用户认证，包括注册和登录页面。
仅允许已认证用户添加新的运动项目。
```

```
添加收藏功能，让用户可以标记他们喜欢的运动项目。
在 user_favorites 表中存储收藏，包含 user_id 和 sport_id。
```

```
使用 InsForge Storage 为每个运动项目添加图片。
允许用户上传运动项目图片并在网格中显示。
```

```
添加一个 AI 聊天功能，可以回答关于运动的问题。
使用 InsForge AI 的流式响应。
```

[Nuxt](/examples/framework-guides/nuxt)[Swift SDK](/sdks/swift/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)