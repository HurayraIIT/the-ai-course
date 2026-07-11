---
{
  "title": "Google",
  "module": "model-landscape",
  "order": 3,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Google AI Studio",
      "url": "https://ai.google.dev/"
    },
    {
      "type": "official",
      "title": "Gemini API Documentation",
      "url": "https://ai.google.dev/gemini-api/docs"
    }
  ]
}
---

Google's developer-facing AI offering centers on the **Gemini API** and **Google AI Studio**, a free browser-based workbench where you can prototype prompts against Google's models before writing a line of code. AI Studio lets you tweak system instructions, temperature, and safety settings interactively, then export what you built as working code with an API key — making it one of the lowest-friction on-ramps to any frontier model.

For a developer, Google's stack matters because it pairs strong multimodal models with unusually generous access. The free tier is real enough to build prototypes on, and the models natively accept text, images, audio, video, and PDFs in a single request — capabilities you'd otherwise have to stitch together yourself. Google also offers two paths to the same models: the lightweight Gemini API for getting started fast, and **Vertex AI** on Google Cloud when you need enterprise controls, so nothing you learn gets thrown away as your project grows.

In practice, you'll grab a key from AI Studio, install the `google-genai` SDK (or just hit the REST endpoint), and send a `generateContent` request with your prompt and any media files. You'll experiment in AI Studio first — it's faster than editing code for every prompt tweak — then port the winning configuration into your application, adding **structured output** schemas, **function calling**, and streaming as your feature demands them.
