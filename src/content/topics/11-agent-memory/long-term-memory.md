---
{
  "title": "Long Term Memory",
  "module": "agent-memory",
  "order": 2,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Long Term Memory in AI Agents",
      "url": "https://medium.com/@alozie_igbokwe/ai-101-long-term-memory-in-ai-agents-35f87f2d0ce0"
    },
    {
      "type": "article",
      "title": "Memory Management in AI Agents",
      "url": "https://python.langchain.com/docs/how_to/chatbots_memory/"
    },
    {
      "type": "article",
      "title": "Storing and Retrieving Knowledge for Agents",
      "url": "https://www.pinecone.io/learn/langchain-retrieval-augmentation/"
    },
    {
      "type": "article",
      "title": "Short-Term vs Long-Term Memory in AI Agents",
      "url": "https://adasci.org/short-term-vs-long-term-memory-in-ai-agents/"
    },
    {
      "type": "video",
      "title": "Building Brain-Like Memory for AI Agents",
      "url": "https://www.youtube.com/watch?v=VKPngyO0iKg"
    }
  ]
}
---

**Long-term memory** is what an agent retains after the session ends: facts about the user, lessons from completed tasks, and domain knowledge built up over weeks of use. It lives outside the model — in databases, vector stores, or files — and survives restarts, new conversations, and even model upgrades. Where short-term memory is the context window itself, long-term memory is a persistence layer with two deliberate operations: **writing** (deciding what is worth keeping) and **recall** (retrieving the right memories back into context later).

This is the layer that makes an agent feel like it knows you. A coding agent that remembers your stack and conventions, a support agent that recalls last month's incident, an assistant that stops re-asking your timezone — all of that is long-term memory doing its job. It is also how agents improve: persisting "approach X failed for task Y" turns yesterday's mistakes into tomorrow's shortcuts, something no context window can provide on its own.

In practice you will implement it as a store plus two hooks. After a session (or mid-session when something notable happens), an extraction step — often an LLM call — pulls out durable facts and writes them with metadata like `user_id` and timestamps. Before each new session or turn, a recall step queries the store, usually via **embedding search** the way a RAG pipeline retrieves documents, and injects the top matches into the prompt. Tools like LangGraph's memory store, Mem0, or a plain Postgres-plus-pgvector setup all follow this pattern.
