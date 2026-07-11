---
{
  "title": "Input Format",
  "module": "prompting-fundamentals",
  "order": 12,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Elements of a Prompt",
      "url": "https://www.promptingguide.ai/introduction/elements"
    },
    {
      "type": "article",
      "title": "Does Prompt Formatting Have Any Impact on LLM Performance?",
      "url": "https://arxiv.org/html/2411.10541v1"
    }
  ]
}
---

**Input format** is about how you physically arrange a prompt: the order of its sections, the delimiters that separate instruction from data, and the markup you use to label each part. The same words, restructured, can produce measurably different results — research on prompt formatting has shown double-digit accuracy swings between plain text, Markdown, and structured layouts of identical content, and the best format even varies by model family.

For developers this is a free performance lever and a safety mechanism at once. Clear structure helps the model distinguish *what you're telling it to do* from *what it should operate on* — and that boundary is exactly what prompt injection attacks try to blur. A user-supplied document dropped inline with your instructions is an invitation for embedded text like "ignore previous instructions" to be obeyed; the same document fenced inside labeled delimiters is far easier for the model to treat as inert data.

In practice, you'll adopt a consistent house format: instructions first, then labeled data blocks using **XML-style tags** (`<document>...</document>`, `<user_query>...</user_query>`) or triple-backtick fences, with Markdown headers for multi-section prompts. Put the most important instruction at the top and restate critical constraints near the end of long prompts. When you switch model providers, re-test your formatting — structure that's optimal for one model is merely good for another, and your eval suite will tell you the difference.
