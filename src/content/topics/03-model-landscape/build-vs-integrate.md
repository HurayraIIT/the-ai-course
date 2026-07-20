---
{
  "title": "Build vs integrate",
  "module": "model-landscape",
  "order": 23,
  "sources": ["new"],
  "resources": [
    {
      "type": "article",
      "title": "Building LLM applications for production",
      "url": "https://huyenchip.com/2023/04/11/llm-engineering.html"
    }
  ]
}
---

**Build vs integrate** is the first architectural decision of every AI feature: do you call a **proprietary model** behind an API, self-host an **open-weight model**, fine-tune something, or — almost never — train your own? The framing matters because the default has flipped. Classic ML projects started by collecting data and training a model; AI engineering starts by integrating a **foundation model** that already works, then earning the right to build more only when the integration provably falls short. Training a competitive LLM from scratch costs millions and a research team, so for application builders "build" really means self-hosting or fine-tuning, not pretraining.

The integrate-first path wins on time-to-value: an API call gets you state-of-the-art capability in an afternoon, with no GPUs to operate and automatic access to every model upgrade. Its costs are per-token pricing that scales linearly with usage, data leaving your infrastructure, **vendor lock-in**, and rate limits you don't control. Moving toward "build" — self-hosting Llama or Qwen on your own hardware, fine-tuning for your domain — buys you data privacy, latency control, and a flat cost curve at high volume, but you inherit GPU operations, model upgrades, and a quality ceiling below the frontier. The crossover point is real but further out than most teams assume: you need sustained high volume or hard compliance requirements before self-hosting beats API prices.

In practice, prototype on a frontier API, and revisit the decision with data, not vibes: your actual token spend, your latency budget, and your eval scores on candidate open-weight replacements. Keep the option open cheaply by hiding the provider behind a thin abstraction (an **OpenAI-compatible API** layer, covered earlier in this course, makes swapping nearly free). And remember the decision is per-component, not per-product — plenty of systems route bulk classification to a cheap self-hosted model while sending the hard reasoning steps to a proprietary frontier one.
