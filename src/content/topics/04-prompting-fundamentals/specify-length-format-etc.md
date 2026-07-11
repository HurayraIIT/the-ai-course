---
{
  "title": "Specify Length, format etc",
  "module": "prompting-fundamentals",
  "order": 6,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Mastering Prompt Engineering: Format, Length, and Audience",
      "url": "https://techlasi.com/savvy/mastering-prompt-engineering-format-length-and-audience-examples-for-2024/"
    },
    {
      "type": "article",
      "title": "Ultimate Guide to Prompt Engineering",
      "url": "https://promptdrive.ai/prompt-engineering/"
    }
  ]
}
---

Left to its own defaults, an LLM decides for itself how long to ramble, whether to add a cheerful preamble, and whether your list comes back as prose, bullets, or a table. Specifying **length**, **format**, and **audience** in the prompt takes those decisions back: "Respond in exactly 3 bullet points, max 15 words each, no introduction" produces a very different — and far more usable — output than "keep it brief."

In an application, unspecified format is a bug factory. If your UI expects a one-line summary and the model returns four paragraphs, the layout breaks; if your parser expects a Markdown table and gets prose, the feature fails silently. Length also maps directly to **latency and cost**: output tokens are the expensive, slow part of every API call, so an unbounded response is money and milliseconds you didn't budget for. Pinning down the shape of the output is as much an engineering requirement as a stylistic one.

You'll bake these constraints into every production prompt: counts (`3 bullets`, `under 100 words`), structure (`a Markdown table with columns Name, Risk, Fix`), audience (`explain for a junior developer`), and negative rules (`no preamble, no closing summary`). Concrete, countable terms beat adjectives every time — "brief" is a suggestion, "under 50 words" is a spec. When the format must be machine-parseable rather than human-readable, you'll graduate to the structured output techniques covered later in this module.
