---
{
  "title": "Helicone",
  "module": "evaluation-and-observability",
  "order": 11,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Helicone",
      "url": "https://www.helicone.ai/"
    },
    {
      "type": "official",
      "title": "Helicone OSS LLM Observability",
      "url": "https://docs.helicone.ai/getting-started/quick-start"
    },
    {
      "type": "opensource",
      "title": "Helicone/helicone",
      "url": "https://github.com/Helicone/helicone"
    }
  ]
}
---

**Helicone** is an open-source LLM observability platform built around a **gateway**: instead of instrumenting your code with an SDK, you route your LLM API calls through Helicone's proxy, and it logs every request and response as they pass through. One base-URL change — pointing your OpenAI or Anthropic client at Helicone's endpoint with your API key in a header — and you get a full record of prompts, completions, latency, token counts, and cost.

That proxy architecture is Helicone's differentiator among observability tools. Because it sits on the wire rather than in your code, it works with any language or framework, takes minutes to adopt, and unlocks gateway-level features that SDK-based tools can't offer: response **caching** to cut costs on repeated prompts, rate limiting per user, retries and fallbacks across providers, and key management. When your first question is "what are we spending, on which users, and why is it slow," Helicone answers it with almost zero integration work.

In practice, you'll swap your client's `base_url` for Helicone's gateway, add a `Helicone-Auth` header, and tag requests with **custom properties** — user IDs, feature names, environment — so the dashboard can segment cost and latency by whatever dimensions matter to you. From there you'll enable caching for deterministic prompts, set per-user rate limits, monitor error rates, and export data when you need deeper analysis. Async logging options exist when you'd rather keep the proxy out of your critical path.
