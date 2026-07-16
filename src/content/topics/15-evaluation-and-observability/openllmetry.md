---
{
  "title": "openllmetry",
  "module": "evaluation-and-observability",
  "order": 13,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenTelemetry Documentation",
      "url": "https://www.traceloop.com/blog/openllmetry"
    },
    {
      "type": "official",
      "title": "What is OpenLLMetry? - traceloop",
      "url": "https://www.traceloop.com/docs/openllmetry/introduction"
    },
    {
      "type": "official",
      "title": "Use Traceloop with Python",
      "url": "https://www.traceloop.com/docs/openllmetry/getting-started-python"
    },
    {
      "type": "opensource",
      "title": "traceloop/openllmetry",
      "url": "https://github.com/traceloop/openllmetry"
    }
  ]
}
---

**OpenLLMetry** is an open-source instrumentation layer, built by Traceloop, that extends **OpenTelemetry** — the industry standard for traces and metrics — to LLM applications. It ships auto-instrumentation for LLM providers (OpenAI, Anthropic, Cohere), vector databases (Pinecone, Chroma, and others), and frameworks like LangChain and LlamaIndex, emitting spans with standardized attributes for prompts, completions, and token usage.

Its differentiator among the tools in this module is that it's **not a platform at all** — it's a vendor-neutral emitter. Langfuse, LangSmith, and Helicone each collect data into their own backend; OpenLLMetry produces standard OTel data you can send anywhere: Datadog, Grafana, Honeycomb, New Relic, or Langfuse itself. That matters when your company already runs observability infrastructure — your LLM traces land next to your API and database traces in the same tool your on-call team already watches, instead of in yet another dashboard. And because it's built on open standards, there's no lock-in: switching backends is a config change.

In practice, you'll `pip install traceloop-sdk` and call `Traceloop.init()` at startup, which auto-instruments every supported library it finds in your process. You'll set an OTLP endpoint via environment variables to route data to your chosen backend, and use decorators like `@workflow` and `@task` to group low-level LLM spans into meaningful business operations. If you need finer control, drop the SDK and use the individual instrumentation packages directly with your existing OpenTelemetry setup.
