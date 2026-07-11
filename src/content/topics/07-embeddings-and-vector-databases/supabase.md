---
{
  "title": "Supabase",
  "module": "embeddings-and-vector-databases",
  "order": 20,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Supabase Vector",
      "url": "https://supabase.com/docs/guides/ai"
    },
    {
      "type": "video",
      "title": "Supabase Vector: The Postgres Vector database",
      "url": "https://www.youtube.com/watch?v=MDxEXKkxf2Q"
    }
  ]
}
---

**Supabase** is a popular open-source Firebase alternative built on Postgres, and its vector story is simple: every Supabase project can enable **pgvector**, the Postgres extension that adds a `vector` column type, similarity operators, and ANN indexes. That means your relational data, auth, storage, and embeddings all live in one Postgres database — vector search becomes just another SQL query.

For a working developer this is often the most pragmatic choice on the list. You skip an entire piece of infrastructure: no separate vector service to provision, no data sync, no second billing relationship. Embeddings sit in the same tables as your users and documents, so **joins, foreign keys, transactions, and row-level security** all apply to vector data — filtering search results to "only rows this user may see" is a `WHERE` clause plus RLS, not application logic. For most products whose corpus is thousands to a few million vectors, pgvector with an **HNSW** index is plenty fast, and you only outgrow it at scales where a dedicated engine earns its complexity.

In practice you'll run `create extension vector`, add a column like `embedding vector(1536)`, insert embeddings from your model of choice, and index with `create index on docs using hnsw (embedding vector_cosine_ops)`. Queries order by distance: `order by embedding <=> $1 limit 5`, typically wrapped in a Postgres function you call from `supabase-js` via `.rpc()`. Supabase's docs include ready-made RAG patterns, and Edge Functions can handle the embedding step.
