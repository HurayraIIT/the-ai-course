---
{
  "title": "Closed Weight Models",
  "module": "llm-fundamentals",
  "order": 17,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Open AI's GPT-4",
      "url": "https://openai.com/gpt-4"
    },
    {
      "type": "official",
      "title": "Claude",
      "url": "https://www.anthropic.com/claude"
    },
    {
      "type": "official",
      "title": "Gemini",
      "url": "https://deepmind.google/technologies/gemini/"
    },
    {
      "type": "article",
      "title": "2024 Comparison of Open-Source Vs Closed-Source LLMs",
      "url": "https://blog.spheron.network/choosing-the-right-llm-2024-comparison-of-open-source-vs-closed-source-llms"
    }
  ]
}
---

A **closed-weight model** (or proprietary model) is one whose parameters are never published — you can use the model, but only through the provider's hosted **API** or products. Anthropic's Claude, OpenAI's GPT series, and Google's Gemini are the canonical examples. The weights, training data, and most architectural details stay trade secrets; what you get is an endpoint, documentation, a pricing page, and a service-level agreement.

Closed models dominate production AI for a simple reason: they're typically the most capable models available, and consuming them requires zero ML infrastructure. The provider handles GPU fleets, scaling, safety tuning, and model improvements; you handle an HTTP request. The costs are structural rather than technical — per-token pricing that scales with usage, rate limits, your data transiting a third party (check the provider's retention and training policies), and **vendor lock-in**: models get deprecated on the provider's schedule, and prompts tuned for one model rarely transfer perfectly to another. Mitigations exist for each, but you should choose them with eyes open.

Working with closed models is the default workflow you'll use throughout this course: install the provider SDK (`anthropic`, `openai`), manage the **API key** as a server-side secret — never in client code — pick a model ID, and build in retries, timeout handling, and spend monitoring. Keeping your model calls behind a thin abstraction layer preserves your ability to swap providers, or an open model, later.
