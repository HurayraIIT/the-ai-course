---
{
  "title": "Small models and distillation",
  "module": "model-landscape",
  "order": 22,
  "sources": ["new"],
  "resources": [
    {
      "type": "article",
      "title": "What is knowledge distillation? - IBM",
      "url": "https://www.ibm.com/think/topics/knowledge-distillation"
    },
    {
      "type": "article",
      "title": "SmolLM — small language models",
      "url": "https://huggingface.co/blog/smollm"
    }
  ]
}
---

**Small models** — think Haiku, Gemini Flash, GPT-4o-mini, Llama 3B, or the Gemma and Qwen families — trade peak intelligence for speed and price. The gap matters less than you'd expect because most production tasks aren't frontier tasks: classification, extraction, routing, summarization, and formatting are handled fine by a model that costs a tenth as much and responds in a fraction of the time. **Distillation** is the main technique that makes them good: a large **teacher model** generates outputs (or full probability distributions), and a smaller **student model** is trained to imitate them, inheriting much of the teacher's behavior at a fraction of the parameter count. Several open-weight families you've met in this module — Gemma, Qwen, DeepSeek's smaller releases — are distilled from bigger siblings.

The reason this deserves your attention is economics and latency, the two constraints that kill more AI features than accuracy does. A pipeline that calls a frontier model for every step is slow and expensive; the standard production pattern is a **cascade** — a small model handles the easy 90 percent and escalates the hard 10 percent to a large one — or **model routing**, where a classifier picks the model per request. Small models also unlock deployments big models can't do at all: on-device inference, strict-latency voice agents, and high-volume batch jobs where token pricing dominates the budget.

In practice, start development with a strong model to prove the task is solvable, then pressure-test smaller models against your **eval set** and downshift wherever quality holds. If quality drops just short, distill: use the big model to generate a few thousand task-specific input–output examples and fine-tune the small model on them — this is the cheapest form of distillation and often closes the gap entirely. Check the provider's terms first, though; some prohibit using their outputs to train competing models.
