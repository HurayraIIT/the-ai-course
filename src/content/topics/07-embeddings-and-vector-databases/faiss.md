---
{
  "title": "FAISS",
  "module": "embeddings-and-vector-databases",
  "order": 18,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "FAISS",
      "url": "https://ai.meta.com/tools/faiss/"
    },
    {
      "type": "article",
      "title": "What Is Faiss (Facebook AI Similarity Search)?",
      "url": "https://www.datacamp.com/blog/faiss-facebook-ai-similarity-search"
    },
    {
      "type": "video",
      "title": "FAISS Vector Library with LangChain and OpenAI",
      "url": "https://www.youtube.com/watch?v=ZCSsIkyCZk4"
    }
  ]
}
---

**FAISS** (Facebook AI Similarity Search) is Meta's open-source library for fast similarity search over dense vectors. Note the word *library*: FAISS is not a database. There's no server, no persistence layer, no metadata filtering, no replication — just highly optimized C++ (with Python bindings) that builds an **index** over a pile of vectors in memory and answers nearest-neighbor queries at remarkable speed, on CPU or GPU.

FAISS matters because it's the engine underneath much of the vector search world — many vector databases either use it directly or reimplement its algorithms. Learning it teaches you the actual mechanics: **flat indexes** for exact search, **IVF** for partition-based approximate search, **HNSW** graphs, and **product quantization** for compressing vectors when memory is tight. When you need raw speed on a single machine — offline batch jobs, research experiments, or search embedded inside your own service — FAISS skips every network hop and gives you full control over the speed-versus-recall tradeoff.

In practice you'll `pip install faiss-cpu` (or `faiss-gpu`), embed your documents into a NumPy array, then build an index: `index = faiss.IndexFlatL2(dim)` for exact search or `IndexIVFFlat` / `IndexHNSWFlat` for approximate. Call `index.add(vectors)`, then `distances, ids = index.search(query_vectors, k)`. You handle everything a database would: mapping returned IDs back to documents, saving with `faiss.write_index`, and reloading on startup. LangChain and LlamaIndex both wrap FAISS as a zero-infrastructure local vector store.
