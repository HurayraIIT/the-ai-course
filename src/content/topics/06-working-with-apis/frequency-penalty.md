---
{
  "title": "Frequency Penalty",
  "module": "working-with-apis",
  "order": 15,
  "sources": [
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Frequency Penalty Explanation",
      "url": "https://platform.openai.com/docs/advanced-usage/advanced-usage#frequency-and-presence-penalties"
    },
    {
      "type": "article",
      "title": "Understanding Frequency Penalty and Presence Penalty",
      "url": "https://medium.com/@the_tori_report/understanding-frequency-penalty-and-presence-penalty-how-to-fine-tune-ai-generated-text-e5e4f5e779cd"
    },
    {
      "type": "article",
      "title": "Frequency Penalty - LLM Parameter Guide - Vellum",
      "url": "https://www.vellum.ai/llm-parameters/frequency-penalty"
    }
  ]
}
---

**Frequency penalty** discourages the model from repeating tokens in proportion to how often they've already appeared in the output. Each time a token is used, its score for future selection drops a bit more — a word used five times is penalized five times harder than a word used once. The `frequency_penalty` parameter typically ranges from -2.0 to 2.0, with 0 as the default; positive values reduce repetition, and the *scaling with count* is what distinguishes it from its sibling, **presence penalty**, which applies one flat penalty regardless of how many repeats occurred.

You reach for this when output gets stuck in loops: the same phrase recycled across paragraphs, a summary that restates its opening line, list items that all begin identically, or — the pathological case, common at low temperature — the model emitting the same token endlessly. Long generations are where repetition compounds, so this knob matters most for articles, product descriptions at scale, and other extended prose. It's a lighter, cheaper fix than raising `temperature`, which changes randomness everywhere rather than just discouraging reuse.

In practice, `frequency_penalty` is a top-level request field on OpenAI-style APIs (Anthropic doesn't expose one — you steer repetition through prompting instead). Start small, around 0.1 to 0.5, and inspect output before going higher: strong penalties punish *necessary* repetition too, mangling code, JSON keys, and technical terms that legitimately recur. Keep it at 0 for structured output.
