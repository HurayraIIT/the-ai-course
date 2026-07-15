---
{
  "title": "Context Isolation",
  "module": "advanced-prompting",
  "order": 8,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "4 context engineering strategies every AI engineer needs to know",
      "url": "https://newsletter.owainlewis.com/p/4-context-engineering-strategies"
    }
  ]
}
---

**Context isolation** splits work across separate context windows instead of piling everything into one. Rather than letting a single agent's transcript absorb every search result, file dump, and dead end, you hand self-contained subtasks to **subagents** — each with its own fresh window — and only their conclusions return to the main thread. Where compaction shrinks one context, isolation prevents the pollution in the first place by giving messy work somewhere else to happen.

The payoff is quality and scale. A model reasons best over a window that contains only what's relevant to the current decision; an orchestrator that has read fifty raw search results reasons worse about *all* of them than one that received three clean summaries. Isolation keeps the main agent's context high-signal, lets subtasks run in parallel, and contains failures — a subagent that goes down a rabbit hole burns its own window, not the mission's. This is the architecture behind orchestrator-worker and multi-agent research systems, and it's also a security boundary: untrusted content can be processed in a window that holds no secrets.

In practice, you'll implement it as a **fan-out/fan-in** pattern: the orchestrator writes a focused brief for each subtask (goal, needed inputs, expected output format), spawns each as an independent API call or framework subagent with only the tools it needs, and merges the structured results. The craft is in the brief — a subagent knows nothing you don't tell it — and in insisting that workers return conclusions, not transcripts.
