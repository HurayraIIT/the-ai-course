---
{
  "title": "Connect to Remote Server",
  "module": "mcp",
  "order": 9,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Connect to remote MCP Servers",
      "url": "https://modelcontextprotocol.io/docs/develop/connect-remote-servers"
    },
    {
      "type": "article",
      "title": "Remote MCP Servers",
      "url": "https://mcpservers.org/remote-mcp-servers"
    },
    {
      "type": "video",
      "title": "Deploy Remote MCP Servers in Python (Step by Step)",
      "url": "https://www.youtube.com/watch?v=wXAqv8uvY0M"
    }
  ]
}
---

Connecting to a **remote MCP server** means pointing your host at a URL instead of a local command. The server runs as a web service — operated by a vendor like GitHub, Linear, or Cloudflare, or deployed by you — and the host's client talks to it over **streamable HTTP**. Nothing gets installed on your machine: the connection is a config entry with a `url`, and authentication typically happens through an **OAuth 2.1** flow in your browser rather than API keys pasted into files.

Remote servers are how MCP scales beyond the laptop. They serve many users from one deployment, are always up to date because the vendor maintains them, and work from hosts that can't spawn subprocesses — claude.ai in the browser, mobile apps, and cloud-hosted agents. For teams, they centralize credentials and access control instead of scattering tokens across everyone's local config. The trade-off is the reverse of local servers: no access to your filesystem or local environment, and you're trusting a network endpoint with whatever data flows through your tools.

In practice you add the server through the host's UI (claude.ai and Claude Desktop call these connectors) or as a config entry with `"url": "https://example.com/mcp"` — in Claude Code, `claude mcp add --transport http`. First use triggers the OAuth consent screen; after that, tools behave exactly like local ones. Some older hosts only speak stdio, in which case a bridge like `mcp-remote` proxies a remote URL through a local stdio process.
