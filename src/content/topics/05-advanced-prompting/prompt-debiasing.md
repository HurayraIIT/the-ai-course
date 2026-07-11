---
{
  "title": "Prompt Debiasing",
  "module": "advanced-prompting",
  "order": 4,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Prompt Debiasing - LearnPrompting",
      "url": "https://learnprompting.org/docs/reliability/debiasing"
    }
  ]
}
---

**Prompt debiasing** is the practice of removing biases that your own prompt introduces into model outputs. Two show up constantly in few-shot prompting. **Distribution bias**: if your examples are eight positive reviews and two negative ones, the model learns that imbalance and over-predicts positive. **Order bias**: models pay uneven attention across the context window, so stacking all examples of one class first, or always putting the "correct" option in position A, skews results. A third lever is explicit instruction — directly telling the model to treat options impartially or to answer without stereotyped assumptions.

This matters because these biases are silent. Your prompt looks reasonable, your demo works, and yet your classifier runs a few points worse than it should for reasons no individual output reveals. In production classification, moderation, grading, and **LLM-as-judge** pipelines, a positional preference or skewed exemplar mix becomes a systematic error affecting every request. Judge prompts are notorious here: models often favor the first response shown, which quietly corrupts A/B evaluations.

In practice, debiasing becomes a checklist you apply to every few-shot or judgment prompt: balance the class distribution of exemplars, shuffle or randomize their order, randomize answer-option positions across calls (or evaluate both orderings and keep agreements), and add an impartiality instruction when stakes warrant it. Then verify with your **eval set** — measure per-class accuracy and positional agreement, not just the overall score. It is unglamorous work that reliably buys accuracy for free.
