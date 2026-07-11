---
{
  "title": "Integration Testing for Flows",
  "module": "evaluation-and-observability",
  "order": 2,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Integration Testing for AI-based Features with Humans",
      "url": "https://www.microsoft.com/en-us/research/publication/hint-integration-testing-for-ai-based-features-with-humans-in-the-loop/"
    },
    {
      "type": "article",
      "title": "Integration Testing and Unit Testing in AI",
      "url": "https://www.aviator.co/blog/integration-testing-and-unit-testing-in-the-age-of-ai/"
    },
    {
      "type": "article",
      "title": "Integration Testing",
      "url": "https://www.guru99.com/integration-testing.html"
    }
  ]
}
---

Unit tests prove each tool works alone; **integration testing** proves the whole agent flow works together. Here you run a realistic task end to end — user message in, model reasoning, tool calls, final answer out — and assert on the outcome and the trajectory. Instead of checking one function's return value, you're checking that the pieces compose: the router picks the right sub-agent, tool outputs feed correctly into the next prompt, and the conversation ends in a valid state.

This matters because most agent bugs live *between* components. Every tool can pass its unit tests while the flow still loops forever, calls tools in the wrong order, or loses context mid-conversation. LLM systems are also non-deterministic, so a flow that worked yesterday can regress after a model update or prompt edit with no code change at all. Integration tests are your safety net for exactly those failures — the ones users actually see.

In practice, you'll build a suite of scenario tests: a fixed set of realistic tasks with clear success criteria. For each, assert on **final outcome** (did the refund get issued, does the answer contain the right facts) and on **trajectory** (which tools were called, in what order, within a step budget). Mock external side effects so runs are repeatable, allow multiple valid paths, and score with a mix of hard assertions and **LLM-as-judge** grading. Run the suite in CI against recorded fixtures, and track pass rate over time rather than demanding 100% on every run.
