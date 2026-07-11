---
{
  "title": "Models on Hugging Face",
  "module": "model-landscape",
  "order": 13,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Hugging Face Embedding Models",
      "url": "https://huggingface.co/models?pipeline_tag=feature-extraction"
    },
    {
      "type": "video",
      "title": "Hugging Face - Text embeddings & semantic search",
      "url": "https://www.youtube.com/watch?v=OATCgQtNX2o"
    },
    {
      "type": "official",
      "title": "Hugging Face Models",
      "url": "https://huggingface.co/models"
    },
    {
      "type": "video",
      "title": "How to Use Pretrained Models from Hugging Face in a Few Lines of Code",
      "url": "https://www.youtube.com/watch?v=ntz160EnWIc"
    }
  ]
}
---

This topic is about actually finding and using models on Hugging Face — turning a catalog of a million-plus checkpoints into something you can navigate with intent. Every model on the platform is tagged with a **pipeline tag** (its task), a license, supported languages, and library compatibility, so the models page becomes a filterable search engine: narrow by task, sort by downloads or recency, and read the **model card** to judge whether a candidate fits your use case.

This skill matters because not every problem needs a giant chat model. **Embedding models** (filed under `feature-extraction` and sentence similarity) power semantic search and RAG; compact classifiers handle sentiment or spam detection at negligible cost; specialized models do transcription, translation, or image captioning better per dollar than prompting a general-purpose LLM. Knowing how to shortlist a small, purpose-built open model — and verify its license allows commercial use — is often the difference between a feature that's economically viable and one that isn't.

In practice, you'll load a pretrained model in a few lines with the `transformers` **pipeline** API — `pipeline("summarization")` gives you a working summarizer with sensible defaults — or use `sentence-transformers` to turn text into vectors for a vector database. You'll develop a repeatable workflow: filter by task, compare a few candidates on your own data, check size against your hardware, and promote the winner into your application.
