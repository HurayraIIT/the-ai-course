---
{
  "title": "Chunking",
  "module": "rag",
  "order": 3,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Understanding LangChain's RecursiveCharacterTextSplitter",
      "url": "https://dev.to/eteimz/understanding-langchains-recursivecharactertextsplitter-2846"
    },
    {
      "type": "article",
      "title": "Chunking Strategies for LLM Applications",
      "url": "https://www.pinecone.io/learn/chunking-strategies/"
    },
    {
      "type": "article",
      "title": "A Guide to Chunking Strategies for Retrieval Augmented Generation",
      "url": "https://zilliz.com/learn/guide-to-chunking-strategies-for-rag"
    }
  ]
}
---

**Chunking** is the step where you split source documents into smaller pieces before embedding and indexing them. A 50-page PDF can't be embedded as one vector — the embedding would be too diluted to match anything specific, and the whole document wouldn't fit in a prompt anyway. So you cut it into chunks sized for retrieval: paragraphs, sections, or fixed windows of a few hundred tokens, often with some **overlap** so ideas that straddle a boundary aren't severed.

Chunking quietly determines the ceiling of your entire RAG system. If a chunk is too small, it loses the context needed to be understood; too large, and its embedding averages together unrelated topics, so similarity search returns mush. Most "the model gave a wrong answer" bugs in RAG trace back to retrieval, and most retrieval bugs trace back to chunking. Get this step right and everything downstream — search quality, answer accuracy, token cost — improves.

In practice you will start with a **recursive character splitter** (like LangChain's `RecursiveCharacterTextSplitter`), which tries to break on paragraphs, then sentences, then words, targeting roughly 300–800 tokens with 10–20% overlap. From there you tune: split Markdown on headings, code on functions, and HTML on semantic tags; attach metadata like source and section title to every chunk; and consider **semantic chunking**, which uses embeddings to find natural topic boundaries. Then you test retrieval against real queries and adjust chunk size based on what actually gets found.
