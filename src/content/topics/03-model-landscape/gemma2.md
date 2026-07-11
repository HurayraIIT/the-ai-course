---
{
  "title": "Gemma2",
  "module": "model-landscape",
  "order": 9,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Gemma",
      "url": "https://deepmind.google/models/gemma/"
    },
    {
      "type": "official",
      "title": "Gemma explained: What’s new in Gemma 2",
      "url": "https://developers.googleblog.com/gemma-explained-new-in-gemma-2/"
    }
  ]
}
---

**Gemma** is Google's family of open-weight models — lightweight siblings of Gemini, built by the same DeepMind teams with much of the same research but sized to run on hardware you actually own. **Gemma 2** was the generation that proved the concept, shipping small and mid-sized models that used techniques like **knowledge distillation** (training a small model to imitate a larger teacher) to outperform much bigger rivals. Later generations extended the family with vision support, longer context, and variants small enough for phones and edge devices.

Gemma matters to you as the "Google research quality, your hardware" option in the open ecosystem. When you need on-device or self-hosted inference — a privacy-sensitive feature, an offline tool, a cost-free prototype — Gemma models deliver strong instruction-following in packages that fit a single consumer GPU or even a laptop CPU. Studying what changed in Gemma 2 is also a compact lesson in how model quality improves without simply scaling up: distillation, architectural tweaks like alternating attention layers, and better training data.

In practice, you'll run Gemma in one command with `ollama run gemma3` (or an earlier tag), load it in Python via Hugging Face `transformers`, or fine-tune a small variant on your own data with modest hardware. Keep the family on your shortlist whenever a task doesn't need a frontier model and you'd rather own the deployment than rent the API.
