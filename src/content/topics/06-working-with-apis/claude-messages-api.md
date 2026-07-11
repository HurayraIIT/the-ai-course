---
{
  "title": "Claude Messages API",
  "module": "working-with-apis",
  "order": 3,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Messages API",
      "url": "https://platform.claude.com/docs/en/api/messages"
    },
    {
      "type": "official",
      "title": "Using the Messages API",
      "url": "https://platform.claude.com/docs/en/build-with-claude/working-with-messages"
    },
    {
      "type": "article",
      "title": "Claude API: How to get a key and use the API",
      "url": "https://zapier.com/blog/claude-api/"
    }
  ]
}
---

The **Messages API** is Anthropic's core endpoint for talking to Claude models. You send a list of alternating `user` and `assistant` messages plus a top-level `system` prompt, and the API returns the model's reply as a list of **content blocks** — text, tool-use requests, or thinking. Unlike OpenAI's stateless-or-stateful hybrid, the Messages API is deliberately simple: it holds no conversation state, so every request carries the full history you want the model to see.

Knowing this API well matters because Claude models are a staple in production AI systems, and because the Messages API's conventions — explicit `system` prompt, content blocks instead of plain strings, a required `max_tokens` — differ just enough from OpenAI's that copying habits across providers causes real bugs. The content-block design is also what makes multimodal input (images, documents) and **tool use** feel uniform: everything is a typed block in the same array.

In practice you call `client.messages.create()` with `model`, `max_tokens`, `system`, and `messages`, then read `response.content` and check `stop_reason` to see whether the model finished naturally, hit the token cap, or wants to call a tool. You manage history yourself by appending each assistant reply and the next user turn to the array, and you enable streaming or prompt caching with the same request shape.
