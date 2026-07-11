---
{
  "title": "Safety + Red Team Testing",
  "module": "security-safety-and-ethics",
  "order": 4,
  "sources": [
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "roadmap",
      "title": "Visit Dedicated AI Red Teaming Roadmap",
      "url": "https://roadmap.sh/ai-red-teaming"
    },
    {
      "type": "article",
      "title": "Enhancing AI safety: Insights and lessons from red teaming",
      "url": "https://www.microsoft.com/en-us/microsoft-cloud/blog/2025/01/14/enhancing-ai-safety-insights-and-lessons-from-red-teaming/"
    },
    {
      "type": "article",
      "title": "AI Safety Testing in the Absence of Regulations",
      "url": "https://aisecuritycentral.com/ai-safety-testing/"
    },
    {
      "type": "article",
      "title": "A Guide to AI Red Teaming - HiddenLayer",
      "url": "https://hiddenlayer.com/innovation-hub/a-guide-to-ai-red-teaming/"
    }
  ]
}
---

**AI red teaming** is a structured exercise where people play the attacker against your complete AI system — model, prompts, tools, data pipelines, and the product around them — hunting for harms before real adversaries or unlucky users find them. It differs from the adversarial testing you just covered in scope and method: adversarial testing runs a known, automated attack suite on every change; red teaming is exploratory and creative, probing for *unknown* failure modes, chained exploits, and harms nobody thought to write a test for. Findings from a red team exercise typically become new cases in your adversarial suite.

For a developer, red teaming is how you learn what your evals can't tell you. Automated checks confirm known attacks fail; a red teamer discovers that your support bot can be socially engineered into issuing refunds, or that combining two harmless tools exfiltrates data. Major providers red team frontier models before release, and emerging regulation like the **EU AI Act** increasingly expects documented safety testing — but none of that covers *your* application layer. That part is on you.

You'll run scoped exercises: define what's in bounds, recruit testers who didn't build the feature, and give them personas — the scammer, the confused user, the persistent jailbreaker. You'll cover both **safety harms** (dangerous or toxic output) and **security harms** (data leaks, unauthorized actions), log every finding with reproduction steps and severity, then triage fixes and re-test. Tools like `promptfoo`, Garak, and PyRIT can automate the grunt work between human passes.
