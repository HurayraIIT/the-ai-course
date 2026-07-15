---
{
  "title": "RAG and Dynamic Filters",
  "module": "rag",
  "order": 6,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Is RAG Dead? The Rise of Context Engineering and Semantic Layers for Agentic AI",
      "url": "https://towardsdatascience.com/beyond-rag/"
    }
  ]
}
---

**Dynamic filters** narrow a retrieval query with structured conditions decided at request time — restricting the search to chunks whose **metadata** matches the current user, date range, document type, or permission level. Instead of searching the entire index semantically and hoping relevance sorts it out, you combine vector similarity with hard constraints like `tenant_id = "acme"` or `published_after = 2025`. It is the point where RAG stops being pure semantic search and becomes **context engineering**: deliberately controlling what is even eligible to enter the model's context.

This matters because similarity alone is not authorization, freshness, or scope. Without filters, a multi-tenant app can leak one customer's documents into another's answers, a policy bot can cite a superseded document, and an agent can drown in plausible-but-wrong context. Filters make retrieval correct, not just relevant — and in agentic systems, where the model issues its own retrieval calls, dynamic filtering is how you keep each step's context tight, cheap, and safe.

In practice you will attach metadata to every chunk at ingestion (source, owner, date, category), then build filters per request: some from session state (`user_id`, workspace, role), some inferred from the query itself. A common pattern is letting the LLM extract filter parameters from natural language — "last quarter's invoices" becomes a date-range condition — via structured output or a tool call, a technique often called **self-query retrieval**. Every serious vector database supports filtered search natively, so this composes cleanly with the pipeline you already have.
