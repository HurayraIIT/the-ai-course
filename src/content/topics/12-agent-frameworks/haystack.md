---
{
  "title": "Haystack",
  "module": "agent-frameworks",
  "order": 4,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Haystack",
      "url": "https://haystack.deepset.ai/"
    },
    {
      "type": "official",
      "title": "Haystack Overview",
      "url": "https://docs.haystack.deepset.ai/docs/intro"
    },
    {
      "type": "opensource",
      "title": "deepset-ai/haystack",
      "url": "https://github.com/deepset-ai/haystack"
    }
  ]
}
---

Haystack, from deepset, is a production-oriented framework for building **LLM pipelines** — search, RAG, and agent systems — out of small, typed components. Its roots predate the chat-model era: it started in neural search and question answering, and that heritage shows in how seriously it treats retrieval, document stores, and evaluation.

What differentiates Haystack is its explicit **pipeline graph**: every component declares typed inputs and outputs, and you connect them by name, so the framework validates your wiring before anything runs. That makes pipelines predictable, testable, and easy to serialize to YAML for deployment — a distinctly engineering-first posture compared to LangChain's looser composition. If your system is retrieval-heavy — enterprise search, document Q&A over large corpora, hybrid keyword-plus-vector retrieval — Haystack is one of the most mature options, with connectors for Elasticsearch, OpenSearch, Qdrant, Weaviate, and most model providers. Version 2.x added first-class agent and tool-calling support, so it now covers agentic flows without leaving the pipeline model.

You'll `pip install haystack-ai`, pick a **DocumentStore** (in-memory to start), and index documents through a pipeline of converters, splitters, and embedders. Query time is another pipeline: an embedder feeding a retriever feeding a `PromptBuilder` feeding a generator. The code shape is always the same — instantiate components, `pipeline.add_component()`, `pipeline.connect("retriever.documents", "prompt_builder.documents")`, then `pipeline.run()` with your inputs. Once that clicks, swapping any single component is a one-line change.
