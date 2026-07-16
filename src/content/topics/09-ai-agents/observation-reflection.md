---
{
  "title": "Observation & Reflection",
  "module": "ai-agents",
  "order": 13,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Best Practices for Prompting and Self-checking",
      "url": "https://platform.openai.com/docs/guides/prompt-engineering"
    },
    {
      "type": "article",
      "title": "Self-Reflective AI: Building Agents That Learn by Observing Themselves",
      "url": "https://arxiv.org/abs/2302.14045"
    }
  ]
}
---

**Observation** closes the agent loop: after a tool runs, its result — query rows, an API response, a stack trace — is appended to the conversation as new evidence, and the agent interprets it before deciding what's next. **Reflection** goes a step further: the agent critiques its own progress, asking whether the result actually advances the goal, whether an approach is failing, and whether its draft answer holds up before it commits.

This stage is what separates an agent from a script. A script executes step three regardless of what step two returned; an agent notices the API returned an empty list and changes course. Reflection is also your main lever against compounding errors — in a ten-step task, a small unexamined mistake at step two poisons everything after it. Techniques like Reflexion demonstrated that agents which critique failed attempts and retry with that self-feedback in context solve markedly more tasks, at the price of extra model calls.

In practice, observation is largely plumbing done well: format tool results so the model can parse them, truncate or summarize huge outputs before they flood the **context window**, and return failures as structured error messages — `{"error": "timeout", "retry_ok": true}` — instead of crashing the loop. Reflection you add deliberately where stakes justify the cost: a self-check prompt before finalizing ("verify the answer addresses the original question"), a **critic** pass reviewing drafts, or verification tools like running tests on generated code.
