---
{
  "title": "Fine-tuning",
  "module": "llm-fundamentals",
  "order": 8,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is fine-tuning?",
      "url": "https://www.ibm.com/think/topics/fine-tuning"
    },
    {
      "type": "article",
      "title": "How I Fine-Tuned Granite-Vision 2B to Beat a 90B Model — Insights and Lessons Learned",
      "url": "https://towardsdatascience.com/how-i-fine-tuned-granite-vision-2b-to-beat-a-90b-model-insights-and-lessons-learned/"
    },
    {
      "type": "video",
      "title": "RAG vs Fine-Tuning vs Prompt Engineering: Optimizing AI Models",
      "url": "https://www.youtube.com/watch?v=zYGDpG-pTho"
    }
  ]
}
---

**Fine-tuning** takes a pre-trained model and continues training it on your own smaller, task-specific dataset, adjusting the weights so the model internalizes your desired behavior. Instead of teaching new world knowledge, it mostly teaches *form and skill*: your output format, your tone, your domain's jargon, your classification labels. Parameter-efficient methods like **LoRA** make this affordable by training small adapter layers instead of all the weights, and hosted services let you fine-tune API models by just uploading example conversations.

The reason this matters is the decision it forces. Most teams reach for fine-tuning too early when **prompt engineering** or **RAG** (retrieval-augmented generation) would solve the problem faster and cheaper. The working heuristic: prompt for behavior you can describe, retrieve for knowledge that changes, fine-tune for behavior you can only demonstrate — or when you need a small, cheap model to match a big one on a narrow task. Fine-tuning shines for consistent structured output, style matching, and cutting per-request costs by shrinking prompts or model size; it's the wrong tool for keeping a model up to date on fresh facts.

In practice, the workflow is: collect a few hundred to a few thousand high-quality prompt/response pairs (usually as **JSONL**), run a training job — via a provider's fine-tuning API or open-source tooling on Llama-class weights — then evaluate the resulting model against your baseline before switching production traffic to it.
