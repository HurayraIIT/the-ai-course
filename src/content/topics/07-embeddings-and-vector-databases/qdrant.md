---
{
  "title": "Qdrant",
  "module": "embeddings-and-vector-databases",
  "order": 17,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Qdrant",
      "url": "https://qdrant.tech/"
    },
    {
      "type": "opensource",
      "title": "Qdrant on GitHub",
      "url": "https://github.com/qdrant/qdrant"
    },
    {
      "type": "video",
      "title": "Getting started with Qdrant",
      "url": "https://www.youtube.com/watch?v=LRcZ9pbGnno"
    }
  ]
}
---

**Qdrant** is an open-source vector database written in **Rust**, known for raw performance and precise filtering. Its core abstraction is the **collection** of points — each point a vector plus a JSON `payload` — and its standout engineering is filterable HNSW: metadata filters are woven into the graph traversal itself, so heavily filtered queries stay fast instead of degrading the way post-filtering does. You can run it as a single Docker container, embed it in-process, cluster it for scale, or use the managed **Qdrant Cloud**, which includes a free tier.

In this module's lineup, Qdrant is the performance-and-control option: fully open source under Apache 2.0 like Weaviate, but leaner — it doesn't try to run your embedding models or orchestrate your pipeline; it stores and searches vectors exceptionally well. Features like **scalar and binary quantization** (shrinking memory footprint several-fold), sparse vector support for hybrid retrieval, and multitenancy via payload partitioning make it a common pick for teams self-hosting serious RAG workloads on a budget.

Day-to-day you'll run `docker run -p 6333:6333 qdrant/qdrant`, then use the Python client: `client.create_collection(...)` with a vector size and distance metric, `client.upsert(...)` with points and payloads, and `client.query_points(...)` with a query vector and a `Filter` of `must`/`should` conditions. The REST and gRPC APIs mirror each other, and a built-in web dashboard at port `6333` lets you inspect collections while you develop.
