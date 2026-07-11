---
{
  "title": "Role & Behavior",
  "module": "prompting-fundamentals",
  "order": 10,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Beyond Basics: Contextual & Role Prompting That Actually Works",
      "url": "https://medium.com/@the_manoj_desai/beyond-basics-contextual-role-prompting-that-actually-works-bd75a0c5086b"
    }
  ]
}
---

A role tells the model *who* it is; **behavior rules** tell it *how to act* — and the second half is what most role prompts leave out. "You are a customer support agent" sets a persona, but it says nothing about whether the agent apologizes twice per message, invents refund policies, or lectures the customer. Defining role and behavior together means pairing the identity with explicit operating rules: tone, verbosity, what to always do, what to never do, and how to respond when a request falls outside its lane.

This is where AI products earn user trust. Two apps can use the same model and the same persona, yet one feels crisp and reliable while the other feels erratic — the difference is a **behavioral contract**. Without one, behavior drifts across conversations and model updates; with one, edge cases like off-topic questions, hostile users, or requests beyond the assistant's authority get handled the way you decided, not the way the model improvises.

In practice, you'll extend every role definition with a rules block: `You are a code-review assistant. Always: cite the exact line, suggest a concrete fix, keep comments under 50 words. Never: rewrite whole files, approve code with failing tests, use sarcasm. If asked about anything other than the diff, redirect politely.` Concrete, testable do/don't pairs beat adjectives like "friendly" — and they give your eval suite something to actually check.
