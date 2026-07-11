---
{
  "title": "Context Windows",
  "module": "llm-fundamentals",
  "order": 10,
  "sources": [
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is a Context Window in AI?",
      "url": "https://www.ibm.com/think/topics/context-window"
    },
    {
      "type": "article",
      "title": "Scaling Language Models with Retrieval-Augmented Generation (RAG)",
      "url": "https://arxiv.org/abs/2005.11401"
    },
    {
      "type": "article",
      "title": "Long Context in Language Models - Anthropic's Claude 3",
      "url": "https://www.anthropic.com/news/claude-3-family"
    },
    {
      "type": "official",
      "title": "Context windows - Anthropic",
      "url": "https://platform.claude.com/docs/en/build-with-claude/context-windows"
    }
  ]
}
---

The **context window** is the maximum number of **tokens** a model can process in a single request — input and generated output combined. It's a hard architectural limit: exceed it and the API rejects your request or your oldest content gets cut off. Windows have grown from a few thousand tokens to 200K and beyond (with some models advertising a million or more), but the limit never disappears — it just moves, and cost moves with it, since you pay per token you put in.

The context window is the budget inside which every technique in this course operates. It caps how long a conversation can run before you must trim history, how many retrieved documents fit in a **RAG** prompt, and how much code an assistant can consider at once. Bigger isn't automatically better, either: stuffing the window raises latency and cost, and models attend unevenly across very long inputs — relevant details buried mid-context can effectively get lost, the well-known "needle in a haystack" problem. A tight, relevant 5K-token prompt routinely beats a bloated 150K-token one.

Day to day, you'll check each model's window size in its docs, count tokens before sending requests, reserve headroom for the response via `max_tokens`, and implement overflow strategies: sliding-window truncation, summarizing older turns, or retrieving only the most relevant chunks instead of sending everything. Treat the window like RAM — finite, priced, and worth managing deliberately.
