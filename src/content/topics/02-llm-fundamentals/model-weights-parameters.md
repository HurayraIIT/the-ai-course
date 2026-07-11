---
{
  "title": "Model Weights / Parameters",
  "module": "llm-fundamentals",
  "order": 4,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What are LLM parameters? - IBM",
      "url": "https://www.ibm.com/think/topics/llm-parameters"
    }
  ]
}
---

**Weights** (also called **parameters**) are the billions of numbers inside a neural network that get adjusted during training and then determine every prediction the model makes. When you hear a model described as "8B" or "70B," that's the parameter count — 8 or 70 billion learned values. All of the model's "knowledge" lives in these numbers; there's no separate database of facts. Don't confuse them with *sampling parameters* like `temperature` — those are runtime knobs you set per request, while weights are fixed once training ends.

Parameter count is one of the first signals you'll use when choosing a model. More parameters generally means more capability, but also more memory, higher latency, and higher cost to run — a 70B model needs serious GPU hardware, while a 4B model can run on a laptop. The **open vs closed weights** distinction later in this module is literally about whether you can download this file of numbers. Techniques you'll meet later, like **fine-tuning** (adjusting weights) and **quantization** (compressing weights to fewer bits), only make sense once you know what weights are.

Practically, you'll read parameter counts on model cards and leaderboards to shortlist candidates, estimate whether an open model fits your GPU (roughly 2 bytes per parameter at 16-bit precision), and decide when a small model is good enough for tasks like classification versus reaching for a frontier model.
