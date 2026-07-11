---
{
  "title": "Vector DBs",
  "module": "embeddings-and-vector-databases",
  "order": 13,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Vector Databases",
      "url": "https://developers.cloudflare.com/vectorize/reference/what-is-a-vector-database/"
    },
    {
      "type": "article",
      "title": "What is a vector database?",
      "url": "https://www.cloudflare.com/learning/ai/what-is-vector-database/"
    },
    {
      "type": "article",
      "title": "What are Vector Databases?",
      "url": "https://www.mongodb.com/resources/basics/databases/vector-databases"
    },
    {
      "type": "article",
      "title": "How to Implement Graph RAG Using Knowledge Graphs and Vector Databases",
      "url": "https://towardsdatascience.com/how-to-implement-graph-rag-using-knowledge-graphs-and-vector-databases-60bb69a22759"
    },
    {
      "type": "article",
      "title": "Retrieval Augmented Generation (RAG) with Vector Databases: Expanding AI Capabilities",
      "url": "https://objectbox.io/retrieval-augmented-generation-rag-with-vector-databases-expanding-ai-capabilities/"
    }
  ]
}
---

A **vector database** is a data store built around one primitive: store embeddings alongside metadata and answer nearest-neighbor queries fast, at scale, with the operational features you'd expect from a real database — persistence, filtering, updates, replication, and access control. It maintains the **ANN indexes** you learned about earlier so that searching ten million vectors takes milliseconds, and it pairs every vector with the original text and structured metadata so results are directly usable.

You care because this is the retrieval layer of production **RAG** and agent systems. An in-memory index dies with your process and can't be shared across servers; a vector database gives you durable storage, concurrent access, **metadata filtering** ("only documents from this tenant, updated this year"), and increasingly **hybrid search** combining vectors with keyword scoring. It's also where architecture decisions live: multi-tenancy, data freshness, cost per million vectors, and whether retrieval can feed richer patterns like graph-augmented RAG.

The landscape splits into a few families you'll tour in the coming topics: open-source engines you can self-host (Chroma, Qdrant, Weaviate), fully managed services (Pinecone), embedded libraries and file-format-first stores (FAISS, LanceDB), and vector search bolted onto databases you already run (Postgres via pgvector on Supabase, MongoDB Atlas). The API shape is nearly identical everywhere — create a collection, `upsert` vectors with metadata, `query` with a vector and filters — so learn the pattern once and the products become interchangeable details.
