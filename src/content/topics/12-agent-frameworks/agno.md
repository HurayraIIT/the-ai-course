---
{
  "title": "Agno",
  "module": "agent-frameworks",
  "order": 9,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Agno Docs",
      "url": "https://docs.agno.com/"
    },
    {
      "type": "opensource",
      "title": "agno",
      "url": "https://github.com/agno-agi/agno"
    },
    {
      "type": "video",
      "title": "Building Your First Agent With AGNO AGI ( Previously Phidata ) | For Complete Begineers",
      "url": "https://www.youtube.com/watch?v=s7Kkc6vA2K0"
    }
  ]
}
---

Agno (formerly Phidata) is a Python framework for building agents with a deliberately minimal, model-agnostic API. Its pitch is **performance and simplicity**: agents are lightweight objects that instantiate fast and stay out of your way, and the same few lines work across OpenAI, Anthropic, Google, and local models. Memory, knowledge, and tools are built into the core `Agent` abstraction rather than bolted on.

Agno's place in the landscape is the "batteries included, ceremony excluded" middle ground. Where LangGraph makes you think in graphs and CrewAI in role-played crews, Agno keeps the mental model at the level you actually think: an agent has a model, instructions, **tools**, optional **knowledge** (a vector store it can search — RAG as a property, not a pipeline), and optional **memory** that persists across sessions. It scales the same idea upward into teams of agents and step-based workflows, and ships pragmatic extras like structured outputs via Pydantic models and a UI for chatting with your agents locally, which makes the build-test loop unusually tight.

You'll `pip install agno` plus a provider SDK, then compose an agent in a handful of lines: `Agent(model=..., tools=[DuckDuckGoTools()], instructions=..., markdown=True)` and call `agent.print_response(...)`. From there, add a knowledge base backed by a vector database for RAG, attach storage for session memory, and group agents into a **team** when one role isn't enough. Claims stay simple because the API does.
