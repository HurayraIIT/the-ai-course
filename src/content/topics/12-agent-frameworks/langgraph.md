---
{
  "title": "LangGraph",
  "module": "agent-frameworks",
  "order": 4,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "LangGraph Docs",
      "url": "https://docs.langchain.com/oss/python/langgraph/overview?_gl=1*wnuiny*_gcl_au*MTI0NjQ3NzM5NS4xNzczMDQ5NDY2*_ga*MTgwMzY5ODQ5OS4xNzczMDQ5NDY2*_ga_47WX3HKKY2*czE3NzMwNDk0NjYkbzEkZzAkdDE3NzMwNDk0NjYkajYwJGwwJGgw"
    },
    {
      "type": "opensource",
      "title": "langgraph",
      "url": "https://github.com/langchain-ai/langgraph"
    },
    {
      "type": "article",
      "title": "LangGraph 101: Let’s Build A Deep Research Agent",
      "url": "https://towardsdatascience.com/langgraph-101-lets-build-a-deep-research-agent/"
    },
    {
      "type": "video",
      "title": "LangChain vs LangGraph: A Tale of Two Frameworks",
      "url": "https://www.youtube.com/watch?v=qAF1NjEVHhY&pp=ygUWbGFuZ2dyYXBoIHZzIGxhbmdjaGFpbg%3D%3D"
    }
  ]
}
---

LangGraph is LangChain's answer to the question chains can't handle: what happens when your workflow needs to loop, branch, pause, or recover? Instead of a linear pipeline, you model your agent as a **state graph** — nodes are functions that read and update a shared state object, edges (including conditional edges) decide where control flows next. Cycles are first-class, which is exactly what an agentic loop is.

This graph-first design is why LangGraph has become the default choice for production agents in the LangChain ecosystem and beyond. Explicit state gives you things ad-hoc loops don't: **checkpointing** (persist state mid-run and resume later), **human-in-the-loop** interrupts (pause before a risky tool call and wait for approval), time-travel debugging, and clean multi-agent topologies like supervisor and swarm patterns. Compared to CrewAI's role-based crews or AutoGen's conversation-driven flow, LangGraph is lower-level and more verbose — but you can see and control every transition, which matters when reliability is the requirement.

You'll `pip install langgraph`, define a state schema (a `TypedDict` or Pydantic model), add nodes with `graph.add_node()`, wire them with `add_edge` and `add_conditional_edges`, then `compile()` into a runnable app. For the common case there's `create_react_agent`, which gives you a tool-calling agent in one line. Attach a checkpointer for memory across turns, and stream events to watch the graph execute node by node.
