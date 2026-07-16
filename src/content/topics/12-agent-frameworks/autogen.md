---
{
  "title": "AutoGen",
  "module": "agent-frameworks",
  "order": 8,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "AutoGen - Microsoft Research",
      "url": "https://www.microsoft.com/en-us/research/project/autogen/"
    },
    {
      "type": "opensource",
      "title": "GitHub - microsoft/autogen",
      "url": "https://github.com/microsoft/autogen"
    }
  ]
}
---

AutoGen is Microsoft Research's multi-agent framework built on a distinctive premise: agents collaborate by **talking to each other**. Instead of wiring a graph or defining a crew, you create conversable agents and let work emerge from structured dialogue — an assistant proposes code, an executor runs it and reports errors, the assistant fixes them, and the loop continues until the task is done.

AutoGen matters both historically and technically. It popularized the multi-agent conversation pattern and remains one of the strongest options for **code-executing agents**, with built-in support for running generated code in Docker or local sandboxes — a workflow it handles more natively than most rivals. Its modern architecture (the 0.4 rewrite) is an **event-driven, asynchronous** runtime: `autogen-core` for low-level actor-style messaging that can scale to distributed systems, and `autogen-agentchat` for the ergonomic conversation API most projects use. Microsoft has since folded AutoGen's lineage into its broader agent framework strategy, but the concepts — group chats, speaker selection, termination conditions — remain foundational vocabulary for multi-agent design.

You'll `pip install autogen-agentchat` plus a model extension like `autogen-ext[openai]`, create an `AssistantAgent` with a model client and tools, and run it with `await agent.run(task=...)`. For teams, compose agents into a `RoundRobinGroupChat` or selector-based group chat with an explicit **termination condition** (a keyword, a message cap) so conversations end deliberately. Everything is async, so expect `asyncio` throughout.
