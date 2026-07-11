---
{
  "title": "Prompt Injection Attacks",
  "module": "security-safety-and-ethics",
  "order": 1,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Prompt Injection in LLMs",
      "url": "https://www.promptingguide.ai/prompts/adversarial-prompting/prompt-injection"
    },
    {
      "type": "article",
      "title": "What is a Prompt Injection Attack?",
      "url": "https://www.wiz.io/academy/prompt-injection-attack"
    },
    {
      "type": "article",
      "title": "Prompt Injection vs. Jailbreaking: What's the Difference?",
      "url": "https://learnprompting.org/blog/injection_jailbreaking"
    },
    {
      "type": "article",
      "title": "Prompt Injection vs Prompt Jailbreak",
      "url": "https://codoid.com/ai/prompt-injection-vs-prompt-jailbreak-a-detailed-comparison/"
    },
    {
      "type": "article",
      "title": "How Prompt Attacks Exploit GenAI and How to Fight Back",
      "url": "https://unit42.paloaltonetworks.com/new-frontier-of-genai-threats-a-comprehensive-guide-to-prompt-attacks/"
    },
    {
      "type": "official",
      "title": "Mitigate jailbreaks and prompt injections - Anthropic",
      "url": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks"
    },
    {
      "type": "official",
      "title": "LLM01:2025 Prompt Injection - OWASP",
      "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"
    },
    {
      "type": "video",
      "title": "What Is a Prompt Injection Attack?",
      "url": "https://www.youtube.com/watch?v=jrHRe9lSqqA"
    }
  ]
}
---

**Prompt injection** happens when attacker-controlled text hijacks your application's instructions. Because LLMs process instructions and data in the same token stream, a user message — or a poisoned web page, email, or PDF your app retrieves — can say "ignore previous instructions" and often be obeyed. Distinguish two related terms: **injection** targets *your application* by smuggling instructions into its inputs, while a **jailbreak** targets *the model's own safety training* to make it produce content it would normally refuse. **Indirect injection**, where the payload hides in content the model reads rather than in the user's message, is the more dangerous variant for agentic apps.

This is ranked LLM01 in the **OWASP Top 10 for LLM Applications** for good reason: it is the root exploit behind data exfiltration, unauthorized tool calls, and system prompt leaks. If your assistant can read a customer's documents and also send emails, one malicious sentence buried in a document can quietly forward those documents to an attacker. No amount of polite system prompting fully prevents this — you must assume injection will sometimes succeed and limit the blast radius.

In practice you'll layer defenses: separate trusted instructions from untrusted content using structure like XML tags or dedicated message roles, filter and flag suspicious inputs, constrain tool permissions so a hijacked model can't do real damage, and require human confirmation for irreversible actions. You'll validate these defenses with the adversarial testing and red teaming techniques covered later in this module.
