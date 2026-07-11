---
{
  "title": "External Memory",
  "module": "agent-memory",
  "order": 4,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "How to Maximize Agentic Memory for Continual Learning",
      "url": "https://towardsdatascience.com/how-to-maximize-agentic-memory-for-continual-learning/"
    }
  ]
}
---

**External memory** is any storage an agent uses outside the model's context window: files, databases, vector stores, key-value caches, even a scratch directory. The principle is simple — the context window is small, expensive, and wiped between runs, so anything the agent should keep must live in an external system the agent reads from and writes to deliberately. Every long-term memory technique in this module is a flavor of external memory; this topic is the umbrella.

Understanding it as an architectural layer changes how you build. Instead of asking "how do I fit everything in the prompt," you ask "what belongs in context *right now*, and where does the rest live?" That reframing unlocks agents that work beyond a single session: a research agent appending findings to a notes file, a support bot querying past tickets from Postgres, a coding agent grepping the repo instead of holding it all in context. The pattern mirrors RAM versus disk, and the same instincts apply: keep hot state in context, page in cold state on demand, persist what you can't afford to lose.

In practice external memory is accessed through **tools**: `save_memory` / `search_memory` functions backed by a vector store for semantic recall, plain file tools for scratchpads and plans, or SQL for structured facts. The craft is in the two hooks — a **write policy** (what's worth persisting, decided by rules or an LLM extraction step) and a **read policy** (what gets retrieved and injected before each turn).
