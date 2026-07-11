---
{
  "title": "Stopping Criteria",
  "module": "working-with-apis",
  "order": 14,
  "sources": [
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Defining Stopping Criteria in Large Language Models",
      "url": "https://www.metriccoders.com/post/defining-stopping-criteria-in-large-language-models-a-practical-guide"
    },
    {
      "type": "article",
      "title": "Stopping Criteria for Decision Tree Algorithm and Tree Plots",
      "url": "https://aieagle.in/stopping-criteria-for-decision-tree-algorithm-and-tree-plots/"
    },
    {
      "type": "official",
      "title": "Handling Stop Reasons - Anthropic",
      "url": "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons"
    },
    {
      "type": "article",
      "title": "Stop Sequence - LLM Parameter Guide - Vellum",
      "url": "https://www.vellum.ai/llm-parameters/stop-sequence"
    }
  ]
}
---

**Stopping criteria** determine when a model ends its response — and unlike `max_tokens`, which cuts generation off mid-thought, these are the *graceful* endings. There are three main ones: the model emits its natural end-of-turn token, it produces one of your custom **stop sequences** — strings you supply that immediately halt generation — or, in agentic use, it stops to call a tool. Every response reports which happened via a **finish reason** field: `finish_reason` on OpenAI, `stop_reason` on Anthropic.

This matters because "why did the model stop?" is a question your code must answer on every single response. A `stop`/`end_turn` means a complete answer; `length`/`max_tokens` means truncation you should retry or surface; `tool_use` means the model is waiting for you to execute something and respond. Treating all of these the same is how apps ship half-finished answers to users. Stop sequences also save money: halting the moment you have what you need means not paying for tokens you'd throw away.

In practice, you'll pass custom stops via the `stop` parameter (OpenAI) or `stop_sequences` (Anthropic) — for example, stop at `"\n\n"` to take only the first paragraph, at `"]"` to end a JSON array, or at `"User:"` to keep a model from writing both sides of a dialogue. Note the stop sequence itself is usually excluded from the returned text, so append it back if your parser needs it. Then write an explicit `switch` on the finish reason — it's the response's status code.
