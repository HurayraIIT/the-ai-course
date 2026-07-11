---
{
  "title": "Adding end-user IDs in prompts",
  "module": "security-safety-and-ethics",
  "order": 7,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Sending End-user IDs - OpenAI",
      "url": "https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids"
    }
  ]
}
---

When your application serves many people through one API key, the provider sees a single anonymous stream of requests — it has no idea which of your users sent what. Passing an **end-user ID** with each request fixes that: you attach a stable, opaque identifier (like a hashed account ID) so every generation is attributable to a specific user of *your* product. OpenAI accepts a `user` parameter on completions for exactly this purpose, and Anthropic offers the equivalent via `metadata.user_id`; the same pattern applies across providers.

This is **abuse attribution**, and it protects you in two directions. Upstream, providers use these IDs in their abuse detection — if one of your users hammers the API with policy-violating prompts, the provider can flag that individual pattern instead of rate-limiting or suspending your entire organization's key. Downstream, when you investigate an incident — a jailbreak attempt, a moderation flag, a suspicious spike — you can trace it to one account, warn or ban that user, and prove to the provider that you've handled it.

Implementation is small but has rules worth respecting. Send a hash or UUID, never an email address or username — the ID must not itself be PII, which ties directly into the redaction practices you just covered. Use the same identifier consistently across requests and in your own logs so records correlate, generate session-scoped IDs for anonymous visitors, and pair the whole thing with per-user **rate limiting** so one abusive account can't burn your quota or your reputation.
