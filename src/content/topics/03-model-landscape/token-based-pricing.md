---
{
  "title": "Token Based Pricing",
  "module": "model-landscape",
  "order": 24,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What Are AI Tokens?",
      "url": "https://methodshop.com/what-are-ai-tokens/"
    }
  ]
}
---

**Token-based pricing** is the billing model behind nearly every LLM API: you pay per **token** processed, not per request, per user, or per month. A token is the chunk of text a model actually reads and writes — roughly four characters or three-quarters of an English word — so "how much did that call cost" always reduces to "how many tokens went in and how many came out." Providers quote separate rates for **input** and **output**, with output usually the pricier of the two.

For you as a builder, this changes how you think about cost entirely. Everything counts: your system prompt, few-shot examples, retrieved documents, conversation history, tool definitions — all of it is billed on *every single request*. A chat app that resends the full transcript each turn has costs that grow quadratically with conversation length. Long prompts also add latency, so token discipline improves speed and spend at once.

In practice, you'll tokenize before you spend: use a library like `tiktoken` or a provider's count-tokens endpoint to measure prompts during development, then read the `usage` field (`input_tokens`, `output_tokens`) on every response in production and ship those numbers to your metrics. Set `max_tokens` to cap worst-case output cost, trim boilerplate from system prompts, summarize old history instead of replaying it, and lean on **prompt caching** so the static prefix you send every time is billed at a steep discount.
