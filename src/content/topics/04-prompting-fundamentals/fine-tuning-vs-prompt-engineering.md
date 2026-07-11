---
{
  "title": "Fine-tuning vs Prompt Engineering",
  "module": "prompting-fundamentals",
  "order": 20,
  "sources": [
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "OpenAI Fine Tuning",
      "url": "https://platform.openai.com/docs/guides/fine-tuning"
    },
    {
      "type": "article",
      "title": "Prompt Engineering Guide",
      "url": "https://www.promptingguide.ai/"
    },
    {
      "type": "article",
      "title": "Prompt Engineering vs Prompt Tuning: A Detailed Explanation",
      "url": "https://medium.com/@aabhi02/prompt-engineering-vs-prompt-tuning-a-detailed-explanation-19ea8ce62ac4"
    },
    {
      "type": "video",
      "title": "RAG vs Fine-Tuning vs Prompt Engineering: Optimizing AI Models",
      "url": "https://youtu.be/zYGDpG-pTho?si=pFeWqbjSN1RM4WiZ"
    },
    {
      "type": "article",
      "title": "When to use prompt engineering vs. fine-tuning - TechTarget",
      "url": "https://www.techtarget.com/searchEnterpriseAI/tip/Prompt-engineering-vs-fine-tuning-Whats-the-difference"
    },
    {
      "type": "article",
      "title": "Prompt Engineering vs Fine Tuning: When to Use Each - Codecademy",
      "url": "https://www.codecademy.com/article/prompt-engineering-vs-fine-tuning"
    }
  ]
}
---

These are the two main ways to adapt a model to your task. **Prompt engineering** changes what you *send*: instructions, examples, and context, adjustable per request with no training. **Fine-tuning** changes the *model itself*: you supply hundreds or thousands of input-output examples, the provider (or your own training run) updates the model's weights, and you get a custom variant that behaves your way by default — no lengthy instructions required.

Knowing when to reach for which is a decision you'll face on real projects, and the modern default is clear: **prompt first**. Prompting iterates in seconds, costs nothing beyond tokens, survives model upgrades, and — combined with few-shot examples and retrieval — covers the vast majority of use cases. Fine-tuning earns its overhead in specific situations: locking in a style or format that prompts can't hold consistently, deep domain jargon, shrinking latency and cost by moving a long prompt's worth of behavior into a small cheap model, or narrow classification at massive scale. One thing fine-tuning is *not* good for is teaching new facts — that's retrieval's job.

In practice, exhaust prompting first and keep an **eval set** of real inputs with expected outputs as you go. If quality plateaus, that same eval set becomes your training data: format it as JSONL conversation examples, run it through a fine-tuning API such as OpenAI's, and measure the resulting model against the prompted baseline before switching.
