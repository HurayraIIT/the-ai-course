---
{
  "title": "OpenAI",
  "module": "model-landscape",
  "order": 0,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI API Documentation",
      "url": "https://developers.openai.com/api/docs"
    },
    {
      "type": "official",
      "title": "OpenAI Cookbook (GitHub)",
      "url": "https://github.com/openai/openai-cookbook"
    }
  ]
}
---

OpenAI is the company behind ChatGPT and the API platform that kicked off the modern wave of AI-powered software. Beyond the consumer chat product, OpenAI runs a developer platform where you send text (and images, audio, or files) to a hosted model and get a response back over HTTPS. You never download weights or manage GPUs — you authenticate with an **API key**, pick a model, and pay per token.

For a working developer, OpenAI matters because its API conventions became the de facto standard for the whole industry. The **chat completions** format — a list of messages with `system`, `user`, and `assistant` roles — is now mimicked by nearly every other provider and local inference tool, so learning it once transfers everywhere. Its docs and the **OpenAI Cookbook** are also some of the best worked examples of prompt engineering, structured outputs, and tool calling you'll find, regardless of which vendor you eventually ship with.

In practice, you'll create a key in the platform dashboard, install the official SDK (`pip install openai` or `npm install openai`), and make your first call in a few lines: instantiate a client, pass a model name and messages array, read the response. From there you'll layer on **streaming** for responsive UIs, **function calling** so the model can trigger your code, and JSON-mode outputs your application can parse reliably. Treat this topic as learning the grammar most of the AI ecosystem speaks.
