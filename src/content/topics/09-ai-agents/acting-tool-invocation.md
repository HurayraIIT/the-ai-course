---
{
  "title": "Acting / Tool Invocation",
  "module": "ai-agents",
  "order": 12,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Tool Calling in Agents?",
      "url": "https://www.useparagon.com/blog/ai-building-blocks-what-is-tool-calling-a-guide-for-pms"
    }
  ]
}
---

**Acting** is the stage where the agent's decision becomes a real operation: the model emits a structured **tool call** — a tool name plus JSON arguments — and your code executes it. This is the boundary between the model and the world. The model never runs anything itself; it requests `get_weather({"city": "Dhaka"})`, your runtime invokes the actual function, and the result flows back into the loop. Every capability an agent has — querying databases, sending email, running code, browsing — arrives through a tool you defined.

This stage matters because it's where you hold all the control. Tool design largely determines agent quality: clear names, tight parameter schemas, and good descriptions are prompts in disguise, and a confusing tool gets misused the way a confusing API does. It's also your security perimeter — the model can *ask* for anything, but your executor decides what actually runs, with what permissions, against which environment.

In practice, you'll define each tool with a JSON Schema (name, description, typed parameters), pass the list on every model call, and write a dispatcher that maps tool-call responses to real functions. You'll validate arguments before executing rather than trusting the model, return errors as data so the agent can recover, and wrap dangerous operations — writes, payments, deletes — in allowlists, sandboxes, or human confirmation. Standards like **MCP** (Model Context Protocol) now let you plug in prebuilt tool servers instead of hand-wiring every integration.
