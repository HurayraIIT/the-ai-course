---
{
  "title": "AI Agents",
  "module": "ai-agents",
  "order": 0,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Building an AI Agent Tutorial - LangChain",
      "url": "https://python.langchain.com/docs/tutorials/agents/"
    },
    {
      "type": "article",
      "title": "AI Agents and Their Types",
      "url": "https://www.digitalocean.com/resources/articles/types-of-ai-agents"
    },
    {
      "type": "video",
      "title": "The Complete Guide to Building AI Agents for Beginners",
      "url": "https://youtu.be/MOyl58VF2ak?si=-QjRD_5y3iViprJX"
    },
    {
      "type": "article",
      "title": "AI Agents and Their Types",
      "url": "https://play.ht/blog/ai-agents-use-cases/"
    },
    {
      "type": "article",
      "title": "How to Design My First AI Agent",
      "url": "https://towardsdatascience.com/how-to-design-my-first-ai-agent/"
    },
    {
      "type": "article",
      "title": "What are AI Agents? - Agents in Artificial Intelligence Explained",
      "url": "https://aws.amazon.com/what-is/ai-agents/"
    },
    {
      "type": "article",
      "title": "AI Agents Explained in Simple Terms for Beginners",
      "url": "https://www.geeky-gadgets.com/ai-agents-explained-for-beginners/"
    },
    {
      "type": "video",
      "title": "What are AI Agents?",
      "url": "https://www.youtube.com/watch?v=F8NKVhkZZWI"
    },
    {
      "type": "official",
      "title": "Tool use overview - Anthropic",
      "url": "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
    },
    {
      "type": "article",
      "title": "Introduction to AI Agents - DAIR.AI",
      "url": "https://www.promptingguide.ai/agents/introduction"
    }
  ]
}
---

An **AI agent** is a program that uses a large language model as its decision-making engine, then goes beyond generating text: it takes actions. Instead of answering a single prompt and stopping, an agent receives a goal, decides what to do, calls **tools** (APIs, databases, browsers, code interpreters), looks at the results, and keeps going until the goal is met or it decides to stop. The LLM supplies the judgment; your code supplies the hands.

This shift matters because most real software problems are not one-shot question answering. Booking travel, triaging support tickets, refactoring a codebase, or reconciling invoices all require multiple steps, external state, and error recovery. Plain prompting can't touch your systems; an agent can. In 2026, **tool use** (also called function calling) is a first-class feature of every major model API, so building agents is now a core skill for working developers, not a research niche.

In practice, you will build an agent as a loop: send the model a system prompt describing its role and a list of tool schemas, let it respond with either a final answer or a tool call, execute that call in your code, append the result to the conversation, and repeat. You'll define tools as plain functions with JSON schemas, cap iterations to prevent runaways, and log every step. The rest of this module breaks down each stage of that loop and the architectures built on top of it.
