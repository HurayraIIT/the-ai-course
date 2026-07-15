---
{
  "title": "Retrieval Process",
  "module": "rag",
  "order": 4,
  "sources": [
    "ai-engineer"
  ],
  "resources": []
}
---

The **retrieval process** is the "R" in RAG: given a user's query, find the chunks in your index most likely to contain the answer. The standard flow embeds the query with the same **embedding model** used at indexing time, then runs a nearest-neighbor search over the stored vectors using a similarity metric like **cosine similarity**, returning the top-`k` matches. Retrieval is a search problem, not a generation problem — the LLM hasn't entered the picture yet.

Retrieval quality is the single biggest lever on RAG accuracy. If the right chunk isn't in the retrieved set, no prompt engineering can save the answer — the model will either refuse or hallucinate. Understanding retrieval as its own measurable stage lets you debug systematically: you can log what was retrieved for a failing query and immediately see whether the problem is search (wrong chunks) or generation (right chunks, bad answer). Metrics like **recall@k** make this concrete.

In practice you will rarely stop at plain vector search. Production pipelines layer on **hybrid search** (combining vectors with keyword matching like BM25 so exact terms, IDs, and names aren't missed), a **reranker** model that rescores the top candidates for relevance, and query transformations that rewrite vague user questions into better search strings. You will tune `k`, set similarity thresholds to drop weak matches, and build a small evaluation set of query-to-expected-chunk pairs so every change to the pipeline is measured, not guessed.
