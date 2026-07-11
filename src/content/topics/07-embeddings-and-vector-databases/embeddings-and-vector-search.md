---
{
  "title": "Embeddings and Vector Search",
  "module": "embeddings-and-vector-databases",
  "order": 0,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Embeddings API Documentation",
      "url": "https://platform.openai.com/docs/guides/embeddings/what-are-embeddings"
    },
    {
      "type": "article",
      "title": "Understanding Embeddings and Vector Search (Pinecone Blog)",
      "url": "https://www.pinecone.io/learn/vector-embeddings/"
    }
  ]
}
---

**Embeddings** are numerical representations of data — a sentence, a document, an image — expressed as a long list of floating-point numbers called a **vector**. The clever part is that an embedding model places semantically similar things close together in that vector space: "How do I reset my password?" and "I can't log in" end up near each other even though they share almost no words. **Vector search** is simply the act of finding the stored vectors closest to a query vector.

This pairing is the retrieval backbone of modern AI applications. Large language models can only reason over what fits in their context window, so you need a way to fetch the *right* text before the model ever sees a prompt. Keyword search misses paraphrases and synonyms; vector search matches on meaning. That is what makes **RAG**, semantic search, memory for agents, and deduplication actually work in production.

In practice the loop is short: call an embeddings endpoint (such as OpenAI's `embeddings` API) to convert your documents into vectors, store them in a vector database or index, then embed each incoming query with the *same model* and run a **nearest-neighbor** search using a metric like **cosine similarity**. The top results become context for your LLM call. You'll build this pipeline repeatedly throughout this module, so make sure the mental model — text in, vector out, distance equals relevance — is solid before moving on.
