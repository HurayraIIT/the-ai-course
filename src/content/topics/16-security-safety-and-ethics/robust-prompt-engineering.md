---
{
  "title": "Robust prompt engineering",
  "module": "security-safety-and-ethics",
  "order": 3,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Building Robust Prompt Engineering Capability",
      "url": "https://aimresearch.co/product/building-robust-prompt-engineering-capability"
    },
    {
      "type": "article",
      "title": "Effective Prompt Engineering: A Comprehensive Guide",
      "url": "https://medium.com/@nmurugs/effective-prompt-engineering-a-comprehensive-guide-803160c571ed"
    }
  ]
}
---

**Robust prompt engineering** is the practice of writing prompts that hold up under hostile, malformed, or simply weird input — not just the happy path you tested in a playground. Where basic prompt engineering optimizes for output quality, robust prompt engineering optimizes for *consistency under pressure*: the prompt behaves the same whether the input is a polite question, a 10,000-character paste, an emoji flood, or a deliberate attempt to derail it.

This is your first and cheapest layer of defense against the injection attacks covered in the previous topic. A fragile prompt leaks its instructions when asked, changes persona when a user role-plays, and treats retrieved documents as commands. A robust prompt won't stop a determined attacker on its own, but it dramatically raises the cost of casual exploitation and reduces embarrassing everyday failures — hallucinated policies, broken output formats, off-topic rambling — that erode user trust just as badly as a breach.

Concretely, you'll learn to put durable rules in the **system prompt** rather than the user turn, wrap untrusted content in **delimiters** like `<user_input>` tags and tell the model to treat it as data, restate critical constraints near the end of long contexts, and define explicit refusal behavior for out-of-scope requests. You'll constrain outputs with schemas or **structured outputs** so downstream code never parses free text, and you'll treat prompts like code: version them, write regression evals for known failure cases, and rerun the suite on every change and every model upgrade.
