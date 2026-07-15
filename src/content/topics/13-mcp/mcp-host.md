---
{
  "title": "MCP Host",
  "module": "mcp",
  "order": 1,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Concepts of MCP",
      "url": "https://modelcontextprotocol.io/docs/learn/architecture#concepts-of-mcp"
    },
    {
      "type": "official",
      "title": "Vercel Serverless Hosting",
      "url": "https://vercel.com/docs"
    }
  ]
}
---

An **MCP host** is the AI application the user actually runs — Claude Desktop, Claude Code, Cursor, VS Code with Copilot, or an agent you build yourself. The host owns the LLM conversation and coordinates everything around it: it decides which MCP servers to connect to, spawns one **MCP client** per server connection, merges the tools those servers expose into the model's context, and mediates when the model wants to call one. The host is not the protocol connector itself — that's the client's job — it's the orchestrating application wrapped around those connectors.

Understanding the host role matters because it's where policy lives. The host enforces **user consent** before tools run, decides which capabilities each server may see, sandboxes servers from each other, and handles credentials and session lifecycles. When you build AI-powered software that consumes MCP servers, you are building a host — and the quality of your product depends on how well you handle tool selection, permission prompts, and failure isolation, not just on the model.

In practice you'll first use hosts as a consumer: registering servers in Claude Desktop's `claude_desktop_config.json` or a project's `.mcp.json` and watching new tools appear. Later you'll implement host behavior yourself with the MCP SDKs — instantiating a client per server, calling `tools/list` on each, converting the results to your LLM API's tool format, and routing the model's tool calls back to the right connection. Hosts run anywhere: a laptop desktop app or a cloud-hosted agent backend.
