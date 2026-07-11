---
{
  "title": "OpenRouter",
  "module": "working-with-apis",
  "order": 6,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenRouter",
      "url": "https://openrouter.ai/"
    },
    {
      "type": "article",
      "title": "What is OpenRouter? A Guide with Practical Examples",
      "url": "https://www.codecademy.com/article/what-is-openrouter"
    },
    {
      "type": "video",
      "title": "What is Open Router ?",
      "url": "https://www.youtube.com/watch?v=pfT6l0yMsB0"
    }
  ]
}
---

**OpenRouter** is a unified gateway that puts hundreds of models — from OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, and many smaller labs — behind a single **OpenAI-compatible** endpoint and a single API key. Instead of managing separate accounts, billing, and SDKs per provider, you send one request to OpenRouter and it routes it to the underlying provider, handling normalization of the request and response formats for you.

For builders, the appeal is speed of experimentation and resilience. You can A/B test a prompt across a frontier model and a cheap open-weights model by changing only the `model` string, compare cost and latency from one dashboard, and let users of your app pick their preferred model without you integrating each vendor. OpenRouter also adds routing features single providers cannot: **automatic fallbacks** when a provider has an outage, price- or throughput-based provider selection for open models, and one consolidated bill.

In practice you point the standard OpenAI SDK at `https://openrouter.ai/api/v1` with your OpenRouter key and call `chat.completions.create()` with a namespaced model id like `anthropic/claude-sonnet-4.5` or `meta-llama/...`. You can pass a `models` fallback list, set provider preferences in the request, and use the usual parameters — `temperature`, `max_tokens`, `stream` — exactly as you would against OpenAI directly.
