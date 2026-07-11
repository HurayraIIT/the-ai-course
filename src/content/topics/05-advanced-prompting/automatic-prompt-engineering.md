---
{
  "title": "Automatic Prompt Engineering",
  "module": "advanced-prompting",
  "order": 2,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Automatic Prompt Engineer - DAIR.AI",
      "url": "https://www.promptingguide.ai/techniques/ape"
    }
  ]
}
---

**Automatic prompt engineering (APE)** uses a model to write prompts for a model. Instead of hand-tuning instructions by trial and error, you give an LLM a handful of input-output examples of the task, have it **generate candidate instructions** that would produce those outputs, score each candidate against a held-out evaluation set, and keep the winner. The original APE research showed machine-generated prompts can match or beat human-written ones — famously discovering that "Let's work this out in a step by step way to be sure we have the right answer" outperformed the classic "Let's think step by step."

This matters because hand-tuning prompts does not scale. Once you maintain dozens of prompts across features, models, and languages, manual iteration becomes the bottleneck — and every model upgrade silently shifts what wording works best. Treating prompt optimization as a **search problem** with a measurable objective turns prompt quality from folklore into engineering: you need an eval set anyway, and APE puts it to work.

In practice, you will build a loop: a generator call proposes `n` instruction variants, an execution step runs each against your test cases, and a scoring function — exact match, or an **LLM-as-judge** — ranks them; optionally you mutate the best candidates and iterate. Frameworks like DSPy productize this pattern, but a hundred lines of your own code gets you far. The prerequisite mindset — versioned prompts plus automated evals — is one this course keeps returning to.
