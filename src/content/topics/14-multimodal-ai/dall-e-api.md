---
{
  "title": "DALL-E API",
  "module": "multimodal-ai",
  "order": 5,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Image Generation",
      "url": "https://platform.openai.com/docs/guides/images"
    },
    {
      "type": "video",
      "title": "DALL E API - Introduction (Generative AI Pictures from OpenAI)",
      "url": "https://www.youtube.com/watch?v=Zr6vAWwjHN0"
    }
  ]
}
---

The **DALL·E API** is OpenAI's endpoint family for creating images programmatically. Where the previous topic covered how generation works, this one is about the request-response mechanics: you `POST` a prompt to the images endpoint and get back either a hosted URL or **base64** image data. The same surface covers three operations — **generation** from a text prompt, **edits** that modify an existing image (optionally with a mask), and **variations** that riff on a source image.

For product work, the appeal is that image creation becomes just another backend call. You can generate assets on demand inside a web request, batch-produce imagery in a worker queue, or let an LLM agent call image generation as a tool. Knowing the knobs — size, quality, output format, and how prompts are automatically rewritten for safety and detail — is the difference between a demo and a feature with predictable cost and consistent style.

In practice, you'll call the endpoint from the official SDK — `client.images.generate(...)` in Python or JavaScript — then download and store results, since returned URLs are temporary. You'll build a small pipeline: take user input, template it into a style-controlled prompt, request the image, and persist it to your own storage. You'll also handle the operational realities: rate limits, content-policy rejections, retries, and choosing between OpenAI's newer image models and the classic DALL·E models based on quality and price.
