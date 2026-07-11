---
{
  "title": "Episodic vs Semantic Memory",
  "module": "agent-memory",
  "order": 3,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What Is AI Agent Memory? - IBM",
      "url": "https://www.ibm.com/think/topics/ai-agent-memory"
    },
    {
      "type": "article",
      "title": "Episodic Memory vs. Semantic Memory: The Key Differences",
      "url": "https://www.magneticmemorymethod.com/episodic-vs-semantic-memory/"
    },
    {
      "type": "article",
      "title": "Memory Systems in LangChain",
      "url": "https://python.langchain.com/docs/how_to/chatbots_memory/"
    }
  ]
}
---

Borrowed from cognitive science, this distinction splits an agent's long-term memory by *kind* rather than lifespan. **Episodic memory** stores specific experiences: "on June 3rd the user asked me to refactor the auth module and rejected my first approach." **Semantic memory** stores general facts distilled from those experiences: "the user prefers small, incremental PRs." Episodes are timestamped events; semantics are timeless knowledge. One records what happened, the other what is true.

The distinction matters because the two are written, stored, and retrieved differently — and conflating them produces bloated, unreliable memory. Episodes are append-only logs you search by similarity or time ("have I handled an error like this before?") and are ideal as **few-shot examples** of past successes and failures. Semantic facts need consolidation: extraction, deduplication, and updating when reality changes, since a stale fact confidently recalled is worse than no memory at all. Knowing which type a piece of information is tells you which pipeline it belongs in.

In practice you will run both stores side by side. Episodic: log each meaningful interaction or task outcome as a record with an embedding, then retrieve similar past episodes when a new task arrives. Semantic: run an LLM extraction pass over conversations to pull out durable facts, upsert them into a profile or knowledge store keyed by subject, and inject the relevant ones into the system prompt. Frameworks like LangGraph and Mem0 expose this split directly, but it is just as easy to model with two tables.
