---
{
  "title": "CoT",
  "module": "prompting-fundamentals",
  "order": 18,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is chain of thought (CoT) prompting?",
      "url": "https://www.ibm.com/think/topics/chain-of-thoughts"
    },
    {
      "type": "article",
      "title": "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
      "url": "https://arxiv.org/abs/2201.11903"
    },
    {
      "type": "article",
      "title": "Evoking Chain of Thought Reasoning in LLMs - Prompting Guide",
      "url": "https://www.promptingguide.ai/techniques/cot"
    },
    {
      "type": "video",
      "title": "ChatGPT Prompt Engineering Principles: Chain of Thought Prompting",
      "url": "https://www.youtube.com/watch?v=Kar2qfLDQ2c"
    },
    {
      "type": "article",
      "title": "Chain-of-Thought Prompting - LearnPrompting",
      "url": "https://learnprompting.org/docs/intermediate/chain_of_thought"
    },
    {
      "type": "article",
      "title": "Reasoning LLMs Guide - DAIR.AI",
      "url": "https://www.promptingguide.ai/guides/reasoning-llms"
    },
    {
      "type": "video",
      "title": "Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents",
      "url": "https://youtu.be/vD0E3EUb8-8?si=Y6MCLPzjmhMB4jSu&t=203"
    }
  ]
}
---

**Chain-of-thought (CoT) prompting** gets the model to reason step by step before committing to an answer, instead of jumping straight to a conclusion. The mechanism is simple: because an LLM generates one token at a time, everything it writes becomes context for what comes next. Asking it to "think out loud" lets intermediate steps — extract the numbers, apply the formula, check the units — scaffold the final answer, dramatically improving accuracy on math, logic, and multi-step problems.

For a builder, CoT is the cheapest reasoning upgrade available: often a single added line. It also produces an audit trail — when the answer is wrong, the visible reasoning shows *where* it went wrong, which beats debugging a bare "42." The costs are more output tokens and higher latency, so reserve it for problems that genuinely need multi-step reasoning; a sentiment classifier doesn't. Note that modern **reasoning models** bake this in, generating internal thinking before answering — with those, explicit CoT instructions matter less, but the technique still pays off with standard models.

In practice, zero-shot CoT is as simple as appending "**Think step by step**" or "Show your reasoning before answering." Few-shot CoT includes worked examples whose answers demonstrate the reasoning. A production-friendly pattern: have the model write its reasoning inside `<thinking>` tags and the final answer inside `<answer>` tags, so you can parse the conclusion and log the rest. Where CoT follows one reasoning path, **tree-of-thought** — next — explores several.
