---
{
  "title": "RAG Agent",
  "module": "ai-agents",
  "order": 14,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is RAG? - Retrieval-Augmented Generation AI Explained",
      "url": "https://aws.amazon.com/what-is/retrieval-augmented-generation/"
    },
    {
      "type": "article",
      "title": "What Is Retrieval-Augmented Generation, aka RAG?",
      "url": "https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/"
    }
  ]
}
---

A **RAG agent** puts retrieval under the model's control. Classic RAG is a fixed pipeline: every query gets embedded, the top-k chunks come back, the model answers. A RAG agent instead treats retrieval as a **tool** inside an agent loop — the model decides *whether* to search, *what* to search for, and *whether the results are good enough*, retrieving again with a rewritten query, trying a different index, or answering directly when it already knows. This is often called **agentic RAG**.

The upgrade matters because fixed pipelines fail in predictable ways: the user's phrasing doesn't match the documents, the question needs facts from two different searches, or retrieval wasn't needed at all and the injected chunks just add noise. An agent handles all three — it can decompose "compare our 2024 and 2025 refund policies" into two targeted searches, judge that the first results are off-topic and reformulate, or skip the vector store entirely for small talk. The cost is extra LLM calls and latency, so plain RAG remains right for simple, homogeneous corpora.

In practice you'll define retrieval as a function — `search_docs(query: str, k: int)` backed by your vector database — register it via tool calling, and prompt the agent to reflect on result quality before answering, citing what it used. Frameworks make this nearly free: LlamaIndex query engines as tools, LangGraph's agentic RAG templates, or a raw loop where retrieval is just one tool among several.
