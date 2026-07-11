---
{
  "title": "Image Generation",
  "module": "multimodal-ai",
  "order": 4,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "DALL-E",
      "url": "https://openai.com/index/dall-e-2/"
    },
    {
      "type": "article",
      "title": "How DALL-E 2 Actually Works",
      "url": "https://www.assemblyai.com/blog/how-dall-e-2-actually-works/"
    },
    {
      "type": "video",
      "title": "How AI Image Generators Work (Stable Diffusion / Dall-E)",
      "url": "https://www.youtube.com/watch?v=1CIpzeNxIhU"
    }
  ]
}
---

**Image generation** is the reverse of vision: the model takes a text prompt and synthesizes a brand-new image that matches it. Most modern generators are built on **diffusion** — the model learns to turn random noise into a coherent picture, step by step, guided by a text encoding of your prompt — while newer systems generate images natively inside a multimodal LLM. Either way, the developer-facing contract is simple: text in, pixels out.

You should care because generated imagery has become a routine product feature, not a novelty. Applications use it for user avatars, marketing and social assets, storyboards, placeholder art, e-commerce variations, and personalized illustrations — anywhere design work was previously a manual bottleneck. Understanding roughly how diffusion works also makes you a better user of it: it explains why prompts about style and composition work well, why exact text rendering and precise spatial layouts have historically been weak spots, and why the same prompt yields different results each run.

This topic is the concept layer; the two that follow cover concrete APIs. Here you'll learn the vocabulary that transfers across every provider — prompt structure, negative prompting, seeds and reproducibility, aspect ratios, and **inpainting**/**editing** versus pure generation. You'll also weigh the practical trade-offs between hosted APIs like **DALL·E** and **Nano Banana** and self-hosted open models such as Stable Diffusion, in terms of cost, control, and content policy.
