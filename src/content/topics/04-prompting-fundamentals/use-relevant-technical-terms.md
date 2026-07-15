---
{
  "title": "Use relevant technical terms",
  "module": "prompting-fundamentals",
  "order": 4,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "AI Terms Glossary: AI Terms To Know In 2024",
      "url": "https://www.moveworks.com/us/en/resources/ai-terms-glossary"
    },
    {
      "type": "article",
      "title": "15 Essential AI Agent Terms You Must Know",
      "url": "https://shivammore.medium.com/15-essential-ai-agent-terms-you-must-know-6bfc2f332f6d"
    }
  ]
}
---

Using **relevant technical terms** means writing prompts in the precise vocabulary of the domain you're working in, instead of paraphrasing around it. Saying "make the function not block" is loose; saying "convert this to an **async** function using `await` instead of callbacks" activates exactly the right region of the model's training. Terminology is a steering mechanism: the words you choose determine which patterns, idioms, and quality bars the model draws on.

This matters because models mirror the register of the prompt. Ask a question the way a beginner phrases it and you tend to get a beginner-level answer, complete with over-explained basics and simplified (sometimes wrong) advice. Ask it the way a practitioner would — naming the algorithm, the design pattern, the RFC, the API — and you pull the response toward expert-level content. In domain-heavy products like legal, medical, or fintech tools, correct terminology in the prompt also dramatically reduces ambiguity about what you're actually asking.

Practically, you'll write prompts that name things exactly: `idempotent`, `memoization`, `optimistic locking`, `WCAG 2.2 AA` rather than fuzzy descriptions of them. When you build prompts for users who don't know the jargon, add a translation step in your pipeline — a first call that rewrites their plain-language request into precise domain terms before the real task runs. Precision in, precision out.
