---
{
  "title": "Transformers.js",
  "module": "model-landscape",
  "order": 16,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Transformers.js on Hugging Face",
      "url": "https://huggingface.co/docs/transformers.js/en/index"
    },
    {
      "type": "video",
      "title": "How Transformer.js Can Help You Create Smarter AI In Your Browser",
      "url": "https://www.youtube.com/watch?v=MNJHu9zjpqg"
    }
  ]
}
---

**Transformers.js** is Hugging Face's JavaScript library for running machine learning models directly in the browser or in Node.js — no Python, no server, no API key. It mirrors the Python `transformers` API almost exactly, loading models converted to **ONNX** format and executing them client-side via WebAssembly or, for a major speed boost, **WebGPU**. Hundreds of models are already converted: embeddings, sentiment analysis, translation, speech recognition with Whisper, image classification, background removal, and even compact chat-capable LLMs.

This matters because client-side inference flips the economics and privacy of AI features. Every inference costs you nothing in API fees and adds zero server load, since it runs on the user's device. Data never leaves the browser, which neatly sidesteps privacy review for features touching sensitive text or images. And once the model is cached, features work offline with no network latency. For a web developer, it's the shortest path from "AI-curious" to shipping — your existing JavaScript skills are the whole prerequisite.

In practice, you `npm install @huggingface/transformers` (or load it from a CDN `import`), then create a `pipeline` just like in Python: `await pipeline('sentiment-analysis')` returns a function you call on user input. You'll typically run it in a **Web Worker** so the UI stays responsive during model download and inference, pick small quantized models to keep downloads reasonable, and reserve it for tasks where a compact model is genuinely sufficient.
