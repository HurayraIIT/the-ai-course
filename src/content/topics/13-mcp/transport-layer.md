---
{
  "title": "Transport Layer",
  "module": "mcp",
  "order": 5,
  "sources": [
    "ai-engineer"
  ],
  "resources": []
}
---

The **transport layer** is the outer half of MCP's two-layer design: it defines *how* the JSON-RPC messages of the data layer physically move between client and server. The protocol standardizes two transports. **stdio** runs the server as a child process of the host and exchanges messages over `stdin`/`stdout` — no network, no ports, near-zero latency. **Streamable HTTP** exposes the server at a URL endpoint, using HTTP POST for requests and optional Server-Sent Events for streaming, which is what makes remote, multi-user servers possible.

The transport decision shapes everything operational about your integration. stdio servers inherit the user's local environment — filesystem access, credentials in env vars, one process per user — and are trivially private. Streamable HTTP servers are deployed like any web service: they scale horizontally, serve many clients concurrently, and carry web-grade concerns like **OAuth 2.1** authorization, session management, and origin validation. Same tools, very different security and ops story — and because the data layer is transport-agnostic, you can switch between them without touching your tool logic.

In practice the transport is one line of code or config. In the TypeScript SDK you attach a `StdioServerTransport` or `StreamableHTTPServerTransport` to the same server object; in Python's FastMCP it's `mcp.run(transport="stdio")` versus `"streamable-http"`. On the client side, a host config entry with a `command` field means stdio, while a `url` field means streamable HTTP. You'll also see **SSE** as a deprecated legacy transport that streamable HTTP replaced.
