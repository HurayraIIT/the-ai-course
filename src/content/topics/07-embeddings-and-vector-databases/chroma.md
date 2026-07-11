---
{
  "title": "Chroma",
  "module": "embeddings-and-vector-databases",
  "order": 14,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Chroma",
      "url": "https://www.trychroma.com/"
    },
    {
      "type": "article",
      "title": "Chroma Tutorials",
      "url": "https://lablab.ai/tech/chroma"
    },
    {
      "type": "video",
      "title": "Chroma - Chroma - Vector Database for LLM Applications",
      "url": "https://youtu.be/Qs_y0lTJAp0?si=Z2-eSmhf6PKrEKCW"
    }
  ]
}
---

**Chroma** is an open-source vector database designed to be the easiest possible on-ramp: `pip install chromadb` and you have a working vector store in the same process as your Python code, no server required. It persists to local disk by default, can run as a standalone server when you outgrow embedded mode, and offers **Chroma Cloud** as a managed option. Its API is deliberately tiny — collections, `add`, `query` — and it can even run your embedding function for you, so you pass raw text and Chroma handles vectorization.

Its value to you is speed of iteration. When you're prototyping a RAG pipeline, the vector database should be the least interesting part of your afternoon, and Chroma makes it exactly that: no Docker, no API keys, no schema design. That's why it's the default vector store in countless tutorials and a first-class integration in **LangChain** and **LlamaIndex** — the muscle memory you build here transfers directly to those frameworks.

The workflow: `client = chromadb.PersistentClient(path="./db")`, then `collection = client.create_collection("docs")`, `collection.add(documents=[...], ids=[...], metadatas=[...])`, and `collection.query(query_texts=["..."], n_results=5)`. Metadata filters ride along via a `where` clause. Treat embedded Chroma as your development and small-production tool; when you need serious scale, high availability, or multi-region deployment, you'll reach for the client-server mode, the cloud offering, or one of the heavier siblings covered next.
