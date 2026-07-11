---
{
  "title": "Ragas",
  "module": "evaluation-and-observability",
  "order": 8,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Ragas Documentation",
      "url": "https://docs.ragas.io/en/latest/"
    },
    {
      "type": "opensource",
      "title": "explodinggradients/ragas",
      "url": "https://github.com/explodinggradients/ragas"
    },
    {
      "type": "article",
      "title": "Evaluating RAG Applications with RAGAs",
      "url": "https://towardsdatascience.com/evaluating-rag-applications-with-ragas-81d67b0ee31a/n"
    }
  ]
}
---

**Ragas** is an open-source Python framework purpose-built for evaluating **retrieval-augmented generation**. Where general eval tools score any LLM output, Ragas decomposes a RAG pipeline into its two halves and scores each: retrieval metrics like **context precision** and **context recall** measure whether you fetched the right chunks, while generation metrics like **faithfulness** and **answer relevancy** measure whether the model's answer actually sticks to that retrieved context. Most of its metrics are computed with LLM-as-judge and, notably, several work without ground-truth reference answers.

This matters because RAG systems fail in two distinct ways that a single end-to-end score can't distinguish: the retriever surfaces the wrong documents, or the generator ignores or contradicts the right ones. When your chatbot hallucinates, you need to know which half to fix — re-chunk and re-embed, or tighten the prompt. Ragas gives you that diagnosis per component, which is what makes iterating on a RAG stack tractable instead of guesswork.

In practice, you'll build an evaluation dataset of questions, retrieved contexts, generated answers, and (where you have them) reference answers — Ragas can even synthesize test questions from your document corpus to bootstrap this. Then you call `evaluate()` over the dataset with your chosen metrics and get scores per sample and in aggregate. Wire it into CI so faithfulness dropping below a threshold fails the build, and rerun it whenever you change chunk size, embedding model, top-`k`, or prompts to see exactly which half of the pipeline moved.
