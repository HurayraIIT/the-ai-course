---
{
  "title": "Indexing Embeddings",
  "module": "embeddings-and-vector-databases",
  "order": 9,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Indexing & Embeddings",
      "url": "https://developers.llamaindex.ai/python/framework/understanding/rag/indexing/"
    },
    {
      "type": "video",
      "title": "Vector Databases Simply Explained! (Embeddings & Indexes)",
      "url": "https://www.youtube.com/watch?v=dN0lsF2cvm4"
    }
  ]
}
---

An **index** is the data structure that makes vector search fast. Comparing a query against a million stored vectors one by one works, but it's linear time; an index organizes vectors so the database can skip most of them. The dominant structure is **HNSW** (Hierarchical Navigable Small World), a layered graph you can picture as a highway system for vector space; alternatives like **IVF** (clustering vectors into buckets and searching only nearby buckets) and **product quantization** (compressing vectors to shrink memory) trade accuracy, speed, and RAM differently.

You care because indexing is where "works in my notebook" meets "works with real traffic." Every vector database builds one of these structures under the hood, and their tuning knobs — HNSW's `ef_construction` and `M`, IVF's `nprobe` — govern the trade-off between **recall** (did you find the true nearest neighbors?) and latency. Indexing also shapes your ingestion pipeline: chunking strategy, metadata attached to each vector, and how you handle updates and deletes all get decided at index time, and they're expensive to redo.

In practice, frameworks like **LlamaIndex** wrap the whole flow — load documents, split into nodes, embed, and build a `VectorStoreIndex` — in a few lines, while databases let you declare the index type and metric when you create a collection. You'll start with defaults, measure recall on sample queries, and only then tune. Premature index tuning is a classic time sink; measured tuning is a superpower.
