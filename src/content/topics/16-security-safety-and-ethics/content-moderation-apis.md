---
{
  "title": "Content Moderation APIs",
  "module": "security-safety-and-ethics",
  "order": 8,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Moderation API",
      "url": "https://platform.openai.com/docs/guides/moderation"
    },
    {
      "type": "article",
      "title": "How to use the moderation API",
      "url": "https://cookbook.openai.com/examples/how_to_use_moderation"
    },
    {
      "type": "article",
      "title": "Content moderation: What it is, how it works, and the best APIs",
      "url": "https://www.assemblyai.com/blog/content-moderation-what-it-is-how-it-works-best-apis-2"
    }
  ]
}
---

**Content moderation APIs** are purpose-built classifiers that score text (and increasingly images) against harm categories — hate, harassment, violence, sexual content, self-harm — and return per-category flags and confidence scores. OpenAI's **Moderation API** is free to use and the most common starting point; alternatives include Google's Perspective API, Azure AI Content Safety, and open-weight safety classifiers like Llama Guard that you can self-host. They exist because a small, fast, specialized model is a cheaper and more consistent screen than asking your main LLM to police itself.

For a developer, moderation is a two-sided obligation. Screening *inputs* keeps abusive users from weaponizing your product and gives you documented grounds for enforcement; screening *outputs* catches the rarer but more damaging case where your own application generates something harmful under your brand. Provider terms of service generally require reasonable abuse prevention, so skipping moderation risks your API access — and pairing flags with the **end-user IDs** from the previous topic turns anonymous violations into accountable ones.

You'll implement moderation as a pipeline stage: call the endpoint on user input before the main model, check category scores against thresholds you tune per category — a mental-health app and a gaming chat need very different sensitivity — and block, soften, or route to human review accordingly. For streaming output, moderate in chunks or run a final check before delivery. Log every flag with the user ID, monitor false-positive rates so you don't silently frustrate legitimate users, and revisit thresholds as your real traffic teaches you where the lines belong.
