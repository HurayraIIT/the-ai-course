---
{
  "title": "Use Examples in your Prompt",
  "module": "prompting-fundamentals",
  "order": 5,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "10 Real-World AI Agent Examples in 2025",
      "url": "https://www.chatbase.co/blog/ai-agent-examples"
    },
    {
      "type": "article",
      "title": "GPT-4.1 Prompting Guide",
      "url": "https://cookbook.openai.com/examples/gpt4-1_prompting_guide"
    },
    {
      "type": "article",
      "title": "AI Agent Examples & Use Cases: Real Applications in 2025",
      "url": "https://eastgate-software.com/ai-agent-examples-use-cases-real-applications-in-2025/"
    }
  ]
}
---

Sometimes the fastest way to explain what you want is to stop describing it and just **show it**. Including examples in your prompt — a sample input paired with the output you'd want back — communicates format, tone, level of detail, and edge-case handling far more precisely than paragraphs of instructions. It's the prompting equivalent of handing a contractor a photo instead of describing a kitchen.

For developers, examples are the cheapest reliability upgrade available. Instructions get interpreted; examples get imitated. When you need output that follows a house style, a quirky data format, or a subtle judgment call ("this counts as spam, that doesn't"), a description alone leaves room for drift, while two or three well-chosen demonstrations lock the behavior in. Examples are also self-documenting: anyone reading your prompt later sees exactly what "good" looks like.

In practice, you'll embed input/output pairs directly in the prompt, clearly delimited: `Input: "pymnt failed 2x, plz help" → Output: {"category": "billing", "sentiment": "frustrated"}`. Pick examples that cover the tricky cases, not just the easy ones — include one where the right answer is "reject" or "unknown" — and keep them consistent, because the model will copy your formatting down to the punctuation. This habit is the intuition behind the formal **few-shot prompting** technique you'll meet later in this module; here, the point is simpler: when words are ambiguous, demonstrate.
