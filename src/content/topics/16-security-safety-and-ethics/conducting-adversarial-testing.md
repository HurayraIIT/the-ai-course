---
{
  "title": "Conducting adversarial testing",
  "module": "security-safety-and-ethics",
  "order": 4,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Adversarial Testing for Generative AI",
      "url": "https://developers.google.com/machine-learning/resources/adv-testing"
    },
    {
      "type": "article",
      "title": "Adversarial Testing: Definition, Examples and Resources",
      "url": "https://www.leapwork.com/blog/adversarial-testing"
    }
  ]
}
---

**Adversarial testing** means deliberately attacking your own AI application with inputs designed to make it fail: injection payloads, boundary-pushing requests, malformed data, and edge cases your happy-path evals never cover. Where red teaming (next topic) is an open-ended, human-driven exercise against a whole system, adversarial testing is the *systematic, repeatable* discipline: a curated suite of hostile test cases you run continuously, the security equivalent of a regression test suite.

It matters because your defenses are only hypotheses until something tries to break them. The delimiters, guardrails, and refusal rules you wrote in the previous topics will fail in ways you can't predict from reading the prompt — models are stochastic, and a mitigation that blocks an attack phrased one way may miss the same attack phrased another. Adversarial testing also catches **regressions**: a prompt tweak or model version upgrade can silently reopen a hole you closed months ago, and only an automated suite will notice.

You'll build an attack dataset from three sources: known public payloads (injection strings, jailbreak templates, encoding tricks like Base64 or leetspeak), failures discovered in your own logs, and machine-generated variations — using one LLM to mutate and rephrase attacks against another scales far beyond hand-written cases. You'll wire this suite into CI with clear pass criteria (refused, deflected, or safely handled), score results with an **LLM-as-judge** plus human spot checks, and track your defense pass rate over time the way you track code coverage.
