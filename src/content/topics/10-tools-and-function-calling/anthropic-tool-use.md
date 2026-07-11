---
{
  "title": "Anthropic Tool Use",
  "module": "tools-and-function-calling",
  "order": 6,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Anthropic Tool Use",
      "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"
    }
  ]
}
---

Anthropic calls its function-calling feature **tool use**. You pass a `tools` array to the Messages API, where each tool has a `name`, a `description`, and an `input_schema` in JSON Schema. When Claude decides to act, the response contains a **`tool_use` content block** with a unique ID, the tool name, and an `input` object — already parsed, not a string — and the response's `stop_reason` is set to `tool_use`. You run the tool and send back a user message containing a **`tool_result`** block referencing that ID.

The design difference worth internalizing is that Claude's responses are lists of typed **content blocks**, so a single reply can interleave visible text, the model's reasoning, and one or more tool calls. Anthropic's docs also lean hard on description quality — detailed, multi-sentence tool descriptions measurably improve Claude's tool selection — and the same interface underpins Anthropic's agent products and server-side tools like web search and code execution, so it scales from a one-off script to a full agent.

In practice you'll define tools in the `anthropic` SDK, check `stop_reason` after each call, execute the matching function, and append the `tool_result` (including `is_error: true` for failures) before calling again. You'll use `tool_choice` to force or disable tools, handle several `tool_use` blocks in one turn, and reuse the identical schema format when exposing tools over **MCP** or the Agent SDK.
