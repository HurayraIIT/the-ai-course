---
{
  "title": "OpenAI Functions Calling",
  "module": "tools-and-function-calling",
  "order": 4,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Documentation – Function Calling",
      "url": "https://platform.openai.com/docs/guides/function-calling"
    },
    {
      "type": "official",
      "title": "OpenAI Cookbook – Using Functions with GPT Models",
      "url": "https://github.com/openai/openai-cookbook/blob/main/examples/How_to_call_functions_with_chat_models.ipynb"
    },
    {
      "type": "article",
      "title": "@officialOpenAI Blog – Announcing Function Calling and Other Updates",
      "url": "https://openai.com/blog/function-calling-and-other-api-updates"
    },
    {
      "type": "article",
      "title": "@officialOpenAI API Reference – Functions Section",
      "url": "https://platform.openai.com/docs/api-reference/chat/create#functions"
    },
    {
      "type": "article",
      "title": "@officialOpenAI Community – Discussions and Examples on Function Calling",
      "url": "https://community.openai.com/tag/function-calling"
    }
  ]
}
---

OpenAI shipped the first mainstream **function calling** API, and its conventions shaped how the whole industry does tools. In the current API you pass a `tools` array where each entry has a `name`, `description`, and JSON Schema `parameters`. When the model decides to act, the response contains one or more **tool calls** — each with an ID, a function name, and an `arguments` field that arrives as a **JSON string** you must parse. You execute the function, return the output tied to the matching call ID, and the model continues.

This API is worth knowing in detail even if you build on another provider, because it's the de facto standard: many open-source inference servers, gateways, and frameworks expose **OpenAI-compatible** endpoints, so this exact shape is what you'll meet everywhere. Distinctive features include `strict: true` mode, which constrains generation so arguments are guaranteed to match your schema, and `tool_choice` for forcing a specific function, requiring some tool, or disabling tools entirely.

In practice you'll define tools in the SDK, call the model, then loop: parse `arguments` with `json.loads`, dispatch to your function, and append a result message referencing the `tool_call_id` before calling again. You'll handle **parallel tool calls** (several in one response) and decide between the older Chat Completions endpoint and the newer Responses API, which wraps the same tool semantics with server-side state and built-in tools like web search and code execution.
