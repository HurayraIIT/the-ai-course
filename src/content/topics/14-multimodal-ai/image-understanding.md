---
{
  "title": "Image Understanding",
  "module": "multimodal-ai",
  "order": 2,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Vision — Claude Docs",
      "url": "https://platform.claude.com/docs/en/build-with-claude/vision"
    },
    {
      "type": "official",
      "title": "Images and vision — OpenAI",
      "url": "https://developers.openai.com/api/docs/guides/images-vision"
    },
    {
      "type": "article",
      "title": "What are Vision-Language Models? — NVIDIA",
      "url": "https://www.nvidia.com/en-us/glossary/vision-language-models/"
    }
  ]
}
---

**Image understanding** — often called **vision** — is a model's ability to take an image as input and reason about its contents in natural language. This goes far beyond classic computer-vision labels. A vision-capable LLM can read text embedded in a screenshot, explain a chart, compare two product photos, count objects, or answer an open-ended question about a scene, all through the same prompt interface you already use for text.

For a developer, this is the capability that unlocks the messy visual data your users already have. Support tickets arrive with screenshots, expense reports arrive as photos of receipts, and CMS libraries hold thousands of untagged images. Vision turns each of those into something you can query, classify, and extract structured fields from — without training a custom model or maintaining an OCR pipeline. It's also the foundation for agents that operate software by looking at the screen.

In practice, you'll pass images alongside text in a chat request, either as a URL or a **base64-encoded** payload, then prompt the model for exactly the output you need — a description, a JSON object, a yes/no decision. You'll learn how **detail level** settings trade accuracy against token cost, why resolution and cropping affect results, and how to prompt around common failure modes like miscounted objects or hallucinated text. The next topic makes this concrete with the OpenAI vision endpoints.
