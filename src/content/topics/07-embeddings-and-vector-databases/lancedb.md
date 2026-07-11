---
{
  "title": "LanceDB",
  "module": "embeddings-and-vector-databases",
  "order": 19,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "LanceDB",
      "url": "https://lancedb.com/"
    },
    {
      "type": "official",
      "title": "LanceDB Documentation",
      "url": "https://docs.lancedb.com/enterprise/introduction"
    },
    {
      "type": "opensource",
      "title": "LanceDB on GitHub",
      "url": "https://github.com/lancedb/lancedb"
    }
  ]
}
---

**LanceDB** is an open-source, **embedded** vector database — it runs inside your process like SQLite does, storing data on disk (or object storage like S3) in the **Lance** columnar format. No server to deploy, no connection strings: you point it at a directory, and you get vector search, full-text search, SQL-style filtering, and versioned datasets. A managed **LanceDB Cloud** exists for when you want the same API without operating storage yourself.

What makes LanceDB more than "Chroma with a different file format" is that Lance format itself is built for multimodal AI data at scale. It stores vectors alongside raw data — text, images, metadata — in one place, supports fast random access, and handles datasets far larger than RAM because indexes and data are memory-mapped from disk. That makes it a genuine option not just for prototypes but for serious workloads: recommendation corpora, image search, and training-data management, all without a database server in your architecture diagram.

In practice you'll `pip install lancedb`, then `db = lancedb.connect("./data")`, create a table from a list of dicts or a Pandas/Arrow table with `db.create_table("docs", data)`, and query with `table.search(query_vector).where("category = 'api'").limit(5).to_list()`. It can call your embedding function automatically via its embedding registry, and **hybrid search** combines vector and BM25 full-text scores in one query. TypeScript and Rust clients mirror the Python API.
