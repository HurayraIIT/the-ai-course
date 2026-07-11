---
{
  "title": "Claude Agent SDK",
  "module": "agent-frameworks",
  "order": 11,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Agent SDK overview",
      "url": "https://platform.claude.com/docs/en/agent-sdk/overview"
    },
    {
      "type": "article",
      "title": "Getting Started with the Claude Agent SDK",
      "url": "https://www.kdnuggets.com/getting-started-with-the-claude-agent-sdk"
    },
    {
      "type": "video",
      "title": "Building Custom AI Agents Just Got EASIER - Claude Agent SDK",
      "url": "https://www.youtube.com/watch?v=NsROagHaKxA"
    },
    {
      "type": "video",
      "title": "Claude Agents SDK BEATS all Agent Framework! (Beginners Guide)",
      "url": "https://www.youtube.com/watch?v=i6N8oQQ0tUE"
    }
  ]
}
---

The **Claude Agent SDK** is Anthropic's framework for building autonomous agents on the same **agent harness** that powers Claude Code. Instead of handing you primitives to assemble a loop yourself, it gives you the finished, battle-tested loop: context management with automatic **compaction**, built-in tools (file operations, bash, web search, code execution), **subagents** for parallel work, **hooks** for intercepting tool calls, and **MCP** support for plugging in external integrations. Available for TypeScript and Python.

Its pitch is different from LangChain-style frameworks: you're not wiring components, you're configuring a production agent runtime that already handles the hard parts — permission gating before dangerous actions, session persistence, error recovery, and token management across long sessions. Because it's the exact machinery behind Claude Code, patterns proven on millions of coding sessions transfer directly to your domain: agents that operate on files and shells work out of the box, which turns out to be a general-purpose superpower for far more than coding — research agents, ops automation, data pipelines. The tradeoff is commitment to Claude models rather than a provider-agnostic abstraction.

In practice you'll `npm install @anthropic-ai/claude-agent-sdk` (or `pip install claude-agent-sdk`) and call `query()` with a prompt and options: system prompt, allowed tools, permission mode, MCP servers, and custom tools defined as plain functions. You iterate over streamed messages as the agent works, define subagents declaratively, and use hooks to enforce policy — for example, blocking any bash command that touches production.
