## 本页内容

* [概述](#overview)
* [安装](#installation)
* [环境变量](#environment)
* [创建客户端](#create-a-client)
* [聊天补全](#chat-completion)
* [流式传输](#streaming)
* [工具调用](#tool-calling)
* [图像输入](#image-input)
* [图像生成](#image-generation)
* [嵌入向量](#embeddings)
* [视频生成](#video-generation)
* [Next.js 路由示例](#next-js-route-example)
* [将 InsForge 数据与 AI 结合使用](#using-insforge-data-with-ai)
* [旧版 InsForge AI 代理](#legacy-insforge-ai-proxy)
* [模型目录](#model-catalog)

TypeScript

# 模型网关

复制页面

使用 OpenAI SDK 和 InsForge 提供的 OpenRouter 密钥构建 AI 功能

复制页面

## [​](#overview) 概述

InsForge 为模型网关项目提供 OpenRouter API 密钥。对于新的 AI 功能，直接使用该密钥与 OpenRouter 的 OpenAI 兼容 API 交互，而不是使用已弃用的 InsForge AI 代理方法。
使用 InsForge 仪表盘复制有效的 OpenRouter 密钥，将其存储在 `OPENROUTER_API_KEY` 中，并从受信任的服务器端代码调用 OpenRouter。

不要将 `OPENROUTER_API_KEY` 暴露在浏览器包中。在 React、Next.js、Vue、Svelte 等应用中，将 OpenRouter 调用放在后端路由、服务器操作、函数或其他仅服务器端的边界内。

## [​](#installation) 安装

```
npm install openai
```

对于本地脚本，你可能还需要：

```
npm install dotenv
```

## [​](#environment) 环境变量

```
OPENROUTER_API_KEY=<your-openrouter-api-key>
```

## [​](#create-a-client) 创建客户端

```
import OpenAI from 'openai';

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://your-app.example',
    'X-Title': 'Your App',
  },
});
```

`HTTP-Referer` 和 `X-Title` 头是可选的 OpenRouter 元数据头。如果你希望 OpenRouter 为你的应用提供归属和排名，请保留它们。

## [​](#chat-completion) 聊天补全

```
const completion = await openai.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [
    { role: 'system', content: 'You are a concise assistant.' },
    { role: 'user', content: 'What is the capital of France?' },
  ],
});

console.log(completion.choices[0]?.message?.content);
```

## [​](#streaming) 流式传输

```
const stream = await openai.chat.completions.create({
  model: 'anthropic/claude-3.5-haiku',
  messages: [{ role: 'user', content: 'Write a short product update.' }],
  stream: true,
});

for await (const chunk of stream) {
  const text = chunk.choices[0]?.delta?.content;
  if (text) process.stdout.write(text);
}
```

## [​](#tool-calling) 工具调用

```
const completion = await openai.chat.completions.create({
  model: 'openai/gpt-4o-mini',
  messages: [{ role: 'user', content: 'Look up order 123 and summarize it.' }],
  tools: [
    {
      type: 'function',
      function: {
        name: 'get_order',
        description: 'Fetch an order by ID',
        parameters: {
          type: 'object',
          properties: {
            orderId: { type: 'string' },
          },
          required: ['orderId'],
        },
      },
    },
  ],
});

console.log(completion.choices[0]?.message?.tool_calls);
```

## [​](#image-input) 图像输入

```
const completion = await openai.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe this image.' },
        {
          type: 'image_url',
          image_url: {
            url: 'https://example.com/photo.jpg',
          },
        },
      ],
    },
  ],
});

console.log(completion.choices[0]?.message?.content);
```

## [​](#image-generation) 图像生成

使用支持图像输出的模型并请求图像模态。OpenRouter 支持可能尚未出现在 OpenAI SDK 类型中的字段，因此需要在本地扩展请求和响应类型。

```
type OpenRouterImageRequest =
  OpenAI.Chat.ChatCompletionCreateParamsNonStreaming & {
    modalities?: Array<'image' | 'text'>;
  };

type OpenRouterImage = {
  type: 'image_url';
  image_url: {
    url: string;
  };
};

type OpenRouterImageMessage = OpenAI.Chat.ChatCompletionMessage & {
  images?: OpenRouterImage[];
};

const request: OpenRouterImageRequest = {
  model: 'google/gemini-2.5-flash-image',
  modalities: ['image', 'text'],
  messages: [
    { role: 'user', content: 'Generate a clean product mockup on a white background.' },
  ],
};

const completion = await openai.chat.completions.create(request);

const message = completion.choices[0]?.message as OpenRouterImageMessage | undefined;
console.log(message?.content);
console.log(message?.images?.[0]?.image_url?.url);
```

## [​](#embeddings) 嵌入向量

```
const response = await openai.embeddings.create({
  model: 'openai/text-embedding-3-small',
  input: 'Your text here',
});

console.log(response.data[0].embedding);
```

## [​](#video-generation) 视频生成

OpenRouter 视频生成直接使用 OpenRouter HTTP 端点。

```
const response = await fetch('https://openrouter.ai/api/v1/videos', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/veo-3.1',
    prompt: 'A golden retriever playing fetch on a sunny beach.',
  }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`OpenRouter video request failed: ${response.status} ${body}`);
}

const job = await response.json();
console.log(job);
```

## [​](#next-js-route-example) Next.js 路由示例

将 `verifySessionToken` 替换为你的应用的认证提供者或会话验证器。

```
// app/api/chat/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

declare function verifySessionToken(token: string): Promise<boolean>;

export async function POST(request: Request) {
  const authorization = request.headers.get('Authorization');
  const sessionToken = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : undefined;

  if (!sessionToken || !(await verifySessionToken(sessionToken))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';

  if (!prompt || prompt.length > 4000) {
    return Response.json(
      { error: 'Prompt must be between 1 and 4000 characters.' },
      { status: 400 }
    );
  }

  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  return Response.json({
    text: completion.choices[0]?.message?.content ?? '',
  });
}
```

## [​](#using-insforge-data-with-ai) 将 InsForge 数据与 AI 结合使用

使用 InsForge SDK 进行数据库、认证、存储、函数和实时操作。直接使用 OpenRouter 进行模型调用。

```
import { createClient } from '@insforge/sdk';
import OpenAI from 'openai';

const insforge = createClient({
  baseUrl: process.env.INSFORGE_BASE_URL!,
  anonKey: process.env.INSFORGE_ANON_KEY!,
});

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const { data: documents } = await insforge.database
  .from('documents')
  .select()
  .limit(5);

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: `Summarize these records:\n${JSON.stringify(documents)}`,
    },
  ],
});

console.log(completion.choices[0]?.message?.content);
```

## [​](#legacy-insforge-ai-proxy) 旧版 InsForge AI 代理

之前的 InsForge AI SDK 方法已弃用：

* `insforge.ai.chat.completions.create()`
* `insforge.ai.images.generate()`
* `insforge.ai.embeddings.create()`

它们映射到为了兼容性而仍然存在的后端代理路由，但新的集成应直接使用 OpenRouter。直接路径可以访问 OpenRouter 完整且不断发展的 API 表面，无需等待 InsForge SDK 包装器的更新。

## [​](#model-catalog) 模型目录

使用 InsForge 仪表盘或 OpenRouter 模型目录选择模型。模型 ID 使用 `provider/model` 格式，例如 `openai/gpt-4o`、`anthropic/claude-3.5-haiku` 和 `google/gemini-2.5-flash-image`。

[函数 SDK 参考](/sdks/typescript/functions)[实时 SDK 参考](/sdks/typescript/realtime)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)