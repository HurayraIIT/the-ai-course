---
{
  "title": "Embedding Models",
  "module": "embeddings-and-vector-databases",
  "order": 3,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What are Embedding Models? An Overview",
      "url": "https://www.couchbase.com/blog/embedding-models/"
    },
    {
      "type": "article",
      "title": "Best Open-Source Embedding Models Benchmarked and Ranked",
      "url": "https://supermemory.ai/blog/best-open-source-embedding-models-benchmarked-and-ranked/"
    }
  ]
}
---

An **embedding model** is the neural network that turns raw input into a vector. Models differ in the data they handle (text, code, images, multimodal), the languages they cover, their **dimension count**, their maximum input length, and — most importantly — how well their notion of "similar" matches your domain. The field splits into two camps: proprietary API models from providers like OpenAI, Google, Cohere, and Voyage, and **open-source models** you can download from Hugging Face and run yourself.

The model you choose is a load-bearing decision. Every vector in your database is tied to the model that produced it — switch models and you re-embed everything — and no amount of clever retrieval code can rescue embeddings that don't separate your data well. Cost and latency also compound: embedding a million documents through an API is a real bill, while a small open model on your own GPU is nearly free but yours to operate.

You'll learn to compare candidates using benchmarks like **MTEB** as a starting point, then validate on your own data: embed a sample corpus, run representative queries, and measure whether the right documents surface. You'll weigh trade-offs concretely — a hosted model via one API call versus `SentenceTransformer("all-MiniLM-L6-v2")` running locally — and consider dimension size, since smaller vectors mean cheaper storage and faster search. The next few topics walk through the major options hands-on.
