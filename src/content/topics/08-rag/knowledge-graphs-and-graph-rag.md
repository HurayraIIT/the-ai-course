---
{
  "title": "Knowledge graphs and GraphRAG",
  "module": "rag",
  "order": 9,
  "sources": [],
  "resources": [
    {
      "type": "article",
      "title": "GraphRAG: From Local to Global",
      "url": "https://arxiv.org/abs/2404.16130"
    },
    {
      "type": "article",
      "title": "Microsoft GraphRAG documentation",
      "url": "https://microsoft.github.io/graphrag/"
    }
  ]
}
---

A **knowledge graph** stores facts as a network instead of prose: **entities** (people, products, companies) become nodes, **relationships** become typed edges — `Alice —works_at→ Acme —acquired_by→ Globex`. Where vector search asks "which chunks sound like this query?", a graph can be traversed: hop from node to node and answer questions whose evidence is spread across connections rather than sitting in any single passage. **GraphRAG** combines the two — an LLM extracts entities and relationships from your documents at ingestion time to build the graph, and at query time retrieval walks the graph (often alongside ordinary vector search) to assemble context.

The reason to care is a class of questions plain RAG handles badly: **multi-hop questions**. "Which of our customers are affected by the outage at vendor X?" has its answer scattered across contracts, dependency docs, and account records — no single chunk contains it, so similarity search retrieves fragments and the model guesses. A graph answers it as a two-hop traversal. Microsoft's GraphRAG work adds a second trick for global questions like "what are the main themes across this corpus?": cluster the graph into **communities**, pre-summarize each, and retrieve those summaries — something chunk-level similarity fundamentally can't do. The cost is equally real: LLM-driven extraction makes ingestion many times more expensive than plain embedding, and the graph must be maintained as documents change.

In practice, treat GraphRAG as an escalation, not a default — adopt it when your **error analysis** shows retrieval failing specifically on relationship and multi-hop queries, not because the demo looks impressive. Tooling options: Microsoft's open-source GraphRAG pipeline, LlamaIndex property graph indexes, or Neo4j with an LLM extraction layer, queried via Cypher through **text-to-SQL**-style tool calls. Most production systems that go this route run graph and vector retrieval side by side and merge results — the graph for precision on connected facts, embeddings for coverage of everything else.
