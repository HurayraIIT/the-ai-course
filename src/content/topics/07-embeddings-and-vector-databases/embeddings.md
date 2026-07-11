---
{
  "title": "Embeddings",
  "module": "embeddings-and-vector-databases",
  "order": 1,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What are Embeddings in Machine Learning?",
      "url": "https://www.cloudflare.com/en-gb/learning/ai/what-are-embeddings/"
    },
    {
      "type": "article",
      "title": "What is Embedding?",
      "url": "https://www.ibm.com/topics/embedding"
    },
    {
      "type": "video",
      "title": "What are Word Embeddings",
      "url": "https://www.youtube.com/watch?v=wgfSDrqYMJ4"
    },
    {
      "type": "article",
      "title": "Understanding the role of embeddings in RAG LLMs",
      "url": "https://www.aporia.com/learn/understanding-the-role-of-embeddings-in-rag-llms/"
    },
    {
      "type": "article",
      "title": "Mastering RAG: How to Select an Embedding Model",
      "url": "https://www.rungalileo.io/blog/mastering-rag-how-to-select-an-embedding-model"
    }
  ]
}
---

An **embedding** is a dense vector of numbers — often hundreds or a few thousand dimensions — that captures the meaning of a piece of data. An **embedding model** is a neural network trained so that similar inputs produce nearby vectors: "puppy" lands close to "dog," a refund-request email lands close to other refund requests. The numbers themselves are meaningless in isolation; what matters is the *geometry*, because distance in the vector space corresponds to semantic similarity.

For you as a builder, embeddings are the bridge between unstructured data and computation. Databases can't index "meaning," but they can index numbers. Once text, code, or images become vectors, you can compare, cluster, search, and classify them with plain math. This is the foundation of **retrieval-augmented generation (RAG)**: you embed your knowledge base once, embed each user question at query time, and hand the closest chunks to an LLM. Nearly every topic in this module — semantic search, recommendations, vector databases — is an application of this one idea.

You'll generate embeddings through a single API call (`client.embeddings.create(...)` with OpenAI, or a local model via `sentence-transformers`), getting back a `float` array per input. You'll compare vectors with **cosine similarity**, store them in a vector database, and learn to pick a model by weighing dimension size, cost, language coverage, and retrieval quality — a choice that quietly determines how well your whole RAG pipeline performs.
