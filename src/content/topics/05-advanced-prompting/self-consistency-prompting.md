---
{
  "title": "Self-Consistency Prompting",
  "module": "advanced-prompting",
  "order": 0,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Self-Consistency - DAIR.AI",
      "url": "https://www.promptingguide.ai/techniques/consistency"
    },
    {
      "type": "article",
      "title": "Self-Consistency - LearnPrompting",
      "url": "https://learnprompting.org/docs/intermediate/self_consistency"
    }
  ]
}
---

**Self-consistency** is a simple idea with an outsized payoff: instead of asking the model for one answer, you sample several independent **chain-of-thought** completions for the same prompt — using a nonzero `temperature` so each run reasons differently — then take a **majority vote** on the final answer. A single reasoning path can wander into an early mistake and carry it to the end; across many paths, wrong answers scatter while the correct one tends to recur.

For a builder, this is one of the cheapest reliability upgrades available. It requires no fine-tuning, no new infrastructure, and no clever prompt wording — just parallel API calls and an aggregation step. On tasks with a verifiable final answer (math, classification, extraction, code output checks), self-consistency measurably lifts accuracy over single-shot prompting. The trade-off is honest and quantifiable: five samples cost roughly five times the tokens and latency, so you apply it where correctness is worth more than speed — scoring pipelines, offline batch jobs, high-stakes decisions — rather than in every chat turn.

In practice, you will implement it as a small wrapper: fire `n` concurrent requests with `temperature` around 0.7, parse each response's final answer into a comparable form (a number, a label, a JSON field), and return the mode — falling back to a judge model or a confidence flag when votes split. It also pairs naturally with **prompt ensembling**, which you will meet shortly: one varies sampling, the other varies the prompt itself.
