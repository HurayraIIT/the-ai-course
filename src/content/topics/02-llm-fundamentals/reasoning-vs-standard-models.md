---
{
  "title": "Reasoning vs Standard Models",
  "module": "llm-fundamentals",
  "order": 11,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Extended thinking — Claude Docs",
      "url": "https://platform.claude.com/docs/en/build-with-claude/extended-thinking"
    },
    {
      "type": "official",
      "title": "Reasoning models — OpenAI",
      "url": "https://developers.openai.com/api/docs/guides/reasoning"
    },
    {
      "type": "article",
      "title": "Understanding DeepSeek R1",
      "url": "https://kili-technology.com/blog/understanding-deepseek-r1"
    }
  ]
}
---

A **standard model** answers immediately: your prompt goes in, the response streams out. A **reasoning model** (also called a *thinking* model) first spends tokens working through the problem — planning, checking intermediate steps, backtracking — before committing to an answer. This "thinking" is essentially **chain-of-thought** reasoning trained into the model and scaled up at inference time. OpenAI's o-series and GPT-5's thinking modes, Claude's **extended thinking**, Gemini's thinking variants, and DeepSeek-R1 all follow this pattern; by 2026 most frontier models are hybrids where you dial the reasoning effort up or down per request.

The tradeoff is the point: reasoning dramatically improves results on math, complex code, multi-step planning, and agentic tasks, but you pay for it in latency and thinking-token costs. Using a reasoning model to reformat JSON burns money and time for nothing; using a standard fast model to architect a migration plan gets you shallow answers. Model routing — matching each task to the cheapest model that does it well — is one of the highest-leverage cost decisions you'll make.

In practice this is an API parameter as much as a model choice: you'll set a reasoning-effort or thinking-budget option (for example, Anthropic's `thinking` parameter with a token budget), decide whether to surface or hide the thinking trace in your UI, and account for thinking tokens in billing. A useful default: fast model first, escalate to reasoning when evals show the task demands it.
