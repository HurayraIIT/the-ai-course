---
{
  "title": "MongoDB Atlas",
  "module": "embeddings-and-vector-databases",
  "order": 21,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Vector Search in MongoDB Atlas",
      "url": "https://www.mongodb.com/products/platform/atlas-vector-search"
    }
  ]
}
---

**Atlas Vector Search** adds semantic search to MongoDB Atlas, MongoDB's managed cloud database. Instead of standing up a separate vector store, you keep embeddings as an array field on the same documents that hold your application data, define a **vector search index** on that field, and query it through the standard aggregation pipeline. Your operational database and your vector database become the same database.

That co-location is the whole argument. If your product already runs on MongoDB — and an enormous number do — adding RAG or semantic features means no second system to sync, secure, and pay for. There's no ETL pipeline shuttling records into Pinecone and no drift between "the document" and "the document's vector"; when you update a record, its embedding lives right there. You also inherit everything Atlas already gives you: replication, backups, access control, and **pre-filtering** on regular fields (tenant ID, date, category) executed alongside the vector query. The tradeoff: a dedicated vector database may win on raw performance at extreme scale, and you must generate embeddings yourself or via Atlas-triggered functions.

In practice you'll create a `vectorSearch` index specifying the path, dimensions, and similarity metric (cosine, dot product, or Euclidean), then query with the `$vectorSearch` aggregation stage: pass `queryVector`, `numCandidates`, `limit`, and an optional `filter`. Results flow into further pipeline stages — `$project`, `$lookup` — so retrieval and shaping happen in one round trip. LangChain and LlamaIndex ship first-class Atlas integrations.
