---
{
  "title": "Pre-trained Models",
  "module": "llm-fundamentals",
  "order": 6,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Pre-trained Models: Past, Present and Future",
      "url": "https://www.sciencedirect.com/science/article/pii/S2666651021000231"
    },
    {
      "type": "video",
      "title": "Transforming Language with Generative Pre-trained Transformers (GPT)",
      "url": "https://www.youtube.com/watch?v=bdICz_sBI34"
    }
  ]
}
---

A **pre-trained model** is a model that has already been through the expensive, general-purpose phase of training — for LLMs, next-token prediction over trillions of tokens of text — and is handed to you as a finished set of weights. This is the "P" in **GPT** (Generative Pre-trained Transformer). The raw result is called a **base model**: it's great at continuing text but doesn't naturally follow instructions, which is why providers layer post-training on top to produce the **instruct** and chat models you actually call.

Pre-training is the reason modern AI development is accessible at all. Someone else spent the millions of GPU-hours to compress broad world knowledge and language ability into weights; you start from that checkpoint instead of from zero. This transfer-learning economics defines the entire ecosystem: providers sell API access to their pre-trained models, Hugging Face hosts thousands of open ones, and your job shifts from training models to *adapting* them — with prompts, retrieval, or fine-tuning.

Practically, you'll always be choosing among pre-trained models rather than building one: picking a chat model from an API catalog, or pulling weights like `meta-llama/Llama-3.1-8B-Instruct` from **Hugging Face** to run locally. Knowing the base-versus-instruct distinction saves real pain — grab a base checkpoint by accident and it will ramble past your question instead of answering it. Fine-tuning, next up, is how you specialize a pre-trained model further.
