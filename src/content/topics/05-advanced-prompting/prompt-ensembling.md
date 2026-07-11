---
{
  "title": "Prompt Ensembling",
  "module": "advanced-prompting",
  "order": 3,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Introduction to Ensembling - LearnPrompting",
      "url": "https://learnprompting.org/docs/advanced/ensembling/introduction"
    }
  ]
}
---

**Prompt ensembling** borrows a classic machine learning trick — combining multiple weak predictors into one strong one — and applies it to prompts. You send the same task through several **different prompt formulations** (different phrasing, different few-shot examples, different personas, even different models), collect the answers, and **aggregate** them by majority vote, averaging, or a judge model. Where self-consistency varied the sampling while keeping one prompt fixed, ensembling varies the prompt itself.

The reason it works is that every prompt has blind spots. A particular wording might bias the model toward one interpretation; a particular set of few-shot examples might skew edge cases. Those errors are largely uncorrelated across formulations, so combining them cancels noise that no single "perfect prompt" can eliminate. For production systems this buys you robustness: your accuracy no longer hinges on one fragile string that a model update could silently degrade. The cost model is the same honest trade-off as self-consistency — k prompts means roughly k times the tokens — so it belongs in evaluation pipelines, batch classification, and high-stakes calls rather than latency-sensitive chat.

Practically, you will keep a small set of prompt variants (hand-written, or generated via the **automatic prompt engineering** techniques from the previous topic), fan them out as concurrent API calls, normalize each output to a comparable answer, and vote. For open-ended generation where voting is impossible, generate several candidates and have a **judge prompt** pick or synthesize the best one.
