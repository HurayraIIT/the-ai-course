---
{
  "title": "Reranking",
  "module": "rag",
  "order": 5,
  "sources": ["new"],
  "resources": [
    {
      "type": "article",
      "title": "Rerankers and Two-Stage Retrieval",
      "url": "https://www.pinecone.io/learn/series/rag/rerankers/"
    },
    {
      "type": "article",
      "title": "Cohere Rerank overview",
      "url": "https://docs.cohere.com/docs/rerank-overview"
    }
  ]
}
---

**Reranking** is a second, more careful pass over your retrieval results: first-stage retrieval (vector search, BM25, or hybrid) fetches a generous candidate set — say the top 50 chunks — and a **reranker** then re-scores each candidate against the query, keeping only the best handful for the prompt. The quality jump comes from architecture. Embedding search is a **bi-encoder**: query and documents are embedded separately, and similarity is a cheap vector comparison against precomputed indexes. A reranker is a **cross-encoder**: it reads the query and a candidate together in one forward pass, letting the model attend across both texts. That joint reading catches relevance that independent embeddings structurally miss — negation, "which of these actually answers the question" — at the price of one model inference per candidate, which is exactly why it can't be the first stage over millions of documents.

This two-stage design — **retrieve wide, rerank narrow** — is one of the highest-leverage upgrades in RAG. It directly attacks the failure mode from the retrieval lesson where the right chunk is retrieved but sits at rank 12 while you only pass the top 5 to the model; the reranker pulls it into the window. It also composes with everything else: after **hybrid search** merges semantic and keyword candidates, the reranker is the principled way to order the combined pool, and trimming to fewer, better chunks feeds the **lost in the middle** problem less material to bury.

In practice, reach for a hosted reranker like Cohere Rerank or Jina Reranker (one API call taking the query plus candidate list), or self-host an open-weight cross-encoder such as BGE-reranker. Typical shape: retrieve 25–100 candidates, rerank, keep the top 3–10 — and apply a score threshold so off-topic queries pass nothing at all rather than the least-bad garbage. Measure before and after with the retrieval evals you built earlier (**recall@k** on a labeled query set); reranking usually buys a large accuracy gain for ~100–300ms of added latency, but your eval set is what proves it's worth it for your corpus.
