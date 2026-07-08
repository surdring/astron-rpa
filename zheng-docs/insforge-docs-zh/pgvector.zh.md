## 本页内容

* [提示你的代理](#prompt-your-agent)
* [概念](#concepts)
* [使用方法](#usage)
* [特定使用场景](#specific-usage-cases)
* [更多资源](#more-resources)

数据库

# pgvector

复制页面

在 Postgres 内部存储嵌入向量并运行相似性搜索

复制页面

[pgvector](https://github.com/pgvector/pgvector) 在每个 InsForge 项目上都已预装。将其用于语义搜索、推荐系统和 [RAG](https://www.pinecone.io/learn/retrieval-augmented-generation/)。

## [​](#prompt-your-agent) 提示你的代理

> 将 pgvector 添加到我的项目中。创建一个 `documents` 表，包含 `content` 列和一个 1536 维的 `embedding` 列，以及一个 HNSW 余弦索引。当我插入内容时，通过服务端路由使用 OpenRouter 的 `text-embedding-3-small` 为其生成嵌入向量。暴露一个 `match_documents(query, count, threshold)` RPC，返回最相似的匹配结果。

## [​](#concepts) 概念

向量是一个表示项目的数字列表。如果两个向量在向量空间中距离较近，则它们相似。将向量存储在其对应的行旁边，以相同方式为用户查询生成嵌入向量，然后 pgvector 按距离排序。

## [​](#usage) 使用方法

启用扩展并创建向量列。维度与你的模型匹配（`text-embedding-3-small` 为 1536）。

```
create extension if not exists vector;

create table documents (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);
```

在服务端生成嵌入向量并插入。

```
import OpenAI from 'openai';
import { createClient } from '@insforge/sdk';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});
const insforge = createClient({ projectId: process.env.INSFORGE_PROJECT_ID });

const { data } = await openai.embeddings.create({
  model: 'openai/text-embedding-3-small',
  input: 'hello world',
});

await insforge.database.from('documents').insert({
  content: 'hello world',
  embedding: data[0].embedding,
});
```

按余弦距离（`<=>`）查询。L2（`<->`）和内积（`<#>`）也可用。

```
select id, content
from documents
order by embedding <=> $1
limit 5;
```

## [​](#specific-usage-cases) 特定使用场景

将搜索包装在 Postgres 函数中，并通过 `rpc()` 调用，以将计算保留在服务端：

```
create or replace function match_documents(
  query_embedding vector(1536),
  match_count int default 5,
  match_threshold float default 0
)
returns table (id bigint, content text, similarity float)
language sql stable
as $$
  select id, content, 1 - (embedding <=> query_embedding) as similarity
  from documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;
```

超过约 1 万行后，添加 HNSW 索引：

```
create index on documents using hnsw (embedding vector_cosine_ops);
```

## [​](#more-resources) 更多资源

* [GitHub 上的 pgvector](https://github.com/pgvector/pgvector) 了解操作符和索引。
* [OpenRouter 嵌入向量](https://openrouter.ai/docs/features/multimodal/embeddings) 了解模型目录。
* [模型网关概览](/core-concepts/ai/overview) 了解 InsForge 侧的 OpenRouter。

[数据库迁移](/core-concepts/database/migrations)[概览](/core-concepts/authentication/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)