---
{
  "title": "NanoBanana API",
  "module": "multimodal-ai",
  "order": 6,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "NanoBanana API",
      "url": "https://nanobananaapi.ai/"
    },
    {
      "type": "article",
      "title": "Generating Consistent Imagery with Gemini",
      "url": "https://towardsdatascience.com/generating-consistent-imagery-with-gemini/"
    }
  ]
}
---

**Nano Banana** is the popular name for Google's **Gemini**-based image generation and editing model, available through the Gemini API. Unlike a standalone diffusion endpoint, it generates and edits images natively inside a multimodal LLM: you send text, or text plus reference images, in an ordinary Gemini request, and image output comes back in the response. That conversational design is its signature — you can generate a picture, then say "same character, now in a rainy street" and iterate.

Its standout strength for developers is **consistency and editing**. Because the model actually understands the images you pass in, it excels at keeping a character, product, or style stable across many generations, blending multiple reference images, and making targeted edits — swap the background, change the outfit — without regenerating everything from scratch. That makes it the practical choice for product photography variants, brand-consistent assets, avatar systems, and any workflow where "the same subject, modified" matters more than one-off art.

In practice, you'll call the Gemini API (directly or via the `google-genai` SDK) with a model that supports image output, mix text and inline image parts in the request, and read image bytes out of the response parts. You'll build multi-turn editing loops that carry conversation history so refinements stay anchored to earlier results, and compare its outputs against the **DALL·E API** to develop judgment about which generator fits which job.
