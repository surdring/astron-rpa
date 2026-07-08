## 本页内容

* [1. 创建 InsForge 项目](#1-创建-insforge-项目)
* [2. 连接 InsForge](#2-连接-insforge)
* [3. 用一个提示构建你的应用](#3-用一个提示构建你的应用)
* [4. AI 生成的内容](#4-ai-生成的内容)
* [5. 启动应用](#5-启动应用)
* [下一步：用更多提示扩展你的应用](#下一步用更多提示扩展你的应用)

框架指南

# Vue

复制页面

了解如何创建 InsForge 项目并使用 AI 构建 Vue 应用

复制页面

了解如何创建 InsForge 项目并使用 Cursor 等 AI 工具构建 Vue 应用。

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
创建一个新的 Vue 应用，使用 TypeScript 和 Vite。
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

**运动项目组件**位于 `src/components/Sports.vue`：

src/components/Sports.vue

```
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Sports</h1>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Loading sports...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else-if="sports && sports.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="sport in sports"
        :key="sport.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <h2 class="text-xl font-semibold text-gray-800 capitalize">{{ sport.name }}</h2>
        <p class="text-sm text-gray-500 mt-2">ID: {{ sport.id }}</p>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-600">No sports found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { insforge } from '../lib/insforge';

interface Sport {
  id: string;
  name: string;
  created_at?: string;
}

const sports = ref<Sport[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchSports = async () => {
  try {
    loading.value = true;
    error.value = null;

    const { data, error: fetchError } = await insforge.database
      .from('sports')
      .select();

    if (fetchError) {
      error.value = fetchError.message || 'Failed to fetch sports';
      return;
    }

    sports.value = data || [];
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSports();
});
</script>
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

[React](/examples/framework-guides/react)[Nuxt](/examples/framework-guides/nuxt)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)