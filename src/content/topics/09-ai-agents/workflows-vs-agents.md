---
{
  "title": "Workflows vs agents",
  "module": "ai-agents",
  "order": 1,
  "sources": [],
  "resources": [
    {
      "type": "article",
      "title": "Building Effective Agents",
      "url": "https://www.anthropic.com/research/building-effective-agents"
    },
    {
      "type": "article",
      "title": "A practical guide to building agents (OpenAI)",
      "url": "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"
    }
  ]
}
---

Anthropic's "Building Effective Agents" draws the line that this whole module rests on. In a **workflow**, *your code* decides the control flow: LLM calls are wired into a predefined path — classify the ticket, then draft a reply, then check tone — where every step, branch, and loop is written by you. In an **agent**, *the model* decides: it picks which tool to call next, reads the result, and chooses again, looping until it judges the task done. Common workflow patterns include **prompt chaining** (output of one call feeds the next), **routing** (a classifier dispatches to specialized prompts), **parallelization** (fan out, then aggregate), and **orchestrator–workers**, where an LLM breaks a task into subtasks that your code farms out — a pattern that sits right at the boundary, since the orchestrator plans but your code still owns the loop.

The trade-off is **determinism** against flexibility. A workflow runs the same steps every time: it's predictable, testable step-by-step, cheaper, and when it breaks you know exactly where. An agent inherits the model's **non-determinism** in the loop itself — the same request can take different paths on different runs — which is precisely what lets it handle tasks you couldn't enumerate in advance, and precisely what makes it harder to test, cost-cap, and debug. That flexibility is a cost you pay, not a feature you show off, so the guidance from both Anthropic and OpenAI is blunt: use the simplest structure that works, and reach for an agent only when the path through the task genuinely can't be predicted.

In practice, interrogate the task: if you can draw the flowchart, build the workflow — support triage, document pipelines, and report generation almost never need an agent. Reserve agent loops for open-ended work like debugging code or multi-step research, where the next step depends on what the last one revealed. And hybridize freely: a deterministic workflow whose single messy step ("investigate the failure") is delegated to a small bounded agent gets you flexibility exactly where it pays, with determinism everywhere else. The rest of this module teaches the agent loop itself; knowing when *not* to use it is the first skill.
