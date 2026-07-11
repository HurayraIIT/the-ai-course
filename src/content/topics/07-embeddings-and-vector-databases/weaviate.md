---
{
  "title": "Weaviate",
  "module": "embeddings-and-vector-databases",
  "order": 16,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Weaviate",
      "url": "https://weaviate.io/"
    },
    {
      "type": "video",
      "title": "Advanced AI Agents with RAG",
      "url": "https://www.youtube.com/watch?v=UoowC-hsaf0&list=PLTL2JUbrY6tVmVxY12e6vRDmY-maAXzR1"
    }
  ]
}
---

**Weaviate** is an open-source vector database written in Go that thinks of itself as more than an index: it's an AI-native database with a schema of typed **collections**, built-in **hybrid search** that fuses vector and BM25 keyword scoring in one query, and a modular **vectorizer** system that can call OpenAI, Cohere, Google, or local models to embed your data on the way in. You can self-host it with Docker or Kubernetes, or use the managed **Weaviate Cloud**.

Its differentiator in this module's lineup is that batteries-included integration layer. Where FAISS gives you a bare index and Pinecone gives you managed storage, Weaviate can own the whole retrieval pipeline: define a collection with `text2vec-openai`, insert raw objects, and querying, embedding, keyword fusion, and even **generative search** (retrieve-then-summarize with an LLM) happen server-side. That makes it a strong fit for search-heavy products where hybrid relevance matters — pure vector search famously fumbles exact part numbers and names, and Weaviate's fused scoring handles both in a single call.

You'll connect with the client (`weaviate.connect_to_local()` or to the cloud), create a collection with a vectorizer config, `insert` objects, and query with `collection.query.hybrid("your question", limit=5)` or `near_text`. Filters, multi-tenancy, and RBAC are first-class. Try the hybrid `alpha` parameter — sliding between pure keyword and pure vector — to feel how much retrieval quality it buys on realistic queries.
