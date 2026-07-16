---
{
  "title": "Unit Testing for Individual Tools",
  "module": "evaluation-and-observability",
  "order": 2,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Unit Testing Agents",
      "url": "https://docs.patronus.ai/docs/agent_evals/unit_testing"
    },
    {
      "type": "article",
      "title": "Best AI Tools for Unit Testing: A Look at Top 14 AI Tools",
      "url": "https://thetrendchaser.com/best-ai-tools-for-unit-testing/"
    },
    {
      "type": "article",
      "title": "AI for Unit Testing: Revolutionizing Developer Productivity",
      "url": "https://www.diffblue.com/resources/ai-for-unit-testing-revolutionizing-developer-productivity/"
    }
  ]
}
---

An agent is only as reliable as the tools it calls, and tools are the one part of an agent you can test deterministically. **Unit testing individual tools** means verifying each function your agent can invoke — the database query, the API wrapper, the calculator — in isolation, plus testing the model's *tool selection*: given a specific input, does the LLM call the right tool with the right arguments?

This matters because agent failures are hard to debug from the outside. When a multi-step flow produces a wrong answer, the fault could be a flaky tool, a malformed argument, or bad reasoning, and end-to-end tests can't tell you which. Unit tests carve the problem apart: if every tool passes its own suite, a failing flow points straight at orchestration or prompting. They're also cheap — pure tool tests need no LLM calls at all, so they run in milliseconds in CI.

In practice, you'll write two kinds of tests. First, ordinary `pytest` or `vitest` cases for each tool's logic: valid inputs, edge cases, error handling, and the exact **JSON schema** of its output, with external services mocked. Second, tool-invocation tests: feed the model a prompt that should trigger `search_orders`, then assert on the returned tool call's name and arguments rather than any generated prose. Because argument choice is model behavior, run those cases multiple times and track **pass rate** as a metric. Keep both suites in CI so a prompt or schema change that breaks tool calling fails the build immediately.
