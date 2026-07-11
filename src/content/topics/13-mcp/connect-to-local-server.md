---
{
  "title": "Connect to Local Server",
  "module": "mcp",
  "order": 8,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Connect to local MCP servers",
      "url": "https://modelcontextprotocol.io/docs/develop/connect-local-servers"
    },
    {
      "type": "article",
      "title": "How to Build and Host Your Own MCP Servers in Easy Steps",
      "url": "ttps://collabnix.com/how-to-build-and-host-your-own-mcp-servers-in-easy-steps/"
    },
    {
      "type": "video",
      "title": "Local MCP Servers for Cursor (Step by step)",
      "url": "https://www.youtube.com/watch?v=_Qr0WTgR5EM"
    }
  ]
}
---

Connecting to a **local MCP server** means telling a host to launch a server as a subprocess on your own machine and talk to it over **stdio**. Unlike a remote server, there's no URL and nothing deployed: the host runs a command you specify — `npx`, `uvx`, `python`, `node`, or a Docker invocation — and pipes JSON-RPC messages through the process's standard input and output. This is the workflow you'll use constantly, whether the server is one you built or one installed from the ecosystem.

Local connections matter because they're where MCP's power meets your actual environment. A local server runs with your user account, so it can read your files, use credentials from environment variables, and touch localhost services — capabilities no remote server can safely offer. That reach is also the risk: a server you install runs arbitrary code on your machine, so treat unknown servers like unknown npm packages and stick to sources you trust.

In practice you edit the host's config file. For Claude Desktop that's `claude_desktop_config.json`, with an `mcpServers` object where each entry has a `command`, an `args` array, and optionally `env` for secrets; Cursor, VS Code, and Claude Code use the same shape in their own files (`.mcp.json`, `mcp.json`). Restart or reload the host and the server's tools appear in the UI. When something fails, check the host's MCP logs first — the usual culprits are a command missing from `PATH`, absolute paths not used in `args`, or the server printing to `stdout` and corrupting the protocol stream.
