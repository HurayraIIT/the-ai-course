---
{
  "title": "OpenAI Vision API",
  "module": "multimodal-ai",
  "order": 3,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Vision",
      "url": "https://platform.openai.com/docs/guides/vision"
    },
    {
      "type": "video",
      "title": "OpenAI Vision API Crash Course",
      "url": "https://www.youtube.com/watch?v=ZjkS11DSeEk"
    }
  ]
}
---

The **OpenAI vision API** is not a separate product — it's the standard chat interface accepting images as part of a message. You send a request to a vision-capable model where the user content is an array mixing text parts and image parts, and the model responds in text just like any other chat completion. Images can be referenced by URL or embedded as **base64** data, and you can include several in one request for comparison tasks.

This design is why vision adoption is so fast: everything you already know transfers. **Function calling**, **structured outputs**, streaming, and system prompts all work with image inputs, so you can point the model at a photo and get back a validated JSON object in a single round trip. That makes it a practical replacement for OCR-plus-parsing pipelines, screenshot-based bug triage, image moderation queues, and alt-text generation at scale.

Hands-on, you'll build requests with an `image_url` content part, experiment with the `detail` parameter (`low` for cheap thumbnail-level understanding, `high` for fine-grained reading of dense documents), and measure how image size drives token usage and cost. You'll combine an image with a JSON schema so extraction results are machine-readable, and handle real-world edge cases: oversized uploads, unsupported formats, and prompts that need explicit instructions like "transcribe exactly, don't summarize." By the end, adding sight to any existing chat-based feature should feel like a one-line change.
