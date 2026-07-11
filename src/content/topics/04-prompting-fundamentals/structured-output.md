---
{
  "title": "Structured Output",
  "module": "prompting-fundamentals",
  "order": 15,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Structured Output",
      "url": "https://abdullin.com/structured-output/"
    },
    {
      "type": "article",
      "title": "Generating Structured Outputs from LLMs",
      "url": "https://towardsdatascience.com/generating-structured-outputs-from-llms/"
    },
    {
      "type": "article",
      "title": "How do Structured Outputs Work?",
      "url": "https://docs.cohere.com/docs/structured-outputs"
    },
    {
      "type": "official",
      "title": "Structured Output - Google Gemini API",
      "url": "https://ai.google.dev/gemini-api/docs/structured-output"
    },
    {
      "type": "official",
      "title": "Structured Outputs - Anthropic",
      "url": "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
    },
    {
      "type": "opensource",
      "title": "Instructor - Structured Output Library",
      "url": "https://github.com/jxnl/instructor"
    },
    {
      "type": "article",
      "title": "Structured Outputs - LLM Parameter Guide - Vellum",
      "url": "https://www.vellum.ai/llm-parameters/structured-outputs"
    }
  ]
}
---

**Structured output** means getting the model to respond in a machine-parseable format — almost always **JSON** matching a schema you define — instead of free-form prose. Rather than asking for "the name, email, and sentiment" and hoping, you specify the exact fields, types, and allowed values, and the model fills them in. Modern APIs support this natively: you attach a **JSON Schema** to the request and the provider constrains generation so the output is guaranteed to validate.

This is the bridge between LLMs and the rest of your software. Prose is for humans; your code needs objects it can destructure, store, and branch on. Without enforcement you inherit a family of classic failures — JSON wrapped in markdown fences, trailing commas, invented fields, a friendly sentence before the opening brace — each one a runtime exception in a pipeline that worked fine in testing. Schema-enforced output turns "parse and pray" into a typed contract.

In practice, you'll define the schema once and pass it through the API: `response_format` with a JSON schema on OpenAI, `output_format` (or a tool definition) on Anthropic, `responseSchema` on Gemini. Libraries like **Instructor**, **Pydantic**, and **Zod** let you declare the shape as a native class or type and get validated, typed objects back. Keep schemas flat and field names self-describing — the schema itself is a prompt, and the model fills clear fields far more accurately than clever ones.
