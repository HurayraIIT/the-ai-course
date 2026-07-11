---
{
  "title": "Iterate and Test your Prompts",
  "module": "prompting-fundamentals",
  "order": 7,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "course",
      "title": "Prompt Engineering Best Practices",
      "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/"
    },
    {
      "type": "article",
      "title": "Master Iterative Prompting: A Guide",
      "url": "https://blogs.vreamer.space/master-iterative-prompting-a-guide-to-more-effective-interactions-with-ai-50a736eaec38"
    },
    {
      "type": "video",
      "title": "Prompt Engineering: The Iterative Process",
      "url": "https://www.youtube.com/watch?v=dOxUroR57xs"
    }
  ]
}
---

Prompts are almost never right on the first draft. **Iterative prompting** is the loop of writing a prompt, running it against real inputs, studying where it fails, and revising — the same edit-run-debug cycle you already use for code, applied to natural language. The craft isn't producing a perfect prompt from intuition; it's converging on one through evidence.

This matters because LLMs are non-deterministic and their failure modes are unintuitive: a prompt that aces your three test cases can fall apart on the fourth phrasing of the same question. Shipping an untested prompt is shipping untested code. Worse, prompts silently regress — a wording tweak that fixes one case can break two others, and a model version upgrade can shift behavior under a prompt you never touched. Without a testing habit, you find out from users.

In practice, you'll treat prompts as tested artifacts. Build a small **eval set** — 20 to 50 representative inputs with expected outputs, including the ugly edge cases — and rerun it after every prompt change, exactly like a test suite. Change one variable at a time so you know what actually helped. Keep prompts in version control with your code, and once the workflow matters, wire the evals into CI using tools like `promptfoo` or your provider's eval APIs. Iteration turns prompting from guesswork into engineering.
