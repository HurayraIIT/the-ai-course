---
{
  "title": "Rate limits, retries, and reliability",
  "module": "working-with-apis",
  "order": 19,
  "sources": ["new"],
  "resources": [
    {
      "type": "article",
      "title": "OpenAI rate limits guide",
      "url": "https://platform.openai.com/docs/guides/rate-limits"
    },
    {
      "type": "article",
      "title": "Exponential Backoff and Jitter",
      "url": "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/"
    },
    {
      "type": "article",
      "title": "Designing robust and predictable APIs with idempotency",
      "url": "https://stripe.com/blog/idempotency"
    }
  ]
}
---

Model APIs fail in ways your demo never showed you. **Rate limits** — enforced per minute as both requests (RPM) and tokens (TPM) — return HTTP 429 the moment your traffic spikes; providers also throw 500s, time out on long generations, and occasionally cut a stream mid-response. A production AI feature is defined less by its prompt than by what happens on these paths: **retries** with **exponential backoff** and jitter for transient errors (retry after 1s, then 2s, 4s — with randomness so a thousand failed clients don't all retry in the same instant), honoring the `retry-after` header on 429s, and a hard cap on attempts so a persistent failure fails fast instead of hammering the API.

Two more patterns separate reliable systems from demos. **Idempotency** means a retried operation is safe to repeat: LLM calls themselves are non-destructive, but the tool calls and writes they trigger often aren't — retry a request whose agent already sent the email or charged the card, and it happens twice. The fix is idempotency keys or checking state before acting, and it's why retry logic must wrap the model call, never the whole agent action. **Graceful degradation** is the plan for when retries run out: fall back to a second provider or smaller model (OpenRouter's automatic fallbacks, from earlier in this module, do this for you), serve a cached response, or degrade the feature honestly — "summary unavailable" beside intact article text beats a spinner that never resolves. The AI feature should never take the whole product down with it.

In practice: set client-side timeouts (SDK defaults are generous to a fault), treat 429 and 5xx as retryable but 400 and 401 as bugs to surface immediately, and separate workloads — one user's batch job shouldn't exhaust the TPM budget your interactive chat depends on. Request quota increases before launch, not during the incident. And test the failure paths deliberately by injecting fake 429s and timeouts in staging; you do not want the first execution of your fallback code to happen in production.
