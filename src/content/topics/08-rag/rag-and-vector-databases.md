---
{
  "title": "RAG and Vector Databases",
  "module": "rag",
  "order": 7,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Understanding Retrieval-Augmented Generation (RAG) and Vector Databases",
      "url": "https://pureai.com/Articles/2025/03/03/Understanding-RAG.aspx"
    },
    {
      "type": "article",
      "title": "Build Advanced Retrieval-Augmented Generation Systems",
      "url": "https://learn.microsoft.com/en-us/azure/developer/ai/advanced-retrieval-augmented-generation"
    },
    {
      "type": "article",
      "title": "What Is Retrieval-Augmented Generation, aka RAG?",
      "url": "https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/"
    }
  ]
}
---

A **vector database** is the storage engine underneath most RAG systems: a database purpose-built to store **embeddings** and answer "which stored vectors are closest to this query vector?" fast, even across millions of entries. It does this with **approximate nearest neighbor (ANN)** indexes like HNSW, trading a sliver of exactness for enormous speed, while also storing each chunk's text and metadata so filtered, permission-aware search works in one call.

This piece matters because retrieval quality means nothing if it takes seconds or falls over at scale. A brute-force similarity scan over a NumPy array is fine for a prototype and hopeless at production volume. Vector databases give you sub-100ms search, metadata filtering, hybrid keyword-plus-vector queries, incremental updates without reindexing everything, and the operational basics — replication, backups, access control — that turn a demo into a service. Choosing and operating one well is a core AI engineering skill.

In practice you will pick from a familiar menu: **pgvector** if you already run Postgres and want one less system, managed services like Pinecone for zero-ops scaling, or open-source engines like Qdrant, Weaviate, Milvus, or Chroma when you want control or local development. Your ingestion pipeline will `upsert` chunk vectors with metadata; your query path will call a search API with an embedding, a `top_k`, and a filter. You will tune index parameters, monitor recall against exact search, and re-embed the corpus when you upgrade embedding models — so version your indexes from day one.
