---
{
  "title": "RAG",
  "module": "rag",
  "order": 0,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Retrieval-Augmented Generation? - Google",
      "url": "https://cloud.google.com/use-cases/retrieval-augmented-generation"
    },
    {
      "type": "article",
      "title": "RAG Explained: Understanding Embeddings, Similarity, and Retrieval",
      "url": "https://towardsdatascience.com/rag-explained-understanding-embeddings-similarity-and-retrieval/"
    },
    {
      "type": "video",
      "title": "What is Retrieval-Augmented Generation? - IBM",
      "url": "https://www.youtube.com/watch?v=T-D1OfcDW1M"
    },
    {
      "type": "article",
      "title": "What is RAG?",
      "url": "https://aws.amazon.com/what-is/retrieval-augmented-generation/"
    },
    {
      "type": "article",
      "title": "What Is RAG in AI and How to Use It?",
      "url": "https://www.v7labs.com/blog/what-is-rag"
    },
    {
      "type": "article",
      "title": "An Introduction to RAG and Simple & Complex RAG",
      "url": "https://medium.com/enterprise-rag/an-introduction-to-rag-and-simple-complex-rag-9c3aa9bd017b"
    },
    {
      "type": "video",
      "title": "Learn RAG From Scratch",
      "url": "https://www.youtube.com/watch?v=sVcwVQRHIc8"
    },
    {
      "type": "opensource",
      "title": "Introduction to RAG - LlamaIndex",
      "url": "https://developers.llamaindex.ai/python/framework/understanding/rag/"
    },
    {
      "type": "article",
      "title": "Retrieval Augmented Generation (RAG) - DAIR.AI",
      "url": "https://www.promptingguide.ai/techniques/rag"
    }
  ]
}
---

**Retrieval-Augmented Generation (RAG)** is a pattern where you fetch relevant information from your own data at query time and hand it to a language model alongside the user's question. Instead of relying only on what the model absorbed during training, you retrieve documents, chunks, or records that actually answer the question, inject them into the prompt as **context**, and let the model generate a response grounded in that material. The model becomes a reasoning engine over your data rather than an oracle limited to its training cutoff.

This matters because LLMs on their own hallucinate, go stale, and know nothing about your private data. RAG fixes all three: answers are grounded in real sources you can cite, updating knowledge means updating an index rather than retraining a model, and proprietary content stays in your infrastructure. It is the cheapest, fastest way to make a general-purpose model behave like a domain expert, which is why it underpins most production AI products you see today.

In practice you will build a two-phase pipeline. Offline, you ingest documents, split them into chunks, embed each chunk with an **embedding model**, and store the vectors in an index. Online, you embed the incoming query, run a **similarity search** to pull the top-`k` matches, assemble them into a prompt, and call the LLM. The rest of this module walks through each stage — chunking, retrieval, generation, filtering, and vector storage — so you can build and debug this pipeline end to end.
