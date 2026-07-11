---
{
  "title": "Type of Models",
  "module": "llm-fundamentals",
  "order": 13,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Recap of all types of LLM Agents",
      "url": "http://towardsdatascience.com/recap-of-all-types-of-llm-agents/"
    }
  ]
}
---

"LLM" covers a whole family of model types, and picking the right one is a real engineering decision. The main axes: **base vs instruct** models (raw text predictors vs assistants tuned to follow instructions), standard vs **reasoning** models, **multimodal** models that accept images, audio, or video alongside text, and specialized types like **embedding models** (which turn text into vectors for search, not prose) and code-focused models. Size is its own axis, from small models (roughly 1–10B parameters) that run on a phone or laptop to frontier models served from GPU clusters.

Knowing this taxonomy keeps you from two expensive mistakes: paying frontier prices for work a small model handles fine, and forcing a general chat model to do a job a specialized one does better. Real products are rarely one model — a typical **RAG** app uses an embedding model for retrieval and a chat model for generation; a production pipeline might route simple queries to a cheap fast model and escalate hard ones. Cost differences between tiers are often 10–100x, so routing decisions dominate your API bill.

Practically, you'll navigate provider catalogs organized exactly along these lines — flagship, fast/cheap, embeddings, multimodal — plus Hugging Face for open checkpoints. You'll read model cards for capabilities, context window, modalities, and price, then validate your shortlist against your own **evals** rather than leaderboard rankings alone.
