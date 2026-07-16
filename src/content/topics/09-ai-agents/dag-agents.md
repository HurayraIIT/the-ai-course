---
{
  "title": "DAG Agents",
  "module": "ai-agents",
  "order": 17,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Airflow: Directed Acyclic Graphs Documentation",
      "url": "https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html"
    },
    {
      "type": "article",
      "title": "What are DAGs in AI Systems?",
      "url": "https://www.restack.io/p/version-control-for-ai-answer-what-is-dag-in-ai-cat-ai"
    },
    {
      "type": "video",
      "title": "DAGs Explained Simply",
      "url": "https://www.youtube.com/watch?v=1Yh5S-S6wsI"
    }
  ]
}
---

A **DAG agent** structures an AI workflow as a **directed acyclic graph**: discrete steps (nodes) connected by dependencies (edges), where data flows strictly forward and nothing loops back. Think Airflow, but with LLM calls as the tasks — fetch data, then summarize, then classify, then in parallel draft an email and update a record. The graph is defined before execution starts, either by you at design time or by a model that emits a plan which then runs as a fixed pipeline.

The tradeoff versus a free-running agent loop is autonomy for **predictability**. A ReAct-style agent decides its next move at every turn, which is powerful but hard to test, bound, and budget. A DAG runs the same shape every time: you know the maximum number of LLM calls, independent branches execute **in parallel**, failed nodes can be retried in isolation, and every intermediate output is inspectable. When someone asks "make this agent reliable enough for production," turning the well-understood parts of its behavior into a DAG is often the answer — save the open-ended loop for the steps that genuinely need it.

In practice you'll reach for a graph framework — **LangGraph** with only forward edges, or an orchestrator like Airflow, Prefect, or Temporal calling LLMs inside tasks. Each node is a function taking typed input from upstream nodes; fan-out/fan-in handles parallel branches like "summarize each document, then merge." A common hybrid: a planner LLM generates the DAG dynamically, your executor topologically sorts it, and runs it.
