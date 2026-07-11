---
{
  "title": "Forgetting / Aging Strategies",
  "module": "agent-memory",
  "order": 7,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Memory Management",
      "url": "https://python.langchain.com/docs/how_to/chatbots_memory/"
    },
    {
      "type": "article",
      "title": "Memory Management for AI Agents",
      "url": "https://techcommunity.microsoft.com/blog/azure-ai-services-blog/memory-management-for-ai-agents/4406359"
    }
  ]
}
---

**Forgetting** is memory management's deletion side: the deliberate policies that decide which stored memories decay, get demoted, or disappear entirely. **Aging** strategies score each memory by recency, frequency of use, and importance, letting stale entries lose retrieval priority over time — the same intuition as an LRU cache or a search engine's freshness signal, applied to an agent's memory store.

It's tempting to skip this and keep everything, but unbounded memory rots. Retrieval quality drops as the store fills with near-duplicates and dead facts — the user's *old* address outranking the new one is the classic failure. Contradictions accumulate ("prefers Python" from January, "prefers TypeScript" from June), storage and search costs climb, and privacy rules like GDPR can make deletion a legal requirement, not a design choice. An agent that forgets well is more accurate than one that remembers everything, because recall surfaces five relevant memories instead of fifty stale ones.

In practice you'll combine a few mechanisms: **TTL expiry** for ephemeral facts, a decayed relevance score such as `importance * recency_weight * use_count` to rank retrieval, **consolidation** jobs where an LLM periodically merges duplicates and resolves contradictions in favor of newer evidence, and hard caps that evict the lowest-scoring entries when the store exceeds a budget. Prefer **soft deletion** (archive, exclude from retrieval) so mistakes are reversible, and always let an explicit user correction — "actually, I moved to Austin" — overwrite the memory it contradicts immediately.
