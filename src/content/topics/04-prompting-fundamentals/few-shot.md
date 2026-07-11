---
{
  "title": "Few-Shot",
  "module": "prompting-fundamentals",
  "order": 17,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Few-Shot Prompting",
      "url": "https://www.promptingguide.ai/techniques/fewshot"
    },
    {
      "type": "article",
      "title": "What is few shot prompting?",
      "url": "https://www.ibm.com/think/topics/few-shot-prompting"
    },
    {
      "type": "video",
      "title": "Discover Few-Shot Prompting | Google AI Essentials",
      "url": "https://www.youtube.com/watch?v=9qdgEBVkWR4"
    },
    {
      "type": "article",
      "title": "Few-Shot Prompting - LearnPrompting",
      "url": "https://learnprompting.org/docs/basics/few_shot"
    },
    {
      "type": "article",
      "title": "Few-Shot Introduction - LearnPrompting",
      "url": "https://learnprompting.org/docs/advanced/few_shot/introduction"
    },
    {
      "type": "video",
      "title": "Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents",
      "url": "https://youtu.be/vD0E3EUb8-8?si=Fi2igdPTBUocqnX7&t=177"
    }
  ]
}
---

**Few-shot prompting** includes a handful of worked examples — input paired with the output you want — before the actual task. Instead of describing the format, you demonstrate it: two or three question-answer pairs, then the real question. The model picks up the pattern through **in-context learning**, matching your examples' structure, tone, labels, and level of detail without any training or fine-tuning.

The reason this earns its token cost is that examples communicate things instructions can't. You can spend a paragraph describing your ideal summary style, or show two summaries and let the model infer the rest — the examples usually win. Few-shot shines exactly where zero-shot wobbles: enforcing a precise output format, teaching domain-specific label definitions ("we call *this* a P1, not that"), and pinning down edge cases. The trade-off is real, though: every example is billed on every request, and the model imitates your examples faithfully — including their mistakes and biases.

In practice, you'll place examples in the prompt with consistent delimiters (`Input:` / `Output:`, or XML tags), or as alternating user/assistant turns in the `messages` array, which chat models treat as prior conversation. Use two to five diverse examples that cover your tricky cases, keep formatting identical across them, and mix the label distribution so the model doesn't learn "the answer is usually A." When examples still aren't enough for multi-step reasoning, **chain-of-thought** is the next tool.
