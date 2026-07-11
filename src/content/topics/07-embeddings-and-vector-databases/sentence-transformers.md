---
{
  "title": "Sentence Transformers",
  "module": "embeddings-and-vector-databases",
  "order": 6,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is BERT?",
      "url": "https://h2o.ai/wiki/bert/"
    },
    {
      "type": "article",
      "title": "SentenceTransformers Documentation",
      "url": "https://sbert.net/"
    },
    {
      "type": "article",
      "title": "Using Sentence Transformers at Hugging Face",
      "url": "https://huggingface.co/docs/hub/sentence-transformers"
    }
  ]
}
---

**Sentence Transformers** (also known as SBERT) is an open-source Python library for generating embeddings with models that run on your own machine. It grew out of **BERT**, the transformer that taught NLP to read text bidirectionally, but adds the training tricks needed to make whole sentences — not just tokens — comparable as single vectors. The library wraps thousands of pretrained models on **Hugging Face**, from tiny CPU-friendly workhorses like `all-MiniLM-L6-v2` to large multilingual retrieval models.

This is your escape hatch from per-token API pricing. Local embedding means zero marginal cost, no rate limits, no network latency, and no data leaving your infrastructure — a hard requirement in many regulated environments. It's also the path to **fine-tuning**: when generic similarity doesn't match your domain (legal clauses, product SKUs, log lines), you can train a sentence-transformer on your own pairs, something closed API models won't let you do.

Usage is three lines: `pip install sentence-transformers`, then `model = SentenceTransformer("all-MiniLM-L6-v2")` and `embeddings = model.encode(texts)`. The `encode` call batches automatically and returns NumPy arrays ready for FAISS or any vector database, and built-in helpers like `model.similarity()` handle cosine scoring. You'll typically prototype with a hosted API, then reach for sentence-transformers when cost, privacy, or domain fit says "run it yourself."
