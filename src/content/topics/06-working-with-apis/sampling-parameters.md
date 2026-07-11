---
{
  "title": "Sampling Parameters",
  "module": "working-with-apis",
  "order": 9,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "LLM Settings (Temperature, Top-K, Top-P) - DAIR.AI",
      "url": "https://www.promptingguide.ai/introduction/settings"
    }
  ]
}
---

A language model does not output words — it outputs a **probability distribution** over every possible next token, and something has to pick one. **Sampling parameters** are the knobs that control that pick. `temperature` reshapes the distribution to make it sharper or flatter; `top_k` and `top_p` truncate it so only plausible candidates survive; penalties nudge probabilities down for tokens that have already appeared; `max_tokens` and stop sequences decide when generation ends. Together they turn one model into a spectrum of behaviors, from deterministic and terse to exploratory and verbose.

Understanding this family matters because these settings live in your API request, outside the prompt, and they interact. The same prompt can produce reliable structured output or creative rambling depending purely on sampling settings, and many "the model is flaky" bugs are really "someone left `temperature` at a creative setting for a deterministic task." Knowing which knob addresses which symptom — randomness, repetition, runaway length — saves you from cargo-culting values.

In practice you set these as top-level request fields (or inside Gemini's `generationConfig`) and change one at a time. The upcoming topics take each parameter in turn: temperature first, then the top-k and top-p filters, length and stopping controls, and finally the penalty family. Treat this page as the map; the siblings are the territory.
