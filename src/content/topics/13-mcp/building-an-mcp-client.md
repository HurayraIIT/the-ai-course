---
{
  "title": "Building an MCP Client",
  "module": "mcp",
  "order": 7,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Build an MCP client",
      "url": "https://modelcontextprotocol.io/docs/develop/build-client"
    },
    {
      "type": "article",
      "title": "MCP Client - Step by Step Guide to Building from Scratch",
      "url": "https://composio.dev/blog/mcp-client-step-by-step-guide-to-building-from-scratch"
    },
    {
      "type": "video",
      "title": "Create an MCP Client in Python - FastAPI Tutorial",
      "url": "https://www.youtube.com/watch?v=mhdGVbJBswA"
    }
  ]
}
---

Building an MCP client means writing the consumer side of the protocol: code that connects to a server, discovers its tools, and puts them in front of an LLM. Where a server answers the question "what can I offer?", your client answers "how does my application use it?" A minimal client connects over a transport, calls `tools/list`, hands the tool definitions to a model, and executes whatever `tools/call` requests the model makes — the core of every MCP-powered chatbot and agent.

This matters because it's how you make *your own* application extensible. Once your product embeds an MCP client, users can plug in any server — GitHub, Postgres, internal company tools — without you shipping a single integration. It's the same mechanism Claude Desktop and Cursor use, and building one demystifies the whole stack: you'll see exactly how tool definitions reach the model and how its responses become real function executions.

In practice you'll follow a standard loop. Instantiate a `Client` from the TypeScript or Python SDK, attach a `StdioClientTransport` (spawning the server as a subprocess) or a streamable HTTP transport, and `connect()`. Convert the listed tools into the format your LLM API expects — Anthropic's `tools` parameter or OpenAI's function-calling format — then run the agent loop: send the conversation, and when the model returns a tool call, invoke `callTool()`, append the result, and repeat until the model produces a final answer. Wrap that in a CLI or a FastAPI endpoint and you have a working host.
