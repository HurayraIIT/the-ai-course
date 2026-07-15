---
{
  "title": "Short Term  Memory",
  "module": "agent-memory",
  "order": 1,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Build Smarter AI Agents: Manage Short-term and Long-term Memory",
      "url": "https://redis.io/blog/build-smarter-ai-agents-manage-short-term-and-long-term-memory-with-redis/"
    }
  ]
}
---

**Short-term memory** is what an agent holds in its **context window** during a single session: the system prompt, the conversation so far, recent tool calls and their results, and any scratch notes about the task in flight. It is the agent's working memory — fast, always visible to the model, and gone the moment the session ends or the window fills up. Managing it means deciding, turn by turn, exactly which tokens ride along in the next request.

This matters because the context window is your scarcest resource. Even with the million-token windows common in 2026, long agent sessions accumulate tool outputs and dialogue faster than you expect, and models attend less reliably to material buried in the middle of a bloated context — while every retained token adds cost and latency. Unmanaged short-term memory is the root cause of agents that "get dumber" as a conversation goes on: the signal drowns in stale logs and dead ends.

In practice you will maintain the conversation as a message list and apply a **trimming policy** before each call: keep the system prompt and last N turns verbatim, drop or truncate old tool outputs, and roll everything older into a running summary (covered in the summarization topic). Frameworks like LangChain give you `trim_messages` and checkpointed threads; in a hand-rolled agent you implement the same loop yourself. The key habit is budgeting: know your token ceiling and decide what earns space under it.
