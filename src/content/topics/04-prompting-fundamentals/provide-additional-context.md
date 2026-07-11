---
{
  "title": "Provide additional context",
  "module": "prompting-fundamentals",
  "order": 3,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Context in Prompt Engineering?",
      "url": "https://www.godofprompt.ai/blog/what-is-context-in-prompt-engineering"
    },
    {
      "type": "article",
      "title": "The Importance of Context for Reliable AI Systems",
      "url": "https://medium.com/mathco-ai/the-importance-of-context-for-reliable-ai-systems-and-how-to-provide-context-009bd1ac7189/"
    },
    {
      "type": "article",
      "title": "Context Engineering: Why Feeding AI the Right Context Matters",
      "url": "https://inspirednonsense.com/context-engineering-why-feeding-ai-the-right-context-matters-353e8f87d6d3"
    }
  ]
}
---

Providing **context** means giving the model the background information it needs but doesn't have: your codebase conventions, the customer's plan tier, the document being discussed, what was already tried. An LLM only knows two things — its training data and what's in the current prompt. Anything about *your* situation that isn't in the prompt effectively doesn't exist, so the model will improvise, and improvisation is where **hallucinations** come from.

For software builders this is the difference between a demo and a product. A generic model answering "How do I reset my password?" invents a plausible flow; the same model given your actual help-center article answers correctly. Grounding responses in supplied context is the core idea behind retrieval-augmented generation, and it starts here: reliable AI systems are mostly systems that assemble the right context at the right time.

In practice, you'll build prompts that inject context programmatically: fetch the user's recent orders, the relevant docs snippet, or the current file contents, then wrap them in clear delimiters like `<context>...</context>` above the instruction. Pair the data with a grounding rule — `Answer using only the context above; if it's not covered, say so` — and be selective: context windows are large in 2026, but irrelevant filler still dilutes attention and inflates cost. Curate what you include; don't just dump everything.
