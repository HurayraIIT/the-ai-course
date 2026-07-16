---
{
  "title": "Pricing of Common Models",
  "module": "model-landscape",
  "order": 23,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Pricing",
      "url": "https://openai.com/api/pricing/"
    },
    {
      "type": "article",
      "title": "Executive Guide To AI Agent Pricing",
      "url": "https://www.forbes.com/councils/forbesbusinesscouncil/2025/01/28/executive-guide-to-ai-agent-pricing-winning-strategies-and-models-to-drive-growth/"
    },
    {
      "type": "article",
      "title": "AI Pricing: How Much Does Artificial Intelligence Cost In 2025?",
      "url": "https://www.internetsearchinc.com/ai-pricing-how-much-does-artificial-intelligence-cost/"
    }
  ]
}
---

Every hosted model has a price sheet, and they all follow the same shape: a rate for **input tokens** (what you send) and a higher rate for **output tokens** (what the model generates), usually quoted per million tokens. Within each provider's lineup you'll find the same tiering — a **frontier model** that costs the most, a mid-tier workhorse at a fraction of that, and a small, fast model that's cheaper still, often by one or two orders of magnitude.

This matters because model choice is usually your biggest cost lever — far bigger than trimming a prompt. The spread between a provider's smallest and largest model can be 20x or more, and the quality gap on routine tasks (classification, extraction, simple summarization) is often negligible. An agent that makes dozens of model calls per user action multiplies whatever rate you picked, so a casual "just use the best model" default can turn a $50/month feature into a $5,000/month one. Output tokens typically cost several times more than input, which is why verbose responses hurt twice.

In practice, you'll keep provider pricing pages bookmarked and treat them as living documents — rates shift as new models ship. Estimate cost per request as `(input_tokens × input_rate) + (output_tokens × output_rate)`, log the `usage` object every API returns, and route traffic by task difficulty: cheap models for high-volume simple calls, frontier models only where quality visibly pays for itself. Discounts like **batch processing** and **prompt caching** can cut the bill further.
