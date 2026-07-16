---
{
  "title": "AI Safety and Ethics",
  "module": "security-safety-and-ethics",
  "order": 12,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Understanding Artificial Intelligence Ethics and Safety",
      "url": "https://www.turing.ac.uk/news/publications/understanding-artificial-intelligence-ethics-and-safety"
    },
    {
      "type": "article",
      "title": "The Hidden Security Risks of LLMs",
      "url": "https://towardsdatascience.com/the-hidden-security-risks-of-llms/"
    },
    {
      "type": "video",
      "title": "What is AI Ethics?",
      "url": "https://www.youtube.com/watch?v=aGwYtUzMQUk"
    }
  ]
}
---

**AI safety and ethics** is the practice of building AI systems that behave as intended and treat people fairly. Safety covers preventing concrete harms — harmful outputs, misuse, systems acting beyond their mandate — while ethics covers the human questions: **fairness**, transparency, accountability, privacy, and consent. For LLM applications, the two converge on a practical question: what could this system do to a real person, and who answers for it when it does?

This isn't a compliance checkbox you bolt on before launch. Every design decision you make as an AI engineer is a safety decision: which model you choose, what data flows into prompts, which tools an agent can call, whether a human reviews consequential actions. Models are trained on human text and inherit human biases; they hallucinate confidently; agents given tools can take real actions with real consequences. Regulation like the **EU AI Act** now assigns legal obligations by risk level, so "the model did it" is not a defense — you own your system's behavior.

In practice, you'll apply the principles this module has been building toward: define what your system must never do and encode it in guardrails, run **adversarial testing** before attackers do, keep humans in the loop for high-stakes decisions, document known limitations honestly, and monitor production behavior rather than assuming launch-day evaluation holds. The rest of this module's techniques — moderation APIs, PII redaction, red teaming — are how these principles become code.
