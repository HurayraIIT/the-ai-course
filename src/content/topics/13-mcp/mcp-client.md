---
{
  "title": "MCP Client",
  "module": "mcp",
  "order": 2,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "course",
      "title": "Model Context Protocol (MCP) Course",
      "url": "https://huggingface.co/learn/mcp-course/en/unit0/introduction"
    },
    {
      "type": "official",
      "title": "Understanding MCP clients",
      "url": "https://modelcontextprotocol.io/docs/learn/client-concepts#understanding-mcp-clients"
    },
    {
      "type": "video",
      "title": "The Complete Guide to Building AI Agents for Beginners",
      "url": "https://youtu.be/MOyl58VF2ak?si=-QjRD_5y3iViprJX"
    },
    {
      "type": "official",
      "title": "Model Context Protocol",
      "url": "https://modelcontextprotocol.io/introduction"
    },
    {
      "type": "official",
      "title": "OpenAI API Reference",
      "url": "https://platform.openai.com/docs/api-reference"
    },
    {
      "type": "official",
      "title": "Anthropic API Documentation",
      "url": "https://docs.anthropic.com/claude/reference"
    },
    {
      "type": "opensource",
      "title": "Model Context Protocol",
      "url": "https://github.com/modelcontextprotocol/modelcontextprotocol"
    }
  ]
}
---

An **MCP client** is the protocol connector that lives inside a host application and maintains a **one-to-one connection** with a single MCP server. If the host is the app and the server is the capability provider, the client is the wire between them: it performs the initialization handshake, negotiates protocol versions and capabilities, sends requests like `tools/list` and `tools/call`, and receives responses and notifications. A host that connects to five servers runs five clients, each isolated from the others.

The distinction matters because it defines where your integration code goes when you build AI software. The client is what translates between your application's world and the MCP world: it discovers what a server offers, invokes tools with JSON arguments, and surfaces results back to your LLM loop. Clients can also serve requests going the other direction — a server may ask the client for **sampling** (an LLM completion), **elicitation** (user input), or **roots** (which directories it may touch) — which is what makes MCP a two-way protocol rather than a plain API wrapper.

In practice you rarely write a client from raw JSON-RPC. The official SDKs give you a `Client` class: you construct it, attach a **stdio** or **streamable HTTP** transport, call `connect()`, then `listTools()` and `callTool()`. You then feed those tool definitions to the OpenAI or Anthropic APIs — both of which can now also consume MCP servers directly — and route the model's tool calls through the client. Later topics walk through building one from scratch.
