---
{
  "title": "Output Control",
  "module": "prompting-fundamentals",
  "order": 13,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Increase Output Consistency - Anthropic",
      "url": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency"
    },
    {
      "type": "article",
      "title": "General Tips for Designing Prompts - DAIR.AI",
      "url": "https://www.promptingguide.ai/introduction/tips"
    }
  ]
}
---

**Output control** is the practice of telling the model exactly what shape its answer should take — format, length, tone, and structure — instead of accepting whatever it defaults to. Left alone, an LLM will happily open with "Certainly! Here's...", pad answers with caveats, and vary its formatting from run to run. Output control closes that gap with explicit instructions: "Respond with only the summary, no preamble," "Use exactly three bullet points," "Write in the second person."

This matters because inconsistent output is where LLM features quietly break. If your UI expects a two-sentence summary and gets four paragraphs, the layout suffers; if a downstream step expects a bare label and gets "The category is: Sports!", your parser fails. **Consistency** across thousands of requests — same shape every time — is what separates a demo from a production feature, and most of it is won or lost in the prompt itself.

In practice, you'll combine a few reliable patterns: state the format explicitly and show a small example of it, tell the model what *not* to include ("no explanations, no markdown"), and use **prefilling** — seeding the start of the assistant's response — to force it onto the right track. Pair prompt-level control with API-level knobs like `max_tokens` and stop sequences. The next topics sharpen specific pieces: hard **constraints**, and fully machine-parseable **structured output**.
