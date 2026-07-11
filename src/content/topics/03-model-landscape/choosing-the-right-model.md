---
{
  "title": "Choosing the Right Model",
  "module": "model-landscape",
  "order": 20,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Choosing the right model",
      "url": "https://bentoml.com/llm/getting-started/choosing-the-right-model"
    },
    {
      "type": "article",
      "title": "Beyond vibes: How to properly select the right LLM for the right task",
      "url": "https://aws.amazon.com/blogs/machine-learning/beyond-vibes-how-to-properly-select-the-right-llm-for-the-right-task/"
    }
  ]
}
---

Choosing the right model is the discipline of matching a task to a model deliberately, instead of defaulting to whatever's newest or most famous. After touring the providers in this module, you have dozens of credible options — frontier reasoning models, fast cheap workhorses, open weights you can self-host. This topic gives you a framework for narrowing them: define the task and its quality bar, list hard constraints (**latency**, cost ceiling, context length, data privacy, licensing), shortlist candidates, and then measure instead of trusting vibes.

This matters because model choice quietly dominates both your product experience and your unit economics. Public **benchmarks** and leaderboards are useful for shortlisting but routinely mislead — they're saturated, sometimes contaminated, and rarely resemble your actual workload. Teams that pick "the best model" off a leaderboard often ship something slower and pricier than a mid-tier model that handles their specific task equally well. The professional habit is building small **evals**: a representative set of your real inputs with expected outputs, scored the same way against every candidate.

In practice, you'll write your prompts against a provider-agnostic interface (most APIs are OpenAI-compatible, and gateways like OpenRouter make swapping trivial), run your eval set across three or four candidates, and compare quality, latency, and cost per request in a simple table. You'll also design for **routing**: cheap models for easy requests, escalation to stronger ones only when needed — and re-run the evals when new models ship.
