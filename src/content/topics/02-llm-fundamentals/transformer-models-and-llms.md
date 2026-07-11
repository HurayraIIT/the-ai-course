---
{
  "title": "Transformer Models and LLMs",
  "module": "llm-fundamentals",
  "order": 2,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Exploring Open Source AI Models: LLMs and Transformer Architectures",
      "url": "https://llmmodels.org/blog/exploring-open-source-ai-models-llms-and-transformer-architectures/"
    },
    {
      "type": "article",
      "title": "How Transformer LLMs Work",
      "url": "https://www.deeplearning.ai/short-courses/how-transformer-llms-work/"
    }
  ]
}
---

The **transformer** is the neural network architecture behind essentially every modern LLM. Introduced in the 2017 paper "Attention Is All You Need," its key innovation is **self-attention**: a mechanism that lets every token in a sequence look at every other token and decide which ones matter for predicting what comes next. Stack dozens of attention layers, train on trillions of tokens, and you get the models this course is about — the "T" in GPT literally stands for transformer.

You don't need to implement attention math to build AI products, but knowing the architecture pays off constantly. Attention is why LLMs handle long-range dependencies — a pronoun on line 400 correctly resolving to a name on line 3. It's also why **context windows** have limits: naive attention cost grows quadratically with sequence length, which drives pricing, latency, and the long-context engineering tradeoffs you'll deal with later in this module. Concepts like **KV caching** (which makes prompt caching cheap) and why models process your whole prompt before emitting the first token all trace back to this design.

Practically, this knowledge shapes your engineering intuition: you'll understand why time-to-first-token grows with prompt size, why providers discount cached prefixes, and why models attend unevenly across very long inputs. When you read model cards or provider docs mentioning attention variants or architecture tweaks, you'll know what's actually being claimed.
