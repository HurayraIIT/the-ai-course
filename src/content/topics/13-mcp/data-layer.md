---
{
  "title": "Data Layer",
  "module": "mcp",
  "order": 4,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Layer",
      "url": "https://modelcontextprotocol.io/docs/learn/architecture#layers"
    }
  ]
}
---

MCP is specified in two layers, and the **data layer** is the inner one: it defines *what* clients and servers say to each other, independent of *how* the bytes travel. It's a **JSON-RPC 2.0** protocol covering lifecycle management (the `initialize` handshake and **capability negotiation**), the server primitives (**tools**, **resources**, **prompts**) with methods like `tools/list` and `tools/call`, the client primitives (**sampling**, **elicitation**, **roots**), and notifications such as `notifications/tools/list_changed` that keep both sides in sync.

Understanding the data layer is what separates using MCP from being able to debug it. When a tool silently disappears from your host, a server rejects a call, or two implementations disagree on a protocol version, the answer is in this layer: which messages were exchanged, what capabilities were negotiated, what the JSON-RPC error said. It's also the layer that stays stable across deployment choices — the exact same messages flow whether your server runs as a local subprocess or behind a load balancer.

In practice the SDKs speak this layer for you: when you call `client.callTool()` in TypeScript or register a tool with `@mcp.tool()` in Python's FastMCP, the library serializes the JSON-RPC request, matches the response by `id`, and validates the schema. You'll still read raw messages regularly — the **MCP Inspector** (`npx @modelcontextprotocol/inspector`) shows every request and response, and recognizing the method names and message shapes makes that output immediately legible.
