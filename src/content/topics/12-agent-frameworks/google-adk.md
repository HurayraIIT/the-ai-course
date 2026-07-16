---
{
  "title": "Google ADK",
  "module": "agent-frameworks",
  "order": 13,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "course",
      "title": "ADK Crash Course - From Beginner To Expert",
      "url": "https://codelabs.developers.google.com/onramp/instructions#0"
    },
    {
      "type": "official",
      "title": "Agent Development Kit",
      "url": "https://google.github.io/adk-docs/"
    },
    {
      "type": "official",
      "title": "Overview of Agent Development Kit",
      "url": "https://docs.cloud.google.com/agent-builder/agent-development-kit/overview"
    }
  ]
}
---

Google's **Agent Development Kit (ADK)** is an open-source framework for building agents in Python (with Java support too), designed to make agent development feel like ordinary software engineering. Its core idea is composition: you define an `Agent` with a model, instruction, and tools, then combine agents into larger systems using **workflow agents** — `SequentialAgent`, `ParallelAgent`, `LoopAgent` — or dynamic LLM-driven routing where a coordinator delegates to sub-agents. It's the same framework Google uses inside its own agent products.

ADK's sweet spot is structured **multi-agent systems** with a clear path to production on Google Cloud. It's model-agnostic in principle — you can run Claude, GPT, or open models via LiteLLM — but it's optimized for **Gemini** and integrates natively with Vertex AI, where **Agent Engine** gives you a managed runtime for deployment. Compared to LangGraph's explicit state graphs, ADK leans on hierarchical agent trees and built-in orchestration primitives; compared to CrewAI, it's more engineering-oriented, with first-class evaluation, session state, artifacts, and callback hooks. The bundled **developer UI** (`adk web`) for tracing and debugging agent runs is a genuine differentiator while you iterate.

In practice you'll `pip install google-adk`, define tools as typed Python functions with docstrings (ADK generates the schemas), create agents like `Agent(model="gemini-2.5-flash", instruction=..., tools=[...])`, and nest them via `sub_agents`. You test locally with `adk web` or `adk run`, wire shared data through session `state`, and deploy the same code to Cloud Run or Agent Engine when it's ready.
