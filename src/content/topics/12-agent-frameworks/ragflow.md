---
{
  "title": "RAGFlow",
  "module": "agent-frameworks",
  "order": 6,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "RagFlow",
      "url": "https://ragflow.io/"
    },
    {
      "type": "opensource",
      "title": "ragflow",
      "url": "https://github.com/infiniflow/ragflow"
    },
    {
      "type": "video",
      "title": "RagFlow: Ultimate RAG Engine",
      "url": "https://www.youtube.com/watch?v=ApA-7G7FGRc"
    }
  ]
}
---

RAGFlow, from InfiniFlow, is an open-source **RAG engine** rather than a code library: a self-hosted application, run with Docker, that gives you an end-to-end retrieval-augmented generation system with a web UI. You upload documents, it parses and chunks them, builds the retrieval layer, and exposes chat assistants and APIs over your knowledge base — no pipeline code required.

Its differentiator is **deep document understanding**. Where most frameworks split text naively, RAGFlow invests in layout-aware parsing of messy real-world files — PDFs with tables, scanned documents, presentations — using template-based chunking you can inspect and adjust, with visible chunk previews so you can see exactly what the retriever will work with. It also emphasizes grounded answers with citations back to source chunks, which reduces hallucination in a way that matters for internal knowledge tools. Later releases added a visual agent/workflow builder, but its center of gravity remains high-quality retrieval. Think of it as sitting at the opposite end of the spectrum from LlamaIndex: a product you deploy and configure, not a library you compose.

In practice you'll clone the repo, launch it with `docker compose`, and do most setup in the browser: create a **knowledge base**, choose a chunking template per document type, connect your model provider keys, and test retrieval quality interactively. When you're happy, you integrate it into your own apps through its HTTP APIs and SDKs, treating RAGFlow as the retrieval backend behind your application.
