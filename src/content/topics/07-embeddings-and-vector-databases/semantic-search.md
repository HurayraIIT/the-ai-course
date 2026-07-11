---
{
  "title": "Semantic Search",
  "module": "embeddings-and-vector-databases",
  "order": 7,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Semantic Search?",
      "url": "https://www.elastic.co/what-is/semantic-search"
    },
    {
      "type": "video",
      "title": "What is Semantic Search? - Cohere",
      "url": "https://www.youtube.com/watch?v=fFt4kR4ntAA"
    }
  ]
}
---

**Semantic search** is search that matches on meaning rather than exact words. A keyword engine looking for "cancel my subscription" won't find a document titled "How to end your membership"; a semantic engine will, because both phrases embed to nearby points in vector space. Under the hood it is embeddings plus nearest-neighbor retrieval — the first real *application* of everything you've learned so far in this module.

It matters because search quality is usually the ceiling on your AI product's quality. In a RAG system, if retrieval misses the relevant passage, the LLM either says "I don't know" or hallucinates — no prompt engineering fixes bad retrieval. Semantic search also handles the messy reality of user input: typos, paraphrases, vague questions, and cross-language queries all still land near the right documents. That said, pure vector search can miss exact identifiers like error codes or product names, which is why production systems often run **hybrid search** — combining semantic scores with keyword scores like **BM25**.

Building one follows a fixed recipe you'll implement here: **chunk** your documents into passages, embed each chunk, store the vectors with metadata, embed the incoming query with the same model, retrieve the top-k nearest chunks, and optionally **re-rank** them with a cross-encoder for precision. Every vector database in this module exists to serve step five at scale.
