---
{
  "title": "Context Engineering",
  "module": "advanced-prompting",
  "order": 5,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Context Engineering Guide",
      "url": "https://www.promptingguide.ai/guides/context-engineering-guide"
    },
    {
      "type": "article",
      "title": "Effective context engineering for AI agents",
      "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
    },
    {
      "type": "article",
      "title": "How to Perform Effective Agentic Context Engineering",
      "url": "https://towardsdatascience.com/how-to-perform-effective-agentic-context-engineering/"
    },
    {
      "type": "video",
      "title": "Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents",
      "url": "https://www.youtube.com/watch?v=vD0E3EUb8-8"
    }
  ]
}
---

**Context engineering** is the discipline of curating everything a model sees at inference time: the system prompt, conversation history, retrieved documents, **tool definitions**, tool results, and memory. The framing shift is treating the **context window** as a finite, precious resource — a budget you allocate deliberately — rather than a bucket you pour information into. The goal, as Anthropic's engineering guidance puts it, is finding the smallest set of high-signal tokens that maximizes the likelihood of the outcome you want.

The reason this became a first-class skill is agents. A single prompt is easy to control, but an agent running for dozens of turns accumulates tool outputs, file contents, and errors — and quality degrades as the window fills, a failure mode known as **context rot**. Models attend less reliably to material buried in a long context, costs climb linearly with tokens, and one polluted transcript can derail every subsequent decision. Most "the model got dumb" bugs in agentic systems are actually context bugs.

Practically, you will work with a handful of recurring strategies — write, select, compress, and isolate. That means designing lean system prompts at the right altitude, retrieving **just-in-time** context instead of preloading everything, trimming stale tool results, and structuring what remains with clear sections. The next topics drill into the pieces: how context engineering relates to prompt engineering, then **compaction** and **isolation** as specific techniques for long-running agents.
