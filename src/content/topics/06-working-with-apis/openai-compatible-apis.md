---
{
  "title": "OpenAI-compatible APIs",
  "module": "working-with-apis",
  "order": 5,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "OpenAI-compatible API",
      "url": "https://bentoml.com/llm/llm-inference-basics/openai-compatible-api"
    },
    {
      "type": "article",
      "title": "OpenAI compatibility - Gemini",
      "url": "https://ai.google.dev/gemini-api/docs/openai"
    }
  ]
}
---

An **OpenAI-compatible API** is any service that implements OpenAI's request and response format — most commonly the `/v1/chat/completions` endpoint — so that existing OpenAI client code works against it unchanged. Because OpenAI's Chat Completions schema became the industry's de facto wire format, providers as different as Google (Gemini), Mistral, DeepSeek, local runtimes like Ollama and vLLM, and aggregators like OpenRouter all expose endpoints that speak it.

This is one of the most practically useful facts in AI engineering: it decouples your code from your provider. You can prototype against OpenAI, then move to a cheaper hosted model, a self-hosted open-weights model on your own GPU, or a local model on a laptop — often by changing two strings. It also means the whole tooling ecosystem built around the OpenAI SDK (proxies, gateways, observability tools, eval frameworks) works with any compatible backend, which keeps **vendor lock-in** low.

In practice you instantiate the standard OpenAI SDK but override `base_url` (or `baseURL`) to point at the alternative provider and pass that provider's `api_key`. From there, `chat.completions.create()` calls with `model`, `messages`, `temperature`, and `stream` work as usual. The caveat: compatibility is rarely 100% — advanced features like strict structured outputs, tool-calling edge cases, or newer parameters may behave differently, so test the specific features you rely on.
