---
{
  "title": "Gemini Embedding",
  "module": "embeddings-and-vector-databases",
  "order": 5,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Embeddings",
      "url": "https://ai.google.dev/gemini-api/docs/embeddings"
    },
    {
      "type": "official",
      "title": "Gemini Embedding now generally available in the Gemini API",
      "url": "https://developers.googleblog.com/gemini-embedding-available-gemini-api/"
    },
    {
      "type": "video",
      "title": "What are text embeddings?",
      "url": "https://www.youtube.com/watch?v=vlcQV4j2kTo&t=117s"
    }
  ]
}
---

**Gemini Embedding** is Google's text-embedding offering, served through the **Gemini API**. Like OpenAI's endpoint, it turns text into vectors with one call, but it has a distinctive feature set: a `task_type` parameter that optimizes the embedding for its intended use (`RETRIEVAL_DOCUMENT`, `RETRIEVAL_QUERY`, `SEMANTIC_SIMILARITY`, `CLASSIFICATION`, and more), strong multilingual coverage, and **Matryoshka** representation, which lets you truncate vectors to a smaller `output_dimensionality` without retraining or re-ranking tricks.

For you, the interesting part is the task-aware design. Most embedding APIs use one representation for everything; Gemini lets you tell the model that a document is being *stored* versus a query being *asked*, which measurably improves retrieval because questions and answers are phrased differently. If you're already on Google's stack — Gemini for generation, Vertex AI for deployment — using the matching embedding model keeps billing, auth, and SDKs in one place, and the model has consistently ranked near the top of public retrieval benchmarks.

You'll call it via the `google-genai` SDK with `client.models.embed_content(...)`, passing your model name, text, and `task_type`. The workflow mirrors every other provider: batch-embed your corpus with the document task type, embed queries with the query task type, and compare with cosine similarity. Free-tier access through **Google AI Studio** makes it an easy model to experiment with before committing.
