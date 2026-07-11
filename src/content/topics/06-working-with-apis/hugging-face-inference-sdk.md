---
{
  "title": "Hugging Face Inference SDK",
  "module": "working-with-apis",
  "order": 7,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Inference",
      "url": "https://huggingface.co/docs/huggingface_hub/en/package_reference/inference_client"
    },
    {
      "type": "article",
      "title": "Endpoint Setup",
      "url": "https://www.npmjs.com/package/@huggingface/inference"
    }
  ]
}
---

The **Hugging Face Inference SDK** — `huggingface_hub`'s `InferenceClient` in Python and `@huggingface/inference` in JavaScript — gives you one client for running models hosted on the Hugging Face ecosystem. It covers serverless **Inference Providers** (open models served by partners like Together, Fireworks, and Cerebras through a single Hugging Face token), your own dedicated **Inference Endpoints**, and it goes far beyond chat: text generation, embeddings, image generation, speech-to-text, translation, and other task-specific methods share the same client.

This matters because the open-model world moves fast, and Hugging Face is its hub. When a new open-weights model drops, the Inference SDK is often the fastest way to try it without provisioning GPUs. It is also your path to tasks the big proprietary APIs treat as afterthoughts — classification, image models, audio pipelines — and to graduating the same code from free experimentation to a paid dedicated endpoint when traffic grows.

In practice you create an `InferenceClient` with your `HF_TOKEN`, then call task methods: `chat_completion()` (OpenAI-shaped `messages`, so your habits transfer), `text_generation()` with `max_new_tokens` and sampling parameters, `feature_extraction()` for embeddings, or `text_to_image()`. You select a `model` by its Hub id, optionally pin a specific provider, and swap in an endpoint URL when you deploy your own hardware.
