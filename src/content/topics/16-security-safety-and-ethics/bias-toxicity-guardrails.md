---
{
  "title": "Bias & Toxicity Guardrails",
  "module": "security-safety-and-ethics",
  "order": 10,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Define the Agent Guardrails",
      "url": "https://trailhead.salesforce.com/content/learn/modules/agentforce-agent-planning/define-the-agent-guardrails"
    },
    {
      "type": "article",
      "title": "How to Build Safe AI Agents: Best Practices for Guardrails",
      "url": "https://medium.com/@sahin.samia/how-to-build-safe-ai-agents-best-practices-for-guardrails-and-oversight-a0085b50c022"
    }
  ]
}
---

**Bias and toxicity guardrails** are runtime checks that sit around your model and block or rewrite problematic content before it reaches users. Where bias *evaluation* measures how your system behaves in testing, guardrails act in production, on every request: screening user input for abuse and manipulation, and screening model output for **toxicity**, slurs, stereotyping, and unfair treatment of protected groups before it ships.

You need them because model providers' built-in safety training is generic, and your application has specific stakes. A hiring assistant that describes candidates differently by gender, a support agent that mirrors an abusive user's tone, or a community tool that generates a slur once in ten thousand completions — each is a real incident with your product's name on it. LLM outputs are probabilistic; a prompt that behaved for a month can still produce a harmful completion tomorrow. Guardrails turn "usually fine" into an enforced contract, and give you logs proving the system rejected what it should have.

In practice, you'll layer cheap checks first — blocklists and regex for unambiguous cases — then classifier calls like the **OpenAI Moderation API** or Llama Guard on input and output, with framework options like **Guardrails AI** or NeMo Guardrails to orchestrate validation policies. Define what happens on failure: block with a safe refusal, regenerate, or escalate to a human. Log every trigger, tune thresholds against false positives that frustrate legitimate users, and feed flagged cases back into your evaluation sets.
