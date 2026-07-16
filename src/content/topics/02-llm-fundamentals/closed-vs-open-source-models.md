---
{
  "title": "Closed vs Open Source Models",
  "module": "llm-fundamentals",
  "order": 15,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "https://hatchworks.com/blog/gen-ai/open-source-vs-closed-llms-guide/",
      "url": "https://hatchworks.com/blog/gen-ai/open-source-vs-closed-llms-guide/"
    },
    {
      "type": "video",
      "title": "Open Source vs Closed AI: LLMs, Agents & the AI Stack Explained",
      "url": "https://www.youtube.com/watch?v=_QfxGZGITGw"
    },
    {
      "type": "video",
      "title": "Open-Source vs Closed-Source LLMs",
      "url": "https://www.youtube.com/watch?v=710PDpuLwOc"
    }
  ]
}
---

This is the fork in the road for every AI project: build on a **closed model** you can only reach through a vendor's API (Claude, GPT, Gemini), or on an **open-weight model** whose weights you can download and run yourself (Llama, Mistral, Qwen, DeepSeek, gpt-oss). "Open source" is used loosely here — most open models publish weights under a permissive or custom license but not their training data or full recipe, which is why "open weight" is the more precise term you'll see throughout this module.

The decision shapes your architecture, costs, and compliance posture. Closed models typically offer the strongest capabilities with zero infrastructure: you trade per-token fees, vendor lock-in, and sending data to a third party for state-of-the-art quality and instant scaling. Open models give you control — data never leaves your network, you can fine-tune freely, and marginal cost is your own hardware — but you own GPU provisioning, serving, and upgrades, and the strongest open models still tend to trail the frontier. The gap has narrowed enough that "good enough plus private" wins many real workloads, especially in healthcare, finance, and other regulated domains.

In practice you'll prototype against a closed API for speed, then evaluate whether an open model meets your quality bar at lower cost or with better privacy. Because nearly every serving stack exposes an **OpenAI-compatible API**, switching often means changing a `base_url` — the next two topics dig into each side.
