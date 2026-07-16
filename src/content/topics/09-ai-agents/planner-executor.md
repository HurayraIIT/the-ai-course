---
{
  "title": "Planner Executor",
  "module": "ai-agents",
  "order": 16,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Plan-and-Execute Agents",
      "url": "https://blog.langchain.dev/planning-agents/"
    },
    {
      "type": "article",
      "title": "Plan and Execute: AI Agents Architecture",
      "url": "https://medium.com/@shubham.ksingh.cer14/plan-and-execute-ai-agents-architecture-f6c60b5b9598"
    }
  ]
}
---

The **planner-executor** pattern (often called **plan-and-execute**) splits an agent into two roles: a planner that reads the goal and produces an explicit multi-step plan up front, and an executor that works through the steps one at a time, usually with tools. Contrast this with ReAct, where the model decides its next action only after seeing the last observation — here the thinking happens first, the doing second, and often a **replanning** step reviews progress and revises the remaining plan when reality diverges.

You reach for this pattern when tasks are long and decomposable. Planning up front keeps the agent oriented on multi-step work where a purely reactive loop drifts or forgets the goal, and the plan itself is a huge practical win: you can show it to a user for approval before anything runs, estimate cost, and log exactly which step failed. It's also economical — a strong model can write the plan while a cheaper, faster model executes each step. The classic weakness is rigidity when step three's outcome invalidates steps four through six, which is exactly what the replan loop exists to fix.

In practice you'll prompt the planner to emit a structured plan — a JSON array of steps with descriptions and expected outputs — then iterate: feed each step plus prior results to the executor, collect the outcome, and periodically ask the planner "given progress so far, revise the plan or finish." LangGraph's plan-and-execute template is the canonical reference implementation.
