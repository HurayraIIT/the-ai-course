---
{
  "title": "OpenAI AgentKit & Agent SDK",
  "module": "agent-frameworks",
  "order": 10,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Introducing AgentKit",
      "url": "https://openai.com/index/introducing-agentkit/"
    },
    {
      "type": "official",
      "title": "Build every step of agents on one platform",
      "url": "https://openai.com/agent-platform/"
    },
    {
      "type": "video",
      "title": "OpenAI Agents SDK Tutorial (FULL SERIES)",
      "url": "https://www.youtube.com/watch?v=gFcAfU3V1Zo"
    }
  ]
}
---

This is OpenAI's first-party stack for building agents. The **Agents SDK** is a lightweight open-source library (Python and TypeScript) whose whole surface is a few primitives: an `Agent` (instructions plus tools), **handoffs** (one agent delegating to another), **guardrails** (validation that runs alongside the agent), and sessions for conversation state. **AgentKit** wraps that in platform tooling — Agent Builder's visual workflow canvas, ChatKit for embeddable chat UIs, connectors, and built-in evals and tracing.

Its position in the landscape is deliberate minimalism with platform depth. Where LangGraph exposes a full state machine and CrewAI a role-playing crew, the Agents SDK bets that agents, handoffs, and guardrails cover most real systems with far less to learn — and the loop stays close to raw API calls, so there's little abstraction to fight. The catch is gravity toward OpenAI: the SDK can technically drive other models via compatible endpoints, but tracing, hosted tools like web search and code interpreter, and the AgentKit surface all assume the OpenAI platform. If you're already committed there, this is the path of least resistance and the built-in **tracing** dashboard is genuinely useful for debugging.

You'll `pip install openai-agents`, define tools by decorating plain functions with `@function_tool`, construct an `Agent(name=..., instructions=..., tools=[...])`, and execute with `Runner.run(agent, "your task")`. Multi-agent systems are just agents listed in another agent's `handoffs`. Typical first build: a triage agent that routes to two specialists, with a guardrail rejecting off-topic input.
