---
{
  "title": "OpenAI (GPT, o-series)",
  "module": "model-landscape",
  "order": 1,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Platform",
      "url": "https://openai.com/api/"
    },
    {
      "type": "official",
      "title": "OpenAI Models",
      "url": "https://developers.openai.com/api/docs/models"
    },
    {
      "type": "article",
      "title": "Your guide to the complete OpenAI models list",
      "url": "https://www.eesel.ai/blog/openai-models-list"
    }
  ]
}
---

OpenAI doesn't ship one model — it ships a lineup. The **GPT series** covers general-purpose chat and multimodal models in several sizes, from flagship models down to cheap `mini` and `nano` tiers, while the **o-series** introduced *reasoning models*: models that spend extra compute "thinking" through a hidden chain of thought before answering, trading latency and cost for much stronger performance on math, code, and multi-step logic. Alongside these sit specialized models for embeddings, image generation, speech, and moderation.

Understanding this lineup matters because model selection is one of the highest-leverage decisions you make as an AI engineer. The same feature can cost ten times more, or feel ten times slower, purely based on which model name you put in the request. Reasoning models excel at hard planning and debugging tasks but are overkill for summarizing a support ticket; small fast models handle classification and extraction at a fraction of the price. Knowing which family solves which problem keeps your product both good and affordable.

Practically, you'll switch models by changing a single `model` string in your API call, which makes experimentation cheap — build your prompt once, then benchmark it across tiers. You'll learn to route easy requests to small models and escalate hard ones to reasoning models, watch **context window** limits when stuffing in documents, and track OpenAI's deprecation schedule so a retired model name never breaks production.
