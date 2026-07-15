---
{
  "title": "Reason and Plan",
  "module": "ai-agents",
  "order": 10,
  "sources": [
    "ai-agents"
  ],
  "resources": []
}
---

**Reasoning and planning** is the stage where the agent decides what to do with what it perceived: break the goal into steps, pick the next action, and choose which tool — if any — to use. This is thinking before doing. It can be as light as an implicit choice between answering and calling a tool, or as explicit as the model writing out a numbered plan, and modern **reasoning models** with extended thinking budgets let you dial up deliberation for hard problems.

This stage is where agent quality is won or lost. An agent that acts without planning thrashes — calling the wrong tools, repeating work, wandering away from the goal — and every wasted step costs latency and tokens. Explicit reasoning also buys you observability: when the agent states *why* it's about to search the order database, you can debug a bad run by reading its rationale instead of guessing. Research like ReAct showed that interleaving reasoning traces with actions substantially improves multi-step reliability.

In practice, you elicit planning through prompting and structure. You'll instruct the agent to "think step by step before selecting a tool," request a plan as structured output before execution begins, or use models' native **chain-of-thought** capabilities. For bigger tasks you'll separate planning from doing entirely — the planner-executor architecture later in this module. Keep plans revisable: the reason-act cycle exists precisely because tool results often invalidate step three of a plan written at step one.
