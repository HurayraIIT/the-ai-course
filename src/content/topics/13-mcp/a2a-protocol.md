---
{
  "title": "A2A protocol",
  "module": "mcp",
  "order": 12,
  "sources": ["new"],
  "resources": [
    {
      "type": "article",
      "title": "A2A: A new era of agent interoperability",
      "url": "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/"
    },
    {
      "type": "article",
      "title": "A2A Protocol specification",
      "url": "https://a2a-protocol.org/"
    }
  ]
}
---

The **A2A protocol** (Agent2Agent), announced by Google in 2025 and now governed under the Linux Foundation, standardizes how *agents talk to other agents* — the peer-to-peer complement to MCP's agent-to-tools connection. Where MCP plugs one agent into data sources and tools it controls, A2A lets two independently built agents — different vendors, different frameworks, different companies — discover each other and collaborate. Each agent publishes an **agent card**, a JSON document (served at a well-known URL) advertising its identity, skills, endpoint, and auth requirements. A client agent reads the card, then sends work as a **task** — a long-lived unit with a lifecycle (submitted, working, input-required, completed) — over JSON-RPC via HTTP, with streaming updates for long-running jobs. Like MCP, it deliberately reuses boring, proven web plumbing.

The gap it fills is real: everything you've built so far in this course assumes one party controls all the pieces. The **multi-agent systems** from the agents module — supervisors, **handoffs**, subagents — are in-process patterns inside one codebase. But an *opaque* remote agent is neither a tool you can schema-describe (its behavior is open-ended, it may take hours, it may come back with clarifying questions) nor a teammate you can import. A2A models exactly that shape: your procurement agent handing a task to a supplier's quoting agent, waiting on status updates, and answering follow-up questions mid-task, with neither side revealing its internals.

In practice, keep the layering rule of thumb: **MCP for capabilities, A2A for colleagues** — an agent typically speaks MCP downward to its tools and A2A outward to its peers, and an A2A task's `input-required` state is the protocol-level version of the approval gates you met earlier. Adoption is early; unless you're integrating agents across organizational boundaries today, file A2A as a direction to watch rather than a dependency to take — but expect the agent card / task lifecycle vocabulary in job descriptions and architecture reviews, because cross-vendor agent interop is where the multi-agent story is clearly heading.
