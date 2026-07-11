---
{
  "title": "Pinecone",
  "module": "embeddings-and-vector-databases",
  "order": 15,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Pinecone",
      "url": "https://www.pinecone.io/"
    },
    {
      "type": "article",
      "title": "Everything you need to know about Pinecone",
      "url": "https://www.packtpub.com/article-hub/everything-you-need-to-know-about-pinecone-a-vector-database?srsltid=AfmBOorXsy9WImpULoLjd-42ERvTzj3pQb7C2EFgamWlRobyGJVZKKdz"
    },
    {
      "type": "video",
      "title": "Introducing Pinecone Serverless",
      "url": "https://www.youtube.com/watch?v=iCuR6ihHQgc"
    }
  ]
}
---

**Pinecone** is the fully managed, closed-source vector database: you never see a server, a Docker image, or an index file. You create an index through the console or API, get an endpoint, and Pinecone handles sharding, replication, scaling, and index maintenance. Its **serverless** architecture separates storage from compute, so you pay for what you store and the queries you run rather than for provisioned machines sitting idle.

Among the products in this module, Pinecone stakes out the "zero operations" end of the spectrum — the counterpoint to self-hosting Qdrant or Weaviate. That's compelling when your team's time is worth more than the subscription, when you need to go from prototype to millions of vectors without re-architecting, or when nobody wants to be on call for a database. The trade-offs are real too: no self-hosted option, vendor lock-in at the storage layer, and per-usage pricing you'll want to model before bulk-loading a huge corpus. Namespaces give you clean **multi-tenancy**, a common SaaS requirement.

You'll use it through a thin SDK: `pc = Pinecone(api_key=...)`, create an index with a dimension and metric, then `index.upsert(vectors=[...])` and `index.query(vector=[...], top_k=5, filter={...}, include_metadata=True)`. Pinecone also offers integrated inference — hosted embedding and reranking models — so you can send raw text and skip running a separate embeddings call. A free starter tier makes it easy to evaluate before spending anything.
