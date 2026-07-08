## On this page

* [Prompt your agent](#prompt-your-agent)
* [Concepts](#concepts)
* [Usage](#usage)
* [Specific usage cases](#specific-usage-cases)
* [More resources](#more-resources)

Database

# pgvector

Copy page

Store embeddings and run similarity search inside Postgres

Copy page

[pgvector](https://github.com/pgvector/pgvector) ships on every InsForge project. Use it for semantic search, recommendations, and [RAG](https://www.pinecone.io/learn/retrieval-augmented-generation/).

## [​](#prompt-your-agent) Prompt your agent

> Add pgvector to my project. Create a `documents` table with `content` and a 1536-dim `embedding` column, plus an HNSW cosine index. When I insert content, embed it with OpenRouter’s `text-embedding-3-small` from a server-side route. Expose a `match_documents(query, count, threshold)` RPC that returns top similarity matches.

## [​](#concepts) Concepts

A vector is a list of numbers representing an item. Two vectors are similar if they sit close in vector space. Store the vector next to its row, embed the user query the same way, and pgvector ranks by distance.

## [​](#usage) Usage

Enable the extension and create a vector column. Match the dimension to your model (`text-embedding-3-small` is 1536).

```
create extension if not exists vector;

create table documents (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);
```

Generate an embedding server-side and insert it.

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

Query by cosine distance (`<=>`). L2 (`<->`) and inner product (`<#>`) are also available.

```
select id, content
from documents
order by embedding <=> $1
limit 5;
```

## [​](#specific-usage-cases) Specific usage cases

Wrap search in a Postgres function and call it via `rpc()` to keep the math server-side:

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

Past ~10k rows, add an HNSW index:

```
create index on documents using hnsw (embedding vector_cosine_ops);
```

## [​](#more-resources) More resources

* [pgvector on GitHub](https://github.com/pgvector/pgvector) for operators and indexes.
* [OpenRouter embeddings](https://openrouter.ai/docs/features/multimodal/embeddings) for the model catalog.
* [Model Gateway overview](/core-concepts/ai/overview) for the InsForge side of OpenRouter.

[Database migrations](/core-concepts/database/migrations)[Overview](/core-concepts/authentication/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)