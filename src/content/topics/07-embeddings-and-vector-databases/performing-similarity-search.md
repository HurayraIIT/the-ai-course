---
{
  "title": "Performing Similarity Search",
  "module": "embeddings-and-vector-databases",
  "order": 8,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Similarity Search & How Does it work?",
      "url": "https://www.truefoundry.com/blog/similarity-search"
    }
  ]
}
---

**Similarity search** is the mechanical core beneath semantic search: given a query vector, find the k stored vectors closest to it. "Close" is defined by a **distance metric** — **cosine similarity** (angle between vectors, the default for text), **Euclidean distance** (straight-line distance), or **dot product** — and the choice must match how your embedding model was trained. The naive approach, comparing the query against every vector, is called exact or brute-force **k-NN**; the scalable approach, **approximate nearest neighbor (ANN)**, trades a sliver of accuracy for orders-of-magnitude speed.

You need this layer of understanding because vector databases expose it directly. Every query API asks you for a metric, a `top_k`, and often ANN tuning parameters, and misconfiguring them produces silently bad results — the query runs fine but returns the wrong neighbors. Knowing that cosine similarity ranges from -1 to 1, that normalized vectors make cosine and dot product equivalent, and that similarity scores are only comparable within one model saves you real debugging time.

Hands-on, you'll compute similarity yourself first — a few lines of NumPy: normalize, then `np.dot(query, matrix.T)` — to demystify what databases do. Then you'll run the same search through a vector store, passing `top_k` and metadata filters, and inspect the returned scores to set sensible relevance thresholds. This topic is the bridge to indexing, where you'll see how ANN makes it fast.
