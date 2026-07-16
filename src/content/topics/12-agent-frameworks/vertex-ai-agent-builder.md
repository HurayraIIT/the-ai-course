---
{
  "title": "Vertex AI Agent Builder",
  "module": "agent-frameworks",
  "order": 14,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Vertex AI",
      "url": "https://cloud.google.com/generative-ai-studio?hl=en"
    },
    {
      "type": "article",
      "title": "Vertex AI Tutorial: A Comprehensive Guide For Beginners",
      "url": "https://www.datacamp.com/tutorial/vertex-ai-tutorial"
    },
    {
      "type": "video",
      "title": "Introduction to Vertex AI Studio",
      "url": "https://www.youtube.com/watch?v=KWarqNq195M"
    }
  ]
}
---

**Vertex AI Agent Builder** is Google Cloud's managed platform for building and running agents in production. Where a framework gives you code, Agent Builder gives you infrastructure: it bundles the **Agent Development Kit** for authoring, **Agent Engine** — a fully managed runtime that hosts your agent with sessions, memory, and scaling handled for you — plus grounding tools like Google Search and Vertex AI Search over your own documents, all inside your Google Cloud project.

Its value is everything that happens *after* your agent works on a laptop. Deploying an agent for real means session storage, identity and access control, observability, evaluation, and compliance — the undifferentiated heavy lifting Agent Builder absorbs. Because it lives inside Google Cloud, you inherit **IAM**, VPC controls, logging, and monitoring instead of assembling them, which is exactly what enterprise teams need to get an agent past a security review. It's also comparatively framework-open: Agent Engine can host agents written in ADK, LangGraph, CrewAI, or LlamaIndex, so choosing the platform doesn't fully lock in your authoring layer — though you are committing to Google Cloud as the runtime.

In practice you'll build the agent locally (typically with ADK), test it, then deploy with the Vertex AI SDK — roughly `agent_engines.create(agent, requirements=[...])` — and call it via SDK or REST from your application. From the console you manage deployed agents, run **evaluations**, inspect traces, wire up grounding data stores, and connect enterprise systems through built-in connectors and MCP.
