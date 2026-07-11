---
{
  "title": "Self-Hosted Models",
  "module": "model-landscape",
  "order": 19,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Self-Hosted LLM: A Practical Guide for DevOps",
      "url": "https://www.plural.sh/blog/self-hosting-large-language-models/"
    },
    {
      "type": "article",
      "title": "Serverless vs. self-hosted LLM inference",
      "url": "https://bentoml.com/llm/llm-inference-basics/serverless-vs-self-hosted-llm-inference"
    }
  ]
}
---

**Self-hosting** means running open-weight models on infrastructure you control — your own GPUs, rented cloud instances, or an on-premises cluster — instead of paying a provider per token. It's the production-grade extension of what Ollama and LM Studio do on your laptop: you pick a model, provision GPU capacity, and serve it through an **inference engine** like vLLM or TGI that handles batching, KV-cache management, and concurrency so one GPU can serve many users at once.

This matters because the hosted-versus-self-hosted decision is one of the biggest architectural calls you'll make. Self-hosting wins on data privacy (nothing leaves your network), compliance, predictable latency, deep customization like fine-tuned weights, and — at sustained high volume — raw cost, since you pay for hardware instead of margin-loaded tokens. Serverless APIs win on zero operations, instant scaling, and access to frontier models you can't download. The honest math includes **GPU utilization**: an idle self-hosted cluster burns money, while a per-token API costs nothing at rest, so traffic shape often decides the answer.

Practically, you'll learn to size hardware from model memory requirements (parameters times bytes per weight, plus KV cache), deploy something like `vllm serve` behind an **OpenAI-compatible endpoint**, and wire in monitoring, autoscaling, and failover. Because the endpoint speaks the standard API, your application code stays identical — you can prototype on a hosted API today and migrate to self-hosting when volume justifies it.
