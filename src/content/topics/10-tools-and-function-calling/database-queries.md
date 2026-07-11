---
{
  "title": "Database Queries",
  "module": "tools-and-function-calling",
  "order": 9,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Building Your Own Database Agent",
      "url": "https://www.deeplearning.ai/short-courses/building-your-own-database-agent/"
    }
  ]
}
---

A **database query tool** connects the model to your actual data. The common pattern is **text-to-SQL**: the user asks "which customers churned last quarter?", the model inspects your schema, writes a `SELECT`, your code executes it against Postgres or MySQL, and the rows come back for the model to summarize. The same idea extends to MongoDB queries, vector store lookups, or any datastore with a query language.

This is where AI features stop being demos and start touching the business, because the questions people actually ask — revenue, usage, inventory — live in databases. It's also the tool category with the sharpest edges. Model-written SQL means you must design for failure and abuse: **read-only credentials**, an allowlist of tables, statement timeouts and row limits, and never string-concatenating model output into privileged queries. A well-scoped `run_query(sql)` tool is powerful; an unscoped one is an incident report.

In practice you'll expose two or three tools together: something like `list_tables` and `get_schema` so the model can discover structure, then `execute_sql` with a single `query` string parameter, restricted to `SELECT`. You'll feed schema context (table names, column types, a few sample rows) into the prompt or tool results, return query output as compact JSON to protect the context window, and let the model retry when the database throws a syntax error — the error message is usually all it needs to self-correct.
