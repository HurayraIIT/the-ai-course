---
{
  "title": "Inference",
  "module": "llm-fundamentals",
  "order": 9,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Inference vs Training",
      "url": "https://www.cloudflare.com/learning/ai/inference-vs-training/"
    },
    {
      "type": "article",
      "title": "What is Machine Learning Inference?",
      "url": "https://hazelcast.com/glossary/machine-learning-inference/"
    }
  ]
}
---

**Inference** is running a trained model to get predictions — for an LLM, feeding in your prompt and generating tokens out. It's the counterpart to training: training happens once (or occasionally) and *changes* the weights; inference happens on every single request and leaves the weights untouched. Every API call you make to Claude or GPT is inference, executed on provider GPUs; every prompt you run through **Ollama** on your laptop is inference on your own hardware.

As an application developer, inference *is* your production workload — its speed, cost, and reliability are what your users experience. Two numbers matter most: **time to first token** (how long before output starts, dominated by processing your prompt) and **throughput** — tokens per second (how fast it streams after that). Latency is what a single user feels; throughput is what your batch jobs and your GPU bill feel. Inference economics also explain provider pricing, why long prompts are slow and expensive, and why optimizations exist at every layer: **quantization** to shrink models, KV caching and **prompt caching** to skip recomputing shared prefixes, and batching to share GPUs across requests.

You'll engage with inference decisions constantly: choosing between a hosted inference API and self-hosting with servers like **vLLM**, streaming responses to keep UIs responsive, enabling prompt caching to cut costs on repeated system prompts, setting timeouts and retries around a service that's slower and flakier than a database, and picking smaller models when latency budgets are tight.
