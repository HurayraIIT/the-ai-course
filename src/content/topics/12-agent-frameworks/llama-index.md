---
{
  "title": "Llama Index",
  "module": "agent-frameworks",
  "order": 2,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Llama Index",
      "url": "https://docs.llamaindex.ai/en/stable/"
    },
    {
      "type": "video",
      "title": "Introduction to LlamaIndex with Python (2025)",
      "url": "https://www.youtube.com/watch?v=cCyYGYyCka4"
    },
    {
      "type": "official",
      "title": "LlamaIndex",
      "url": "https://llamaindex.ai/"
    },
    {
      "type": "official",
      "title": "LlamaIndex Documentation",
      "url": "https://docs.smith.langchain.com/"
    },
    {
      "type": "official",
      "title": "What is LlamaIndex.TS",
      "url": "https://ts.llamaindex.ai/docs/llamaindex"
    },
    {
      "type": "opensource",
      "title": "run-llama/llama_index",
      "url": "https://github.com/run-llama/llama_index"
    },
    {
      "type": "article",
      "title": "What is LlamaIndex? - IBM",
      "url": "https://www.ibm.com/think/topics/llamaindex"
    },
    {
      "type": "article",
      "title": "LlamaIndex - Hugging Face",
      "url": "https://huggingface.co/llamaindex"
    }
  ]
}
---

LlamaIndex is the framework that treats your data as the center of the LLM application. Where LangChain starts from chains of model calls, LlamaIndex starts from **indexes**: it ingests documents, chunks them, embeds them, and exposes them through query engines and retrievers so a model can answer questions grounded in your content. It's available in both Python and TypeScript.

If your problem is fundamentally "make an LLM smart about these documents," LlamaIndex is usually the shortest path — it's the most **RAG-native** of the major frameworks. Its ingestion pipeline handles loaders for PDFs, Notion, databases, and hundreds of other sources (via LlamaHub), and its retrieval layer goes well beyond naive top-k: sentence-window retrieval, auto-merging, rerankers, and structured metadata filtering. It has since grown full **agent** abstractions and multi-step Workflows, so document agents that plan, retrieve, and synthesize live in one framework rather than being bolted together.

You'll `pip install llama-index`, point a `SimpleDirectoryReader` at a folder, and build a `VectorStoreIndex` from the documents in about four lines. From the index you derive a `query_engine` for one-shot Q&A or a `chat_engine` for conversational memory, then graduate to wrapping query engines as tools inside an agent. Most of your real work happens in tuning the ingestion: chunk sizes, embedding models, metadata, and which **retriever** strategy fits your corpus — the code stays small while retrieval quality does the heavy lifting.
