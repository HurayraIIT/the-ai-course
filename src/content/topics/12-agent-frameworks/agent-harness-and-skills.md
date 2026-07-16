---
{
  "title": "Agent harness and agent skills",
  "module": "agent-frameworks",
  "order": 1,
  "sources": [],
  "resources": [
    {
      "type": "article",
      "title": "Building agents with the Claude Agent SDK",
      "url": "https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk"
    },
    {
      "type": "article",
      "title": "Equipping agents for the real world with Agent Skills",
      "url": "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
    }
  ]
}
---

An **agent harness** is everything around the model that turns a chat completion into a working agent: the loop that feeds tool results back in, the tool executor and its **sandboxing**, context management (**compaction** when the window fills), permission checks and **approval gates**, retries, state persistence, and the interfaces to the outside world. The model provides the reasoning; the harness provides the hands, the memory, and the guardrails. It's become the standard name for what you're actually choosing when you pick an "agent framework" — every framework in this module is, at bottom, a harness with opinions — and it explains a common observation: the same model performs very differently in different products, because the harness quality differs.

**Agent skills** are a newer idea layered on top: packaged, reusable instructions the harness loads on demand instead of cramming into the system prompt. A skill is typically a folder — a markdown file of instructions plus optional scripts and resources — with a one-line description the agent always sees; only when a task matches does the harness load the full contents into context. This **progressive disclosure** is context engineering applied to capabilities: a hundred skills cost almost nothing until one is needed. Where a **tool** gives the agent a new action and **MCP** gives it a new connection, a skill gives it new *procedural knowledge* — your team's deploy checklist, a house style for reports, the steps for a compliance review — without retraining or prompt bloat.

In practice, when you evaluate frameworks in the rest of this module, evaluate the harness: how does it manage context over long runs, isolate tool execution, persist state across restarts, and expose permissioning? Those unglamorous concerns predict production success better than the demo. And keep the layers straight when extending an agent — new action: tool; new data source: MCP server; new procedure or expertise: skill. Skills are the cheapest of the three to write (it's mostly markdown), which is why teams accumulate libraries of them the way they once accumulated internal wikis — except this wiki executes.
