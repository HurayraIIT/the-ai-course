---
{
  "title": "LangFuse",
  "module": "evaluation-and-observability",
  "order": 11,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "LangFuse",
      "url": "https://langfuse.com/"
    },
    {
      "type": "official",
      "title": "LangFuse Documentation",
      "url": "https://langfuse.com/docs"
    },
    {
      "type": "opensource",
      "title": "langfuse/langfuse",
      "url": "https://github.com/langfuse/langfuse"
    },
    {
      "type": "article",
      "title": "Langfuse: Open Source LLM Engineering Platform",
      "url": "https://www.ycombinator.com/companies/langfuse"
    }
  ]
}
---

**Langfuse** is an open-source LLM engineering platform centered on **tracing**: it records every step of your LLM application — model calls, retrievals, tool executions, agent loops — as nested spans you can inspect in a web UI. Around that core it layers prompt management with versioning, **evaluation** (LLM-as-judge, user feedback, custom scores), datasets for regression testing, and cost and latency analytics.

Its position in the observability landscape is the open, framework-neutral choice. Unlike LangSmith, it isn't tied to one framework's ecosystem; unlike Helicone, it instruments from inside your code rather than proxying traffic, which gives you rich application-level traces instead of just request logs. Being **self-hostable** under a permissive license makes it the default answer when data residency or vendor caution rules out closed SaaS — you can run the whole platform from a Docker Compose file — while the managed cloud version works when you'd rather not operate it.

In practice, you'll `pip install langfuse`, set a few environment variables, and instrument with the `@observe` decorator or the OpenAI client wrapper; integrations exist for LangChain, LlamaIndex, and the Vercel AI SDK, plus OpenTelemetry ingestion for everything else. You'll group spans into traces per user request, attach **sessions** and user IDs, score outputs with judge evaluators run against production traces, and manage prompts in the UI so prompt changes deploy without code changes. Datasets built from real traces become your regression suite.
