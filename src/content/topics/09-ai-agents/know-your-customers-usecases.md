---
{
  "title": "Know your Customers / Usecases",
  "module": "ai-agents",
  "order": 8,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Prompt Personalities — OpenAI Cookbook",
      "url": "https://developers.openai.com/cookbook/examples/gpt-5/prompt_personalities"
    },
    {
      "type": "official",
      "title": "Keep Claude in character — Anthropic",
      "url": "https://platform.claude.com/docs/en/docs/test-and-evaluate/strengthen-guardrails/keep-claude-in-character"
    },
    {
      "type": "article",
      "title": "The Art of Agent Prompting",
      "url": "https://blog.agentailor.com/posts/the-art-of-agent-prompting"
    }
  ]
}
---

Knowing your customer means designing an agent around a specific user and job, not around the technology. Two decisions flow from it: who the agent serves — a support rep, an analyst, an end user on your checkout page — and what **role** the agent itself plays. Role assignment is the practical lever here: telling the model it is "a senior billing support specialist for a SaaS product" measurably changes its tone, vocabulary, and judgment compared to a generic assistant answering the same question.

This matters because vague agents fail in production. An agent built for "customer questions" hedges, rambles, and hallucinates policy; an agent built for "explain invoice line items to self-serve customers, escalate refunds to a human" can be tested, measured, and trusted. Defining the customer tells you which tools the agent needs, what tone fits, what it must refuse to do, and what a correct answer even looks like — the foundation for every eval you'll write later.

In practice, this work lands in your **system prompt**. You'll write a persona block (role, expertise, audience), enumerate concrete scenarios the agent must handle and ones it must escalate, and encode your customer's vocabulary into instructions and few-shot examples. Then you'll validate against reality: pull real support transcripts or user queries, run them through the agent, and tighten the role definition where its answers drift. Treat the persona as versioned, tested code — because functionally, it is.
