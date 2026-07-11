---
{
  "title": "Contextual Prompting",
  "module": "prompting-fundamentals",
  "order": 11,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Prompting Best Practices - Anthropic",
      "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
    },
    {
      "type": "article",
      "title": "Prompt Structure and Key Parts - LearnPrompting",
      "url": "https://learnprompting.org/docs/basics/prompt_structure"
    }
  ]
}
---

**Contextual prompting** is the third layer of the standard prompt architecture: alongside the system prompt (the rules) and the role (the persona), it supplies the *situation* — the task-specific, often per-request information the model needs right now. The system prompt for a travel assistant rarely changes; the contextual layer changes every call: this user's destination, dates, budget, and the conversation so far.

The distinction matters architecturally. Earlier in this module you learned the craft rule "provide additional context"; contextual prompting is that rule turned into system design. When you separate stable instructions from dynamic context, you can cache the static system prompt (a real cost saver with modern **prompt caching** APIs), template the dynamic part, and reason clearly about what each request contains. Products that skip this separation end up with monolithic prompts where nobody knows which sentence is a rule and which is stale data.

In practice, you'll design prompts as templates with explicit context slots: a static header, then `<user_profile>`, `<current_page>`, `<retrieved_docs>` sections filled in by your backend at request time. Keep context close to the instruction that uses it, label each block so the model knows what it's looking at, and prune aggressively — passing the entire session history "just in case" degrades focus and burns tokens. Fresh, labeled, minimal context is what makes the same prompt work for every user.
