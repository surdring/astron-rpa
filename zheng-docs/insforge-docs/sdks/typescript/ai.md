## On this page

* [Overview](#overview)
* [Installation](#installation)
* [Environment](#environment)
* [Create a Client](#create-a-client)
* [Chat Completion](#chat-completion)
* [Streaming](#streaming)
* [Tool Calling](#tool-calling)
* [Image Input](#image-input)
* [Image Generation](#image-generation)
* [Embeddings](#embeddings)
* [Video Generation](#video-generation)
* [Next.js Route Example](#next-js-route-example)
* [Using InsForge Data with AI](#using-insforge-data-with-ai)
* [Legacy InsForge AI Proxy](#legacy-insforge-ai-proxy)
* [Model Catalog](#model-catalog)

TypeScript

# Model Gateway

Copy page

Build AI features with the OpenAI SDK and the OpenRouter key provisioned by InsForge

Copy page

## [​](#overview) Overview

InsForge provisions an OpenRouter API key for Model Gateway projects. For new AI features, use that key directly with OpenRouter’s OpenAI-compatible API instead of the deprecated InsForge AI proxy methods.
Use the InsForge dashboard to copy the active OpenRouter key, store it in `OPENROUTER_API_KEY`, and call OpenRouter from trusted server-side code.

Do not expose `OPENROUTER_API_KEY` in browser bundles. In React, Next.js, Vue, Svelte, and similar apps, put OpenRouter calls behind a backend route, server action, function, or other server-only boundary.

## [​](#installation) Installation

```
npm install openai
```

For local scripts, you may also want:

```
npm install dotenv
```

## [​](#environment) Environment

```
OPENROUTER_API_KEY=<your-openrouter-api-key>
```

## [​](#create-a-client) Create a Client

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

The `HTTP-Referer` and `X-Title` headers are optional OpenRouter metadata headers. Keep them if you want OpenRouter attribution and rankings for your app.

## [​](#chat-completion) Chat Completion

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

## [​](#streaming) Streaming

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

## [​](#tool-calling) Tool Calling

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

## [​](#image-input) Image Input

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

## [​](#image-generation) Image Generation

Use a model that supports image output and request image modality. OpenRouter supports fields that may not be in the OpenAI SDK type surface yet, so extend the request and response types locally.

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

## [​](#embeddings) Embeddings

```
const response = await openai.embeddings.create({
  model: 'openai/text-embedding-3-small',
  input: 'Your text here',
});

console.log(response.data[0].embedding);
```

## [​](#video-generation) Video Generation

OpenRouter video generation uses OpenRouter HTTP endpoints directly.

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

## [​](#next-js-route-example) Next.js Route Example

Replace `verifySessionToken` with your app’s auth provider or session verifier.

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

## [​](#using-insforge-data-with-ai) Using InsForge Data with AI

Use the InsForge SDK for database, auth, storage, functions, and realtime. Use OpenRouter directly for model calls.

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

## [​](#legacy-insforge-ai-proxy) Legacy InsForge AI Proxy

The previous InsForge AI SDK methods are deprecated:

* `insforge.ai.chat.completions.create()`
* `insforge.ai.images.generate()`
* `insforge.ai.embeddings.create()`

They map to backend proxy routes that still exist for compatibility, but new integrations should use OpenRouter directly. The direct path gives access to OpenRouter’s complete and evolving API surface without waiting for InsForge SDK wrapper updates.

## [​](#model-catalog) Model Catalog

Use the InsForge dashboard or OpenRouter model catalog to choose a model. Model IDs use the `provider/model` format, such as `openai/gpt-4o`, `anthropic/claude-3.5-haiku`, and `google/gemini-2.5-flash-image`.

[Functions SDK Reference](/sdks/typescript/functions)[Realtime SDK Reference](/sdks/typescript/realtime)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)