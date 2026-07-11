---
{
  "title": "MCP Server",
  "module": "mcp",
  "order": 3,
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
      "title": "Understanding MCP Servers",
      "url": "https://modelcontextprotocol.io/docs/learn/server-concepts#understanding-mcp-servers"
    },
    {
      "type": "article",
      "title": "Awesome MCP Servers",
      "url": "https://mcpservers.org/"
    },
    {
      "type": "video",
      "title": "The Complete Guide to Building AI Agents for Beginners",
      "url": "https://youtu.be/MOyl58VF2ak?si=-QjRD_5y3iViprJX"
    },
    {
      "type": "opensource",
      "title": "punkeye/awesome-mcp-servers",
      "url": "https://github.com/punkpeye/awesome-mcp-servers"
    },
    {
      "type": "article",
      "title": "Introducing the Azure MCP Server",
      "url": "https://devblogs.microsoft.com/azure-sdk/introducing-the-azure-mcp-server/"
    },
    {
      "type": "article",
      "title": "The Ultimate Guide to MCP",
      "url": "https://guangzhengli.com/blog/en/model-context-protocol"
    },
    {
      "type": "article",
      "title": "AWS MCP Servers for Code Assistants",
      "url": "https://aws.amazon.com/blogs/machine-learning/introducing-aws-mcp-servers-for-code-assistants-part-1/"
    }
  ]
}
---

An **MCP server** is a program that exposes capabilities to AI applications through the Model Context Protocol. It offers three kinds of primitives: **tools** (functions the model can call, like "query this database" or "create a GitHub issue"), **resources** (data the host can read, like files or API responses), and **prompts** (reusable templates the user can invoke). Despite the name, a server isn't necessarily a big remote machine — many are small scripts launched on your laptop by the host itself.

Servers are where MCP pays off for you as a builder. Wrap your product, database, or internal API in a server once, and every MCP host — Claude Desktop, IDEs, agent frameworks, other people's apps — can use it immediately, with no per-host integration work. That's why the ecosystem exploded: GitHub, AWS, Azure, Cloudflare, Stripe, and thousands of community projects ship official servers, and directories like awesome-mcp-servers catalog them. Knowing what already exists saves you from writing tools that are one `npx` command away.

In practice you'll consume servers by adding an entry to your host's config — a command like `npx -y @modelcontextprotocol/server-filesystem` for local servers, or a URL for remote ones — and build them with the official SDKs, where a tool is roughly a typed schema plus a handler function. A server speaks **stdio** when spawned locally and **streamable HTTP** when deployed remotely; the primitives it exposes stay identical either way.
