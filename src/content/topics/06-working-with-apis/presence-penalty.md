---
{
  "title": "Presence Penalty",
  "module": "working-with-apis",
  "order": 16,
  "sources": [
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Understanding Presence Penalty and Frequency Penalty",
      "url": "https://medium.com/@pushparajgenai2025/understanding-presence-penalty-and-frequency-penalty-in-openai-chat-completion-api-calls-2e3a22547b48"
    },
    {
      "type": "article",
      "title": "Difference between Frequency and Presence Penalties?",
      "url": "https://community.openai.com/t/difference-between-frequency-and-presence-penalties/2777"
    },
    {
      "type": "article",
      "title": "LLM Parameters Explained: A Practical Guide with Examples",
      "url": "https://learnprompting.org/blog/llm-parameters"
    },
    {
      "type": "article",
      "title": "Presence Penalty - LLM Parameter Guide - Vellum",
      "url": "https://www.vellum.ai/llm-parameters/presence-penalty"
    }
  ]
}
---

**Presence penalty** applies a one-time, flat penalty to any token that has appeared in the output at all — used once or used fifty times, the penalty is identical. That's the precise contrast with **frequency penalty**, which stacks with every repetition. The effect is different in kind: frequency penalty says "stop overusing that word," while `presence_penalty` says "you've covered that — move on to something new." It ranges from -2.0 to 2.0 on OpenAI-style APIs, defaulting to 0, with positive values pushing the model toward fresh vocabulary and, by extension, fresh **topics**.

This is the knob for breadth. When you're brainstorming and every idea circles back to the same theme, when a chatbot keeps steering conversations to one subject, or when generated variations all feel like the same answer reworded, a positive presence penalty nudges the model into unexplored territory. It's less about polish (frequency penalty's job) and more about diversity of content — which also means it's the wrong tool when consistency is the goal: penalizing a key term's *first reuse* can push a focused answer off-topic.

In practice, `presence_penalty` is a top-level request field alongside `temperature` and `frequency_penalty` (again, Anthropic omits it — prompt for variety instead, e.g. "give five ideas from genuinely different angles"). Try 0.3 to 0.8 for ideation and creative variety, keep it at 0 for extraction, code, and structured output, and tune one repetition knob at a time so you can tell which one changed the behavior.
