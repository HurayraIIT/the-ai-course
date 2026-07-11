---
{
  "title": "Step-back Prompting",
  "module": "advanced-prompting",
  "order": 1,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Step-Back Prompting - LearnPrompting",
      "url": "https://learnprompting.org/docs/advanced/thought_generation/step_back_prompting"
    }
  ]
}
---

**Step-back prompting** asks the model to zoom out before zooming in. Instead of attacking a specific question directly, you first prompt for the **general principle** or higher-level concept behind it — "What physics laws govern this situation?" or "What are the general rules for this kind of API design?" — and then have the model answer the original question with that abstraction in hand. The technique comes from research at Google DeepMind showing that this two-step **abstraction-then-reasoning** pattern reduces errors on knowledge-heavy and multi-step problems.

It matters because direct prompting often fails in a specific way: the model latches onto surface details and skips the governing rule, producing answers that are fluent but conceptually wrong. Step-back prompting forces retrieval of the relevant framework first, which grounds the specific reasoning that follows. For you, it is a low-cost tool for the hard tail of queries — domain questions, tricky debugging, policy application — where accuracy matters more than a few hundred extra tokens.

In practice, you implement it as a two-turn chain: first call asks for the step-back question and its answer, second call includes that principle as context alongside the original question. In an agent or RAG pipeline, the step-back question also makes a better **retrieval query** than the raw user input, pulling conceptual documents instead of keyword matches. Compare it with **self-consistency** from the previous topic: one improves reasoning by voting across paths, this one improves the path itself.
