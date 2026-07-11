---
{
  "title": "Mistral",
  "module": "model-landscape",
  "order": 6,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Mistral AI",
      "url": "https://mistral.ai/"
    },
    {
      "type": "video",
      "title": "Mistral AI: The Gen AI Start-up you did not know existed",
      "url": "https://www.youtube.com/watch?v=vzrRGd18tAg"
    }
  ]
}
---

**Mistral AI** is a Paris-based lab that became Europe's flagship AI company by doing one thing exceptionally well: shipping small, fast models that punch far above their weight. Mistral runs a dual strategy — releasing **open-weight** models (many under the permissive Apache 2.0 license) that anyone can download and self-host, while selling stronger commercial models like its flagship line through *La Plateforme*, its hosted API. It also popularized the **mixture-of-experts** architecture in open models, where only a fraction of the network activates per token, delivering big-model quality at small-model speed.

Mistral matters to you for efficiency and sovereignty. When your use case is high-volume — classification, extraction, routing, moderation — a compact Mistral model can be dramatically cheaper and faster than a frontier flagship while remaining plenty capable. And because many Mistral models are truly open-licensed, they're a safe default for products with strict data-residency or on-premises requirements, particularly under European regulation, without the licensing caveats some other open families carry.

In practice, you'll hit Mistral's API with the usual chat-messages pattern (it's OpenAI-compatible enough that switching is often a base-URL change), or pull open weights from Hugging Face and run them via `ollama run mistral` locally or vLLM in production. You'll reach for Mistral when you're optimizing a working feature for cost and latency, or specialized variants like **Codestral** for code-focused workloads.
