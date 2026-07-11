---
{
  "title": "Purpose and Functionality",
  "module": "embeddings-and-vector-databases",
  "order": 2,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is a Vector Database? Top 12 Use Cases",
      "url": "https://lakefs.io/blog/what-is-vector-databases/"
    },
    {
      "type": "article",
      "title": "Vector Databases: Intro, Use Cases",
      "url": "https://www.v7labs.com/blog/vector-databases"
    },
    {
      "type": "article",
      "title": "When (Not) to Use Vector DB",
      "url": "https://towardsdatascience.com/when-not-to-use-vector-db/"
    }
  ]
}
---

This topic zooms out and asks what embeddings and **vector databases** are actually *for*. A vector database is a storage system purpose-built for one job: keep millions of embeddings and answer "which stored vectors are closest to this one?" in milliseconds. Everything else — metadata filtering, hybrid search, CRUD operations — exists to support that core **nearest-neighbor** query.

Knowing the use cases keeps you from treating vector search as a hammer for every nail. The pattern shines when the question is fuzzy and the data is unstructured: semantic search over docs, RAG context retrieval, recommendation feeds, duplicate detection, image similarity, long-term memory for agents. It is the wrong tool for exact lookups, aggregations, or relational joins — a `WHERE id = 42` query belongs in Postgres, not a vector index. Plenty of teams have shipped an unnecessary vector database when an array column or a simple in-memory index would have done; knowing when *not* to reach for one is part of the skill.

Practically, you'll evaluate each candidate feature against a simple checklist: Is the data unstructured? Is similarity, not equality, the query? Does the corpus outgrow what you can brute-force scan in memory (roughly hundreds of thousands of vectors)? When the answers are yes, you'll design a pipeline of **embed, store, filter, and retrieve** — and you'll see that pipeline repeated across every application topic later in this module.
