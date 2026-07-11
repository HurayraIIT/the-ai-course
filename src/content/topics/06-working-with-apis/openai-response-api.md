---
{
  "title": "OpenAI Response API",
  "module": "working-with-apis",
  "order": 1,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Responses API",
      "url": "https://developers.openai.com/api/reference/resources/responses/"
    },
    {
      "type": "opensource",
      "title": "Why we built the Responses API",
      "url": "https://developers.openai.com/blog/responses-api/"
    },
    {
      "type": "video",
      "title": "OpenAI Responses API Tutorial (2025)",
      "url": "https://www.youtube.com/playlist?list=PL4HikwTaYE0EWV3qieOYooyxb9osQLgou"
    }
  ]
}
---

The **Responses API** is OpenAI's primary interface for generating model output, designed as the successor to the long-running Chat Completions API. Instead of sending a bare list of chat messages, you send an `input` (a string or structured items) along with `instructions`, and the API returns a typed list of output items — text, reasoning, tool calls — rather than a single message blob. It folds what used to require multiple products into one endpoint: **built-in tools** like web search, file search, and code execution, plus stateful conversations the server can carry for you.

It matters because this is the default surface you will target when building on OpenAI models. The Responses API was built for **agentic** workloads: a single request can involve the model reasoning, calling tools, and producing a final answer, and the response format makes each step inspectable. Server-side state via `previous_response_id` means you can continue a conversation without re-sending the entire history yourself.

In practice you call `client.responses.create()` with `model`, `input`, and optional `instructions`, `tools`, and `max_output_tokens`. You read the convenience `output_text` field for simple cases, or walk the `output` array when tools are involved. Set `stream: true` to receive semantic events as they happen, and pass `store` and `previous_response_id` when you want OpenAI to manage conversation state.
