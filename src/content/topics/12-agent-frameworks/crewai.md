---
{
  "title": "CrewAI",
  "module": "agent-frameworks",
  "order": 6,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "CrewAI",
      "url": "https://crewai.com/"
    },
    {
      "type": "official",
      "title": "CrewAI Documentation",
      "url": "https://docs.crewai.com/"
    },
    {
      "type": "article",
      "title": "Getting Started with CrewAI: Building AI Agents That Work Together",
      "url": "https://medium.com/@cammilo/getting-started-with-crewai-building-ai-agents-that-work-together-9c1f47f185ca"
    },
    {
      "type": "video",
      "title": "Crew AI Full Tutorial For Beginners",
      "url": "https://www.youtube.com/watch?v=q6QLGS306d0"
    }
  ]
}
---

CrewAI organizes multi-agent systems around a workplace metaphor: you define **agents** with a `role`, `goal`, and `backstory`, give them **tasks** with expected outputs, and assemble them into a **crew** that works through the tasks sequentially or under a manager agent. It's a standalone Python framework — notably independent of LangChain — designed to make collaborative agent teams feel declarative.

CrewAI's spot in the landscape is approachability for multi-agent work. Where LangGraph asks you to design a state machine and AutoGen asks you to choreograph conversations, CrewAI asks you to describe a team — which makes it the fastest route from idea to a working researcher-plus-writer or analyst-plus-reviewer pipeline, and a favorite for automating business workflows. The trade-off is that the crew abstraction is opinionated: fine-grained control over each step is harder than in a graph framework. CrewAI's answer is **Flows**, its event-driven layer for precise, conditional orchestration, letting you mix free-form crews into deterministic pipelines when production demands it.

You'll `pip install crewai` and scaffold a project with `crewai create crew myproject`, which generates `agents.yaml` and `tasks.yaml` alongside Python glue. Define two or three agents, attach tools (built-in web search, file, and scraping tools, or your own via a `@tool` decorator), list tasks with `expected_output`, then call `crew.kickoff()` and watch the agents delegate and hand off results. Start sequential; reach for hierarchical mode and Flows once the simple version works.
