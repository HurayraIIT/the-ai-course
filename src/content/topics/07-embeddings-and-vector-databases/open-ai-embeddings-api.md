---
{
  "title": "Open AI Embeddings API",
  "module": "embeddings-and-vector-databases",
  "order": 4,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Embeddings API",
      "url": "https://platform.openai.com/docs/api-reference/embeddings/create"
    },
    {
      "type": "video",
      "title": "Master OpenAI Embedding API",
      "url": "https://www.youtube.com/watch?v=9oCS-VQupoc"
    }
  ]
}
---

The **OpenAI Embeddings API** is a hosted endpoint that converts text into vectors with a single HTTP call. You send one string or a batch of strings to the `/v1/embeddings` endpoint with a model name (the `text-embedding-3-small` and `text-embedding-3-large` family), and you get back a float array per input. There's nothing to host or fine-tune — it's the fastest path from "I have text" to "I have embeddings."

It matters because it's the default choice in a huge share of production RAG systems, so you'll encounter it whether or not you pick it yourself. It also introduced a genuinely useful feature: the `dimensions` parameter, which lets you shorten vectors (say, from 3072 down to 256) while preserving most of their quality — cutting vector-database storage and search cost without switching models. Pricing is per token, and batching inputs into a single request is dramatically cheaper and faster than looping one string at a time.

In practice you'll call it through the official SDK — `client.embeddings.create(model="text-embedding-3-small", input=[...])` — and read vectors from `response.data[i].embedding`. You'll batch documents at index time, embed queries one at a time at search time, and always use the same model and dimension setting for both. Watch the input token limit per string, chunk long documents before embedding, and normalize your cost math to tokens, not calls.
