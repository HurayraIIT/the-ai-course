---
{
  "title": "Multi-agents",
  "module": "ai-agents",
  "order": 17,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is a multi-agent system?",
      "url": "https://www.ibm.com/think/topics/multiagent-system"
    },
    {
      "type": "article",
      "title": "Multi-Agent Systems",
      "url": "https://huggingface.co/learn/agents-course/en/unit2/smolagents/multi_agent_systems"
    },
    {
      "type": "article",
      "title": "Guide to multi-agent systems (MAS)",
      "url": "https://cloud.google.com/discover/what-is-a-multi-agent-system"
    },
    {
      "type": "article",
      "title": "Agentic AI 103: Building Multi-Agent Teams",
      "url": "https://towardsdatascience.com/agentic-ai-103-building-multi-agent-teams/"
    },
    {
      "type": "article",
      "title": "What is multi-agent collaboration?",
      "url": "https://www.ibm.com/think/topics/multi-agent-collaboration"
    },
    {
      "type": "video",
      "title": "Multi Agent Systems Explained: How AI Agents & LLMs Work Together",
      "url": "https://www.youtube.com/watch?v=sWH0T4Zez6I"
    }
  ]
}
---

A **multi-agent system** splits work across several LLM-driven agents instead of loading everything onto one. Each agent gets its own role, prompt, tools, and context window — a researcher that searches, a writer that drafts, a reviewer that critiques — and they coordinate by passing messages or handing off tasks. Common topologies include the **supervisor** (one orchestrator routes work to specialists), peer **handoffs** (agents transfer control directly), and parallel fan-out where subagents work independently and report back.

The honest reason to go multi-agent isn't that it's fancier — it's **context isolation** and focus. One agent with twenty tools and a sprawling prompt gets confused; three agents with focused prompts and five tools each stay sharp. Subagents can burn thousands of tokens exploring a problem and return only a summary, keeping the main context clean. Specialization also means you can give each agent a different model — a cheap one for triage, a strong one for synthesis. The cost is real: more latency, more tokens, and coordination failure modes where agents duplicate work or lose shared state. Start with one agent; split when a single context demonstrably can't hold the job.

In practice you'll use a framework's primitives — LangGraph supervisor graphs, CrewAI crews, OpenAI Agents SDK handoffs, or Claude's subagents — or roll your own by exposing an agent as a tool: `delegate_to_researcher(task)` is just a function call that runs another loop and returns its final answer.
