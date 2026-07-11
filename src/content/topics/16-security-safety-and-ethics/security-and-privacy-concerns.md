---
{
  "title": "Security and Privacy Concerns",
  "module": "security-safety-and-ethics",
  "order": 0,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Examining Privacy Risks in AI Systems",
      "url": "https://transcend.io/blog/ai-and-privacy"
    },
    {
      "type": "video",
      "title": "AI Is Dangerous, but Not for the Reasons You Think | Sasha Luccioni | TED",
      "url": "https://www.youtube.com/watch?v=eXdVDhOGqoE"
    }
  ]
}
---

Every LLM application inherits a new class of risks that traditional web security never had to name. Your **attack surface** now includes the prompt itself, the model's training data, the context you feed it, and every tool it can call. Alongside classic concerns like leaked API keys and insecure endpoints, you now face model-specific threats: prompt injection, sensitive data exposure through completions, over-permissioned agents, and users pasting confidential information into systems that may log or retain it. This topic maps that landscape before the rest of the module tackles each risk in depth.

If you ship AI features, you are the last line of defense between these failure modes and your users. The **OWASP Top 10 for LLM Applications** exists because real products have leaked customer PII through chat logs, executed attacker-controlled instructions hidden in retrieved documents, and exposed proprietary **system prompts** on request. Regulators care too: privacy laws apply whether the data left through a database dump or a chat completion, and "the model did it" is not a defense.

You'll start by threat-modeling your own application: enumerate every place untrusted data enters a prompt, every secret the model can see, and every action it can take. You'll audit what your provider logs and retains, review data-processing terms before sending user data to an API, and treat model output as untrusted input — never `eval` it, never render it as raw HTML. The rest of this module turns each identified risk into a concrete mitigation.
