---
{
  "title": "Manual Implementation",
  "module": "agent-frameworks",
  "order": 0,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "A practical guide to building agents - OpenAI",
      "url": "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"
    },
    {
      "type": "official",
      "title": "Create custom subagents - Claude",
      "url": "https://code.claude.com/docs/en/sub-agents"
    },
    {
      "type": "article",
      "title": "A Step-by-Step Guide to Building an AI Agent From Scratch",
      "url": "https://www.neurond.com/blog/how-to-build-an-ai-agent"
    },
    {
      "type": "article",
      "title": "How to Build AI Agents",
      "url": "https://wotnot.io/blog/build-ai-agents"
    },
    {
      "type": "article",
      "title": "Build Your Own AI Agent from Scratch in 30 Minutes",
      "url": "https://medium.com/@gurpartap.sandhu3/build-you-own-ai-agent-from-scratch-in-30-mins-using-simple-python-1458f8099da0"
    },
    {
      "type": "video",
      "title": "Building an AI Agent From Scratch",
      "url": "https://www.youtube.com/watch?v=bTMPwUgLZf0"
    }
  ]
}
---

Before you touch any framework, you should build an agent by hand: a plain script that calls a model API in a loop, passes it **tool definitions**, executes whatever tool the model requests, feeds the result back, and repeats until the model produces a final answer. That's the whole trick. An agent is a `while` loop around a chat completion call plus a list of functions — everything else in this module is packaging around that loop.

This matters because frameworks hide the loop, and when they break — a tool call silently dropped, context blowing past the window, an agent stuck retrying — you can only debug what you understand. Writing the **agentic loop** yourself demystifies tool calling, conversation state, and stop conditions, and gives you a baseline for judging every framework that follows: what is this abstraction actually saving me? For many production systems, a few hundred lines of hand-rolled orchestration beats a heavyweight dependency.

In practice you'll install nothing but a provider SDK (`openai` or `anthropic`), define two or three tools as plain functions with JSON Schema descriptions, and write the loop: send messages, check the response for tool calls, dispatch them with a dictionary lookup, append results as tool messages, repeat. Add a **system prompt**, a max-iterations guard, and simple logging of every turn. Once that runs, you'll recognize the same skeleton inside LangGraph, CrewAI, and every SDK in this module.
