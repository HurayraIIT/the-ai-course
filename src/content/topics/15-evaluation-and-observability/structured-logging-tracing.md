---
{
  "title": "Structured logging & tracing",
  "module": "evaluation-and-observability",
  "order": 13,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Understanding Structured Logging: A Comprehensive Guide",
      "url": "https://www.graphapp.ai/blog/understanding-structured-logging-a-comprehensive-guide"
    },
    {
      "type": "article",
      "title": "Structured Logging & Cloud Logging",
      "url": "https://cloud.google.com/logging/docs/structured-logging"
    },
    {
      "type": "article",
      "title": "Best Practices for Logging in AI Applications",
      "url": "https://www.restack.io/p/best-ai-practices-software-compliance-answer-logging-best-practices-cat-ai"
    }
  ]
}
---

**Structured logging** means emitting log events as machine-readable key-value records — usually JSON — instead of free-form strings, so you can filter and aggregate by field: `user_id`, `model`, `token_count`, `latency_ms`. **Tracing** adds causality: a trace represents one request end to end, composed of nested **spans** for each step, all linked by shared IDs. Together they're the practice underneath every observability platform in this module.

For LLM applications this discipline matters more than for ordinary services, because the failures are subtler. A traditional API either works or throws; an LLM pipeline can "succeed" while returning garbage, and the cause might be a truncated prompt three steps upstream, a retrieval that returned the wrong chunks, or an agent that silently looped. Without structured records of every prompt, response, tool call, and intermediate decision, debugging is guesswork — and you can't compute cost per user, latency percentiles, or error rates from `print()` statements.

In practice, you'll adopt a structured logger (`structlog` in Python, `pino` in Node) and log one event per meaningful step with consistent fields, never raw string concatenation. You'll propagate a **correlation ID** from the incoming request through every LLM call and tool invocation, capture token usage and model parameters on each span, and redact PII before it lands in storage. Whether the data flows to Langfuse, LangSmith, or a generic OpenTelemetry backend, the habits are the same — and they're what make those platforms useful rather than noisy.
